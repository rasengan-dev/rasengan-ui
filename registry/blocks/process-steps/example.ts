import type { ProcessStepsContent } from "./schema";

export const example: ProcessStepsContent = {
	eyebrow: "How it works",
	title: "From quote to paid in three steps",
	subline: "No setup call, no import wizard. Most studios send their first invoice in ten minutes.",
	steps: [
		{ title: "Send the quote", description: "Pick a client, add the lines, send. They accept with one click, from any phone." },
		{ title: "Turn it into an invoice", description: "An accepted quote becomes an invoice with the same lines, ready when the work is." },
		{ title: "Get paid", description: "Card, transfer or mobile money; reminders go out on their own until it is paid." },
	],
	cta: { label: "Start free", href: "/signup" },
};
