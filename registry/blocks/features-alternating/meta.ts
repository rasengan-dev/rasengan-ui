import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "features-alternating",
	title: "Features, alternating",
	family: "marketing",
	category: "features",
	status: "beta",
	added: "2026-11-09",
	summary: "Two to five features told one at a time, as rows of text and image that swap sides, each with ticked facts and a link.",
	useWhen: "A few features that each deserve a screenshot and a paragraph.",
	avoidWhen: "Many small features: features-grid or bento-features.",
	layout: { columns: "split" },
	content: { images: 3, minWords: 60, maxWords: 300 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["hero-split", "testimonials-wall"],
} as const satisfies BlockMeta;
