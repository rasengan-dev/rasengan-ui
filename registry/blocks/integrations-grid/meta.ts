import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "integrations-grid",
	title: "Integrations, grid",
	family: "marketing",
	category: "integrations",
	status: "beta",
	added: "2026-11-24",
	summary: "Integration cards in a grid: logo, name, category and a line, filtered by category and by a search, each to its page.",
	useWhen: "A SaaS integrations page, or its section, with more integrations than a logo strip can name.",
	avoidWhen: "A handful of integrations to show off: integrations-orbit draws them around your logo.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 30, maxWords: 400 },
	components: ["chip", "badge", "input"],
	pairsWith: ["customer-stories", "cta-banner"],
} as const satisfies BlockMeta;
