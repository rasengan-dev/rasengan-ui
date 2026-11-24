import type { IntegrationsGridContent } from "./schema";

const mark = (name: string) => ({ name: name[0].toUpperCase() + name.slice(1), src: `/placeholders/logo-${name}.svg`, width: 96, height: 96 });

export const example: IntegrationsGridContent = {
	eyebrow: "Integrations",
	title: "Works with the tools you already pay for",
	subline: "Connect your bank, your calendar and your team chat in a few clicks.",
	integrations: [
		{ name: "Kelvo", logo: mark("kelvo"), category: "Payments", description: "Card and mobile money payments, straight from the invoice.", href: "/integrations/kelvo", isNew: true },
		{ name: "Orbel", logo: mark("orbel"), category: "Banking", description: "Match payments to invoices as they reach your account.", href: "/integrations/orbel" },
		{ name: "Nimbra", logo: mark("nimbra"), category: "Chat", description: "Approve an invoice from the message that asks for it.", href: "/integrations/nimbra" },
		{ name: "Tolva", logo: mark("tolva"), category: "Calendar", description: "Bill the hours you booked, from the calendar itself.", href: "/integrations/tolva" },
		{ name: "Vantra", logo: mark("vantra"), category: "Banking", description: "Send payment runs to your bank in one file.", href: "/integrations/vantra" },
		{ name: "Zephly", logo: mark("zephly"), category: "Payments", description: "Recurring payments for retainers and subscriptions.", href: "/integrations/zephly", isNew: true },
	],
	labels: {
		all: "All",
		filter: "Filter by category",
		search: "Search integrations",
		empty: "No integration matches. Try another word.",
		shown: "{count} integrations shown",
		isNew: "New",
		more: "Learn more",
	},
};
