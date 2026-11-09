import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "comparison-table",
	title: "Comparison, table",
	family: "marketing",
	category: "comparison",
	status: "beta",
	added: "2026-11-09",
	summary: "Your product beside the usual way of doing things, row by row: ticks, crosses or short values, your column tinted.",
	useWhen: "A product replacing a habit (spreadsheets, email, paper) with a few clear, honest differences.",
	avoidWhen: "Comparing your own plans: pricing-comparison. Naming a competitor: check the law where you sell.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 30, maxWords: 150 },
	components: ["button", "table"],
	dependencies: ["lucide-react"],
	pairsWith: ["features-alternating", "cta-banner"],
} as const satisfies BlockMeta;
