import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-product",
	title: "Hero, product",
	family: "marketing",
	category: "hero",
	status: "beta",
	added: "2026-11-24",
	summary: "A centred headline and actions over the product's screen in a browser frame, on a soft glow of the primary colour.",
	useWhen: "A software product whose screen sells it: a dashboard, an editor, an app people should picture themselves in.",
	avoidWhen: "A product without a good screenshot yet: hero-centered or hero-wordmark lead with words.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["device-frame", "badge", "button"],
	pairsWith: ["logos-grid", "features-alternating"],
} as const satisfies BlockMeta;
