import type { CareersContent } from "./schema";

export const example: CareersContent = {
	eyebrow: "Careers",
	title: "Open roles",
	subline: "Eleven of us across three time zones. We hire slowly, pay fairly, and write things down.",
	positions: [
		{ title: "Senior backend engineer", team: "Engineering", place: "Remote, Europe or Africa", kind: "full-time", href: "/careers/backend-engineer" },
		{ title: "Mobile engineer", team: "Engineering", place: "Douala or remote", kind: "full-time", href: "/careers/mobile-engineer" },
		{ title: "Product designer", team: "Design", place: "Paris or remote", kind: "full-time", href: "/careers/product-designer" },
		{ title: "Illustrator for the help centre", team: "Design", place: "Remote", kind: "freelance", href: "/careers/illustrator" },
		{ title: "Customer success, francophone Africa", team: "Customers", place: "Abidjan", kind: "contract", href: "/careers/customer-success" },
	],
	cta: { label: "Send us your work", href: "mailto:jobs@senbon.example" },
	labels: {
		all: "All teams",
		filter: "Filter roles by team",
		none: "No open roles right now. We still read every letter.",
		kinds: { "full-time": "Full time", "part-time": "Part time", contract: "Contract", internship: "Internship", freelance: "Freelance" },
		view: "View the role",
	},
};
