import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import type { Config } from "./config.ts";
import { renderFile } from "./install.ts";
import type { RegistryItem } from "./registry.ts";

const root = mkdtempSync(join(tmpdir(), "rasengan-ui-install-"));
after(() => rmSync(root, { recursive: true, force: true }));
mkdirSync(join(root, "src"));

const config = { engine: "base", css: "src/index.css", aliases: { components: "~/parts", ui: "~/parts/ui", lib: "~/shared" } } as Config;
const item = (file: RegistryItem["files"][number]) => ({ name: "rasengan-workshop", type: "registry:component", files: [file] }) as RegistryItem;

// A project whose aliases are its own: `~/parts` is src/parts.
const paths = { compilerOptions: { paths: { "~/*": ["./src/*"] } } };
await import("node:fs").then(({ writeFileSync }) => writeFileSync(join(root, "tsconfig.json"), JSON.stringify(paths)));

test("a component file of a shared item lands in its folder, under the components alias (ADR-0017)", () => {
	const file = { path: "packages/workshop/src/recipe-panel.tsx", type: "registry:component", target: "components/workshop/recipe-panel.tsx", content: 'import { Button } from "@/components/ui/button";\nimport { cn } from "@/lib/utils";\nimport { en } from "./labels";\n' };
	const { path, content } = renderFile(root, config, item(file), file);
	assert.equal(path, "src/parts/workshop/recipe-panel.tsx");
	assert.equal(content, 'import { Button } from "~/parts/ui/button";\nimport { cn } from "~/shared/utils";\nimport { en } from "./labels";\n');
});

test("a component file with no folder to go to is refused", () => {
	const file = { path: "packages/workshop/src/labels.ts", type: "registry:component", content: "" };
	assert.throws(() => renderFile(root, config, item(file), file), /needs a target under components\//);
});
