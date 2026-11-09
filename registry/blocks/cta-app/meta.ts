import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "cta-app",
	title: "Call to action, app",
	family: "marketing",
	category: "cta",
	status: "beta",
	added: "2026-11-09",
	summary: "Get the app: the promise, ticked facts and a link per store, beside the app's screen in a phone frame.",
	useWhen: "A product with a mobile app worth installing, near the end of a page.",
	avoidWhen: "A web product only: cta-banner.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 10, maxWords: 60 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["testimonials-wall", "footer-wordmark"],
} as const satisfies BlockMeta;
