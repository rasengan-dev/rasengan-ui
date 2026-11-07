/**
 * Keeps contract.ts in step with contract.css and the built-in villages (RFC-0006, "The contract, written down"):
 * a token a village sets and the contract does not list, or one the contract says has a default and has none, fails.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { contract, requiredTokens, type TokenSpec } from "./contract.ts";
import { declarations, parseVillage } from "./contrast.ts";

const src = import.meta.dirname;
const read = (path: string) => readFileSync(join(src, path), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const spec = (token: string): TokenSpec | undefined => (contract as Record<string, TokenSpec>)[token];

const css = read("contract.css");
const defaults = declarations(css.match(/:where\(\[data-village\]\)\s*\{([^}]*)\}/)![1]);

const villages = readdirSync(join(src, "villages"))
	.filter((file) => file.endsWith(".css"))
	.map((file) => {
		const name = file.replace(/\.css$/, "");
		const source = read(join("villages", file));
		const nature = source.match(new RegExp(`:where\\(\\[data-village="${name}"\\]:not\\(\\[data-village\\] \\*\\)\\)\\s*\\{([^}]*)\\}`));
		return { name, ...parseVillage(name, source), nature: nature ? declarations(nature[1]) : {} };
	});

test("the built-in villages are found", () => {
	assert.deepEqual(villages.map((v) => v.name).sort(), ["iwa", "kiri", "konoha", "kusa"]);
});

test("every token a village sets is in the contract", () => {
	for (const village of villages)
		for (const token of Object.keys({ ...village.light, ...village.dark, ...village.nature }))
			assert.ok(spec(token), `${village.name} sets ${token}, which contract.ts does not list`);
});

test("contract.css gives a value to exactly the tokens marked default", () => {
	for (const token of Object.keys(defaults))
		assert.ok(spec(token)?.default, `contract.css gives ${token} a default; contract.ts should mark it default`);
	for (const [token, s] of Object.entries(contract) as [string, TokenSpec][])
		if (s.default) assert.ok(token in defaults, `contract.ts marks ${token} default, but contract.css gives it no value`);
});

test("every village sets every required token", () => {
	for (const village of villages)
		for (const token of requiredTokens)
			assert.ok(token in village.light || token in village.nature, `${village.name} does not set ${token}, which has no default`);
});

test("no village sets a derived token", () => {
	for (const village of villages)
		for (const token of Object.keys({ ...village.light, ...village.dark }))
			assert.ok(!spec(token)?.derived, `${village.name} sets ${token}, which contract.css derives`);
});

test("a token set under .dark is marked schemes", () => {
	for (const village of villages)
		for (const token of Object.keys(village.dark))
			assert.ok(spec(token)?.schemes, `${village.name} sets ${token} under .dark; contract.ts should mark it schemes`);
});

test("a value multiplied by --tint belongs to a token marked tinted", () => {
	for (const village of villages)
		for (const [token, value] of Object.entries({ ...village.light, ...village.dark }))
			if (value.includes("--tint")) assert.ok(spec(token)?.tinted, `${village.name} tints ${token}; contract.ts should mark it tinted`);
});

test("every token contract.css reads is defined somewhere", () => {
	const defined = new Set([...Object.keys(contract), ...Object.keys(declarations(css)), "--tint"]);
	for (const [, token] of css.matchAll(/var\((--[\w-]+)/g)) assert.ok(defined.has(token), `contract.css reads ${token}, which nothing defines`);
});
