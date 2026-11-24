import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "case-study",
	title: "Case study",
	family: "portfolio",
	category: "case-study",
	status: "beta",
	added: "2026-11-24",
	summary: "One project's page: cover, facts, its story in sections, results that roll in, a gallery that opens full screen, the next one.",
	useWhen: "The page each project of a portfolio links to, fed by the same project the lists show.",
	avoidWhen: "A project with no more to say than its cover and a line: link to the work itself instead.",
	layout: { columns: "stacked" },
	content: { images: 5, minWords: 120, maxWords: 1500 },
	components: ["image-reveal", "number-roll", "lightbox"],
	pairsWith: ["projects-grid", "contact-form"],
} as const satisfies BlockMeta;
