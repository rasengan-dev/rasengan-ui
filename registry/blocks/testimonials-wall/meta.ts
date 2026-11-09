import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "testimonials-wall",
	title: "Testimonials, wall",
	family: "marketing",
	category: "testimonials",
	status: "beta",
	added: "2026-11-09",
	summary: "A masonry wall of customer quotes with their faces; on a wide screen its three columns drift slowly upwards, with a pause button.",
	useWhen: "Many short, real quotes: the volume is the argument.",
	avoidWhen: "Three or four long quotes: testimonials-carousel gives each room.",
	layout: { columns: "grid" },
	content: { images: 9, minWords: 80, maxWords: 500 },
	components: ["marquee"],
	pairsWith: ["logos-grid", "pricing-plans"],
} as const satisfies BlockMeta;
