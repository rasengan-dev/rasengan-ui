/**
 * Builds the published package (ADR-0016): JavaScript and type declarations in dist/, next to the CSS and JSON files
 * it serves. Inside the workspace nothing reads dist/: the site, the CLI and the scripts import the TypeScript source
 * through the `exports` of package.json; `publishConfig.exports` points the published package at dist/ instead.
 */
import { cpSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Options } from "tsup";

/** `import css from "./x.css?raw"` (sources.ts): the file as a string, as Vite does in the workspace. */
const raw: NonNullable<Options["esbuildPlugins"]>[number] = {
	name: "raw",
	setup(build) {
		// The path keeps its `?raw`, so tsup's own CSS handling (which matches on `.css`) leaves it alone.
		build.onResolve({ filter: /\?raw$/ }, (args) => ({ path: resolve(args.resolveDir, args.path), namespace: "raw" }));
		build.onLoad({ filter: /.*/, namespace: "raw" }, (args) => ({ contents: readFileSync(args.path.slice(0, -"?raw".length), "utf8"), loader: "text" }));
	},
};

export default defineConfig({
	// One file per entry of `exports`; what they share goes to shared chunks. The built-in recipes (JSON) are inlined.
	entry: {
		index: "src/index.ts",
		contract: "src/contract.ts",
		contrast: "src/contrast.ts",
		fonts: "src/fonts.ts",
		sources: "src/sources.ts",
		"engine/index": "src/engine/index.ts",
	},
	format: ["esm"],
	// The engine is pure: it runs in Node, in a browser and in a web worker.
	platform: "neutral",
	target: "es2022",
	dts: true,
	splitting: true,
	clean: true,
	esbuildPlugins: [raw],
	// The files served as they are: the contract, the natures, the villages with their recipes, the recipe schema.
	async onSuccess() {
		for (const file of ["contract.css", "natures.css", "engine/recipe.schema.json"]) cpSync(`src/${file}`, `dist/${file}`);
		cpSync("src/villages", "dist/villages", { recursive: true });
	},
});
