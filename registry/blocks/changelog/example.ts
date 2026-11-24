import type { ChangelogContent } from "./schema";

export const example: ChangelogContent = {
	eyebrow: "Changelog",
	title: "What is new in Senbon",
	subline: "New features, improvements and fixes, newest first. We ship on Tuesdays.",
	subscribe: { label: "Follow by RSS", href: "/changelog/rss.xml" },
	releases: [
		{
			version: "2.8.0",
			date: "2026-11-17",
			title: "Reminders that write themselves",
			image: { src: "/placeholders/product-invoice.svg", alt: "An invoice in Senbon with its reminder schedule beside it", width: 1280, height: 800 },
			added: ["Reminders draft their own email from the invoice and the client's last reply.", "A schedule per client: gentle, firm, or off."],
			improved: ["Overdue invoices sort by how late, then by amount."],
			href: "/changelog/2-8-0",
		},
		{
			version: "2.7.2",
			date: "2026-11-10",
			title: "Time zones in the payment history",
			fixed: ["Payments made near midnight no longer show on the wrong day.", "Exports keep the currency's decimals."],
		},
		{
			version: "2.7.0",
			date: "2026-11-03",
			title: "Mobile money",
			image: { src: "/placeholders/product-payment.svg", alt: "A payment page offering card and mobile money", width: 1280, height: 800 },
			added: ["Clients can pay by mobile money in Cameroon, Senegal and Côte d'Ivoire."],
			improved: ["The payment page loads in half the time on a slow connection."],
			fixed: ["A paid invoice no longer sends one last reminder."],
		},
	],
	labels: {
		added: "Added",
		improved: "Improved",
		fixed: "Fixed",
		all: "All",
		filter: "Filter releases",
		shown: "{count} of {total} releases",
		more: "Read the release",
	},
};
