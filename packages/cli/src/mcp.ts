import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type Config, configFile, defaultRegistry, defaults, readConfig, version } from "./config.ts";
import { installPackages, missingPackages } from "./dependencies.ts";
import { hasConflictMarkers, hash, readLock, renderFile, writeItems } from "./install.ts";
import { findRoot } from "./project.ts";
import { type RegistryItem, choices, loadIndex, loadItem, resolveItems } from "./registry.ts";
import { installedVillages } from "./setup.ts";

/* The MCP server (RFC-0003): the registry and the project, as tools an agent can call. */

const instructions = `Rasengan UI is a React component system (Base UI, Tailwind CSS v4) installed as source into the project, themed by villages (whole design languages) and natures (accent hues), switchable at runtime.

- Before writing code that uses a component, read it with get_component and its examples with get_examples. The APIs are Base UI's (render props such as render={<Button />}), not Radix's (no asChild).
- Style with the token contract's Tailwind names (bg-primary, text-muted-foreground, border-border, rounded-lg, shadow-md, font-display…) and the components' variant, tone and size props. Never use raw colours, radii or shadows: they would not follow a village or nature switch.
- Install components with add_components, not by copying their source, so the import aliases, the npm packages and rasengan-ui.lock stay right.
- get_project tells you the project's village, nature and installed components, and which files the user edited.`;

interface Options {
	/** The folder the client started the server in. */
	cwd: string;
	/** The registry to read when the project has no rasengan-ui.json. */
	registry?: string;
}

/** The project, read again on every call: `init` may run while the server is up. */
function project({ cwd, registry }: Options): { root: string; config: Config; setUp: boolean } {
	let root: string;
	try {
		root = findRoot(cwd);
	} catch {
		root = resolve(cwd);
	}
	if (existsSync(join(root, configFile))) return { root, config: readConfig(root), setUp: true };
	return { root, config: { ...defaults, css: "src/styles/index.css", registry: registry ?? defaultRegistry }, setUp: false };
}

