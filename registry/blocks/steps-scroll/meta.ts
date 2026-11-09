import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "steps-scroll",
	title: "Steps, scroll",
	family: "marketing",
	category: "steps",
	status: "beta",
	added: "2026-11-09",
	summary: "Numbered steps down one column, a stage beside them in view: as each step reaches the middle of the screen, its image takes the stage.",
	useWhen: "A product whose value is a short sequence, two to five steps, each with something to show.",
	avoidWhen: "Steps without a visual each: a plain numbered list in features-grid reads faster.",
	layout: { columns: "split" },
	content: { images: 3, minWords: 40, maxWords: 200 },
	components: [],
	pairsWith: ["features-grid", "pricing-plans"],
} as const satisfies BlockMeta;
