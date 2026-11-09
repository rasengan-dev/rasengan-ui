import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "faq-accordion",
	title: "FAQ, accordion",
	family: "marketing",
	category: "faq",
	status: "beta",
	added: "2026-11-08",
	summary: "A title beside three to twelve questions that open one by one, and a contact link; closed answers stay findable.",
	useWhen: "Answering objections near the pricing or the end of a page.",
	avoidWhen: "Long documentation answers: link to the docs instead.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 60, maxWords: 600 },
	components: ["accordion", "button"],
	pairsWith: ["cta-banner", "footer-columns"],
} as const satisfies BlockMeta;
