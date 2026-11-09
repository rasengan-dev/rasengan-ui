import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "menu-cards",
	title: "Menu, cards",
	family: "storefront",
	category: "menu",
	status: "beta",
	added: "2026-11-08",
	summary: "Signature dishes as cards: a photo, tags, a line and the price, each with an order link that opens WhatsApp with the dish written.",
	useWhen: "A restaurant, a bakery or a café showing its best plates, with good photos of them.",
	avoidWhen: "The whole menu: use menu-categories or menu-list, and link to it from here.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 30, maxWords: 200 },
	components: ["badge", "button"],
	dependencies: ["lucide-react"],
	pairsWith: ["menu-categories", "order-banner"],
} as const satisfies BlockMeta;
