import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "projects-list",
	title: "Projects, list",
	family: "portfolio",
	category: "projects",
	status: "beta",
	added: "2026-11-24",
	summary: "Projects as ruled rows: number, title, client, kind and year; the hovered row's cover floats beside the mouse.",
	useWhen: "An index of work where the names lead and the pictures follow: an agency, an editorial or a minimal portfolio.",
	avoidWhen: "Work that must be judged by its pictures at a glance: projects-grid shows every cover.",
	layout: { columns: "stacked" },
	content: { images: 6, minWords: 30, maxWords: 300 },
	components: ["hover-image-list", "button"],
	pairsWith: ["projects-grid", "awards-list"],
} as const satisfies BlockMeta;
