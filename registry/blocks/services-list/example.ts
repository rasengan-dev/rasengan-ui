import type { ServicesListContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });

export const example: ServicesListContent = {
	title: "Services and prices",
	subline: "Every appointment starts with a short consultation, so we agree on the style before we start.",
	services: [
		{ name: "Knotless braids", description: "Shoulder length, hair included.", duration: 240, price: xaf(25000) },
		{ name: "Cornrows", description: "Straight back or patterned.", duration: 90, price: xaf(8000) },
		{ name: "Silk press", description: "Wash, deep conditioning and press.", duration: 120, price: xaf(15000) },
		{ name: "Twist out", duration: 75, price: xaf(7000) },
		{ name: "Locs retwist", description: "With a scalp treatment.", duration: 120, price: xaf(12000) },
		{ name: "Kids' braids", description: "Under twelve, beads included.", duration: 90, price: xaf(6000) },
	],
	minutes: "min",
	book: { label: "Book on WhatsApp", href: "https://wa.me/237600000000" },
	locale: "en-CM",
	note: "A deposit of 5,000 FCFA confirms the appointment. Home visits in Douala on request.",
};
