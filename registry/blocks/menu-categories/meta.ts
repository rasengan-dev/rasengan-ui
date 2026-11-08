import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "menu-categories",
	title: "Menu, categories",
	family: "storefront",
	category: "menu",
	status: "beta",
	added: "2026-11-08",
	summary: "A restaurant's menu by category, in tabs: each dish with its description, tags and price in the local currency.",
	useWhen: "A restaurant, a café or a bakery with a menu of up to a hundred items.",
	avoidWhen: "A menu that changes daily: link to a photo or a PDF instead.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 40, maxWords: 600 },
	components: ["tabs", "badge"],
	pairsWith: ["gallery-grid", "order-banner"],
} as const satisfies BlockMeta;
