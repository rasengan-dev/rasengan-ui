import type { StatsNumbersContent } from "./schema";

export const example: StatsNumbersContent = {
	title: "Studios get paid nine days sooner",
	subline: "Reminders that go out on time, and payment links in every invoice, add up.",
	stats: [
		{ label: "Invoices sent", value: 1840000, format: "compact" },
		{ label: "Paid on time", value: 0.94, format: "percent" },
		{ label: "Collected", value: 312000000, format: "currency", currency: "USD" },
		{ label: "Days to get paid", value: 6, format: "number" },
	],
	locale: "en-US",
	source: "Senbon customers, January to October 2026.",
};
