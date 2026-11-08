import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-centered",
	title: "Hero, centred",
	family: "marketing",
	category: "hero",
	status: "beta",
	added: "2026-11-08",
	summary: "An announcement, a headline revealed word by word, one line of subcopy, two calls to action and a product shot.",
	useWhen: "Opening a product page with a clear one-line promise.",
	avoidWhen: "Headlines over nine words; a page without a call to action.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 15, maxWords: 60 },
	components: ["button", "badge", "text-reveal"],
	dependencies: ["lucide-react"],
	pairsWith: ["logos-marquee", "features-grid"],
} as const satisfies BlockMeta;
