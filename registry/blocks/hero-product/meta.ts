import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-product",
	title: "Hero, product",
	family: "marketing",
	category: "hero",
	status: "beta",
	added: "2026-11-24",
	summary: "A stage of the primary colour: centred headline and actions, and the product's screen in a browser frame rising out of it, settling (and straightening from a tilt) as the page scrolls.",
	useWhen: "A software product whose screen sells it: a dashboard, an editor, an app people should picture themselves in.",
	avoidWhen: "A product without a good screenshot yet: hero-centered or hero-wordmark lead with words. A plain screenshot under the headline, still: hero-centered.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["device-frame", "badge", "button"],
	pairsWith: ["logos-grid", "features-alternating"],
} as const satisfies BlockMeta;
