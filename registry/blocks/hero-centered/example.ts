import type { HeroCenteredContent } from "./schema";

export const example: HeroCenteredContent = {
	eyebrow: { label: "New: recurring invoices", href: "/changelog" },
	headline: "Ship invoices before your coffee cools",
	subline: "Senbon drafts, sends and chases your invoices, so small studios get paid on time without a finance team.",
	primary: { label: "Start free", href: "/signup" },
	secondary: { label: "See a demo", href: "/demo" },
	note: "Free for 14 days. No card needed.",
	image: {
		src: "/placeholders/product-dashboard.svg",
		alt: "The Senbon dashboard: this month's invoices, an overdue alert, payments per day and the latest activity.",
		width: 1280,
		height: 800,
	},
};
