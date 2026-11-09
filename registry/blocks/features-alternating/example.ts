import type { FeaturesAlternatingContent } from "./schema";

const shot = (name: string, alt: string) => ({ src: `/placeholders/product-${name}.svg`, alt, width: 1280, height: 800 });

export const example: FeaturesAlternatingContent = {
	eyebrow: "Features",
	title: "Everything between the quote and the payment",
	subline: "Three things Senbon does so you can stop doing them.",
	rows: [
		{
			label: "Invoices",
			title: "Invoices that write themselves",
			description: "Start from a quote or a timesheet. Your rates, taxes and terms are already there, and the client gets a link they can pay from.",
			points: ["Quotes become invoices in one click", "Taxes by country, credit notes included"],
			cta: { label: "See invoicing", href: "/features/invoices" },
			image: shot("invoice", "The invoice editor: line items, taxes and a total, with the client's details on the side."),
		},
		{
			label: "Payments",
			title: "Paid the way your clients pay",
			description: "Cards, bank transfers and mobile money from one link, each payment matched to its invoice without you lifting a finger.",
			points: ["Mobile money in twelve countries", "Payouts to your bank in two days"],
			image: shot("payment", "A phone showing a payment received, beside a list of invoices marked paid."),
		},
		{
			label: "Reports",
			title: "Know what comes in next month",
			description: "Money owed, late and on its way, by client and by project, with exports your accountant will actually like.",
			points: ["Cash flow forecast", "Quarterly exports"],
			cta: { label: "See reports", href: "/features/reports" },
			image: shot("dashboard", "The dashboard: money owed, late invoices and a chart of the year's income."),
		},
	],
};
