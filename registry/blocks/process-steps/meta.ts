import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "process-steps",
	title: "Steps, process",
	family: ["marketing", "portfolio"],
	category: "steps",
	status: "beta",
	added: "2026-11-24",
	summary: "Three to six numbered steps in cards: the number in the tone, a title and a line; they come in one after another.",
	useWhen: "How a product works, or how a studio runs a project, in a few plain steps without a pinned scroll.",
	avoidWhen: "Steps that need a picture each and room to breathe: steps-scroll pins them beside their images.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 30, maxWords: 200 },
	components: ["button"],
	pairsWith: ["hero-product", "pricing-plans"],
} as const satisfies BlockMeta;
