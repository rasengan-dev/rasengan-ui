import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Config } from "./config.ts";

/** A registry item, in the shadcn format the registry is built with. */
export interface RegistryItem {
	name: string;
	type: string;
	title?: string;
	description?: string;
	dependencies?: string[];
	devDependencies?: string[];
	registryDependencies?: string[];
	files: { path: string; type: string; target?: string; content: string }[];
	meta?: Record<string, unknown>;
}

const isUrl = (location: string) => /^https?:\/\//.test(location);

/**
 * An item by name, for the project's engine. A dependency written as a URL is read by its name
 * from the project's registry, so a registry built for one address works from another (or a folder).
 */
export async function loadItem(config: Config, root: string, nameOrUrl: string): Promise<RegistryItem> {
	const name = nameOrUrl.replace(/^.*\//, "").replace(/\.json$/, "");
	const location = isUrl(config.registry) ? `${config.registry.replace(/\/$/, "")}/${config.engine}/${name}.json` : join(resolve(root, config.registry), config.engine, `${name}.json`);
	if (isUrl(location)) {
		const response = await fetch(location).catch((error: Error) => {
			throw new Error(`Can't reach the registry at ${location}: ${error.message}`);
		});
		if (response.status === 404) throw new Error(`No item named "${name}" in the registry (${location}).`);
		if (!response.ok) throw new Error(`The registry answered ${response.status} for ${location}.`);
		return (await response.json()) as RegistryItem;
	}
	if (!existsSync(location)) throw new Error(`No item named "${name}" in the registry (${location}).`);
	return JSON.parse(readFileSync(location, "utf8")) as RegistryItem;
}

/** The registry's index (registry.json): every item, without file contents. */
export async function loadIndex(config: Config, root: string): Promise<{ items: Omit<RegistryItem, "files">[] }> {
	const location = isUrl(config.registry) ? `${config.registry.replace(/\/$/, "")}/${config.engine}/registry.json` : join(resolve(root, config.registry), config.engine, "registry.json");
	if (isUrl(location)) {
		const response = await fetch(location).catch((error: Error) => {
			throw new Error(`Can't reach the registry at ${location}: ${error.message}`);
		});
		if (!response.ok) throw new Error(`The registry answered ${response.status} for ${location}.`);
		return (await response.json()) as { items: Omit<RegistryItem, "files">[] };
	}
	if (!existsSync(location)) throw new Error(`No registry at ${location}.`);
	return JSON.parse(readFileSync(location, "utf8"));
}

export interface Choice {
	title: string;
	description?: string;
	element?: string;
	defaultNature?: string;
}

/** The villages the registry offers, and the natures and tints its theme item lists. */
export async function choices(config: Config, root: string) {
	const index = await loadIndex(config, root);
	const villages: Record<string, Choice> = Object.fromEntries(
		index.items
			.filter((item) => item.name.startsWith("village-"))
			.map((item) => [item.name.slice("village-".length), { title: item.title?.replace(/ village$/, "") ?? item.name, description: item.description, defaultNature: item.meta?.defaultNature as string }]),
	);
	const theme = index.items.find((item) => item.name === "rasengan-theme");
	const natures = (theme?.meta?.natures ?? {}) as Record<string, Choice>;
	const tints = (theme?.meta?.tints ?? {}) as Record<string, Choice>;
	return { villages, natures, tints };
}

/** The items and everything they depend on, each once, dependencies first. */
export async function resolveItems(config: Config, root: string, names: string[]): Promise<RegistryItem[]> {
	const ordered: RegistryItem[] = [];
	const seen = new Map<string, Promise<void>>();
	const visit = (nameOrUrl: string): Promise<void> => {
		const name = nameOrUrl.replace(/^.*\//, "").replace(/\.json$/, "");
		if (!seen.has(name))
			seen.set(
				name,
				(async () => {
					const item = await loadItem(config, root, name);
					for (const dependency of item.registryDependencies ?? []) await visit(dependency);
					ordered.push(item);
				})(),
			);
		return seen.get(name)!;
	};
	for (const name of names) await visit(name);
	return ordered;
}
