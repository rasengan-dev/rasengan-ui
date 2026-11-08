#!/usr/bin/env node
/**
 * Builds the Rasengan UI registry (RFC-0002, "Registry and URLs"), one per engine:
 *
 *   RASENGAN_UI_URL=https://ui.rasengan.dev pnpm registry
 *
 * For each engine it inlines every component's `<name>.styles.ts` into
 * `<name>.<engine>.tsx` (a project receives one file per component), writes
 * .registry/<engine>/registry.json, and builds it with the shadcn CLI into
 * apps/site/public/r/<engine>, every file pointing at Rasengan UI's schemas
 * (/schema/registry.json, /schema/registry-item.json). It also keeps the
 * `@/components/ui/<name>` paths of registry/ and apps/site in sync with the
 * components that exist.
 *
 * RASENGAN_UI_URL is where the site will be served; items and schemas are
 * referenced through it. It defaults to the local site; the site's build (`pnpm build`, or `pnpm run build` in
 * apps/site, as Hiraiship runs it) uses https://ui.rasengan.dev.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";
import { zodToJsonSchema } from "zod-to-json-schema";

const root = join(import.meta.dirname, "..");
const base = (process.env.RASENGAN_UI_URL || "http://localhost:3200").replace(/\/$/, "");
const ENGINES = ["base"];
const SHADCN = "shadcn@4.23.0";
/* Rasengan UI's own schemas (apps/site/public/schema): shadcn's content, served next to /r. */
const schemas = { registry: `${base}/schema/registry.json`, item: `${base}/schema/registry-item.json` };

const read = (path) => readFileSync(join(root, path), "utf8");

// ---- Imports ---------------------------------------------------------------

const IMPORT = /^import\s[\s\S]*?["'][^"']+["'];?[ \t]*$/gm;

/** Splits a module into its leading import declarations and the rest. */
function splitImports(source) {
	const imports = [];
	let end = 0;
	for (const match of source.matchAll(IMPORT)) {
		if (source.slice(end, match.index).trim() !== "") break;
		imports.push(match[0].replace(/;?\s*$/, ";"));
		end = match.index + match[0].length;
	}
	return { imports, body: source.slice(end).trim() };
}

/** Merges import declarations: named imports from one module become one statement. */
function mergeImports(statements) {
	const named = new Map();
	const other = [];
	for (const statement of statements) {
		const match = statement.match(/^import\s+(type\s+)?\{([^}]*)\}\s+from\s+(["'][^"']+["']);$/);
		if (!match) {
			if (!other.includes(statement)) other.push(statement);
			continue;
		}
		const key = `${match[1] ? "type " : ""}${match[3]}`;
		const names = named.get(key) ?? new Set();
		for (const name of match[2].split(",").map((part) => part.trim()).filter(Boolean)) names.add(name);
		named.set(key, names);
	}
	const merged = [...named].map(([key, names]) => {
		const [type, module] = key.startsWith("type ") ? ["type ", key.slice(5)] : ["", key];
		return `import ${type}{ ${[...names].join(", ")} } from ${module};`;
	});
	return [...other, ...merged];
}

