import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "logos-grid",
	title: "Logos, grid",
	family: "marketing",
	category: "logos",
	status: "beta",
	added: "2026-11-09",
	summary: "Customers' logos standing still in a grid of bordered cells, each mark with its name, under one line of social proof.",
	useWhen: "Four to twelve recognisable customers, under a hero, where nothing should move.",
	avoidWhen: "Many logos or a livelier page: logos-marquee scrolls them.",
	layout: { columns: "grid" },
	content: { images: 8, minWords: 4, maxWords: 30 },
	components: [],
	pairsWith: ["hero-split", "features-alternating"],
} as const satisfies BlockMeta;
