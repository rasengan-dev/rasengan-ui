import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "testimonials-carousel",
	title: "Testimonials, carousel",
	family: "marketing",
	category: "testimonials",
	status: "beta",
	added: "2026-11-08",
	summary: "A title and three to ten customer quotes in cards, one to three at a time, with arrows, dots and swipe.",
	useWhen: "Several short quotes from named customers, after the features or the stats.",
	avoidWhen: "One or two quotes: put them in a cta-banner or the hero's note instead.",
	layout: { columns: "carousel" },
	content: { images: 0, minWords: 40, maxWords: 300 },
	components: ["carousel", "card", "avatar"],
	pairsWith: ["pricing-plans", "cta-banner"],
} as const satisfies BlockMeta;
