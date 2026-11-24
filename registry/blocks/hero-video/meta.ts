import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-video",
	title: "Hero, video",
	family: ["marketing", "storefront", "portfolio"],
	category: "hero",
	status: "beta",
	added: "2026-11-24",
	summary: "A muted video loop in a large rounded frame, with the headline and actions on a panel over its corner and a pause button.",
	useWhen: "A place, a product or a studio best shown moving: a restaurant's room, a hotel, a product in use, a showreel.",
	avoidWhen: "No good footage: a still photo (hero-photo) loads faster and says as much.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["video", "button"],
	pairsWith: ["menu-cards", "features-grid", "projects-grid"],
} as const satisfies BlockMeta;
