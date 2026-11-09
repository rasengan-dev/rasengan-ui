import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "cta-banner",
	title: "Call to action, banner",
	family: "marketing",
	category: "cta",
	status: "beta",
	added: "2026-11-08",
	summary: "A framed band with a headline revealed word by word, a line of reassurance, two calls to action and small print.",
	useWhen: "Near the end of a page, to turn interest into one clear action.",
	avoidWhen: "More than two actions to offer; a page without a clear next step.",
	layout: { columns: "stacked" },
	content: { images: 0, minWords: 8, maxWords: 45 },
	components: ["button", "text-reveal"],
	pairsWith: ["footer-columns"],
} as const satisfies BlockMeta;
