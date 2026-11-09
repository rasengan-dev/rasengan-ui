import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "showcase-tabs",
	title: "Showcase, tabs",
	family: "marketing",
	category: "showcase",
	status: "beta",
	added: "2026-11-09",
	summary: "The product one part at a time: tabs above a panel with the part's promise, ticked facts and a link beside its screenshot.",
	useWhen: "A product with two to five distinct parts, each with a screen worth showing.",
	avoidWhen: "One screen to show: hero-centered's product shot is enough.",
	layout: { columns: "split" },
	content: { images: 3, minWords: 40, maxWords: 250 },
	components: ["button", "tabs"],
	dependencies: ["lucide-react"],
	pairsWith: ["features-grid", "testimonials-carousel"],
} as const satisfies BlockMeta;
