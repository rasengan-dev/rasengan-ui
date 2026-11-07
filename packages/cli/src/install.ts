import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import type { Config } from "./config.ts";
import { aliasToPath } from "./project.ts";
import type { RegistryItem } from "./registry.ts";

// ---- Where files go and what they import ------------------------------------------

/**
 * A file's place in the project, as the shadcn CLI would put it: ui and lib files in their alias
 * folders, the stylesheets (`styles/…`) next to the project's CSS, other targets from the root.
 */
export function targetPath(root: string, config: Config, item: RegistryItem, file: RegistryItem["files"][number]): string {
	if (file.type === "registry:ui") return join(aliasToPath(root, config.aliases.ui), basename(file.target ?? file.path));
	if (file.type === "registry:lib" || file.type === "registry:hook") return join(aliasToPath(root, config.aliases.lib), basename(file.target ?? file.path));
	if (file.type === "registry:example") return join(aliasToPath(root, config.aliases.components), "examples", file.target ? basename(file.target) : `${item.name}${extname(file.path)}`);
	if (!file.target) throw new Error(`${item.name}: ${file.path} has no target.`);
	if (file.target.startsWith("styles/")) return join(dirname(config.css), file.target.slice("styles/".length));
	return file.target.replace(/^~\//, "");
}

/** The registry writes `@/components/ui/…` and `@/lib/…`; the project may use other aliases. */
export function rewriteImports(content: string, config: Config): string {
	const prefixes: [string, string][] = [
		["@/components/ui", config.aliases.ui],
		["@/components", config.aliases.components],
		["@/lib", config.aliases.lib],
	];
	return content.replace(/(from\s+|import\s*\(\s*|import\s+)(["'])(@\/(?:components|lib)[^"']*)\2/g, (match, keyword, quote, specifier: string) => {
		const [prefix, alias] = prefixes.find(([prefix]) => specifier === prefix || specifier.startsWith(`${prefix}/`)) ?? [];
		return prefix && alias ? `${keyword}${quote}${alias}${specifier.slice(prefix.length)}${quote}` : match;
	});
}

/** A registry file as the project gets it: its path from the root, and its content with the project's aliases. */
export function renderFile(root: string, config: Config, item: RegistryItem, file: RegistryItem["files"][number]) {
	const path = targetPath(root, config, item, file).split("\\").join("/");
	const content = file.type === "registry:ui" || file.type === "registry:lib" || file.type === "registry:example" ? rewriteImports(file.content, config) : file.content;
	return { path, content };
}

// ---- The lockfile --------------------------------------------------------------------

export const lockFile = "rasengan-ui.lock";
/** The files as installed, before any local edit: what `diff` and `update` compare and merge against. */
export const baseDir = ".rasengan-ui/base";
/** The files as they were before a merge that left conflicts: what a file put back to its old version merges against again. */
export const mergeBaseDir = ".rasengan-ui/merge";

export interface LockEntry {
	/** Each file the item installed (path from the root) → hash of its content at install. */
	files: Record<string, string>;
	/**
	 * Where the item came from, when not the project's registry: `generated` for a village made by
	 * `village create` (RFC-0006), or the URL or file of an item added with `village add <url>`.
	 */
	source?: string;
	/**
	 * Files whose last merge left conflicts → the hash of your version before that merge, and of the base it merged
	 * against (its copy in .rasengan-ui/merge). Resolve the markers and the merge is done; put your version back
	 * instead and the next merge starts again from that older base, so the registry's changes aren't lost.
	 */
	merging?: Record<string, { yours: string; base: string }>;
}

export interface Lock {
	lockfileVersion: 1;
	items: Record<string, LockEntry>;
}

export const hash = (content: string) => `sha256-${createHash("sha256").update(content).digest("hex")}`;

export function readLock(root: string): Lock {
	const file = join(root, lockFile);
	return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as Lock) : { lockfileVersion: 1, items: {} };
}

export function writeLock(root: string, lock: Lock) {
	const items = Object.fromEntries(Object.entries(lock.items).sort(([a], [b]) => a.localeCompare(b)));
	writeFileSync(join(root, lockFile), `${JSON.stringify({ ...lock, items }, null, 2)}\n`);
}

/** A file as it was installed (the base of a 3-way merge), if the copy is there. */
export function readBase(root: string, path: string): string | undefined {
	const file = join(root, baseDir, path);
	return existsSync(file) ? readFileSync(file, "utf8") : undefined;
}

/** Writes a file into the project, or its base copy. */
export function writeFile(root: string, path: string, content: string, { base = false } = {}) {
	const target = join(root, ...(base ? [baseDir] : []), path);
	mkdirSync(dirname(target), { recursive: true });
	writeFileSync(target, content);
}

/** Whether a file still has the markers of a conflicted merge (ours, git's or anyone's): `<<<<<<<`, `=======`, `>>>>>>>`. */
export const hasConflictMarkers = (content: string) => /^<{7}(?: .*)?\r?\n[\s\S]*?^={7}\r?\n[\s\S]*?^>{7}(?: |\r?$)/m.test(content);

/**
 * The base a file is compared and merged against. It is the installed version, except when the file is back to your
 * version from before a merge that left conflicts: then the base from before that merge, so the merge happens again.
 */
export function mergeBase(root: string, entry: LockEntry | undefined, path: string, local: string | undefined): { hash?: string; content?: string; restored: boolean } {
	const pending = entry?.merging?.[path];
	if (pending && local !== undefined && hash(local) === pending.yours) {
		const file = join(root, mergeBaseDir, path);
		return { hash: pending.base, content: existsSync(file) ? readFileSync(file, "utf8") : undefined, restored: true };
	}
	return { hash: entry?.files[path], content: readBase(root, path), restored: false };
}

/** Records a merge that left conflicts: your version before it (its hash) and the base it merged against (a copy). */
export function recordConflict(root: string, entry: LockEntry, path: string, yours: string, base: string) {
	if (entry.merging?.[path]?.yours === hash(yours)) return; // merged again from the same place: the record stands
	entry.merging = { ...entry.merging, [path]: { yours: hash(yours), base: hash(base) } };
	writeFile(root, join(mergeBaseDir, path), base);
}

/** Forgets a file's conflicted merge, once it is resolved or the file replaced. */
export function clearConflict(root: string, entry: LockEntry | undefined, path: string) {
	if (!entry?.merging?.[path]) return;
	const { [path]: _, ...rest } = entry.merging;
	if (Object.keys(rest).length) entry.merging = rest;
	else delete entry.merging;
	rmSync(join(root, mergeBaseDir, path), { force: true });
}

/** Which item installed `path`, and the hash it had then. */
export function installedHash(lock: Lock, path: string): string | undefined {
	for (const { files } of Object.values(lock.items)) if (files[path]) return files[path];
}

// ---- Writing --------------------------------------------------------------------------

export type Outcome = "created" | "updated" | "unchanged" | "kept" | "left-out";

export interface Written {
	item: string;
	path: string;
	outcome: Outcome;
}

/** An item's name from a name, a URL or a path (`…/button.json` → `button`). */
export const itemName = (nameOrUrl: string) => nameOrUrl.replace(/^.*\//, "").replace(/\.json$/, "");

/**
 * Writes the items' files. A file the project changed since install is kept (with `overwrite`,
 * replaced); one it never touched follows the registry. The lock and the base copies record what
 * was written.
 *
 * With `named` (the items asked for, as `add` passes them), a file you deleted since install stays
 * deleted, unless its item is one you named or one a newly installed item depends on: re-adding a
 * component doesn't bring back the files you dropped from what it shares with others.
 */
export function writeItems(root: string, config: Config, items: RegistryItem[], { overwrite = false, dryRun = false, named }: { overwrite?: boolean; dryRun?: boolean; named?: string[] } = {}): Written[] {
	const lock = readLock(root);
	const written: Written[] = [];
	const fresh = items.filter((item) => !lock.items[item.name]);
	const needed = new Set([...(named ?? []).map(itemName), ...fresh.flatMap((item) => [item.name, ...(item.registryDependencies ?? []).map(itemName)])]);
	for (const item of items) {
		const entry = lock.items[item.name];
		const files: Record<string, string> = { ...entry?.files };
		for (const file of item.files) {
			const { path, content } = renderFile(root, config, item, file);
			const absolute = join(root, path);
			const current = existsSync(absolute) ? readFileSync(absolute, "utf8") : undefined;
			const deleted = current === undefined && files[path] !== undefined && named !== undefined && !overwrite && !needed.has(item.name);
			const outcome: Outcome = deleted
				? "left-out"
				: current === undefined
					? "created"
					: current === content
						? "unchanged"
						: overwrite || hash(current) === installedHash(lock, path)
							? "updated"
							: "kept";
			written.push({ item: item.name, path, outcome });
			if (outcome === "kept" || outcome === "left-out") continue;
			files[path] = hash(content);
			if (dryRun) continue;
			writeFile(root, path, content);
			writeFile(root, path, content, { base: true });
			clearConflict(root, entry, path);
		}
		lock.items[item.name] = { ...entry, files };
	}
	if (!dryRun) writeLock(root, lock);
	return written;
}
