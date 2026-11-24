import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "gallery-horizontal",
	title: "Gallery, horizontal",
	family: "portfolio",
	category: "gallery",
	status: "beta",
	added: "2026-11-24",
	summary: "Photos in a row that pins and moves sideways as the page scrolls, numbered, each opening full screen; a swipeable row on phones.",
	useWhen: "A photographer's series or a project's pictures, seen one after another rather than all at once.",
	avoidWhen: "Photos to compare side by side: gallery-grid shows them together.",
	layout: { columns: "carousel" },
	content: { images: 6, minWords: 10, maxWords: 120 },
	components: ["horizontal-scroll", "lightbox"],
	pairsWith: ["case-study", "contact-form"],
} as const satisfies BlockMeta;
