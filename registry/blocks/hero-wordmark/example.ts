import type { HeroWordmarkContent } from "./schema";

export const example: HeroWordmarkContent = {
	word: "Senbon",
	headline: "Invoicing for people who would rather be working",
	subline: "Quotes, invoices, payments and reminders in one calm place, for freelancers and small studios.",
	primary: { label: "Start free", href: "/signup" },
	secondary: { label: "See pricing", href: "#pricing" },
	image: { src: "/placeholders/product-dashboard.svg", alt: "The Senbon dashboard: this month's invoices, an overdue alert, payments per day and the latest activity.", width: 1280, height: 800 },
};
