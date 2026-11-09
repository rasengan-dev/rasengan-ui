import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import type { ZodTypeAny } from "zod";
import { familiesOf, formatMoney, heading, type BlockMeta } from "../src/blocks";
import { blockCategories, blockFamilies } from "../../../registry/block-categories";

/*
 * Every block in registry/blocks: its example parses with its schema, and it renders on the server, its text content
 * present in the HTML (nothing waits for JavaScript, closed panels included), its heading at the level asked for.
 */

const root = join(import.meta.dirname, "../../../registry/blocks");
const names = readdirSync(root, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

const load = (name: string, file: string) => import(pathToFileURL(join(root, name, file)).href);

const pascal = (name: string) => name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());

/* Fields that are not shown as text: addresses, codes, icon names, options. */
const notText = new Set(["href", "src", "locale", "currency", "format", "icon", "period", "kind", "value", "day", "open", "close", "timeZone", "message", "to", "date", "endsAt", "size", "method", "store"]);

/* Label sets, of which only the labels in use show (a price's period, "Open now" once the clock is read). */
const labelSets = new Set(["periods", "labels"]);

/** Every string in the content that is shown as text: each should reach the HTML. */
function strings(value: unknown, keys: string[] = []): string[] {
	if (keys.some((key) => labelSets.has(key))) return [];
	if (typeof value === "string") return notText.has(keys.at(-1) ?? "") ? [] : [value];
	if (Array.isArray(value)) return value.flatMap((item) => strings(item, keys));
	if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => strings(item, [...keys, key]));
	return [];
}

const text = (html: string) =>
	html
		.replace(/<[^>]+>/g, "")
		.replace(/&#x27;|&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, "&")
		.replace(/\s+/g, " ");

test("there is at least one block", () => {
	assert.ok(names.length > 0);
});

test("familiesOf lists one family or several", () => {
	assert.deepEqual(familiesOf({ family: "storefront" }), ["storefront"]);
	assert.deepEqual(familiesOf({ family: ["marketing", "storefront"] }), ["marketing", "storefront"]);
});

for (const name of names) {
	test(`${name}: the example parses with the schema`, async () => {
		const { schema } = (await load(name, "schema.ts")) as { schema: ZodTypeAny };
		const { example } = await load(name, "example.ts");
		const parsed = schema.safeParse(example);
		assert.ok(parsed.success, parsed.success ? "" : parsed.error.message);
	});

	test(`${name}: its families exist and each has its category`, async () => {
		const { meta } = (await load(name, "meta.ts")) as { meta: BlockMeta };
		const families = familiesOf(meta);
		assert.ok(families.length > 0);
		assert.equal(new Set(families).size, families.length, "no family twice");
		const category = blockCategories[meta.category as keyof typeof blockCategories];
		assert.ok(category, `category "${meta.category}" is in registry/block-categories.ts`);
		for (const family of families) {
			assert.ok(Object.hasOwn(blockFamilies, family), `family "${family}" exists`);
			assert.ok((category.families as readonly string[]).includes(family), `"${meta.category}" is a ${family} category`);
		}
	});

	test(`${name}: renders on the server with all its content, at the heading level asked`, async () => {
		const module = await load(name, `${name}.base.tsx`);
		const Block = module[pascal(name)] as ComponentType<{ headingLevel?: 1 | 2 | 3 }>;
		assert.equal(typeof Block, "function", `${name}.base.tsx exports ${pascal(name)}`);
		const { example } = await load(name, "example.ts");

		const html = renderToString(<Block headingLevel={3} />);
		assert.match(html, new RegExp(`data-block="${name}"`));
		// A navbar has no heading; a block that has one puts it at the level asked, and nothing above it.
		if (/<h[1-6][\s>]/.test(html)) assert.match(html, /<h3[\s>]/);
		assert.doesNotMatch(html, /<h[12][\s>]/);
		// In the text, or in an attribute (an image's alt, a button's aria-label).
		const visible = text(html);
		const attributes = text(html.replace(/<|>/g, " "));
		for (const value of strings(example)) {
			const wanted = value.replace(/\s+/g, " ");
			assert.ok(visible.includes(wanted) || attributes.includes(wanted), `"${value}" is in the HTML`);
		}
	});
}

test("formatMoney follows the locale", () => {
	assert.equal(formatMoney({ amount: 12, currency: "USD" }, "en-US"), "$12");
	assert.equal(formatMoney({ amount: 12.5, currency: "USD" }, "en-US"), "$12.50");
	assert.match(formatMoney({ amount: 12, currency: "EUR" }, "fr-FR"), /^12\s€$/);
});

test("heading gives the tag for a level", () => {
	assert.equal(heading(1), "h1");
	assert.equal(heading(3), "h3");
});
