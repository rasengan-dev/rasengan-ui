import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "changelog",
	title: "Changelog",
	family: "marketing",
	category: "changelog",
	status: "beta",
	added: "2026-11-24",
	summary: "Releases newest first: version and date in a rail, what was added, improved and fixed, a screenshot, a filter by kind.",
	useWhen: "A product's changelog page, or its latest releases on the home page.",
	avoidWhen: "Release notes for developers with hundreds of entries: generate them from your repository instead.",
	layout: { columns: "split" },
	content: { images: 2, minWords: 40, maxWords: 1200 },
	components: ["chip", "badge", "button"],
	pairsWith: ["waitlist", "cta-banner"],
} as const satisfies BlockMeta;
