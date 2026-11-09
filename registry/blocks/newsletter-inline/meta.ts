import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "newsletter-inline",
	title: "Newsletter, inline",
	family: "marketing",
	category: "newsletter",
	status: "beta",
	added: "2026-11-09",
	summary: "A band asking for an email address: the promise beside a field and a button, posting to your newsletter provider.",
	useWhen: "A product or a studio with a newsletter worth reading, above the footer or between sections.",
	avoidWhen: "No provider or endpoint to post to yet.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 10, maxWords: 50 },
	components: ["button", "field", "input"],
	pairsWith: ["footer-columns", "cta-banner"],
} as const satisfies BlockMeta;
