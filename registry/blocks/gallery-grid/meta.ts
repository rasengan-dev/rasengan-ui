import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "gallery-grid",
	title: "Gallery, grid",
	family: "storefront",
	category: "gallery",
	status: "beta",
	added: "2026-11-08",
	summary: "Three to twelve photos in a grid, the first one large; a photo opens in a dialog with its caption and arrows.",
	useWhen: "Showing the place, the dishes or the work, when photos sell better than words.",
	avoidWhen: "Fewer than three good photos; product photos to buy from.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 10, maxWords: 120 },
	components: ["dialog", "button"],
	dependencies: ["lucide-react"],
	pairsWith: ["about-story", "hours-week"],
} as const satisfies BlockMeta;
