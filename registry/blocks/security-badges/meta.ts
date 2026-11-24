import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "security-badges",
	title: "Security, badges",
	family: "marketing",
	category: "trust",
	status: "beta",
	added: "2026-11-24",
	summary: "Security and compliance points as tiles: an icon, the name, a line, and whether it is certified or in progress.",
	useWhen: "A SaaS home or pricing page that handles business data and needs to answer the security question early.",
	avoidWhen: "Certifications you do not have yet presented as done: mark them in progress, or leave them out.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 20, maxWords: 200 },
	components: ["badge", "button"],
	pairsWith: ["customer-stories", "pricing-plans"],
} as const satisfies BlockMeta;