/** One self-contained file: the engine source with its styles file inlined. */
function inlineStyles(source, styles, stylesModule) {
	const fromStyles = new RegExp(`^(?:import|export)\\s[^;]*?from\\s+["']\\./${stylesModule.replace(".", "\\.")}["'];?[ \\t]*\\n?`, "gm");
	// A directive ("use client") has to stay the file's first statement, above the merged imports.
	const directive = source.match(/^\s*(["']use client["'];?)\s*\n/);
	const component = splitImports(source.slice(directive?.[0].length ?? 0).replace(fromStyles, ""));
	const inlined = splitImports(styles);
	return `${directive ? `${directive[1]}\n\n` : ""}${mergeImports([...component.imports, ...inlined.imports]).join("\n")}\n\n${inlined.body}\n\n${component.body}\n`;
}

// ---- Items -----------------------------------------------------------------

const { categories } = await import(pathToFileURL(join(root, "registry/categories.ts")).href);

const components = [];
for (const entry of readdirSync(join(root, "registry/components"), { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const { meta } = await import(pathToFileURL(join(root, "registry/components", entry.name, "meta.ts")).href);
	if (meta.name !== entry.name) throw new Error(`registry/components/${entry.name}: meta.name is "${meta.name}"`);
	if (!Object.hasOwn(categories, meta.category)) {
		throw new Error(`registry/components/${entry.name}: category "${meta.category}" is not one of ${Object.keys(categories).join(", ")} (registry/categories.ts)`);
	}
	components.push(meta);
}
components.sort((a, b) => a.name.localeCompare(b.name));

const { natures, tints, villages } = await import(pathToFileURL(join(root, "packages/villages/src/index.ts")).href);

// ---- Blocks (RFC-0008) ---------------------------------------------------------------------------------------------

const { blockCategories, blockFamilies } = await import(pathToFileURL(join(root, "registry/block-categories.ts")).href);
const BLOCK_FILES = ["schema.ts", "example.ts", "meta.ts"];
/* Weight budget of a block's own code, gzip (RFC-0008, "Quality gate"). */
const BLOCK_BUDGET_KB = { default: 6, showcase: 12 };

/* The placeholder images (registry/placeholders), served by the site at /placeholders/ like in a project. */
const placeholders = existsSync(join(root, "registry/placeholders")) ? readdirSync(join(root, "registry/placeholders")).sort() : [];
mkdirSync(join(root, "apps/site/public/placeholders"), { recursive: true });
for (const file of placeholders) copyFileSync(join(root, "registry/placeholders", file), join(root, "apps/site/public/placeholders", file));

const blocks = [];
if (existsSync(join(root, "registry/blocks"))) {
	for (const entry of readdirSync(join(root, "registry/blocks"), { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const dir = `registry/blocks/${entry.name}`;
		const { meta } = await import(pathToFileURL(join(root, dir, "meta.ts")).href);
		if (meta.name !== entry.name) throw new Error(`${dir}: meta.name is "${meta.name}"`);
		if (!Object.hasOwn(blockFamilies, meta.family)) throw new Error(`${dir}: family "${meta.family}" is not one of ${Object.keys(blockFamilies).join(", ")}`);
		const category = blockCategories[meta.category];
		if (!category || !category.families.includes(meta.family)) throw new Error(`${dir}: category "${meta.category}" is not a ${meta.family} category (registry/block-categories.ts)`);
		for (const file of [`${meta.name}.base.tsx`, ...BLOCK_FILES]) if (!existsSync(join(root, dir, file))) throw new Error(`${dir}: ${file} is missing`);
		// Rendering a block must not load zod (ADR-0013): its component takes only types from the field types.
		const code = read(`${dir}/${meta.name}.base.tsx`);
		if (/import\s+(?!type\b)[^;]*from\s+"@\/lib\/block-fields"/.test(code))
			throw new Error(`${dir}: ${meta.name}.base.tsx imports values from @/lib/block-fields; use \`import type\` (ADR-0013)`);

		// Schema and example, bundled so the @/lib/block-fields alias resolves: the example must parse, the schema becomes JSON Schema.
		const bundled = await build({
			stdin: { contents: `export { schema } from "./schema.ts"; export { example } from "./example.ts";`, resolveDir: join(root, dir), loader: "ts" },
			bundle: true,
			format: "esm",
			platform: "node",
			write: false,
			alias: { "@/lib/blocks": join(root, "packages/blocks/src/blocks.ts"), "@/lib/block-fields": join(root, "packages/blocks/src/block-fields.ts") },
			logLevel: "silent",
		});
		const { schema, example } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`);
		const parsed = schema.safeParse(example);
		if (!parsed.success) throw new Error(`${dir}: example.ts does not parse with schema.ts\n${parsed.error.message}`);
		const contentSchema = zodToJsonSchema(schema, { $refStrategy: "none", target: "jsonSchema7" });
		delete contentSchema.$schema;

		// Weight: the block's own code, minified and gzipped, everything it imports from elsewhere left out.
		const own = await build({
			entryPoints: [join(root, dir, `${meta.name}.base.tsx`)],
			bundle: true,
			minify: true,
			format: "esm",
			write: false,
			jsx: "automatic",
			plugins: [{ name: "own-code", setup: (b) => b.onResolve({ filter: /^[^.]/ }, (args) => (args.kind === "entry-point" ? undefined : { path: args.path, external: true })) }],
			logLevel: "silent",
		});
		const weight = Math.round((gzipSync(own.outputFiles[0].contents).length / 1024) * 10) / 10;
		const budget = meta.category === "showcase" || meta.category === "bento" ? BLOCK_BUDGET_KB.showcase : BLOCK_BUDGET_KB.default;
		if (weight > budget) throw new Error(`${dir}: ${weight} kB gzip, over the ${budget} kB budget`);

		blocks.push({ meta, dir, contentSchema, example: parsed.data, weight });
	}
	blocks.sort((a, b) => a.meta.name.localeCompare(b.meta.name));
}

/** A block's index.ts in the project: `import { CtaBanner } from "@/components/blocks/cta-banner"`. */
const blockIndex = (name) => `export * from "./${name}";\nexport * from "./schema";\nexport { example } from "./example";\nexport { meta } from "./meta";\n`;

/** Items every engine shares: core, theme contract, motion, villages. */
function sharedItems(url) {
	return [
		{
			name: "rasengan-core",
			type: "registry:lib",
			title: "Rasengan UI core",
			description: "cn(), VillageScope (a village for part of a page, popups included), the Field context and the engine variants (ui-open, ui-checked…) every component uses.",
			dependencies: ["clsx", "tailwind-merge"],
			files: [
				{ path: "packages/core/src/utils.ts", type: "registry:lib", target: "lib/utils.ts" },
				{ path: "packages/core/src/village-scope.tsx", type: "registry:lib", target: "lib/village-scope.tsx" },
				{ path: "packages/core/src/field-context.tsx", type: "registry:lib", target: "lib/field-context.tsx" },
				{ path: "packages/core/src/variants.css", type: "registry:file", target: "styles/rasengan/variants.css" },
			],
		},
		{
			name: "rasengan-theme",
			type: "registry:file",
			title: "Rasengan UI token contract",
			description: "The tokens every village sets and every component reads, the tint switch, and the natures (accent hues, and Onmyōton in black and white).",
			dependencies: ["tw-animate-css"],
			// What the CLI offers in `init`, `nature set` and `tint set`.
			meta: { natures, tints },
			files: [
				{ path: "packages/villages/src/contract.css", type: "registry:file", target: "styles/rasengan/contract.css" },
				{ path: "packages/villages/src/natures.css", type: "registry:file", target: "styles/rasengan/natures.css" },
			],
		},
		{
			name: "rasengan-motion",
			type: "registry:lib",
			title: "Rasengan UI motion",
			description:
				"What motion components share (RFC-0007): the motion modes (ready, final, off) and their head script, the village's motion tokens read from CSS, Reveal, Stagger, Presence, Parallax, Tilt, Magnetic, and splitText.",
			dependencies: ["motion"],
			registryDependencies: [url("rasengan-theme")],
			files: [
				{ path: "packages/motion/src/motion.tsx", type: "registry:lib", target: "lib/motion.tsx" },
				{ path: "packages/motion/src/motion-features.ts", type: "registry:lib", target: "lib/motion-features.ts" },
				{ path: "packages/motion/src/split-text.tsx", type: "registry:lib", target: "lib/split-text.tsx" },
			],
		},
		{
			name: "rasengan-blocks",
			type: "registry:lib",
			title: "Rasengan UI blocks",
			description: "What blocks share (RFC-0008): BlockProps, BlockMeta and formatMoney in lib/blocks.ts; the content field types in zod (cta, image, stat, pricePlan, menuItem, openingHours…) in lib/block-fields.ts, which only schemas import.",
			dependencies: ["zod@^3.25.76"],
			files: [
				{ path: "packages/blocks/src/blocks.ts", type: "registry:lib", target: "lib/blocks.ts" },
				{ path: "packages/blocks/src/block-fields.ts", type: "registry:lib", target: "lib/block-fields.ts" },
			],
		},
		{
			name: "rasengan-placeholders",
			type: "registry:file",
			title: "Rasengan UI placeholder images",
			description: "The open images the block examples show (RFC-0008), installed in public/placeholders/ until you replace them.",
			files: placeholders.map((file) => ({ path: `registry/placeholders/${file}`, type: "registry:file", target: `public/placeholders/${file}` })),
		},
		...Object.entries(villages).map(([name, village]) => ({
			name: `village-${name}`,
			type: "registry:file",
			title: `${village.title} village`,
			description: village.description,
			registryDependencies: [url("rasengan-theme")],
			meta: { defaultNature: village.defaultNature, status: village.status },
			files: [
				{ path: `packages/villages/src/villages/${name}.css`, type: "registry:file", target: `styles/rasengan/villages/${name}.css` },
			],
		})),
	];
}

/**
 * The component's demos as `registry:example` items (RFC-0003, "Examples in the registry"):
 * `dialog.demo.tsx` is `dialog-demo`, `dialog-sizes.demo.tsx` is `dialog-sizes-demo`. Each depends on
 * the components and npm packages it imports.
 */
function exampleItems(meta, dir, url) {
	return readdirSync(join(root, dir))
		.filter((file) => file.endsWith(".demo.tsx"))
		.sort((a, b) => (a === `${meta.name}.demo.tsx` ? -1 : b === `${meta.name}.demo.tsx` ? 1 : a.localeCompare(b)))
		.map((file) => {
			const demo = file.slice(0, -".demo.tsx".length);
			const source = read(`${dir}/${file}`);
			const specifiers = [...source.matchAll(/from\s+["']([^"']+)["']/g)].map(([, specifier]) => specifier);
			const ui = specifiers.filter((specifier) => specifier.startsWith("@/components/ui/")).map((specifier) => specifier.slice("@/components/ui/".length));
			const packages = specifiers
				.filter((specifier) => !specifier.startsWith("@/") && !specifier.startsWith("."))
				.map((specifier) => specifier.split("/").slice(0, specifier.startsWith("@") ? 2 : 1).join("/"))
				.filter((name) => name !== "react" && name !== "react-dom");
			const variant = demo.slice(meta.name.length + 1).replace(/-/g, " ");
			return {
				name: `${demo}-demo`,
				type: "registry:example",
				title: variant ? `${meta.title} example: ${variant}` : `${meta.title} example`,
				description: variant ? `How to use ${meta.title}: ${variant}.` : `How to use ${meta.title}.`,
				dependencies: [...new Set(packages)],
				registryDependencies: [...new Set([meta.name, ...ui])].map(url),
				files: [{ path: `${dir}/${file}`, type: "registry:example" }],
			};
		});
}

for (const engine of ENGINES) {
	const url = (name) => `${base}/r/${engine}/${name}.json`;
	const out = `.registry/${engine}`;
	rmSync(join(root, out), { recursive: true, force: true });
	mkdirSync(join(root, out, "components"), { recursive: true });

	const items = sharedItems(url);
	const examples = [];
	for (const meta of components.filter((meta) => meta.engines.includes(engine))) {
		const dir = `registry/components/${meta.name}`;
		const stylesModule = `${meta.name}.styles`;
		const file = `${out}/components/${meta.name}.tsx`;
		writeFileSync(join(root, file), inlineStyles(read(`${dir}/${meta.name}.${engine}.tsx`), read(`${dir}/${stylesModule}.ts`), stylesModule));
		const demos = exampleItems(meta, dir, url);
		examples.push(...demos);
		items.push({
			name: meta.name,
			type: "registry:ui",
			title: meta.title,
			description: meta.description,
			meta: { engine, status: meta.status, category: meta.category, examples: demos.map((demo) => demo.name) },
			dependencies: [...(meta.dependencies[engine] ?? [])],
			registryDependencies: [url("rasengan-core"), ...meta.registryDependencies.map(url)],
			files: [{ path: file, type: "registry:ui" }],
		});
	}
	items.push(...examples);

	for (const { meta, dir, contentSchema, example, weight } of blocks) {
		const folder = `${out}/blocks/${meta.name}`;
		mkdirSync(join(root, folder), { recursive: true });
		writeFileSync(join(root, folder, `${meta.name}.tsx`), read(`${dir}/${meta.name}.${engine}.tsx`));
		writeFileSync(join(root, folder, "index.ts"), blockIndex(meta.name));
		for (const file of BLOCK_FILES) writeFileSync(join(root, folder, file), read(`${dir}/${file}`));
		items.push({
			name: meta.name,
			type: "registry:block",
			title: meta.title,
			description: meta.summary,
			meta: {
				engine,
				family: meta.family,
				category: meta.category,
				status: meta.status,
				added: meta.added,
				summary: meta.summary,
				useWhen: meta.useWhen,
				avoidWhen: meta.avoidWhen,
				layout: meta.layout,
				content: meta.content,
				pairsWith: meta.pairsWith ?? [],
				weightKb: weight,
				contentSchema,
				example,
			},
			dependencies: ["zod@^3.25.76", ...(meta.dependencies ?? [])],
			// An example that shows a registry placeholder brings it along, so the block renders as in the docs.
			registryDependencies: [
				url("rasengan-core"),
				url("rasengan-blocks"),
				...(JSON.stringify(example).includes("/placeholders/") ? [url("rasengan-placeholders")] : []),
				...meta.components.map(url),
			],
			files: [`${meta.name}.tsx`, "index.ts", ...BLOCK_FILES].map((file) => ({ path: `${folder}/${file}`, type: "registry:block", target: `components/blocks/${meta.name}/${file}` })),
		});
	}

	const registry = { $schema: schemas.registry, name: "rasengan", homepage: base, items };
	writeFileSync(join(root, out, "registry.json"), `${JSON.stringify(registry, null, "\t")}\n`);
	console.log(`${out}/registry.json: ${items.length} items, base ${base}`);

	const published = `apps/site/public/r/${engine}`;
	execFileSync("npx", ["--yes", SHADCN, "build", `${out}/registry.json`, "--output", published], {
		cwd: root,
		stdio: "inherit",
	});

	// The shadcn CLI stamps its own schema on every file it writes; the published files point at ours.
	for (const file of readdirSync(join(root, published)).filter((name) => name.endsWith(".json"))) {
		const path = join(root, published, file);
		const { $schema, ...rest } = JSON.parse(readFileSync(path, "utf8"));
		const own = { $schema: file === "registry.json" ? schemas.registry : schemas.item, ...rest };
		writeFileSync(path, `${JSON.stringify(own, null, 2)}\n`);
	}

	// The blocks catalog, for agents that read the registry without the MCP server: meta and content schemas, no code.
	const catalog = blocks.map(({ meta, contentSchema, weight }) => ({
		name: meta.name,
		title: meta.title,
		family: meta.family,
		category: meta.category,
		summary: meta.summary,
		useWhen: meta.useWhen,
		avoidWhen: meta.avoidWhen,
		pairsWith: meta.pairsWith ?? [],
		weightKb: weight,
		contentSchema,
		item: url(meta.name),
	}));
	writeFileSync(join(root, published, "blocks.json"), `${JSON.stringify({ blocks: catalog }, null, 2)}\n`);
}

// ---- Paths -----------------------------------------------------------------

/** `@/components/ui/<name>` and `@/components/blocks/<name>` → the Base UI sources, for the registry and site tsconfigs. */
function syncPaths(tsconfig, prefix) {
	const config = JSON.parse(read(tsconfig));
	const generated = (key) => key.startsWith("@/components/ui/") || (key.startsWith("@/components/blocks/") && key !== "@/components/blocks/*");
	const paths = Object.fromEntries(Object.entries(config.compilerOptions.paths).filter(([key]) => !generated(key)));
	const ui = Object.fromEntries(components.map(({ name }) => [`@/components/ui/${name}`, [`${prefix}components/${name}/${name}.base.tsx`]]));
	const blockPaths = Object.fromEntries(blocks.map(({ meta }) => [`@/components/blocks/${meta.name}`, [`${prefix}blocks/${meta.name}/${meta.name}.base.tsx`]]));
	// Specific paths first: TypeScript tries the longest prefix match anyway, but the file reads better.
	config.compilerOptions.paths = { ...ui, ...blockPaths, "@/components/blocks/*": [`${prefix}blocks/*`], ...paths };
	writeFileSync(join(root, tsconfig), `${JSON.stringify(config, null, "\t")}\n`);
}

syncPaths("registry/tsconfig.json", "./");
syncPaths("apps/site/tsconfig.json", "../../registry/");
