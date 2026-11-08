import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "footer-columns",
	title: "Footer, columns",
	family: "marketing",
	category: "footer",
	status: "beta",
	added: "2026-11-08",
	summary: "The product's name and tagline, up to four columns of links, the copyright line and social profiles.",
	useWhen: "At the bottom of every marketing page.",
	avoidWhen: "A single-page site with three links: a one-line footer reads better.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 10, maxWords: 80 },
	components: ["separator"],
} as const satisfies BlockMeta;
