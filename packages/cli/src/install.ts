import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
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

// ---- The lockfile --------------------------------------------------------------------

export const lockFile = "rasengan-ui.lock";
/** The files as installed, before any local edit: what `diff` and `update` compare and merge against. */
export const baseDir = ".rasengan-ui/base";

export interface Lock {
	lockfileVersion: 1;
	/** Item → each file it installed (path from the root) → hash of its content at install. */
	items: Record<string, { files: Record<string, string> }>;
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

/** Which item installed `path`, and the hash it had then. */
export function installedHash(lock: Lock, path: string): string | undefined {
	for (const { files } of Object.values(lock.items)) if (files[path]) return files[path];
}

// ---- Writing --------------------------------------------------------------------------

export type Outcome = "created" | "updated" | "unchanged" | "kept";

export interface Written {
	item: string;
	path: string;
	outcome: Outcome;
}

/**
 * Writes the items' files. A file the project changed since install is kept (with `overwrite`,
 * replaced); one it never touched follows the registry. The lock and the base copies record what
 * was written.
 */
export function writeItems(root: string, config: Config, items: RegistryItem[], { overwrite = false, dryRun = false } = {}): Written[] {
	const lock = readLock(root);
	const written: Written[] = [];
	for (const item of items) {
		const files: Record<string, string> = { ...lock.items[item.name]?.files };
		for (const file of item.files) {
			const path = targetPath(root, config, item, file).split("\\").join("/");
			const content = file.type === "registry:ui" || file.type === "registry:lib" ? rewriteImports(file.content, config) : file.content;
			const absolute = join(root, path);
			const current = existsSync(absolute) ? readFileSync(absolute, "utf8") : undefined;
			const outcome: Outcome =
				current === undefined ? "created" : current === content ? "unchanged" : overwrite || hash(current) === installedHash(lock, path) ? "updated" : "kept";
			written.push({ item: item.name, path, outcome });
			if (outcome === "kept") continue;
			files[path] = hash(content);
			if (dryRun) continue;
			for (const [target, text] of [
				[absolute, content],
				[join(root, baseDir, path), content],
			]) {
				mkdirSync(dirname(target), { recursive: true });
				writeFileSync(target, text);
			}
		}
		lock.items[item.name] = { files };
	}
	if (!dryRun) writeLock(root, lock);
	return written;
}
