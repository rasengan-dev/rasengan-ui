import { test } from "node:test";
import assert from "node:assert/strict";

import { award, cartLine, caseSection, customerStory, facet, listing, position, product, project, release, timelineEntry, trustPoint } from "../src/block-fields";

/*
 * RFC-0013's field types, before any block uses them: a typical value parses, and the limits that carry a design choice
 * hold (a project's kinds feed a filter, a case study is plain text, a timeline's dates are years or months).
 */

const cover = { src: "/placeholders/restaurant-room.svg", alt: "A dining room set for dinner", width: 1200, height: 900 };

test("a project parses, with its kinds and results", () => {
	const value = project.parse({
		title: "Akwa Dining Room",
		client: "Le Wouri",
		year: 2026,
		kinds: ["Interior", "Branding"],
		summary: "A restaurant's room and its identity, from the menu to the signs.",
		cover,
		href: "/work/akwa",
		results: [{ label: "Bookings", value: 0.4, format: "percent" }],
	});
	assert.equal(value.kinds.length, 2);
	assert.throws(() => project.parse({ ...value, kinds: [] }), "a project names at least one kind");
	assert.throws(() => project.parse({ ...value, kinds: ["a", "b", "c", "d"] }), "at most three kinds");
});

test("a case section is plain paragraphs", () => {
	assert.ok(caseSection.parse({ kind: "problem", title: "What was wrong", paragraphs: ["Guests could not find the room."] }));
	assert.throws(() => caseSection.parse({ kind: "intro", title: "Hi", paragraphs: ["x"] }), "only the four kinds");
	assert.throws(() => caseSection.parse({ kind: "context", title: "Empty", paragraphs: [] }), "at least one paragraph");
});

test("a release has a date and its lists", () => {
	const value = release.parse({ version: "2.8.0", date: "2026-11-24", title: "Saved views", added: ["Save a filter"], fixed: ["Time zones"] });
	assert.deepEqual(value.fixed, ["Time zones"]);
	assert.throws(() => release.parse({ ...value, date: "24/11/2026" }), "ISO dates only");
});

test("a position, an award, a timeline entry", () => {
	assert.ok(position.parse({ title: "Product designer", team: "Design", place: "Douala or remote", kind: "full-time", href: "/careers/designer" }));
	assert.throws(() => position.parse({ title: "x", team: "x", place: "x", kind: "permanent", href: "/x" }));
	assert.ok(award.parse({ year: 2025, name: "Site of the Day", by: "Awwwards", project: "Akwa" }));
	assert.ok(timelineEntry.parse({ from: "2022-03", to: "now", title: "Design lead", organisation: "Senbon" }));
	assert.ok(timelineEntry.parse({ from: "2019", title: "Opened the studio" }));
	assert.throws(() => timelineEntry.parse({ from: "March 2022", title: "x" }), "years or months only");
});

test("a customer story and a trust point", () => {
	assert.ok(
		customerStory.parse({
			customer: { name: "Kelvo" },
			quote: "We closed the month in two days instead of nine.",
			name: "Mireille K.",
			role: "Finance lead, Kelvo",
			stat: { label: "Days to close", value: 2 },
		}),
	);
	assert.equal(trustPoint.parse({ name: "GDPR" }).icon, "shield");
	assert.throws(() => trustPoint.parse({ name: "SOC 2", status: "pending" }), "certified or in-progress only");
});

// RFC-0014

test("a product parses, with its variants and what is sold out", () => {
	const value = product.parse({
		title: "Arlo side table",
		sku: "ARLO-OAK",
		price: { amount: 85000, currency: "XAF" },
		was: { amount: 98000, currency: "XAF" },
		images: [cover],
		variants: [{ name: "Wood", options: ["Oak", "Walnut"], soldOut: ["Walnut"] }],
		href: "/shop/arlo",
	});
	assert.deepEqual(value.variants?.[0].soldOut, ["Walnut"]);
	assert.throws(() => product.parse({ ...value, images: [] }), "at least one image");
});

test("a listing, a facet and a cart line", () => {
	const home = listing.parse({
		title: "Bonapriso flat",
		place: "Bonapriso, Douala",
		price: { amount: 450000, currency: "XAF" },
		period: "month",
		facts: [{ label: "beds", value: 2 }],
		images: [cover],
		href: "/homes/bonapriso",
	});
	assert.equal(home.period, "month");
	assert.equal(listing.parse({ ...home, period: undefined }).period, "once");
	assert.ok(facet.parse({ key: "beds", label: "Bedrooms", kind: "atLeast" }));
	assert.throws(() => facet.parse({ key: "beds", label: "Bedrooms", kind: "slider" }));
	assert.throws(() => cartLine.parse({ sku: "A", title: "A", price: { amount: 1, currency: "XAF" }, quantity: 0 }), "at least one");
});
