import type { SecurityBadgesContent } from "./schema";

export const example: SecurityBadgesContent = {
	eyebrow: "Security",
	title: "Your clients' data, kept like ours",
	subline: "Invoices hold names, addresses and amounts. Here is how we look after them.",
	points: [
		{ name: "GDPR", description: "Data stays in the EU; you can export or delete it at any time.", icon: "globe", status: "certified" },
		{ name: "Encryption", description: "TLS 1.3 in transit, AES-256 at rest, keys rotated every quarter.", icon: "lock" },
		{ name: "SOC 2 Type II", description: "The audit started in September; the report comes in spring.", icon: "shield", status: "in-progress" },
		{ name: "99.95% uptime", description: "Over the last twelve months, on our public status page.", icon: "server" },
	],
	cta: { label: "Read our security page", href: "/security" },
	labels: { certified: "Certified", inProgress: "In progress" },
};
