import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "experience-timeline",
	title: "Experience, timeline",
	family: "portfolio",
	category: "experience",
	status: "beta",
	added: "2026-11-24",
	summary: "A career or a studio's history as ruled rows: the dates, what it was and where, and a line about it.",
	useWhen: "A designer's or a studio's about page: roles held, places worked, milestones.",
	avoidWhen: "A full CV with dozens of lines: link to it as a file instead.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 20, maxWords: 300 },
	components: [],
	pairsWith: ["awards-list", "contact-form"],
} as const satisfies BlockMeta;
