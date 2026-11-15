import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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

/** Whether the project's TypeScript paths cover an alias, so the bundler and the editor resolve it. */
export function hasAlias(root: string, alias: string): boolean {
	return Object.keys(tsPaths(root)).some((pattern) => pattern === alias || (pattern.endsWith("/*") && alias.startsWith(pattern.slice(0, -1))));
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

/**
 * What to add when the project's TypeScript paths don't cover the aliases. `@` is an app's own alias (Vite also needs
 * it in its config); any other prefix is a package's own name, which its apps reach through its `exports`.
 */
export function aliasHelp(prefix: string, vite: boolean): string {
	if (prefix === "@")
		return [
			`The components import \`@/components/…\` and \`@/lib/…\`, and this project has no \`@/\` alias yet. Add it to ${vite ? "tsconfig.app.json and tsconfig.json" : "tsconfig.json"}:`,
			'  "compilerOptions": { "paths": { "@/*": ["./src/*"] } }',
			...(vite ? ["and to vite.config, with `import path from \"node:path\"`:", '  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } }'] : []),
			"then run `rasengan-ui init` again.",
		].join("\n");
	return [
		`The components will import \`${prefix}/components/…\` and \`${prefix}/lib/…\`, and no path in tsconfig.json covers them yet. Add:`,
		`  "compilerOptions": { "paths": { "${prefix}/*": ["./src/*"] } }`,
		`For the apps that use this package, its package.json exports these folders. A pattern takes one extension, so each`,
		`.tsx file of lib/ gets its own line (\`rasengan-ui doctor\` lists any that is missing):`,
		`  "exports": {`,
		`    "./lib/village-scope": "./src/lib/village-scope.tsx",`,
		`    "./lib/field-context": "./src/lib/field-context.tsx",`,
		`    "./lib/*": "./src/lib/*.ts",`,
		`    "./components/*": "./src/components/*.tsx"`,
		`  }`,
		`then run \`rasengan-ui init --aliases ${prefix}\` again.`,
	].join("\n");
}

/**
 * Where a package's `exports` send a subpath (`./lib/utils`): an exact key first, then the `*` pattern with the
 * longest prefix, as Node and bundlers do. Only string targets and the `import` or `default` condition are read.
 */
export function resolveExport(exports: unknown, subpath: string): string | undefined {
	if (typeof exports !== "object" || exports === null) return undefined;
	const map = exports as Record<string, unknown>;
	const target = (value: unknown): string | undefined => {
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return target(value[0]);
		if (value && typeof value === "object") {
			const conditions = value as Record<string, unknown>;
			return target(conditions.import ?? conditions.default);
		}
		return undefined;
	};
	if (subpath in map) return target(map[subpath]);
	const [key] = Object.keys(map)
		.filter((pattern) => {
			const star = pattern.indexOf("*");
			return star >= 0 && subpath.startsWith(pattern.slice(0, star)) && subpath.endsWith(pattern.slice(star + 1)) && subpath.length >= pattern.length - 1;
		})
		.sort((a, b) => b.indexOf("*") - a.indexOf("*"));
	if (!key) return undefined;
	const star = key.indexOf("*");
	return target(map[key])?.replace("*", subpath.slice(star, subpath.length - (key.length - star - 1)));
}

/**
 * When the aliases are the package's own name (`init --aliases @acme/ui`), the files under them that its `exports` don't
 * reach: an app importing the package can't resolve their imports. Each comes with the line to add.
 */
export function unexportedFiles(root: string, aliases: { components: string; lib: string }, prefix: string | undefined): { file: string; line: string }[] {
	const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as { name?: string; exports?: unknown };
	if (!prefix || prefix !== pkg.name) return [];
	const missing: { file: string; line: string }[] = [];
	const walk = (dir: string, alias: string) => {
		if (!existsSync(join(root, dir))) return;
		for (const entry of readdirSync(join(root, dir))) {
			const file = join(dir, entry);
			if (statSync(join(root, file)).isDirectory()) walk(file, `${alias}/${entry}`);
			else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) {
				const subpath = `.${alias.slice(prefix.length)}/${entry.replace(/\.tsx?$/, "")}`;
				const target = resolveExport(pkg.exports, subpath);
				const wanted = `./${file.split(sep).join("/")}`;
				if (target !== wanted) missing.push({ file: display(root, file), line: `"${subpath}": "${wanted}"` });
			}
		}
	};
	walk(aliasToPath(root, aliases.lib), aliases.lib);
	walk(aliasToPath(root, aliases.components), aliases.components);
	return missing;
}

/** A path for messages: relative to the project, with forward slashes. */
export const display = (root: string, file: string) => relative(root, resolve(root, file)).split(sep).join("/");
