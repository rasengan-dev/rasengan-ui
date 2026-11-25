import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "product-grid",
	title: "Product grid",
	family: "commerce",
	category: "products",
	status: "beta",
	added: "2026-11-25",
	summary: "Products as cards (photo, a second on hover, badge, rating, price and was), filtered by category and sorted, both kept in the address.",
	useWhen: "A shop's catalogue or a collection page: six to forty-eight products, each with its own page.",
	avoidWhen: "One to three products: product-detail on its own, or features-alternating, says more about each.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 40, maxWords: 500 },
	components: ["chip", "select", "badge", "rating"],
	pairsWith: ["product-detail", "cart-drawer", "faq-accordion"],
} as const satisfies BlockMeta;
