import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "listing-cards",
	title: "Listing cards",
	family: "listings",
	category: "listing",
	status: "beta",
	added: "2026-11-25",
	summary: "Listings as cards (photo, status, kind and place, title, facts, price per period, rating), filtered in place by the address.",
	useWhen: "A directory's or an agency's list: homes, places, rentals, each with its own page; under filter-bar or search-hero.",
	avoidWhen: "Products with variants and a cart: product-grid.",
	layout: { columns: "grid" },
	content: { images: 4, minWords: 30, maxWords: 600 },
	components: ["badge", "rating", "button"],
	pairsWith: ["filter-bar", "search-hero", "listing-detail"],
} as const satisfies BlockMeta;
