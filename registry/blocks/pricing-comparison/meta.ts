import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "pricing-comparison",
	title: "Pricing, comparison",
	family: "marketing",
	category: "pricing",
	status: "beta",
	added: "2026-11-09",
	summary: "Plans head a table of features by group, a tick, a dash or a short value per plan; the highlighted plan is tinted down its column.",
	useWhen: "Two to four plans that differ on many features, under pricing-plans or on a pricing page of its own.",
	avoidWhen: "Plans that differ on three things: pricing-plans says it with their feature lists.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 40, maxWords: 300 },
	components: ["badge", "button", "table"],
	dependencies: ["lucide-react"],
	pairsWith: ["pricing-plans", "faq-accordion"],
} as const satisfies BlockMeta;
