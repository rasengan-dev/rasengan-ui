import type { FooterColumnsContent } from "./schema";

export const example: FooterColumnsContent = {
	brand: { name: "Senbon", href: "/", tagline: "Invoices, payments and reminders for small studios." },
	columns: [
		{
			title: "Product",
			links: [
				{ label: "Features", href: "#features" },
				{ label: "Pricing", href: "#pricing" },
				{ label: "Changelog", href: "/changelog" },
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About", href: "/about" },
				{ label: "Customers", href: "/customers" },
				{ label: "Careers", href: "/careers" },
			],
		},
		{
			title: "Resources",
			links: [
				{ label: "Help centre", href: "/help" },
				{ label: "Invoice templates", href: "/templates" },
				{ label: "Contact", href: "/contact" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Terms", href: "/terms" },
				{ label: "Privacy", href: "/privacy" },
			],
		},
	],
	legal: "© 2026 Senbon Ltd. All rights reserved.",
	social: [
		{ label: "LinkedIn", href: "https://www.linkedin.com/" },
		{ label: "Instagram", href: "https://www.instagram.com/" },
	],
};
