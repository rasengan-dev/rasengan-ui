import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToString } from "react-dom/server";

import type { Listing } from "../src/block-fields";
import { listOf, matchesFilters, rangeOf, sortListings, useFilters } from "../src/filters";

/*
 * RFC-0014's filters in the address: the format matches without knowing the facets, and the server sees none, so the
 * prerendered list shows every item.
 */

const listing = (over: Partial<Listing>): Listing => ({
	title: "A flat",
	place: "Bonapriso, Douala",
	period: "month",
	images: [{ src: "/a.svg", alt: "A room", width: 4, height: 3 }],
	href: "/homes/a",
	...over,
});

const flat = listing({ title: "Bright flat with a balcony", kind: "Apartment", status: "To let", price: { amount: 450000, currency: "XAF" }, facts: [{ label: "beds", value: 2 }], tags: ["Furnished"] });
const villa = listing({ title: "Villa by the sea", kind: "Villa", place: "Kribi", price: { amount: 120000, currency: "XAF" }, facts: [{ label: "beds", value: 5 }], rating: { score: 4.9, count: 3 } });

test("words are all found, without case or accents", () => {
	assert.ok(matchesFilters(flat, { q: "BALCONY douala" }));
	assert.ok(matchesFilters(listing({ title: "Café on a corner" }), { q: "cafe" }));
	assert.ok(!matchesFilters(flat, { q: "balcony pool" }));
	assert.ok(matchesFilters(flat, { q: "furnished" }), "tags are searched");
});

test("a choice keeps any of its values, a place by what it contains", () => {
	assert.ok(matchesFilters(flat, { kind: "House,Apartment" }));
	assert.ok(!matchesFilters(villa, { kind: "House,Apartment" }));
	assert.ok(matchesFilters(flat, { place: "Douala" }));
	assert.ok(!matchesFilters(villa, { place: "Douala" }));
});

test("a price range and an 'at least' fact", () => {
	assert.deepEqual(rangeOf("100-"), [100, undefined]);
	assert.deepEqual(rangeOf("-500"), [undefined, 500]);
	assert.ok(matchesFilters(villa, { price: "-200000" }));
	assert.ok(!matchesFilters(flat, { price: "-200000" }));
	assert.ok(matchesFilters(villa, { beds: "3" }));
	assert.ok(!matchesFilters(flat, { beds: "3" }));
	assert.ok(!matchesFilters(listing({}), { beds: "1" }), "a listing without the fact does not pass");
	assert.deepEqual(listOf("a,,b"), ["a", "b"]);
});

test("sorting keeps the content's order unless asked", () => {
	assert.deepEqual(sortListings([flat, villa], undefined), [flat, villa]);
	assert.deepEqual(sortListings([flat, villa], "price-low"), [villa, flat]);
	assert.deepEqual(sortListings([flat, villa], "rating"), [villa, flat]);
});

test("the server sees no filters", () => {
	function Probe() {
		return <span>{Object.keys(useFilters()).length}</span>;
	}
	assert.equal(renderToString(<Probe />), "<span>0</span>");
});
