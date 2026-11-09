import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "stats-numbers",
	title: "Stats, numbers",
	family: "marketing",
	category: "stats",
	status: "beta",
	added: "2026-11-08",
	summary: "A title and two to four large numbers that roll into place when scrolled into view, with their source.",
	useWhen: "Proving a claim with a few real numbers: customers, uptime, money saved.",
	avoidWhen: "Numbers you cannot source, or more than four of them.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 10, maxWords: 60 },
	components: ["number-roll"],
	pairsWith: ["testimonials-carousel", "pricing-plans"],
} as const satisfies BlockMeta;
