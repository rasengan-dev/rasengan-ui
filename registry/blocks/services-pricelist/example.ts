import type { ServicesPricelistContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });

export const example: ServicesPricelistContent = {
	title: "Treatments and prices",
	subline: "Every visit starts with a short talk, so we agree on what you want before we begin.",
	image: { src: "/placeholders/person-beauty.svg", alt: "A client with a full afro, smiling, her hands in her hair.", width: 600, height: 750 },
	groups: [
		{
			name: "Hair",
			services: [
				{ name: "Knotless braids", description: "Shoulder length, hair included.", duration: 240, price: xaf(25000) },
				{ name: "Silk press", description: "Wash, deep conditioning and press.", duration: 120, price: xaf(15000) },
				{ name: "Locs retwist", duration: 120, price: xaf(12000) },
			],
		},
		{
			name: "Nails",
			services: [
				{ name: "Manicure", duration: 45, price: xaf(5000) },
				{ name: "Gel polish", description: "Hands or feet, lasts three weeks.", duration: 60, price: xaf(8000) },
				{ name: "Pedicure", duration: 60, price: xaf(7000) },
			],
		},
		{
			name: "Face",
			services: [
				{ name: "Facial", description: "Cleanse, mask and massage.", duration: 60, price: xaf(10000) },
				{ name: "Brows and lashes", duration: 30, price: xaf(4000) },
			],
		},
	],
	minutes: "min",
	cta: { label: "Book an appointment", href: "#booking" },
	locale: "en-CM",
	note: "A deposit of 5,000 FCFA confirms a booking over two hours.",
};
