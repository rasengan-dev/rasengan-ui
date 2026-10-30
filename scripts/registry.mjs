#!/usr/bin/env node
/**
 * Builds the Rasengan UI registry (RFC-0002, "Registry and URLs"), one per engine:
 *
 *   RASENGAN_UI_URL=https://registry.rasengan.dev pnpm registry
 *
 * For each engine it inlines every component's `<name>.styles.ts` into
 * `<name>.<engine>.tsx` (a project receives one file per component), writes
 * .registry/<engine>/registry.json, and builds it with the shadcn CLI into
 * apps/site/public/r/<engine>. It also keeps the `@/components/ui/<name>`
 * paths of registry/ and apps/site in sync with the components that exist.
 *
 * RASENGAN_UI_URL is where /r will be served; items point at each other
 * through it. It defaults to the local site.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const base = (process.env.RASENGAN_UI_URL || "http://localhost:3200").replace(/\/$/, "");
const ENGINES = ["base"];
const SHADCN = "shadcn@4.23.0";

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

const components = [];
for (const entry of readdirSync(join(root, "registry/components"), { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const { meta } = await import(pathToFileURL(join(root, "registry/components", entry.name, "meta.ts")).href);
	if (meta.name !== entry.name) throw new Error(`registry/components/${entry.name}: meta.name is "${meta.name}"`);
	components.push(meta);
}
components.sort((a, b) => a.name.localeCompare(b.name));

const { natures, tints, villages } = await import(pathToFileURL(join(root, "packages/villages/src/index.ts")).href);

/** Items every engine shares: core, theme contract, villages. */
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

for (const engine of ENGINES) {
	const url = (name) => `${base}/r/${engine}/${name}.json`;
	const out = `.registry/${engine}`;
	rmSync(join(root, out), { recursive: true, force: true });
	mkdirSync(join(root, out, "components"), { recursive: true });

	const items = sharedItems(url);
	for (const meta of components.filter((meta) => meta.engines.includes(engine))) {
		const dir = `registry/components/${meta.name}`;
		const stylesModule = `${meta.name}.styles`;
		const file = `${out}/components/${meta.name}.tsx`;
		writeFileSync(join(root, file), inlineStyles(read(`${dir}/${meta.name}.${engine}.tsx`), read(`${dir}/${stylesModule}.ts`), stylesModule));
		items.push({
			name: meta.name,
			type: "registry:ui",
			title: meta.title,
			description: meta.description,
			meta: { engine, status: meta.status },
			dependencies: [...(meta.dependencies[engine] ?? [])],
			registryDependencies: [url("rasengan-core"), ...meta.registryDependencies.map(url)],
			files: [{ path: file, type: "registry:ui" }],
		});
	}

	const registry = { $schema: "https://ui.shadcn.com/schema/registry.json", name: "rasengan", homepage: base, items };
	writeFileSync(join(root, out, "registry.json"), `${JSON.stringify(registry, null, "\t")}\n`);
	console.log(`${out}/registry.json: ${items.length} items, base ${base}`);

	execFileSync("npx", ["--yes", SHADCN, "build", `${out}/registry.json`, "--output", `apps/site/public/r/${engine}`], {
		cwd: root,
		stdio: "inherit",
	});
}

// ---- Paths -----------------------------------------------------------------

/** `@/components/ui/<name>` → the Base UI source, for the registry and site tsconfigs. */
function syncPaths(tsconfig, prefix) {
	const config = JSON.parse(read(tsconfig));
	const paths = Object.fromEntries(Object.entries(config.compilerOptions.paths).filter(([key]) => !key.startsWith("@/components/ui/")));
	const ui = Object.fromEntries(components.map(({ name }) => [`@/components/ui/${name}`, [`${prefix}components/${name}/${name}.base.tsx`]]));
	// Specific paths first: TypeScript tries the longest prefix match anyway, but the file reads better.
	config.compilerOptions.paths = { ...ui, ...paths };
	writeFileSync(join(root, tsconfig), `${JSON.stringify(config, null, "\t")}\n`);
}

syncPaths("registry/tsconfig.json", "./");
syncPaths("apps/site/tsconfig.json", "../../registry/");
