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
	aliases: { components: string; ui: string; lib: string };
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

export function readConfig(root: string): Config {
	const file = join(root, configFile);
	if (!existsSync(file)) throw new Error(`No ${configFile} here. Run \`rasengan-ui init\` first.`);
	const config = JSON.parse(readFileSync(file, "utf8")) as Partial<Config>;
	return { ...defaults, ...config, aliases: { ...defaults.aliases, ...config.aliases } } as Config;
}

export function writeConfig(root: string, config: Config) {
	writeFileSync(join(root, configFile), `${JSON.stringify(config, null, 2)}\n`);
}
