import type { FaqAccordionContent } from "./schema";

export const example: FaqAccordionContent = {
	title: "Questions, answered",
	subline: "What studios ask us before they switch.",
	items: [
		{
			question: "Can my clients pay without an account?",
			answer: "Yes. Every invoice has a payment link: your client opens it, picks a card, a bank transfer or mobile money, and pays.",
		},
		{
			question: "Which currencies do you support?",
			answer: "You can invoice in 135 currencies. Payments settle in your account's currency at the rate shown on the invoice.",
		},
		{
			question: "Can I bring my invoices from another tool?",
			answer: "Import clients and past invoices from a CSV file or directly from the main accounting tools; numbering carries on where you stopped.",
		},
		{
			question: "What happens when my trial ends?",
			answer: "You choose a plan or stay on Solo, which is free. Nothing is deleted, and invoices already sent keep their payment links.",
		},
		{
			question: "Is my data safe?",
			answer: "Data is encrypted in transit and at rest, backed up daily, and stored in the region you choose when you sign up.",
		},
	],
	contact: { text: "Still have a question?", cta: { label: "Write to us", href: "/contact" } },
};
