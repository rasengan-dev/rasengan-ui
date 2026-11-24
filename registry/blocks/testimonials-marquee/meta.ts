import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "testimonials-marquee",
	title: "Testimonials, marquee",
	family: ["marketing", "storefront"],
	category: "testimonials",
	status: "beta",
	added: "2026-11-24",
	summary: "Quotes in three columns that scroll at their own pace (one row on phones), each with a pause button; they stand still with reduced motion.",
	useWhen: "Many short quotes from real customers, shown as a living wall rather than one at a time.",
	avoidWhen: "Fewer than six quotes, or long ones: testimonials-wall or testimonials-carousel let people read at their pace.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 60, maxWords: 400 },
	components: ["marquee"],
	pairsWith: ["logos-grid", "pricing-plans"],
} as const satisfies BlockMeta;
