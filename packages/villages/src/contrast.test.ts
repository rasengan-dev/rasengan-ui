import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { checkScope, checkVillages, color, parseSources, ratio, scope } from "./contrast.ts";

const src = import.meta.dirname;
const read = (path: string) => readFileSync(join(src, path), "utf8");
const files = {
	contract: read("contract.css"),
	natures: read("natures.css"),
	villages: Object.fromEntries(
		readdirSync(join(src, "villages"))
			.filter((file) => file.endsWith(".css"))
			.map((file) => [file.replace(/\.css$/, ""), read(join("villages", file))]),
	),
};
const sources = parseSources(files);

test("black on white is 21:1", () => {
	assert.equal(ratio([0, 0, 0], [1, 1, 1]), 21);
});

test("color() resolves var(), calc() with the tint, and translucent mixes", () => {
	const tokens = {
		"--tint": "0",
		"--a": "oklch(0.5 calc(0.1 * var(--tint)) 40)",
		"--b": "color-mix(in oklab, var(--a) 12%, transparent)",
	};
	const a = color(tokens["--a"], tokens);
	assert.ok(Math.abs(a.rgb[0] - a.rgb[1]) < 1e-6 && Math.abs(a.rgb[1] - a.rgb[2]) < 1e-6, "a grey once the tint is 0");
	assert.equal(color(tokens["--b"], tokens).alpha, 0.12);
});

test("every built-in village passes, in every scope", () => {
	const results = checkVillages(sources);
	assert.equal(results.length, 3 * 2 * 6 * 2);
	const failures = results.flatMap((s) =>
		s.pairs.filter((p) => !p.pass && p.kind !== "ring").map((p) => `${s.village} ${s.scheme} ${s.nature}: ${p.fg}`),
	);
	assert.deepEqual(failures, []);
});

test("a muted foreground too light for its page fails", () => {
	const broken = files.villages.konoha.replace(/--muted-foreground: oklch\(0\.5 /, "--muted-foreground: oklch(0.75 ");
	const tokens = scope(parseSources({ ...files, villages: { konoha: broken } }), "konoha", "light", "katon", 1);
	const failed = checkScope(tokens).filter((p) => !p.pass && p.kind !== "ring");
	assert.ok(failed.some((p) => p.fg === "--muted-foreground" && p.on[0] === "--background"));
});

test("Onmyōton makes the primary the village's ink", () => {
	const tokens = scope(sources, "konoha", "light", "onmyoton", 1);
	assert.equal(tokens["--primary"], "var(--foreground)");
});

test("a village file may declare its own nature", () => {
	const acme = `${files.villages.konoha.replaceAll('"konoha"', '"acme"')}\n[data-nature="acme"] {\n\t--nature-hue: 38;\n}\n`;
	const parsed = parseSources({ ...files, villages: { ...files.villages, acme } });
	assert.equal(parsed.natures.acme, 38);
	assert.equal(Object.keys(parsed.natures)[0], "katon", "natures.css keeps its order");
});
