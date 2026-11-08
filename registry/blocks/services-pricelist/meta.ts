import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "services-pricelist",
	title: "Services, price list",
	family: "storefront",
	category: "services",
	status: "beta",
	added: "2026-11-08",
	summary: "A salon's or a spa's prices grouped by kind, each with a dotted leader, its duration and what it includes, beside one photo.",
	useWhen: "A salon, a spa, a barber or a nail bar with many services in a few kinds.",
	avoidWhen: "Four services or fewer: services-list reads better.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 30, maxWords: 300 },
	components: ["button"],
	pairsWith: ["booking-form", "team-staff"],
} as const satisfies BlockMeta;
