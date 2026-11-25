import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "filter-bar",
	title: "Filter bar",
	family: "listings",
	category: "search",
	status: "beta",
	added: "2026-11-25",
	summary: "Facets from the content above a list: chips with counts, a price range, 'at least' numbers, words, a sort and a reset, all in the address.",
	useWhen: "Over listing-cards, when there are enough listings (eight or more) to want to narrow them; a filtered list is a link to send.",
	avoidWhen: "A few listings, or one kind of thing: listing-cards alone, or search-hero's three fields, are enough.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 10, maxWords: 80 },
	components: ["chip", "slider", "number-field", "select", "input", "button"],
	pairsWith: ["listing-cards", "search-hero"],
} as const satisfies BlockMeta;
