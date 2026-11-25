"use client";

/*
 * rasengan-blocks (RFC-0014), filters in the address. Installed as `@/lib/filters`.
 *
 * A list's filters live in the page's query (`?q=garden&kind=House,Villa&price=0-500000&beds=2&sort=price-low`), so a
 * shortlist can be sent as a link. search-hero and filter-bar write them; listing-cards reads them and filters in
 * place. On the server and before hydration there are none, so the prerendered page shows every item. The format
 * says how to match without knowing the facets:
 *
 * - `q`: words, all found in the title, kind, place, tags or summary;
 * - `kind`, `status`, `place`, `tags`: values separated by commas, any of which the item's field contains;
 * - `price`: `min-max`, either side left out;
 * - any other key is a fact's label: at least that number (`beds=2`);
 * - `sort`: `price-low`, `price-high` or `rating`; the content's own order otherwise.
 */

import * as React from "react";

import type { Listing } from "./block-fields";

export type Filters = Record<string, string>;
export type ListingSort = "featured" | "price-low" | "price-high" | "rating";

const event = "rasengan-ui:filters";
const empty: Filters = {};
const textKeys = ["kind", "status", "place", "tags"] as const;
const reserved = new Set(["q", "price", "sort", ...textKeys]);

let cache: { search: string; filters: Filters } = { search: "", filters: empty };

/** The filters in the current address, the same object while it has not changed. */
function snapshot(): Filters {
	const search = window.location.search;
	if (search === cache.search) return cache.filters;
	const filters: Filters = {};
	for (const [key, value] of new URLSearchParams(search)) if (value !== "") filters[key] = value;
	cache = { search, filters };
	return filters;
}

function subscribe(listener: () => void) {
	window.addEventListener(event, listener);
	window.addEventListener("popstate", listener);
	return () => {
		window.removeEventListener(event, listener);
		window.removeEventListener("popstate", listener);
	};
}

/**
 * Writes the filters in the address (keys with an empty value are removed; other query keys are kept) without
 * reloading, and tells the blocks that read them.
 */
export function setFilters(next: Filters, keys: string[] = Object.keys(next)) {
	const url = new URL(window.location.href);
	for (const key of keys) {
		const value = next[key];
		if (value) url.searchParams.set(key, value);
		else url.searchParams.delete(key);
	}
	if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
	window.dispatchEvent(new Event(event));
}

/** The page's filters, following the address; none on the server. */
export function useFilters(): Filters {
	return React.useSyncExternalStore(subscribe, snapshot, () => empty);
}

/** A comma-separated filter value as a list. */
export const listOf = (value: string | undefined) => (value ? value.split(",").filter(Boolean) : []);

/** A range filter (`min-max`) as numbers, either side undefined. */
export function rangeOf(value: string | undefined): [number | undefined, number | undefined] {
	if (!value) return [undefined, undefined];
	const [low, high] = value.split("-").map((part) => (part === "" ? undefined : Number(part)));
	return [Number.isFinite(low) ? low : undefined, Number.isFinite(high) ? high : undefined];
}

const folded = (text: string) => text.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Whether a listing passes the filters (`sort` is ignored here). */
export function matchesFilters(listing: Listing, filters: Filters): boolean {
	if (filters.q) {
		const haystack = folded([listing.title, listing.kind, listing.place, listing.summary, ...(listing.tags ?? [])].filter(Boolean).join(" "));
		if (!folded(filters.q).split(/\s+/).filter(Boolean).every((word) => haystack.includes(word))) return false;
	}
	for (const key of textKeys) {
		const wanted = listOf(filters[key]).map(folded);
		if (wanted.length === 0) continue;
		const own = key === "tags" ? (listing.tags ?? []) : [listing[key] ?? ""];
		if (!wanted.some((value) => own.some((field) => folded(field).includes(value)))) return false;
	}
	const [low, high] = rangeOf(filters.price);
	if (low !== undefined || high !== undefined) {
		const amount = listing.price?.amount;
		if (amount === undefined || (low !== undefined && amount < low) || (high !== undefined && amount > high)) return false;
	}
	for (const [key, value] of Object.entries(filters)) {
		if (reserved.has(key)) continue;
		const least = Number(value);
		if (!Number.isFinite(least)) continue;
		const fact = listing.facts?.find((item) => item.label === key);
		if (!fact || fact.value < least) return false;
	}
	return true;
}

/** The listings in the order asked: `featured` keeps the content's. */
export function sortListings(listings: Listing[], sort: string | undefined): Listing[] {
	if (sort === "price-low") return [...listings].sort((a, b) => (a.price?.amount ?? Infinity) - (b.price?.amount ?? Infinity));
	if (sort === "price-high") return [...listings].sort((a, b) => (b.price?.amount ?? -Infinity) - (a.price?.amount ?? -Infinity));
	if (sort === "rating") return [...listings].sort((a, b) => (b.rating?.score ?? 0) - (a.rating?.score ?? 0));
	return listings;
}
