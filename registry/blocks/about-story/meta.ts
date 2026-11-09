import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "about-story",
	title: "About, story",
	family: "storefront",
	category: "about",
	status: "beta",
	added: "2026-11-08",
	summary: "The owner tells the story beside a photo: a title, two or three short paragraphs, a signature and three facts.",
	useWhen: "A family business or a craftsperson whose story is part of why people come.",
	avoidWhen: "A chain or a franchise: talk about the place, not the founder.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 40, maxWords: 300 },
	components: [],
	pairsWith: ["gallery-grid", "testimonials-carousel"],
} as const satisfies BlockMeta;
