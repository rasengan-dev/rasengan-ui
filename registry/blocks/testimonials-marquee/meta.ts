import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "testimonials-marquee",
	title: "Testimonials, marquee",
	family: ["marketing", "storefront"],
	category: "testimonials",
	status: "beta",
	added: "2026-11-24",
	summary: "Quotes in two rows that slide sideways in opposite directions, fading at the edges, each with a pause button; they stand still with reduced motion.",
	useWhen: "Many short quotes from real customers, shown as moving bands rather than one at a time.",
	avoidWhen: "Fewer than six quotes, or long ones: testimonials-carousel lets people read at their pace. For a wall of columns, testimonials-wall.",
	layout: { columns: "carousel" },
	content: { images: 6, minWords: 60, maxWords: 400 },
	components: ["marquee"],
	pairsWith: ["logos-grid", "pricing-plans"],
} as const satisfies BlockMeta;
