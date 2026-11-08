import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "hours-week",
	title: "Hours, week",
	family: "storefront",
	category: "hours",
	status: "beta",
	added: "2026-11-08",
	summary: "The week's opening hours, one or more slots a day, today highlighted and a live 'open now' in the business's time zone.",
	useWhen: "Any place people visit: restaurants, shops, salons, clinics.",
	avoidWhen: "Hours by appointment only: say so in a contact block.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 10, maxWords: 80 },
	components: ["badge"],
	pairsWith: ["location-map", "contact-links"],
} as const satisfies BlockMeta;
