import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-split",
	title: "Hero, split",
	family: "marketing",
	category: "hero",
	status: "beta",
	added: "2026-11-09",
	summary: "Headline, subcopy and two actions beside a portrait photo, with up to three figure chips over its corners.",
	useWhen: "A product sold by and to people: a face or the product in someone's hands says more than a screenshot.",
	avoidWhen: "No photo worth the space: hero-centered leads with the product shot.",
	layout: { columns: "split", aboveTheFold: true },
	content: { images: 1, minWords: 20, maxWords: 70 },
	components: ["button", "text-reveal"],
	pairsWith: ["logos-grid", "features-alternating"],
} as const satisfies BlockMeta;
