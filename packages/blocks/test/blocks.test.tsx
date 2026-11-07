import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import type { ZodTypeAny } from "zod";
import { formatMoney, heading } from "../src/blocks";

/*
 * Every block in registry/blocks: its example parses with its schema, and it renders on the server, its content
 * present in the HTML (nothing waits for JavaScript), its heading at the level asked for.
 */

const root = join(import.meta.dirname, "../../../registry/blocks");
const names = readdirSync(root, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

const load = (name: string, file: string) => import(pathToFileURL(join(root, name, file)).href);

const pascal = (name: string) => name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());

/** Every string in the content: each should reach the HTML. */
function strings(value: unknown, keys: string[] = []): string[] {
	if (typeof value === "string") return keys.at(-1) === "href" || keys.at(-1) === "src" ? [] : [value];
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

for (const name of names) {
	test(`${name}: the example parses with the schema`, async () => {
		const { schema } = (await load(name, "schema.ts")) as { schema: ZodTypeAny };
		const { example } = await load(name, "example.ts");
		const parsed = schema.safeParse(example);
		assert.ok(parsed.success, parsed.success ? "" : parsed.error.message);
	});

	test(`${name}: renders on the server with all its content, at the heading level asked`, async () => {
		const module = await load(name, `${name}.base.tsx`);
		const Block = module[pascal(name)] as ComponentType<{ headingLevel?: 1 | 2 | 3 }>;
		assert.equal(typeof Block, "function", `${name}.base.tsx exports ${pascal(name)}`);
		const { example } = await load(name, "example.ts");

		const html = renderToString(<Block headingLevel={3} />);
		assert.match(html, /<section[^>]*data-block=/);
		assert.match(html, /<h3[^>]*>/);
		assert.doesNotMatch(html, /<h[12][\s>]/);
		const visible = text(html);
		for (const value of strings(example)) assert.ok(visible.includes(value.replace(/\s+/g, " ")), `"${value}" is in the HTML`);
	});
}

test("formatMoney follows the locale", () => {
	assert.equal(formatMoney({ amount: 12, currency: "USD" }, "en-US"), "$12.00");
	assert.match(formatMoney({ amount: 12, currency: "EUR" }, "fr-FR"), /^12,00\s€$/);
});

test("heading gives the tag for a level", () => {
	assert.equal(heading(1), "h1");
	assert.equal(heading(3), "h3");
});
