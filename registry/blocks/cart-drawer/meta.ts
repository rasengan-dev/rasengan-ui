import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "cart-drawer",
	title: "Cart drawer",
	family: "commerce",
	category: "cart",
	status: "beta",
	added: "2026-11-25",
	summary: "The cart in a side sheet: lines with quantity and remove, a free-delivery bar, the subtotal, and the order sent by message or to a URL.",
	useWhen: "Any shop page where people add products: put it once, as a floating button or beside the navbar; product-detail opens it.",
	avoidWhen: "Selling one thing at a time by message: menu-cards or order-banner need no cart.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 20, maxWords: 120 },
	components: ["sheet", "number-field", "button", "progress"],
	pairsWith: ["product-detail", "product-grid"],
} as const satisfies BlockMeta;
