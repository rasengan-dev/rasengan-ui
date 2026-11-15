import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Recipe } from "@rasengan-ui/villages/engine";

export const configFile = "rasengan-ui.json";

/** rasengan-ui.json (RFC-0002, "CLI"). */
export interface Config {
	$schema?: string;
	engine: "base" | "radix";
	village: string;
	nature: string;
	tint: "village" | "neutral";
	/** The stylesheet that imports Tailwind; the village CSS goes next to it, in rasengan/. */
	css: string;
	/** `blocks` (RFC-0008) is optional: `<components>/blocks` by default. */
	aliases: { components: string; ui: string; lib: string; blocks?: string };
	/** Where the registry is: a URL, or a folder (the site's public/r, for local work). */
	registry: string;
	/** Villages made by `village create` (RFC-0006): each one's recipe, and the engine version that wrote it. */
	villages?: Record<string, { recipe: Recipe; engineVersion: string }>;
}

/** The CLI's own version. From src/ and from the bundle in dist/ alike, package.json is one folder up. */
export const version = (JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as { version: string }).version;

export const defaultRegistry = process.env.RASENGAN_UI_REGISTRY ?? "https://ui.rasengan.dev/r";

export const defaults = {
	engine: "base",
	village: "konoha",
	nature: "katon",
	tint: "village",
	aliases: { components: "@/components", ui: "@/components/ui", lib: "@/lib" },
	registry: defaultRegistry,
} satisfies Partial<Config>;

/**
 * The aliases under one prefix: `@` gives `@/components`, `@/components/ui` and `@/lib`. A package of a workspace,
 * consumed in source by its apps, uses its own name (`@acme/ui`): the apps then resolve its imports through its
 * `exports`, where `@/` would point into the app.
 */
export function aliasesFor(prefix: string): Config["aliases"] {
	const base = prefix.trim().replace(/\/+$/, "");
	if (!base || /\s/.test(base)) throw new Error(`"${prefix}" isn't an import prefix: use \`@\` or a package name such as \`@acme/ui\`.`);
	return { components: `${base}/components`, ui: `${base}/components/ui`, lib: `${base}/lib` };
}

/** The prefix the aliases share (`@/components` → `@`), or undefined when they were set one by one. */
export function aliasPrefix(aliases: Config["aliases"]): string | undefined {
	const prefix = aliases.components.replace(/\/components$/, "");
	const same = aliasesFor(prefix);
	return prefix !== aliases.components && same.ui === aliases.ui && same.lib === aliases.lib ? prefix : undefined;
}

export function readConfig(root: string): Config {
	const file = join(root, configFile);
	if (!existsSync(file)) throw new Error(`No ${configFile} here. Run \`rasengan-ui init\` first.`);
	const config = JSON.parse(readFileSync(file, "utf8")) as Partial<Config>;
	const aliases = { ...defaults.aliases, ...config.aliases };
	return { ...defaults, ...config, aliases: { ...aliases, blocks: aliases.blocks ?? `${aliases.components}/blocks` } } as Config;
}

export function writeConfig(root: string, config: Config) {
	writeFileSync(join(root, configFile), `${JSON.stringify(config, null, 2)}\n`);
}
