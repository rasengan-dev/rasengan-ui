import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-photo",
	title: "Hero, photo",
	family: "storefront",
	category: "hero",
	status: "beta",
	added: "2026-11-08",
	summary: "Where and what, a warm headline, two actions and three short facts beside a large photo of the place or a dish.",
	useWhen: "Opening the site of a restaurant, a salon or a shop, where a photo says more than a slogan.",
	avoidWhen: "No good photo yet: use hero-centered with text alone.",
	layout: { columns: "split", aboveTheFold: true },
	content: { images: 1, minWords: 20, maxWords: 70 },
	components: ["button", "text-reveal"],
	dependencies: ["lucide-react"],
	pairsWith: ["menu-categories", "services-list"],
} as const satisfies BlockMeta;
