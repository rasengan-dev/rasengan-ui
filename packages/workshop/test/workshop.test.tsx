import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { parseSources } from "@rasengan-ui/villages/contrast";
import { createVillage, type Recipe } from "@rasengan-ui/villages/engine";
import { en, fr, type WorkshopLabels } from "../src/labels";
import { RecipePanel } from "../src/recipe-panel";
import { Report } from "../src/report";

/*
 * The workshop renders on the server, in English and in French: every row of the panel, and the report of a village
 * the engine made. The worker is not run here: the village comes from the engine directly.
 */

const villages = join(import.meta.dirname, "../../villages/src");
const { villages: _none, ...sources } = parseSources({ contract: readFileSync(join(villages, "contract.css"), "utf8"), natures: readFileSync(join(villages, "natures.css"), "utf8"), villages: {} });

const recipe: Recipe = { name: "acme", title: "Acme", base: "kiri", brand: { color: "#b4470f" } };
const text = (html: string) => html.replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
const rows = (l: WorkshopLabels) => [l.base, l.brandColour, l.neutrals, l.contrast, l.radius, l.borderWidth, l.headingFont, l.bodyFont, l.density, l.depth, l.motion, l.traits];

for (const [language, labels] of Object.entries({ en, fr })) {
	test(`the panel shows its twelve rows (${language})`, () => {
		const html = text(renderToString(<RecipePanel recipe={recipe} onChange={() => {}} labels={labels} />));
		for (const row of rows(labels)) assert.ok(html.includes(`>${row}<`), `"${row}" is missing`);
		assert.ok(html.includes(labels.traitsAsBase("Kiri")), "the traits row does not name the base");
		assert.ok(html.includes('data-village="acme"') || html.includes("data-village=&quot;acme&quot;"), "the name field is missing");
	});

	test(`the report tells what the engine did (${language})`, () => {
		const village = createVillage(recipe, { sources });
		const html = text(renderToString(<Report state={{ village, pending: false }} labels={labels} />));
		assert.equal(village.problems.length, 0);
		for (const expected of [labels.status.accessible, labels.report.brandColour, labels.report.adjustments]) assert.ok(html.includes(expected), `"${expected}" is missing`);
	});
}

test("the name field can be left out", () => {
	const html = renderToString(<RecipePanel recipe={recipe} onChange={() => {}} showName={false} />);
	assert.ok(!html.includes("village-name"));
});

test("the two dictionaries name the same values and reasons", () => {
	assert.deepEqual(Object.keys(fr.values).sort(), Object.keys(en.values).sort());
	assert.deepEqual(Object.keys(fr.report.reasons).sort(), Object.keys(en.report.reasons).sort());
});
