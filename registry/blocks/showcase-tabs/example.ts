import type { ShowcaseTabsContent } from "./schema";

const shot = (name: string, alt: string) => ({ src: `/placeholders/product-${name}.svg`, alt, width: 1280, height: 800 });

export const example: ShowcaseTabsContent = {
	eyebrow: "The product",
	title: "One app for the money side of your work",
	subline: "Three screens you will open every week, and nothing you will not.",
	tabs: [
		{
			label: "Invoices",
			title: "Invoices that write themselves",
			description: "Start from a quote or a timesheet; your rates, taxes and terms fill in. Send it as a link the client can pay from.",
			points: ["Quotes become invoices in one click", "Taxes by country, credit notes included", "Your logo and colours"],
			cta: { label: "See invoicing", href: "/features/invoices" },
			image: shot("invoice", "The invoice editor: line items, taxes and a total, with the client's details on the side."),
		},
		{
			label: "Payments",
			title: "Paid the way your clients pay",
			description: "Cards, bank transfers and mobile money from one link. Each payment is matched to its invoice, without you.",
			points: ["Mobile money in twelve countries", "Payouts to your bank in two days", "Partial payments and deposits"],
			cta: { label: "See payments", href: "/features/payments" },
			image: shot("payment", "A phone showing a payment received, beside a list of invoices marked paid."),
		},
		{
			label: "Reports",
			title: "Know what comes in next month",
			description: "Money owed, late and on its way, by client and by project, with exports your accountant will thank you for.",
			points: ["Cash flow forecast", "Late payers at a glance", "Quarterly exports"],
			image: shot("dashboard", "The dashboard: money owed, late invoices and a chart of the year's income."),
		},
	],
};
