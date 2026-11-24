import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "careers",
	title: "Careers",
	family: "marketing",
	category: "careers",
	status: "beta",
	added: "2026-11-24",
	summary: "Open roles grouped by team, with where and how, filtered by team, each linking to its page; says so when none are open.",
	useWhen: "A company's careers page, or the open roles at the end of an about page.",
	avoidWhen: "Hundreds of roles from an applicant tracking system: embed its job board instead.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 20, maxWords: 300 },
	components: ["chip", "badge", "button"],
	pairsWith: ["team-grid", "stats-numbers"],
} as const satisfies BlockMeta;
