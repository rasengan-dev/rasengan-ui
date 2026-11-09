import type { FooterWordmarkContent } from "./schema";

export const example: FooterWordmarkContent = {
	brand: { name: "Senbon", href: "/", tagline: "Invoices, payments and reminders for small studios." },
	columns: [
		{ title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Integrations", href: "#integrations" }] },
		{ title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "#contact" }] },
		{ title: "Legal", links: [{ label: "Terms", href: "/terms" }, { label: "Privacy", href: "/privacy" }] },
	],
	legal: "© 2026 Senbon Ltd. All rights reserved.",
	social: [
		{ label: "LinkedIn", href: "https://www.linkedin.com/" },
		{ label: "Instagram", href: "https://www.instagram.com/" },
	],
};
