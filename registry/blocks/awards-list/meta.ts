import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "awards-list",
	title: "Awards, list",
	family: "portfolio",
	category: "awards",
	status: "beta",
	added: "2026-11-24",
	summary: "Awards as a ruled table: the year, the award and who gave it, the project, each linking to the project.",
	useWhen: "A studio's or a designer's about page, with a handful of awards, shortlists or mentions worth naming.",
	avoidWhen: "One or two awards: say them in a sentence, or as press-logos.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 15, maxWords: 250 },
	components: ["table"],
	pairsWith: ["experience-timeline", "projects-list"],
} as const satisfies BlockMeta;
