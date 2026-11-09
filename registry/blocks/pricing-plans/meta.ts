import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "pricing-plans",
	title: "Pricing, plans",
	family: "marketing",
	category: "pricing",
	status: "beta",
	added: "2026-11-08",
	summary: "One to four plans with a monthly or yearly switch; prices roll to the new amount, in the project's locale.",
	useWhen: "A product with a few fixed plans, compared on price and features.",
	avoidWhen: "Usage-based or quote-only pricing; more than four plans.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 40, maxWords: 200 },
	components: ["button", "badge", "card", "toggle-group", "number-roll"],
	dependencies: ["lucide-react"],
	pairsWith: ["faq-accordion", "cta-banner"],
} as const satisfies BlockMeta;
