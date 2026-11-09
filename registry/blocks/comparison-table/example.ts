import type { ComparisonTableContent } from "./schema";

export const example: ComparisonTableContent = {
	title: "Why studios switch from spreadsheets",
	subline: "The way most of us started invoicing, and what changes with Senbon.",
	columns: { ours: "Senbon", theirs: "Spreadsheets and email" },
	rows: [
		{ label: "Time to write an invoice", ours: "1 minute", theirs: "15 minutes" },
		{ label: "Clients pay by card or mobile money", ours: true, theirs: false },
		{ label: "Reminders go out on their own", ours: true, theirs: false },
		{ label: "See who is late at a glance", ours: true, theirs: false },
		{ label: "Exports your accountant can read", ours: true, theirs: "With some work" },
		{ label: "Costs nothing to start", ours: true, theirs: true },
	],
	labels: { feature: "Feature", yes: "Yes", no: "No" },
	cta: { label: "Switch in an afternoon", href: "/signup" },
	note: "Import your clients and open invoices from a spreadsheet in one step.",
};
