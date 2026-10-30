import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { merge } from "node-diff3";
import type { Config } from "./config.ts";
import { hash, type Lock, readBase, readLock, renderFile } from "./install.ts";
import { loadItem, type RegistryItem } from "./registry.ts";

/**
 * Where an installed file stands, from three versions: the base (as installed, hash in the lock),
 * the local file, and what the registry has now.
 */
export type State =
	| "current" // nobody changed it
	| "edited" // you changed it; the registry didn't
	| "behind" // the registry changed it; you didn't
	| "diverged" // both changed it
	| "deleted" // you deleted it
	| "new" // the registry added it to the item
	| "removed"; // the registry dropped it from the item

export const stateLabels: Record<State, string> = {
	current: "up to date",
	edited: "edited by you",
	behind: "update available",
	diverged: "edited by you, update available",
	deleted: "deleted by you",
	new: "new in the registry",
	removed: "no longer in the registry",
};

export interface FileState {
	item: string;
	path: string;
	state: State;
	base?: string;
	local?: string;
	upstream?: string;
}

/** The items to look at: the ones named (they must be installed), or every installed one. */
export function installedItems(lock: Lock, names: string[]): string[] {
	const installed = Object.keys(lock.items);
	const missing = names.filter((name) => !installed.includes(name));
	if (missing.length) throw new Error(`Not installed: ${missing.join(", ")}. \`rasengan-ui add ${missing.join(" ")}\` installs ${missing.length > 1 ? "them" : "it"}.`);
	return names.length ? names : installed;
}

/** Each file of the items, with its state and its three versions; also the items as the registry has them now. */
export async function fileStates(root: string, config: Config, names: string[] = []): Promise<{ files: FileState[]; items: RegistryItem[] }> {
	const lock = readLock(root);
	const items = await Promise.all(installedItems(lock, names).map((name) => loadItem(config, root, name)));
	const files: FileState[] = [];
	for (const item of items) {
		const installed = lock.items[item.name]?.files ?? {};
		const seen = new Set<string>();
		for (const file of item.files) {
			const { path, content: upstream } = renderFile(root, config, item, file);
			seen.add(path);
			const installedHash = installed[path];
			const absolute = join(root, path);
			const local = existsSync(absolute) ? readFileSync(absolute, "utf8") : undefined;
			const base = readBase(root, path);
			let state: State;
			if (!installedHash) state = "new";
			else if (local === undefined) state = "deleted";
			else {
				const edited = hash(local) !== installedHash;
				const moved = hash(upstream) !== installedHash;
				state = local === upstream ? "current" : edited && moved ? "diverged" : edited ? "edited" : moved ? "behind" : "current";
			}
			files.push({ item: item.name, path, state, base, local, upstream });
		}
		for (const path of Object.keys(installed)) if (!seen.has(path)) files.push({ item: item.name, path, state: "removed", base: readBase(root, path) });
	}
	return { files, items };
}

/**
 * Merges the registry's changes into a file you edited, line by line. Where both changed the same
 * lines, the result keeps both between conflict markers, as git does.
 */
export function mergeFile(local: string, base: string, upstream: string): { content: string; conflicts: number } {
	const split = (text: string) => text.split("\n");
	const { result } = merge(split(local), split(base), split(upstream), { label: { a: "yours", o: "installed", b: "registry" } }) as { conflict: boolean; result: string[] };
	return { content: result.join("\n"), conflicts: result.filter((line) => line.startsWith("<<<<<<< ")).length };
}
