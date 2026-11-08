import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "services-list",
	title: "Services, list",
	family: "storefront",
	category: "services",
	status: "beta",
	added: "2026-11-08",
	summary: "What a salon, a garage or a studio offers: each service with what it includes, how long it takes and its price.",
	useWhen: "A business that sells time: hair, beauty, repairs, lessons, consultations.",
	avoidWhen: "Products to buy: use a menu or a shop block.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 20, maxWords: 300 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["hours-week", "contact-links"],
} as const satisfies BlockMeta;
