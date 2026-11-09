import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "order-banner",
	title: "Order, banner",
	family: "storefront",
	category: "order",
	status: "beta",
	added: "2026-11-08",
	summary: "A band in the brand colour that invites an order: a headline, how delivery works, and WhatsApp and phone buttons.",
	useWhen: "A business that takes orders by message or phone: restaurants, bakeries, shops that deliver.",
	avoidWhen: "Online checkout: link to the shop instead.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 8, maxWords: 60 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["hours-week", "contact-links"],
} as const satisfies BlockMeta;
