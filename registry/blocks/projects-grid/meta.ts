import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "projects-grid",
	title: "Projects, grid",
	family: "portfolio",
	category: "projects",
	status: "beta",
	added: "2026-11-24",
	summary: "Projects as cards with their cover, title, kind and year, filtered by kind with a count on each filter.",
	useWhen: "A studio's or a designer's work page, with enough projects (six or more) to want a filter by kind.",
	avoidWhen: "Three projects or fewer: projects-list or case studies read better.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 30, maxWords: 300 },
	components: ["chip"],
	pairsWith: ["projects-list", "contact-form"],
} as const satisfies BlockMeta;
