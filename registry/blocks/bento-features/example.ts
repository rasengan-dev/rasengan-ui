import type { BentoFeaturesContent } from "./schema";

export const example: BentoFeaturesContent = {
	eyebrow: "Why Senbon",
	title: "Less chasing, more paid work",
	subline: "The parts of invoicing nobody enjoys, done for you, with the numbers to show it.",
	tiles: [
		{
			kind: "image",
			size: "large",
			title: "Your cash flow, live",
			description: "What is owed, what is late and what lands next month, by client and by project.",
			image: { src: "/placeholders/product-dashboard.svg", alt: "The Senbon dashboard: money owed, late invoices and next month's income.", width: 1280, height: 800 },
		},
		{ kind: "stat", size: "small", stat: { label: "invoices paid on time", value: 0.94, format: "percent" }, description: "Across studios using reminders, last quarter." },
		{ kind: "feature", size: "small", icon: "bell", title: "Reminders that stop", description: "Polite nudges before and after the due date, and none once the client pays." },
		{ kind: "feature", size: "wide", icon: "wallet", title: "Every way to pay", description: "Cards, bank transfers and mobile money, each matched to the right invoice without you." },
		{ kind: "feature", size: "small", icon: "globe", title: "Any currency", description: "Quote in euros, bill in dollars, get paid in CFA francs: rates are fetched for you." },
		{ kind: "stat", size: "small", stat: { label: "freelancers and studios", value: 12400, format: "compact" } },
		{ kind: "feature", size: "wide", icon: "file", title: "Ready for your accountant", description: "Clean exports by quarter, every tax line and credit note where it belongs." },
	],
	locale: "en-US",
};
