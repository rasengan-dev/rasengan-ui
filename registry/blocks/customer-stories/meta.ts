import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "customer-stories",
	title: "Customer stories",
	family: "marketing",
	category: "customers",
	status: "beta",
	added: "2026-11-24",
	summary: "Customer cards: their logo, one number that moved and rolls in, a quote, the person, and a link to the full story.",
	useWhen: "A SaaS home or customers page with two to six named customers who agreed to be quoted, each with a result.",
	avoidWhen: "Quotes without a result or a name: testimonials-wall carries more of them, lighter.",
	layout: { columns: "grid" },
	content: { images: 5, minWords: 40, maxWords: 300 },
	components: ["number-roll"],
	pairsWith: ["logos-grid", "security-badges"],
} as const satisfies BlockMeta;
