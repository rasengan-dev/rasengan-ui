import type { FeaturesGridContent } from "./schema";

export const example: FeaturesGridContent = {
	eyebrow: "Features",
	title: "Everything between the quote and the payment",
	subline: "One place for the work you used to do in a spreadsheet, three inboxes and a banking app.",
	features: [
		{ icon: "bolt", title: "Invoices in a minute", description: "Turn a quote or a timesheet into an invoice with your rates, taxes and terms already filled in." },
		{ icon: "bell", title: "Paid on time", description: "Polite reminders go out before and after the due date, and stop the moment the client pays." },
		{ icon: "wallet", title: "Every way to pay", description: "Cards, bank transfers and mobile money, reconciled against the right invoice automatically." },
		{ icon: "repeat", title: "Retainers that run themselves", description: "Monthly clients get their invoice on the same day each month, without you opening the app." },
		{ icon: "chart", title: "Cash flow at a glance", description: "See what is owed, what is late and what comes in next month, by client and by project." },
		{ icon: "shield", title: "Ready for your accountant", description: "Export clean records by quarter, with every tax line and credit note where it belongs." },
	],
};
