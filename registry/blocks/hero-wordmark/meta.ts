import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hero-wordmark",
	title: "Hero, wordmark",
	family: ["marketing", "storefront"],
	category: "hero",
	status: "beta",
	added: "2026-11-09",
	summary: "A heading and its actions over a wide photo, with the brand or one word set across the full width beneath it.",
	useWhen: "A short, strong name worth showing big: a product, a restaurant, a studio. Six to ten letters read best.",
	avoidWhen: "A long name (over twelve letters), or no wide photo: hero-centered or hero-photo.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["button", "text-reveal"],
	pairsWith: ["logos-grid", "menu-cards"],
} as const satisfies BlockMeta;
