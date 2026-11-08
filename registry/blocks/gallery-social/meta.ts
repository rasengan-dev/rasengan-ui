import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "gallery-social",
	title: "Gallery, social",
	family: "storefront",
	category: "gallery",
	status: "beta",
	added: "2026-11-08",
	summary: "The project's own photos in a square three-column grid, like a profile's feed, with the account's handle and a follow link.",
	useWhen: "A business whose social account is lively: food, beauty, fashion. Its photos are copied into the project.",
	avoidWhen: "Photos that need a caption or a closer look: gallery-grid opens them in a lightbox.",
	layout: { columns: "grid" },
	content: { images: 9, minWords: 6, maxWords: 50 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["contact-links", "reviews-rating"],
} as const satisfies BlockMeta;
