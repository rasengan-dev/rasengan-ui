import type { PricingComparisonContent } from "./schema";

const usd = (amount: number) => ({ amount, currency: "USD" });

export const example: PricingComparisonContent = {
	title: "Compare plans",
	subline: "Every plan sends unlimited invoices. The difference is people, automation and support.",
	plans: [
		{ name: "Solo", price: usd(0), period: "month", description: "For a freelancer starting out.", cta: { label: "Start free", href: "/signup" } },
		{
			name: "Studio",
			price: usd(19),
			period: "month",
			description: "For a small team.",
			cta: { label: "Try Studio free", href: "/signup?plan=studio" },
			highlighted: true,
		},
		{ name: "Agency", price: usd(49), period: "month", description: "For many clients and projects.", cta: { label: "Talk to us", href: "/contact" } },
	],
	groups: [
		{
			name: "Invoicing",
			rows: [
				{ label: "Invoices and quotes", values: ["Unlimited", "Unlimited", "Unlimited"] },
				{ label: "Recurring invoices", values: [false, true, true] },
				{ label: "Your logo and colours", values: [true, true, true] },
				{ label: "Client portal", values: [false, false, true] },
			],
		},
		{
			name: "Payments",
			rows: [
				{ label: "Card and bank transfer", values: [true, true, true] },
				{ label: "Mobile money", values: [false, true, true] },
				{ label: "Reminders", values: ["2 emails", "Custom", "Custom"] },
			],
		},
		{
			name: "Team and support",
			rows: [
				{ label: "People", values: ["1", "Up to 5", "Unlimited"] },
				{ label: "Accounting exports", values: [false, true, true] },
				{ label: "Support", values: ["Email", "Email and chat", "Priority"] },
			],
		},
	],
	highlightLabel: "Most popular",
	periods: { month: "/ month", year: "/ year", once: "once" },
	labels: { feature: "Feature", included: "Included", notIncluded: "Not included" },
	locale: "en-US",
	note: "Prices exclude taxes. Every paid plan starts with 14 free days.",
};
