import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { aliasesFor, aliasPrefix, type Config, defaults } from "./config.ts";
import { rewriteImports } from "./install.ts";
import { aliasHelp, aliasToPath, hasAlias } from "./project.ts";

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
	assert.match(help, /init --aliases @acme\/ui/);
});
