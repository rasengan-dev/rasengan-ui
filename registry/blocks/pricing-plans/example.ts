import type { PricingPlansContent } from "./schema";

export const example: PricingPlansContent = {
	title: "Simple pricing that grows with you",
	subline: "Every plan sends unlimited invoices. Pay for the people and the automation you need.",
	plans: [
		{
			name: "Solo",
			price: { amount: 0, currency: "USD" },
			period: "month",
			description: "For a freelancer starting out.",
			features: ["Unlimited invoices", "Card and bank payments", "Two reminder emails"],
			cta: { label: "Start free", href: "/signup" },
			highlighted: false,
		},
		{
			name: "Studio",
			price: { amount: 19, currency: "USD" },
			period: "month",
			yearly: { amount: 190, currency: "USD" },
			description: "For a small team with regular clients.",
			features: ["Everything in Solo", "Up to five people", "Recurring invoices", "Mobile money", "Custom reminders"],
			cta: { label: "Try Studio free", href: "/signup?plan=studio" },
			highlighted: true,
		},
		{
			name: "Agency",
			price: { amount: 49, currency: "USD" },
			period: "month",
			yearly: { amount: 490, currency: "USD" },
			description: "For agencies with many clients and projects.",
			features: ["Everything in Studio", "Unlimited people", "Client portal", "Accounting exports", "Priority support"],
			cta: { label: "Talk to us", href: "/contact" },
			highlighted: false,
		},
	],
	highlightLabel: "Most popular",
	periods: { month: "/ month", year: "/ year", once: "once" },
	billing: { label: "Billing period", month: "Monthly", year: "Yearly", saving: "2 months free" },
	locale: "en-US",
	note: "Prices exclude taxes. Every paid plan starts with 14 free days.",
};
