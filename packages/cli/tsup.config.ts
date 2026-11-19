/**
 * Builds the published CLI: one ESM file, dist/index.js. @rasengan-ui/villages is a workspace package that exports
 * its TypeScript source, so it is bundled in; the npm dependencies stay external and are installed with the CLI.
 */
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	platform: "node",
	target: "node20.18",
	noExternal: [/^@rasengan-ui\//],
	splitting: false,
	clean: true,
});
