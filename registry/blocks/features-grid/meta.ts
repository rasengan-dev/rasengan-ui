import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "features-grid",
	title: "Features, grid",
	family: "marketing",
	category: "features",
	status: "beta",
	added: "2026-11-08",
	summary: "A title and three to nine features, each an icon, a benefit and one sentence, in one to three columns.",
	useWhen: "Listing what the product does, after the hero, when each point fits in a sentence.",
	avoidWhen: "Features that need a screenshot each: use a showcase block.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 40, maxWords: 220 },
	components: [],
	dependencies: ["lucide-react"],
	pairsWith: ["stats-numbers", "testimonials-carousel"],
} as const satisfies BlockMeta;