const nameOf = (nameOrUrl: string) => nameOrUrl.replace(/^.*\//, "").replace(/\.json$/, "");

/** A fenced code block that the content can't close early. */
function fence(content: string, path: string) {
	const longest = Math.max(2, ...[...content.matchAll(/`+/g)].map(([run]) => run.length));
	const ticks = "`".repeat(longest + 1);
	return `${ticks}${extname(path).slice(1)}\n${content.trimEnd()}\n${ticks}`;
}

/** The file as this project would get it, or as the registry has it when the paths can't be resolved. */
function render(root: string, config: Config, item: RegistryItem, file: RegistryItem["files"][number]) {
	try {
		return renderFile(root, config, item, file);
	} catch {
		return { path: file.target ?? file.path, content: file.content };
	}
}

const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });

const kinds = {
	component: (item: { type: string }) => item.type === "registry:ui",
	village: (item: { name: string }) => item.name.startsWith("village-"),
	example: (item: { type: string }) => item.type === "registry:example",
	all: () => true,
};

export function createServer(options: Options) {
	const server = new McpServer({ name: "rasengan-ui", title: "Rasengan UI", version }, { instructions });

	server.registerTool(
		"list_components",
		{
			title: "List Rasengan UI components",
			description:
				"The items of the Rasengan UI registry with a one-line description: components by default, or villages, examples, or everything. Pass a query to keep the items whose name, title or description contain all its words, and a category to keep one family of components (motion: components whose animation is the point, such as a marquee or a typewriter).",
			inputSchema: {
				query: z.string().optional().describe('Words to look for, e.g. "menu" or "date input"'),
				kind: z.enum(["component", "village", "example", "all"]).default("component").describe("Which items to list"),
				category: z
					.enum(["forms", "dates", "overlays", "navigation", "display", "feedback", "motion"])
					.optional()
					.describe("Only components of this category"),
			},
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ query, kind, category }) => {
			const { root, config } = project(options);
			const { items } = await loadIndex(config, root);
			const words = query?.toLowerCase().split(/\s+/).filter(Boolean) ?? [];
			const found = items
				.filter(kinds[kind])
				.filter((item) => !category || item.meta?.category === category)
				.filter((item) => words.every((word) => `${item.name} ${item.title ?? ""} ${item.description ?? ""}`.toLowerCase().includes(word)));
			if (found.length === 0) {
				const what = [query && `"${query}"`, category && `the ${category} category`].filter(Boolean).join(" in ");
				return text(`No ${kind === "all" ? "item" : kind} matches ${what || "this"}. Try fewer words or no category.`);
			}
			const lines = found.map((item) => {
				const status = item.meta?.status ? `, ${item.meta.status}` : "";
				const family = item.meta?.category ? `, ${item.meta.category}` : "";
				return `- ${item.name} (${item.title ?? item.name}${family}${status}): ${item.description ?? ""}`;
			});
			return text(`${found.length} item${found.length === 1 ? "" : "s"} in the ${config.engine} registry:\n\n${lines.join("\n")}`);
		},
	);

	server.registerTool(
		"get_component",
		{
			title: "Get a component",
			description:
				"One registry item: its source as this project would get it (file paths and import aliases), the npm packages and components it needs, its examples and its docs page. Read it before writing code that uses the component.",
			inputSchema: { name: z.string().describe('The item name, e.g. "dialog", "village-kiri" or "dialog-demo"') },
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ name }) => {
			const { root, config, setUp } = project(options);
			const [item, index] = await Promise.all([loadItem(config, root, name), loadIndex(config, root)]);
			const examples = (item.meta?.examples as string[] | undefined) ?? [];
			const installed = setUp && name in readLock(root).items;
			const lines = [
				`# ${item.title ?? item.name} (${item.name}, ${item.type}${item.meta?.status ? `, ${item.meta.status}` : ""})`,
				"",
				item.description ?? "",
				"",
				`- Install: add_components with ["${item.name}"] (or \`npx rasengan-ui add ${item.name}\`)${installed ? ". Already installed in this project." : ""}`,
			];
			if (item.dependencies?.length) lines.push(`- npm packages: ${item.dependencies.join(", ")}`);
			if (item.registryDependencies?.length) lines.push(`- Uses: ${item.registryDependencies.map(nameOf).join(", ")} (installed with it)`);
			if (examples.length) lines.push(`- Examples: ${examples.join(", ")} (get_examples)`);
			if (index.homepage && item.type === "registry:ui") lines.push(`- Docs: ${index.homepage.replace(/\/$/, "")}/components/${item.name}`);
			for (const file of item.files) {
				const { path, content } = render(root, config, item, file);
				lines.push("", `## ${path}`, "", fence(content, path));
			}
			return text(lines.join("\n"));
		},
	);

	server.registerTool(
		"get_examples",
		{
			title: "Get a component's examples",
			description: "The source of a component's examples: how it is meant to be composed, with the components it is used with. Read them before using the component.",
			inputSchema: { name: z.string().describe('The component, e.g. "dialog"') },
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ name }) => {
			const { root, config } = project(options);
			const item = await loadItem(config, root, name);
			const names = item.type === "registry:example" ? [item.name] : ((item.meta?.examples as string[] | undefined) ?? []);
			if (names.length === 0) return text(`${item.title ?? item.name} has no examples. get_component shows its source.`);
			const examples = await Promise.all(names.map((example) => loadItem(config, root, example)));
			const sections = examples.map((example) =>
				[`## ${example.title ?? example.name} (${example.name})`, ...example.files.map((file) => fence(render(root, config, example, file).content, file.path))].join("\n\n"),
			);
			return text(sections.join("\n\n"));
		},
	);

	server.registerTool(
		"get_project",
		{
			title: "Get the project's set-up",
			description:
				"How this project uses Rasengan UI: engine, village, nature, tint, stylesheet and aliases from rasengan-ui.json; the installed items and the files the user edited since install; the villages, natures and tints the registry offers.",
			inputSchema: {},
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async () => {
			const { root, config, setUp } = project(options);
			const { villages, natures, tints } = await choices(config, root);
			const offered = [
				"## What the registry offers",
				"",
				`- Villages: ${Object.entries(villages).map(([name, village]) => `${name} (${village.description ?? village.title})`).join("; ")}`,
				`- Natures: ${Object.entries(natures).map(([name, nature]) => `${name} (${nature.element ?? nature.title})`).join(", ")}`,
				`- Tints: ${Object.keys(tints).join(", ")}`,
			];
			if (!setUp)
				return text(
					[`${root} has no ${configFile}: Rasengan UI isn't set up here. The user sets it up with \`npx rasengan-ui init\`; the read tools work meanwhile, add_components doesn't.`, "", ...offered].join("\n"),
				);

			const lock = readLock(root);
			const installed = Object.entries(lock.items).map(([name, { files }]) => {
				const read = (path: string) => (existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : undefined);
				const edited = Object.entries(files)
					.filter(([path, installedHash]) => {
						const content = read(path);
						return content === undefined || hash(content) !== installedHash;
					})
					.map(([path]) => path);
				const conflicted = edited.filter((path) => hasConflictMarkers(read(path) ?? ""));
				return `- ${name}${edited.length ? ` (edited since install: ${edited.join(", ")})` : ""}${conflicted.length ? ` (unresolved conflict markers: ${conflicted.join(", ")})` : ""}`;
			});
			const lines = [
				`# ${root}`,
				"",
				`- Engine: ${config.engine}`,
				`- Village: ${config.village}${installedVillages(lock).length > 1 ? ` (installed: ${installedVillages(lock).join(", ")}, for VillageScope)` : ""}`,
				`- Nature: ${config.nature}`,
				`- Tint: ${config.tint}`,
				`- Stylesheet: ${config.css}`,
				`- Aliases: ui ${config.aliases.ui}, components ${config.aliases.components}, lib ${config.aliases.lib}`,
				`- Registry: ${config.registry}`,
				"",
				"## Installed",
				"",
				...(installed.length ? installed : ["Nothing yet."]),
				"",
				"Edited files are kept by add_components unless overwrite is set; the user merges registry changes with `npx rasengan-ui update`. Files with unresolved conflict markers need the user (or you, if asked) to resolve them before anything else touches them.",
				"",
				...offered,
			];
			return text(lines.join("\n"));
		},
	);

	server.registerTool(
		"add_components",
		{
			title: "Install components",
			description:
				"Installs components, examples or villages into the project with the components and npm packages they need, as `rasengan-ui add` does: files go where the project's aliases point, and rasengan-ui.lock records them. A file the user edited since install is kept unless overwrite is set.",
			inputSchema: {
				names: z.array(z.string()).min(1).describe('Item names, e.g. ["dialog", "toast"]'),
				overwrite: z.boolean().default(false).describe("Replace files the user edited since install. Only when the user asked for it."),
				dryRun: z.boolean().default(false).describe("Report what would change, write nothing"),
				skipInstall: z.boolean().default(false).describe("Write the files, but leave the npm packages to the user"),
			},
			annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
		},
		async ({ names, overwrite, dryRun, skipInstall }) => {
			const { root, config, setUp } = project(options);
			if (!setUp) throw new Error(`${root} has no ${configFile}. Ask the user to run \`npx rasengan-ui init\` first.`);
			const items = await resolveItems(config, root, names);
			const written = writeItems(root, config, items, { overwrite, dryRun, named: names });

			const lines = written.filter(({ outcome }) => outcome !== "unchanged").map(({ path, outcome }) => `- ${outcome}: ${path}`);
			const unchanged = written.length - lines.length;
			if (unchanged) lines.push(`- ${unchanged} file${unchanged === 1 ? "" : "s"} already up to date`);
			if (written.some(({ outcome }) => outcome === "kept")) lines.push("", "Kept files were edited by the user since install; they were not replaced.");
			if (written.some(({ outcome }) => outcome === "left-out")) lines.push("", "Left-out files were deleted by the user since install; they were not brought back.");

			const packages = missingPackages(root, items);
			const toInstall = [...packages.dependencies, ...packages.devDependencies];
			if (toInstall.length && (dryRun || skipInstall)) lines.push("", `npm packages to install: ${toInstall.join(" ")}`);
			else if (toInstall.length)
				try {
					installPackages(root, packages, { stderr: true });
					lines.push("", `Installed npm packages: ${toInstall.join(" ")}`);
				} catch (error) {
					lines.push("", error instanceof Error ? error.message : String(error));
				}

			const asked = new Set(names.map(nameOf));
			const imports = items.filter((item) => item.type === "registry:ui" && asked.has(item.name)).map((item) => `${config.aliases.ui}/${item.name}`);
			if (!dryRun && imports.length) lines.push("", `Import from: ${imports.join(", ")}`);
			return text(`${dryRun ? "Dry run, nothing written. Adding" : "Installed"} ${names.join(", ")}${dryRun ? " would give" : ""}:\n\n${lines.join("\n")}`);
		},
	);

	return server;
}
