import type { HeroWordmarkContent } from "./schema";

export const example: HeroWordmarkContent = {
	word: "Senbon",
	headline: "Invoicing for people who would rather be working",
	subline: "Quotes, invoices, payments and reminders in one calm place, for freelancers and small studios.",
	primary: { label: "Start free", href: "/signup" },
	secondary: { label: "See pricing", href: "#pricing" },
	image: { src: "/placeholders/product-dashboard.svg", alt: "The Senbon dashboard: money owed, late invoices and a chart of the year's income.", width: 1280, height: 800 },
};
