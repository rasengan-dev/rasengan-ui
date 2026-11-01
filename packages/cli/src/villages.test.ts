import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import type { Config } from "./config.ts";
import { readLock } from "./install.ts";
import { GENERATED, localVillages, villageItem, villagePath, writeGenerated } from "./villages.ts";

const root = mkdtempSync(join(tmpdir(), "rasengan-ui-villages-"));
after(() => rmSync(root, { recursive: true, force: true }));
mkdirSync(join(root, "src/styles"), { recursive: true });
const config = { engine: "base", css: "src/styles/index.css", villages: {} } as unknown as Config;
const path = villagePath(config, "acme");
// The two lines the tests change are apart, as in a real village file: diff3, like git, reads adjacent changes as one.
const css = (radius: string) =>
	`/*\n * Acme: Sharp and orange.\n */\n\n[data-nature="acme"] {\n\t--nature-hue: 38;\n}\n\n[data-village="acme"] {\n\t--radius: ${radius};\n\t--border-width: 1px;\n\t--font-body: "Inter";\n\t--control-md: 2.25rem;\n\t--focus-width: 4px;\n}\n`;

test("a generated village is written, recorded and found", () => {
	assert.equal(path, "src/styles/rasengan/villages/acme.css");
	assert.deepEqual(writeGenerated(root, path, "acme", css("0.5rem")), { outcome: "created" });
	assert.equal(readLock(root).items["village-acme"].source, GENERATED);
	const local = localVillages(root, config)["acme"];
	assert.deepEqual(local, { title: "Acme", description: "Sharp and orange.", defaultNature: "acme", natures: ["acme"], source: GENERATED });
});

test("regenerating merges the engine's changes into your edits", () => {
	writeFileSync(join(root, path), css("0.5rem").replace("--focus-width: 4px;", "--focus-width: 5px; /* mine */"));
	const result = writeGenerated(root, path, "acme", css("0.75rem"));
	assert.deepEqual(result, { outcome: "merged", conflicts: 0 });
	const merged = readFileSync(join(root, path), "utf8");
	assert.match(merged, /--radius: 0\.75rem;/);
	assert.match(merged, /--focus-width: 5px; \/\* mine \*\//);
	assert.equal(readFileSync(join(root, ".rasengan-ui/base", path), "utf8"), css("0.75rem"), "the base copy is what the engine wrote");
});

test("an exported village is an item others can add", () => {
	const local = localVillages(root, config)["acme"];
	const item = villageItem(config, "acme", css("0.75rem"), local);
	assert.equal(item.name, "village-acme");
	assert.equal(item.files[0].target, "styles/rasengan/villages/acme.css");
	assert.deepEqual(item.meta?.natures, { acme: { title: "Acme", element: "Brand" } });
});
