import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "product-detail",
	title: "Product detail",
	family: "commerce",
	category: "product",
	status: "beta",
	added: "2026-11-25",
	summary: "A product's page: gallery with thumbnails and full screen, price, rating, variants as chips, quantity, add to cart, notes and details.",
	useWhen: "The page of one product, opened from product-grid; with cart-drawer on the page, adding opens the cart.",
	avoidWhen: "A product sold by message without a cart: menu-cards or offer-deal ask less of the visitor.",
	layout: { columns: "split", aboveTheFold: true },
	content: { images: 4, minWords: 30, maxWords: 400 },
	components: ["lightbox", "chip", "number-field", "rating", "button"],
	pairsWith: ["cart-drawer", "product-grid", "faq-accordion"],
} as const satisfies BlockMeta;
