import type { TeamGridContent } from "./schema";

const portrait = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: TeamGridContent = {
	eyebrow: "Our team",
	title: "The people behind Senbon",
	subline: "Eleven of us across three time zones, most of us former freelancers who hated chasing invoices.",
	members: [
		{
			name: "Nadia Ekotto",
			role: "Co-founder, CEO",
			image: portrait("founder", "Nadia, in a yellow blazer, holding a tablet."),
			bio: "Ran a design studio for eight years before deciding invoicing should be the easy part.",
			links: [{ label: "LinkedIn", href: "https://www.linkedin.com/" }],
		},
		{
			name: "Kofi Mensah",
			role: "Co-founder, CTO",
			image: portrait("man-3", "Kofi, in a blue suit, smiling."),
			bio: "Built payment systems in Accra and Lagos; now makes mobile money boring, in a good way.",
			links: [
				{ label: "GitHub", href: "https://github.com/" },
				{ label: "LinkedIn", href: "https://www.linkedin.com/" },
			],
		},
		{
			name: "Léa Martin",
			role: "Head of design",
			image: portrait("woman-4", "Léa, laughing, in a checked shirt."),
			bio: "Believes a good invoice reads like a thank-you note.",
		},
		{ name: "Amara Diallo", role: "Engineer, payments", image: portrait("woman-3", "Amara, smiling, in a black top.") },
		{ name: "Joel Tchami", role: "Engineer, mobile", image: portrait("man-1", "Joel, smiling, outdoors.") },
		{ name: "Sarah Owusu", role: "Customer success", image: portrait("woman-1", "Sarah, smiling broadly.") },
	],
	cta: { label: "We're hiring: see open roles", href: "/careers" },
};
