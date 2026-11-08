import type { FooterLocalContent } from "./schema";

const lunchAndDinner = [
	{ open: "11:30", close: "15:00" },
	{ open: "18:30", close: "23:00" },
];

export const example: FooterLocalContent = {
	name: "Mama Ngono's",
	tagline: "Cameroonian home cooking in Akwa, since 2009.",
	address: {
		lines: ["Rue Joss, Akwa", "Douala, Cameroon"],
		landmark: "Two streets from the Akwa post office, the green door.",
		mapUrl: "https://www.openstreetmap.org/?mlat=4.0469&mlon=9.6966#map=17/4.0469/9.6966",
	},
	hours: {
		days: [
			{ day: "monday", slots: [] },
			{ day: "tuesday", slots: lunchAndDinner },
			{ day: "wednesday", slots: lunchAndDinner },
			{ day: "thursday", slots: lunchAndDinner },
			{ day: "friday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "saturday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "sunday", slots: [{ open: "12:00", close: "17:00" }] },
		],
	},
	contacts: [
		{ kind: "phone", value: "+237 2 33 00 00 00" },
		{ kind: "whatsapp", value: "+237 6 99 00 00 00" },
		{ kind: "instagram", value: "https://www.instagram.com/" },
	],
	links: [
		{ label: "Menu", href: "#menu" },
		{ label: "Book a table", href: "#booking" },
		{ label: "Order", href: "#order" },
	],
	copyright: "© 2026 Mama Ngono's",
	locale: "en-CM",
	labels: { visit: "Visit us", hours: "Opening hours", contact: "Contact", closed: "Closed", directions: "Directions" },
};
