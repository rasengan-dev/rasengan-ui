import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { checkVillages, parseSources, parseVillage } from "../contrast.ts";
import { fixContrast } from "./fix.ts";
import {
	bases,
	builtinRecipes,
	createBaseVillage,
	createVillage,
	foundation,
	options,
	parseColor,
	RECIPE_SCHEMA,
	type Recipe,
	recipeFromLink,
	recipeLink,
	traitOptions,
	validateRecipe,
} from "./index.ts";

const src = join(import.meta.dirname, "..");
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
const parsed = parseSources(files);
const { villages, ...sources } = parsed;
const norm = (value: string | undefined) => value?.replace(/\s+/g, " ").trim();

/** Every token as the cascade leaves it, light and dark, from a village file. */
const effective = (light: Record<string, string>, dark: Record<string, string>) => {
	const l = { ...sources.defaults, ...light };
	const d = { ...l, ...dark };
	const out: Record<string, string | undefined> = {};
	for (const token of new Set([...Object.keys(l), ...Object.keys(d)])) {
		out[`light ${token}`] = norm(l[token]);
		out[`dark ${token}`] = norm(d[token]);
	}
	return out;
};

for (const name of ["konoha", "kiri", "iwa"] as const)
	test(`${name}.recipe.json makes ${name}.css, token for token`, () => {
		const village = createBaseVillage(builtinRecipes[name], { sources });
		assert.deepEqual(village.adjustments, [], "a built-in village needs no fix");
		assert.deepEqual(village.problems, []);
		const actual = villages[name];
		assert.deepEqual(effective(village.light, village.dark), effective(actual.light, actual.dark));
		const nature = files.villages[name].match(/--nature-hue:\s*(\d+)/)![1];
		assert.equal(village.natureHue, Number(nature));
		// And the file it writes says the same.
		const written = parseVillage(name, village.css);
		assert.deepEqual(effective(written.light, written.dark), effective(actual.light, actual.dark));
	});

