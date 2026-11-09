import type { CtaAppContent } from "./schema";

export const example: CtaAppContent = {
	title: "Invoices in your pocket",
	subline: "Send an invoice from the client's office, and get a tap on the shoulder the moment it is paid.",
	stores: [
		{ store: "app-store", label: "Download on the App Store", href: "https://apps.apple.com/" },
		{ store: "google-play", label: "Get it on Google Play", href: "https://play.google.com/" },
	],
	points: ["Works offline", "Payment alerts", "Scan receipts"],
	screen: { src: "/placeholders/product-phone.svg", alt: "The Senbon app: the balance owed, three summary tiles and a list of recent invoices.", width: 390, height: 844 },
};
