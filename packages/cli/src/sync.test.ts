import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import type { Config } from "./config.ts";
import { hasConflictMarkers, readLock, writeItems } from "./install.ts";
import { resolveItems } from "./registry.ts";
import { fileStates } from "./sync.ts";
import { update } from "./commands/sync.ts";

// A project and a registry folder next to it: the registry "releases" by rewriting its items.
const dir = mkdtempSync(join(tmpdir(), "rasengan-ui-sync-"));
after(() => rmSync(dir, { recursive: true, force: true }));
const root = join(dir, "app");
const registry = join(dir, "registry");
mkdirSync(join(root, "src"), { recursive: true });
mkdirSync(join(registry, "base"), { recursive: true });
writeFileSync(join(root, "package.json"), "{}");
const config = { engine: "base", css: "src/index.css", registry: "../registry", aliases: { components: "@/components", ui: "@/components/ui", lib: "@/lib" } } as Config;
writeFileSync(join(root, "rasengan-ui.json"), JSON.stringify(config));

const release = (name: string, files: Record<string, string>, registryDependencies: string[] = []) =>
	writeFileSync(
		join(registry, "base", `${name}.json`),
		JSON.stringify({ name, type: "registry:ui", registryDependencies, files: Object.entries(files).map(([path, content]) => ({ path, type: "registry:ui", content })) }),
	);
const read = (path: string) => readFileSync(join(root, path), "utf8");
const write = (path: string, content: string) => writeFileSync(join(root, path), content);
const add = async (names: string[], options: { overwrite?: boolean } = {}) => writeItems(root, config, await resolveItems(config, root, names), { ...options, named: names });
const states = async () => Object.fromEntries((await fileStates(root, config)).files.map((file) => [file.path, file.state]));
/** `rasengan-ui update`, quietly; returns the exit code it sets. */
async function runUpdate() {
	const log = console.log;
	const cwd = process.cwd();
	console.log = () => {};
	process.chdir(root);
	try {
		await update(["--skip-install"]);
		return process.exitCode ?? 0;
	} finally {
		console.log = log;
		process.chdir(cwd);
		process.exitCode = 0;
	}
}

// Lines far enough apart that diff3 reads changes to them as separate hunks.
const lines = (changes: Record<number, string> = {}) => Array.from({ length: 20 }, (_, i) => changes[i] ?? `line ${i}`).join("\n") + "\n";
const button = "src/components/ui/button.tsx";
const shared = "src/components/ui/shared.tsx";

test("conflict markers are recognised, git's or ours", () => {
	assert.ok(hasConflictMarkers("a\n<<<<<<< yours\nb\n=======\nc\n>>>>>>> registry\nd\n"));
	assert.ok(hasConflictMarkers("<<<<<<< HEAD\nb\n=======\nc\n>>>>>>> main\n"));
	assert.ok(!hasConflictMarkers("a\n=======\nb\n"), "a lone separator is not a conflict");
	assert.ok(!hasConflictMarkers("const arrow = '<<<<<<<';\n"));
});

test("a conflicted merge stays flagged until resolved, and update leaves it alone", async () => {
	release("shared", { "shared.tsx": "shared v1\n" });
	release("button", { "button.tsx": lines() }, ["shared"]);
	await add(["button"]);
	write(button, lines({ 2: "mine", 15: "my other edit" }));
	release("button", { "button.tsx": lines({ 2: "theirs", 10: "their new line" }) }, ["shared"]);

	assert.equal(await runUpdate(), 1, "conflicts fail the update");
	assert.ok(hasConflictMarkers(read(button)));
	assert.equal((await states())[button], "conflicted");
	assert.ok(readLock(root).items.button.merging?.[button], "the lock remembers the conflicted merge");

	const withMarkers = read(button);
	assert.equal(await runUpdate(), 1, "unresolved markers still fail the update");
	assert.equal(read(button), withMarkers, "and the file is left as it is");
});

test("putting your version back merges the registry's changes again", async () => {
	write(button, lines({ 2: "mine", 15: "my other edit" })); // as `git checkout -- button.tsx` would
	const restored = (await fileStates(root, config)).files.find((file) => file.path === button);
	assert.equal(restored?.state, "diverged");
	assert.equal(restored?.restored, true);

	assert.equal(await runUpdate(), 1, "the same conflict, again");
	const merged = read(button);
	assert.match(merged, /their new line/, "the registry's clean change is back");
	assert.match(merged, /my other edit/);
});

test("resolving the markers ends the merge: your resolution is the file, the registry's version its base", async () => {
	write(button, read(button).replace(/<<<<<<< yours\nmine\n=======\ntheirs\n>>>>>>> registry\n/, "mine and theirs\n"));
	assert.equal((await states())[button], "edited");
	assert.equal(await runUpdate(), 0);
	assert.equal(readLock(root).items.button.merging, undefined, "the record is gone");
	assert.ok(!existsSync(join(root, ".rasengan-ui/merge", button)), "and its base copy");
	assert.equal((await states())[button], "edited");
});

test("re-adding a component leaves out the files you deleted from what it shares", async () => {
	unlinkSync(join(root, shared));
	const written = await add(["button"]);
	assert.equal(written.find((file) => file.path === shared)?.outcome, "left-out");
	assert.equal(written.find((file) => file.path === button)?.outcome, "kept");
	assert.ok(!existsSync(join(root, shared)));
	assert.ok(readLock(root).items.shared.files[shared], "the lock still knows it, as deleted");
});

test("a deleted file comes back when you name its item, or a new component needs it", async () => {
	release("card", { "card.tsx": "card\n" }, ["shared"]);
	assert.equal((await add(["card"])).find((file) => file.path === shared)?.outcome, "created");
	unlinkSync(join(root, shared));
	assert.equal((await add(["shared"])).find((file) => file.path === shared)?.outcome, "created");
	unlinkSync(join(root, shared));
	assert.equal((await add(["button"], { overwrite: true })).find((file) => file.path === shared)?.outcome, "created");
});
