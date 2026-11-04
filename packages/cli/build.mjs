/**
 * Builds the published CLI: one ESM file, dist/index.js. @rasengan-ui/villages is a workspace package that exports
 * its TypeScript source, so it is bundled in; the npm dependencies stay external and are installed with the CLI.
 */
import { readFileSync, rmSync } from "node:fs";
import { build } from "esbuild";

const { dependencies } = JSON.parse(readFileSync(new URL("package.json", import.meta.url), "utf8"));

rmSync(new URL("dist", import.meta.url), { recursive: true, force: true });

await build({
	entryPoints: ["src/index.ts"],
	outfile: "dist/index.js",
	bundle: true,
	platform: "node",
	format: "esm",
	target: "node20.18",
	external: Object.keys(dependencies).flatMap((name) => [name, `${name}/*`]),
	logLevel: "info",
});
