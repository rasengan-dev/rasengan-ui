/**
 * Builds the published package (ADR-0016): JavaScript and type declarations in dist/, next to the CSS and JSON files
 * it serves. Inside the workspace nothing reads dist/: the site, the CLI and the scripts import the TypeScript source
 * through the `exports` of package.json; `publishConfig.exports` points the published package at dist/ instead.
 */
import { cpSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
	// One file per entry of `exports`; what they share goes to shared chunks. The built-in recipes (JSON) are inlined.
	entry: {
		index: "src/index.ts",
		contract: "src/contract.ts",
		contrast: "src/contrast.ts",
		fonts: "src/fonts.ts",
		"engine/index": "src/engine/index.ts",
	},
	format: ["esm"],
	// The engine is pure: it runs in Node, in a browser and in a web worker.
	platform: "neutral",
	target: "es2022",
	dts: true,
	splitting: true,
	clean: true,
	// The files served as they are: the contract, the natures, the villages with their recipes, the recipe schema.
	async onSuccess() {
		for (const file of ["contract.css", "natures.css", "engine/recipe.schema.json"]) cpSync(`src/${file}`, `dist/${file}`);
		cpSync("src/villages", "dist/villages", { recursive: true });
	},
});
