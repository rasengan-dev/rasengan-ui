import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "footer-wordmark",
	title: "Footer, wordmark",
	family: "marketing",
	category: "footer",
	status: "beta",
	added: "2026-11-09",
	summary: "The link columns, copyright and social links of footer-columns, with the brand set huge along the bottom edge.",
	useWhen: "A brand with a short name and a confident page: it ends the page on the name.",
	avoidWhen: "A long name, or a quiet page: footer-columns.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 15, maxWords: 80 },
	components: ["separator"],
	pairsWith: ["cta-app", "newsletter-inline"],
} as const satisfies BlockMeta;
