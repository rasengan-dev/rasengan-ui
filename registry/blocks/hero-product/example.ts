import type { HeroProductContent } from "./schema";

export const example: HeroProductContent = {
	badge: "Trusted by 1,200 studios",
	headline: "Invoices that chase themselves",
	subline: "Quotes, invoices, payments and reminders in one calm place, for freelancers and small studios.",
	primary: { label: "Start free", href: "/signup" },
	secondary: { label: "See pricing", href: "#pricing" },
	note: "Free for 14 days. No card needed.",
	screen: {
		src: "/placeholders/product-dashboard.svg",
		alt: "The Senbon dashboard: this month's invoices, an overdue alert, payments per day and the latest activity.",
		width: 1280,
		height: 800,
	},
	url: "senbon.app/dashboard",
};
