import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { checkVillages, parseSources, type ScopeResult, type Sources } from "@rasengan-ui/villages/contrast";
import { builtinRecipes, type Recipe } from "@rasengan-ui/villages/engine";
import type { Config } from "./config.ts";
import { fetchJson } from "./fetch.ts";
import { hash, type Lock, readBase, readLock, writeFile, writeLock } from "./install.ts";
import type { RegistryItem } from "./registry.ts";
import { mergeFile } from "./sync.ts";

/* Villages the project has and the registry doesn't (RFC-0006): made by `village create`, or added from a URL. */

export const GENERATED = "generated";

/** Where a village's stylesheet goes: next to the project's CSS, in rasengan/villages/. */
export const villagePath = (config: Config, name: string) => join(dirname(config.css), "rasengan", "villages", `${name}.css`).split("\\").join("/");

/** contract.css and natures.css as the project has them: what a village is made and checked against. */
function projectFiles(root: string, config: Config) {
	const read = (file: string) => {
		const path = join(dirname(config.css), "rasengan", file);
		if (!existsSync(join(root, path))) throw new Error(`${path} is missing: run \`rasengan-ui init\` first.`);
		return readFileSync(join(root, path), "utf8");
	};
	return { contract: read("contract.css"), natures: read("natures.css") };
}

export function projectSources(root: string, config: Config): Omit<Sources, "villages"> {
	const { villages, ...sources } = parseSources({ ...projectFiles(root, config), villages: {} });
	return sources;
}

export interface LocalVillage {
	title: string;
	description?: string;
	/** The nature a top-level scope gets: its own, or the one its recipe names. */
	defaultNature?: string;
	/** Natures the village file declares (its own). */
	natures: string[];
	source: string;
}

const title = (name: string) => name.replace(/(^|-)(\w)/g, (_, dash: string, c: string) => (dash ? " " : "") + c.toUpperCase());

/** The generated and URL villages in the lockfile, with what their files and recipes say. */
export function localVillages(root: string, config: Config, lock: Lock = readLock(root)): Record<string, LocalVillage> {
	const out: Record<string, LocalVillage> = {};
	for (const [item, entry] of Object.entries(lock.items)) {
		if (!item.startsWith("village-") || !entry.source) continue;
		const name = item.slice("village-".length);
		const path = join(root, villagePath(config, name));
		const css = existsSync(path) ? readFileSync(path, "utf8") : "";
		const header = css.match(/^\/\*\s*\n\s*\*\s*([^:\n]+?)(?::\s*(.+))?\n/);
		const natures = [...css.matchAll(/\[data-nature="([\w-]+)"\]\s*\{/g)].map((m) => m[1]);
		const recipe = config.villages?.[name]?.recipe;
		const recipeNature = recipe ? (recipe.brand?.nature ?? (recipe.brand ? undefined : builtinRecipes[recipe.base ?? "konoha"].brand.nature)) : undefined;
		out[name] = {
			title: recipe?.title ?? header?.[1]?.trim() ?? title(name),
			description: recipe?.description ?? header?.[2]?.trim(),
			defaultNature: natures.includes(name) ? name : recipeNature,
			natures,
			source: entry.source,
		};
	}
	return out;
}

/** An item from a URL or a file (relative to the project's root, as the lockfile records it): `village add <url>`. */
export async function fetchItem(source: string, root: string): Promise<RegistryItem> {
	if (/^https?:\/\//.test(source)) return fetchJson<RegistryItem>(source);
	const path = resolve(root, source);
	if (!existsSync(path)) throw new Error(`No file at ${source}.`);
	return JSON.parse(readFileSync(path, "utf8")) as RegistryItem;
}

/** A village's report across every nature (its own included), both schemes and both tints. */
export function checkProjectVillage(root: string, config: Config, name: string, css: string) {
	const parsed = parseSources({ ...projectFiles(root, config), villages: { [name]: css } });
	const results: ScopeResult[] = checkVillages(parsed, [name]);
	const pairs = results.flatMap((s) => s.pairs.map((p) => ({ ...p, scope: `${s.scheme} ${s.nature}${s.tint ? "" : " neutral"}` })));
	return {
		natures: Object.keys(parsed.natures).length,
		checked: pairs.filter((p) => p.kind !== "ring").length,
		failures: pairs.filter((p) => !p.pass && p.kind !== "ring"),
		rings: pairs.filter((p) => !p.pass && p.kind === "ring").length,
	};
}

export type WriteOutcome = { outcome: "created" | "updated" | "unchanged" } | { outcome: "merged"; conflicts: number };

/**
 * Writes a generated village and records it: lockfile (`source: "generated"`), base copy for later merges. A file you
 * edited since it was written gets the new version merged in, as `update` merges a component.
 */
export function writeGenerated(root: string, path: string, name: string, css: string): WriteOutcome {
	const lock = readLock(root);
	const absolute = join(root, path);
	const local = existsSync(absolute) ? readFileSync(absolute, "utf8") : undefined;
	const installed = lock.items[`village-${name}`]?.files[path];
	let result: WriteOutcome;
	if (local === undefined) result = { outcome: "created" };
	else if (local === css) result = { outcome: "unchanged" };
	else if (!installed || hash(local) === installed) result = { outcome: "updated" };
	else {
		const base = readBase(root, path);
		if (base === undefined) throw new Error(`${path} was edited and its generated copy (.rasengan-ui/base) is gone: move your edits aside, delete the file and run again.`);
		const { content, conflicts } = mergeFile(local, base, css);
		writeFile(root, path, content);
		result = { outcome: "merged", conflicts };
	}
	if (result.outcome === "created" || result.outcome === "updated") writeFile(root, path, css);
	writeFile(root, path, css, { base: true });
	lock.items[`village-${name}`] = { files: { [path]: hash(css) }, source: GENERATED };
	writeLock(root, lock);
	return result;
}

/** A generated village as a registry item, so others can `village add` it from wherever it is published. */
export function villageItem(config: Config, name: string, css: string, village: LocalVillage, recipe?: Recipe, engineVersion?: string): RegistryItem & Record<string, unknown> {
	return {
		$schema: "https://ui.rasengan.dev/schema/registry-item.json",
		name: `village-${name}`,
		type: "registry:file",
		title: `${village.title} village`,
		description: village.description ?? "",
		registryDependencies: [`https://ui.rasengan.dev/r/${config.engine}/rasengan-theme.json`],
		meta: {
			defaultNature: village.defaultNature,
			natures: Object.fromEntries(village.natures.map((n) => [n, { title: village.title, element: "Brand" }])),
			status: "beta",
			...(recipe ? { recipe, engineVersion } : {}),
		},
		files: [{ path: `villages/${name}.css`, type: "registry:file", target: `styles/rasengan/villages/${name}.css`, content: css }],
	};
}
