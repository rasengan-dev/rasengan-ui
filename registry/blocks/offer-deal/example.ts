import type { OfferDealContent } from "./schema";

export const example: OfferDealContent = {
	eyebrow: "Christmas menu",
	offer: {
		title: "The family platter",
		description: "Braised fish, ndolé, poulet DG, plantain and miondo for six, with a jug of folere.",
		price: { amount: 18000, currency: "XAF" },
		was: { amount: 24000, currency: "XAF" },
		endsAt: "2026-12-24T23:00:00+01:00",
		cta: { label: "Order the platter", href: "#order" },
	},
	image: { src: "/placeholders/dish-fish.svg", alt: "A whole grilled fish on a large platter with onions.", width: 1200, height: 900 },
	timeZone: "Africa/Douala",
	locale: "en-CM",
	labels: {
		was: "Usual price",
		until: "Until",
		endsIn: "Ends in",
		expired: "This offer has ended. See you for the next one.",
		days: "days",
		hours: "hours",
		minutes: "min",
	},
};
