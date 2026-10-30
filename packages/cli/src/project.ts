import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

/** The nearest folder above `from` with a package.json: the project the CLI works on. */
export function findRoot(from = process.cwd()): string {
	let dir = resolve(from);
	while (!existsSync(join(dir, "package.json"))) {
		const parent = dirname(dir);
		if (parent === dir) throw new Error(`No package.json in ${from} or above it.`);
		dir = parent;
	}
	return dir;
}

export interface PackageJson {
	name?: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
}

export const readPackageJson = (root: string): PackageJson => JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

/** Every dependency the project declares, dev ones included. */
export function declared(root: string): Set<string> {
	const pkg = readPackageJson(root);
	return new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})]);
}

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

/** From the lockfile in the project or a folder above it (a workspace). */
export function packageManager(root: string): PackageManager {
	for (let dir = root; ; dir = dirname(dir)) {
		if (existsSync(join(dir, "pnpm-lock.yaml"))) return "pnpm";
		if (existsSync(join(dir, "yarn.lock"))) return "yarn";
		if (existsSync(join(dir, "bun.lock")) || existsSync(join(dir, "bun.lockb"))) return "bun";
		if (existsSync(join(dir, "package-lock.json"))) return "npm";
		if (dirname(dir) === dir) return "npm";
	}
}

/** JSON with comments and trailing commas, as tsconfig files are written. */
export function readJsonc<T>(file: string): T {
	const text = readFileSync(file, "utf8")
		.replace(/("(?:\\.|[^"\\])*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (_, string) => string ?? "")
		.replace(/,(\s*[}\]])/g, "$1");
	return JSON.parse(text);
}

interface TsConfig {
	extends?: string;
	compilerOptions?: { baseUrl?: string; paths?: Record<string, string[]> };
}

/**
 * The `paths` of the project's TypeScript config, as absolute folder patterns. Vite projects keep
 * them in tsconfig.app.json; a relative `extends` is followed.
 */
function tsPaths(root: string): Record<string, string> {
	const paths: Record<string, string> = {};
	const visit = (file: string) => {
		if (!existsSync(file)) return;
		const config = readJsonc<TsConfig>(file);
		if (config.extends?.startsWith(".")) visit(resolve(dirname(file), config.extends.endsWith(".json") ? config.extends : `${config.extends}.json`));
		const base = resolve(dirname(file), config.compilerOptions?.baseUrl ?? ".");
		for (const [pattern, [target]] of Object.entries(config.compilerOptions?.paths ?? {})) paths[pattern] = resolve(base, target);
	};
	for (const name of ["tsconfig.json", "tsconfig.app.json", "jsconfig.json"]) visit(join(root, name));
	return paths;
}

/**
 * Where an import alias such as `@/components/ui` points, as a path from the project root.
 * Falls back to `src/` (or the root) for `@/` when the project declares no paths.
 */
export function aliasToPath(root: string, alias: string): string {
	const paths = tsPaths(root);
	const exact = paths[alias];
	if (exact) return relative(root, exact);
	for (const [pattern, target] of Object.entries(paths)) {
		if (!pattern.endsWith("/*")) continue;
		const prefix = pattern.slice(0, -1);
		if (alias.startsWith(prefix)) return relative(root, join(target.slice(0, -1), alias.slice(prefix.length)));
	}
	if (alias.startsWith("@/")) return join(existsSync(join(root, "src")) ? "src" : "", alias.slice(2));
	throw new Error(`Can't tell where "${alias}" points: add it to the paths of tsconfig.json.`);
}

/** A path for messages: relative to the project, with forward slashes. */
export const display = (root: string, file: string) => relative(root, resolve(root, file)).split(sep).join("/");
