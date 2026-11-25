import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "search-hero",
	title: "Search hero",
	family: "listings",
	category: "search",
	status: "beta",
	added: "2026-11-25",
	summary: "A heading over a wide photo and a search panel (what, type, where) that opens the list filtered; popular searches as chips.",
	useWhen: "The opening of a directory or an agency's site: people come to search before they read.",
	avoidWhen: "A handful of listings: listing-cards on its own shows them all.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 10, maxWords: 80 },
	components: ["input", "select", "chip", "button", "field"],
	pairsWith: ["filter-bar", "listing-cards"],
} as const satisfies BlockMeta;