test("an empty recipe on a base is that base", () => {
	const village = createVillage({ name: "leaf", base: "konoha" }, { sources });
	const konoha = createBaseVillage(builtinRecipes.konoha, { sources });
	assert.deepEqual(village.light, konoha.light);
	assert.deepEqual(village.dark, konoha.dark);
	assert.equal(village.ownNature, false);
	assert.match(village.css, /\[data-village="leaf"\] \{/);
});

test("the same recipe makes the same file", () => {
	const recipe: Recipe = { name: "acme", base: "kiri", brand: { color: "#ff5a1f" }, radius: 0.4, density: "compact" };
	assert.equal(createVillage(recipe, { sources }).css, createVillage(recipe, { sources }).css);
});

test("a brand colour gets a nature of its own, and the village passes every scope", () => {
	const village = createVillage({ name: "acme", base: "konoha", brand: { color: "#ff5a1f" } }, { sources });
	assert.equal(village.ownNature, true);
	assert.match(village.css, /\[data-nature="acme"\] \{\n\t--nature-hue: \d+;/);
	assert.deepEqual(village.problems, []);
	const reparsed = parseSources({ ...files, villages: { acme: village.css } });
	assert.ok(reparsed.natures.acme !== undefined);
	const failing = checkVillages(reparsed).flatMap((s) => s.pairs.filter((p) => !p.pass && p.kind !== "ring").map((p) => `${s.scheme} ${s.nature} ${p.fg}`));
	assert.deepEqual(failing, []);
});

test("a bright brand colour keeps its fill; only its edge darkens", () => {
	const village = createVillage({ name: "gold", base: "konoha", brand: { color: "#f5c518" } }, { sources });
	assert.deepEqual(village.problems, []);
	assert.equal(village.light["--primary-l"], "0.842", "the gold is kept as it is");
	assert.ok(!village.adjustments.some((a) => a.scheme === "light" && a.token === "--primary-l"));
	const onPrimary = village.adjustments.find((a) => a.scheme === "light" && a.token === "--on-primary");
	assert.ok(onPrimary, "dark text on a light gold");
	const edge = village.adjustments.filter((a) => a.scheme === "light" && a.token === "--primary-border-l");
	assert.equal(edge.length, 1, "one adjustment per token, however many steps it took");
	assert.ok(Number(edge[0].to) < 0.7, "the edge of what the gold fills darkens to hold 3:1 on the page");
	assert.equal(village.light["--status-l"], "0.52", "success and info keep Konoha's strength, not the gold's");
});

test("an exact brand colour that cannot pass is refused, not moved", () => {
	// Neither white nor dark text reaches 4.5:1 on this red as it is.
	const village = createVillage({ name: "brick", base: "konoha", brand: { color: "oklch(0.6 0.2 25)", exact: true } }, { sources });
	assert.ok(village.problems.some((p) => p.scheme === "light" && p.pair.startsWith("--primary-foreground")));
	assert.ok(!village.adjustments.some((a) => a.scheme === "light" && a.token === "--primary-l"));
	const free = createVillage({ name: "brick", base: "konoha", brand: { color: "oklch(0.6 0.2 25)" } }, { sources });
	assert.deepEqual(free.problems, []);
	assert.ok(free.adjustments.some((a) => a.scheme === "light" && a.token === "--primary-l"), "without exact, it moves as little as it must");
});

test("a grey that fails is darkened until it passes, and the move is reported", () => {
	const made = foundation(builtinRecipes.konoha, sources.natures);
	const draft = { name: "pale", light: { ...made.light, "--muted-foreground": "oklch(0.6 calc(0.014 * var(--tint, 1)) 60)" }, dark: { ...made.dark } };
	const { adjustments, problems } = fixContrast(draft, { base: sources, natures: sources.natures, pinned: { light: new Set(), dark: new Set() } });
	assert.deepEqual(problems, []);
	const moved = adjustments.find((a) => a.token === "--muted-foreground")!;
	assert.equal(moved.scheme, "light");
	assert.ok(Number(moved.to.match(/oklch\(([\d.]+)/)![1]) < 0.6);
	assert.equal(draft.dark["--muted-foreground"], made.dark["--muted-foreground"], "the dark scheme keeps its own grey");
});

test("chroma 0 writes plain greys", () => {
	const village = createVillage({ name: "pale", base: "kiri", neutrals: { chroma: 0 } }, { sources });
	assert.deepEqual(village.problems, []);
	assert.ok(!/calc\(0 \*/.test(village.css));
	assert.match(village.light["--foreground"], /^oklch\(0\.3 0 245\)$/);
});

test("a pinned override is never moved", () => {
	const village = createVillage({ name: "faint", base: "konoha", overrides: { light: { "--muted-foreground": "oklch(0.75 0 0)" } } }, { sources });
	assert.equal(village.light["--muted-foreground"], "oklch(0.75 0 0)");
	assert.ok(village.problems.some((p) => p.pair.startsWith("--muted-foreground")));
});

test("a knob replaces the base's hand-tuned value for the tokens it makes", () => {
	const kept = createVillage({ name: "pine", base: "konoha", radius: 0.2 }, { sources });
	assert.equal(kept.dark["--control-border"], "oklch(0.54 calc(0.012 * var(--tint, 1)) 65)", "radius does not touch the greys");
	const replaced = createVillage({ name: "pine", base: "konoha", neutrals: { hue: 200 } }, { sources });
	assert.notEqual(replaced.dark["--control-border"], "oklch(0.54 calc(0.012 * var(--tint, 1)) 65)");
	assert.ok(replaced.notes.some((n) => n.includes("--control-border")));
	assert.match(replaced.light["--foreground"], / 185\)$/, "the ink hue keeps Konoha's offset from the surface hue");
	const denser = createVillage({ name: "fog", base: "kiri", density: "compact" }, { sources });
	assert.equal(denser.light["--input-px"], undefined, "Kiri's input padding was a share of its own control padding");
	assert.equal(denser.light["--focus-width"], "4px", "what density does not make stays");
});

test("traits move a village towards another one", () => {
	const village = createVillage({ name: "slate", base: "konoha", traits: { edges: "ink", tabs: "bar", labels: "mono-capitals" } }, { sources });
	assert.equal(village.light["--border"], "var(--foreground)");
	assert.equal(village.light["--tab-active"], "var(--foreground)");
	assert.equal(village.light["--control-case"], "uppercase");
	assert.deepEqual(village.problems, []);
});

test("unknown fonts are noted, not refused", () => {
	const village = createVillage({ name: "brand", base: "konoha", fonts: { body: "Acme Sans" } }, { sources });
	assert.equal(village.light["--font-body"], '"Acme Sans", ui-sans-serif, system-ui, sans-serif');
	assert.ok(village.notes.some((n) => n.includes("Acme Sans")));
});

test("recipes are validated", () => {
	assert.deepEqual(validateRecipe({ name: "acme", base: "kiri", radius: 0.3 }), []);
	const errors = validateRecipe({ name: "Acme!", base: "suna", radius: 2, brand: { hue: 10, color: "#fff" }, traits: { tabs: "pills" }, overrides: { light: { "--success": "red", "--nope": "1px" } } });
	for (const fragment of ['"name"', '"base"', '"radius"', '"brand" takes one', '"traits.tabs"', "--success is derived", "--nope is not a token"])
		assert.ok(errors.some((e) => e.includes(fragment)), `expected an error about ${fragment}:\n${errors.join("\n")}`);
	assert.throws(() => createVillage({ name: "katon" }, { sources }), /already a nature/);
	assert.throws(() => createVillage({ name: "konoha" }, { sources }), /built-in village/);
});

test("the JSON schema offers what the engine takes", () => {
	const schema = JSON.parse(readFileSync(join(import.meta.dirname, "recipe.schema.json"), "utf8"));
	assert.deepEqual(schema.properties.base.enum, [...bases]);
	for (const [knob, values] of Object.entries(options)) assert.deepEqual(schema.properties[knob].enum, [...values], knob);
	for (const [trait, values] of Object.entries(traitOptions)) assert.deepEqual(schema.properties.traits.properties[trait].enum, [...values], trait);
	assert.equal(schema.$id, RECIPE_SCHEMA);
});

test("a recipe goes into a link and comes back", () => {
	const recipe: Recipe = { $schema: RECIPE_SCHEMA, name: "acme", title: "Àcme", base: "kiri", brand: { color: "#ff5a1f" }, traits: { tabs: "bar" } };
	const link = recipeLink(recipe);
	assert.match(link, /^https:\/\/ui\.rasengan\.dev\/villages\/create#r=[\w-]+$/);
	const { $schema, ...rest } = recipe;
	assert.deepEqual(recipeFromLink(link), rest);
	assert.equal(recipeFromLink("https://ui.rasengan.dev/villages/create"), undefined);
	assert.throws(() => recipeFromLink("https://ui.rasengan.dev/villages/create#r=@@@"));
});

test("colours parse from hex, rgb and oklch", () => {
	const white = parseColor("#ffffff")!;
	assert.ok(Math.abs(white.l - 1) < 1e-3 && white.c < 1e-3);
	const red = parseColor("rgb(255 0 0)")!;
	assert.ok(Math.abs(red.l - 0.628) < 2e-3 && Math.abs(red.h - 29.2) < 0.5);
	assert.deepEqual(parseColor("oklch(0.66 0.2 38)"), { l: 0.66, c: 0.2, h: 38 });
	assert.equal(parseColor("tomato"), undefined);
});
