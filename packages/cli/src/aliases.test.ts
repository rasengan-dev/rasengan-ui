import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { aliasesFor, aliasPrefix, type Config, defaults } from "./config.ts";
import { rewriteImports } from "./install.ts";
import { aliasHelp, aliasToPath, hasAlias, resolveExport, unexportedFiles } from "./project.ts";

const root = mkdtempSync(join(tmpdir(), "rasengan-ui-aliases-"));
after(() => rmSync(root, { recursive: true, force: true }));

test("one prefix gives the three aliases", () => {
	assert.deepEqual(aliasesFor("@"), defaults.aliases);
	assert.deepEqual(aliasesFor("@acme/ui/"), { components: "@acme/ui/components", ui: "@acme/ui/components/ui", lib: "@acme/ui/lib" });
	assert.throws(() => aliasesFor(" "), /isn't an import prefix/);
	assert.throws(() => aliasesFor("@acme ui"), /isn't an import prefix/);
});

test("the shared prefix is found back, unless the aliases were set one by one", () => {
	assert.equal(aliasPrefix(defaults.aliases), "@");
	assert.equal(aliasPrefix(aliasesFor("@acme/ui")), "@acme/ui");
	assert.equal(aliasPrefix({ components: "~/components", ui: "~/ui", lib: "~/lib" }), undefined);
});

test("a workspace package's own name resolves through its tsconfig paths", () => {
	writeFileSync(join(root, "tsconfig.json"), '{\n\t// a package of a workspace\n\t"compilerOptions": { "paths": { "@acme/ui/*": ["./src/*"] } },\n}\n');
	const aliases = aliasesFor("@acme/ui");
	assert.equal(hasAlias(root, aliases.components), true);
	assert.equal(hasAlias(root, "@/components"), false);
	assert.equal(aliasToPath(root, aliases.ui), join("src", "components", "ui"));
	assert.equal(aliasToPath(root, aliases.lib), join("src", "lib"));
});

test("the registry's @/ imports become the package's own name", () => {
	const config = { aliases: { ...aliasesFor("@acme/ui"), blocks: "@acme/ui/components/blocks" } } as Config;
	const source = 'import { cn } from "@/lib/utils";\nimport { Button } from "@/components/ui/button";\n';
	assert.equal(rewriteImports(source, config), 'import { cn } from "@acme/ui/lib/utils";\nimport { Button } from "@acme/ui/components/ui/button";\n');
});

test("the help names the alias to add", () => {
	assert.match(aliasHelp("@", true), /"@\/\*": \["\.\/src\/\*"\]/);
	assert.match(aliasHelp("@", true), /vite\.config/);
	assert.doesNotMatch(aliasHelp("@", false), /vite\.config/);
	const help = aliasHelp("@acme/ui", false);
	assert.match(help, /"@acme\/ui\/\*": \["\.\/src\/\*"\]/);
	assert.match(help, /"exports"/);
	assert.match(help, /"\.\/lib\/village-scope": "\.\/src\/lib\/village-scope\.tsx"/);
	assert.match(help, /init --aliases @acme\/ui/);
});

test("exports resolve an exact key before the longest pattern", () => {
	const exports = {
		"./lib/village-scope": "./src/lib/village-scope.tsx",
		"./lib/*": "./src/lib/*.ts",
		"./components/ui/*": { import: "./src/components/ui/*.tsx" },
		"./*": "./src/components/ui/*.tsx",
	};
	assert.equal(resolveExport(exports, "./lib/village-scope"), "./src/lib/village-scope.tsx");
	assert.equal(resolveExport(exports, "./lib/utils"), "./src/lib/utils.ts");
	assert.equal(resolveExport(exports, "./components/ui/button"), "./src/components/ui/button.tsx");
	assert.equal(resolveExport(exports, "./button"), "./src/components/ui/button.tsx");
	assert.equal(resolveExport(undefined, "./lib/utils"), undefined);
});

test("doctor lists the package's files its exports don't reach", () => {
	const pkg = mkdtempSync(join(tmpdir(), "rasengan-ui-exports-"));
	after(() => rmSync(pkg, { recursive: true, force: true }));
	writeFileSync(join(pkg, "tsconfig.json"), '{ "compilerOptions": { "paths": { "@acme/ui/*": ["./src/*"] } } }');
	mkdirSync(join(pkg, "src/lib"), { recursive: true });
	mkdirSync(join(pkg, "src/components/ui"), { recursive: true });
	for (const file of ["src/lib/utils.ts", "src/lib/village-scope.tsx", "src/components/ui/button.tsx"]) writeFileSync(join(pkg, file), "");
	const write = (exports: Record<string, string>) => writeFileSync(join(pkg, "package.json"), JSON.stringify({ name: "@acme/ui", exports }));
	const aliases = aliasesFor("@acme/ui");

	write({ "./lib/*": "./src/lib/*.ts", "./components/*": "./src/components/*.tsx" });
	assert.deepEqual(unexportedFiles(pkg, aliases, "@acme/ui"), [
		{ file: "src/lib/village-scope.tsx", line: '"./lib/village-scope": "./src/lib/village-scope.tsx"' },
	]);

	write({ "./lib/village-scope": "./src/lib/village-scope.tsx", "./lib/*": "./src/lib/*.ts", "./components/*": "./src/components/*.tsx" });
	assert.deepEqual(unexportedFiles(pkg, aliases, "@acme/ui"), []);

	// An app's own @/ alias, or another package's name: nothing to export.
	assert.deepEqual(unexportedFiles(pkg, aliases, "@"), []);
	assert.deepEqual(unexportedFiles(pkg, aliases, "@other/ui"), []);
});
