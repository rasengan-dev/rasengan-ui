import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "offer-deal",
	title: "Offer, deal",
	family: "storefront",
	category: "offers",
	status: "beta",
	added: "2026-11-08",
	summary: "One offer beside a photo: what it includes, the new price and the usual one struck through, and a countdown to its end.",
	useWhen: "A deal of the day, a seasonal menu, a combo or a promotion with an end date.",
	avoidWhen: "Several offers at once, or prices that never change: menu-cards.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["badge", "button", "number-roll"],
	pairsWith: ["menu-cards", "order-banner"],
} as const satisfies BlockMeta;
