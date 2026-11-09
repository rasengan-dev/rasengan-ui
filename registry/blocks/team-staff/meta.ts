import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "team-staff",
	title: "Team, staff",
	family: "storefront",
	category: "team",
	status: "beta",
	added: "2026-11-08",
	summary: "The people who serve you: a portrait, name and role, their specialties as tags, and a link to book with each of them.",
	useWhen: "A barber, a salon, a clinic or a restaurant whose clients choose a person, or come back for one.",
	avoidWhen: "A company's leadership: a marketing team block fits better.",
	layout: { columns: "grid" },
	content: { images: 4, minWords: 15, maxWords: 120 },
	components: ["badge", "button"],
	pairsWith: ["services-pricelist", "booking-form"],
} as const satisfies BlockMeta;
