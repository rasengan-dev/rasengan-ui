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
