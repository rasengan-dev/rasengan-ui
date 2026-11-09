import type { StepsScrollContent } from "./schema";

const shot = (name: string, alt: string) => ({ src: `/placeholders/product-${name}.svg`, alt, width: 1280, height: 800 });

export const example: StepsScrollContent = {
	eyebrow: "How it works",
	title: "From quote to paid in three steps",
	subline: "No new habits: Senbon follows the way you already work, and does the chasing.",
	steps: [
		{
			title: "Write the invoice",
			description: "Start from a quote, a timesheet or a blank page. Your rates, taxes and payment terms are already there.",
			image: shot("invoice", "The invoice editor: line items, taxes and a total, with the client's details on the side."),
		},
		{
			title: "Let the client pay their way",
			description: "One link, every method: card, bank transfer or mobile money. The invoice is marked paid the moment money lands.",
			image: shot("payment", "A phone showing a payment received, beside a list of invoices marked paid."),
		},
		{
			title: "Watch the money come in",
			description: "See what is owed, what is late and what arrives next month. Reminders go out on their own until it is settled.",
			image: shot("dashboard", "The dashboard: money owed, late invoices and a chart of the year's income."),
		},
	],
};
