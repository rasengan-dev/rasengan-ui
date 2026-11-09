import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "logos-marquee",
	title: "Logos, marquee",
	family: "marketing",
	category: "logos",
	status: "beta",
	added: "2026-11-08",
	summary: "A line of customer logos that scrolls endlessly, pauses on hover and has a pause button; still with motion off.",
	useWhen: "Right after a hero, to show who already uses the product.",
	avoidWhen: "Fewer than four logos, or logos you have no permission to show.",
	layout: { columns: "carousel" },
	content: { images: 0, minWords: 6, maxWords: 30 },
	components: ["marquee"],
	pairsWith: ["features-grid", "stats-numbers"],
} as const satisfies BlockMeta;
