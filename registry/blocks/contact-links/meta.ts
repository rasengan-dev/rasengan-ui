import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "contact-links",
	title: "Contact, links",
	family: "storefront",
	category: "contact",
	status: "beta",
	added: "2026-11-08",
	summary: "Every way to reach the business as a grid of cards: WhatsApp, phone, email and social profiles, each one tap away.",
	useWhen: "Near the end of a local business's page, so people can reach it the way they prefer.",
	avoidWhen: "A long contact form is needed: link to it instead.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 6, maxWords: 60 },
	components: [],
	dependencies: ["lucide-react"],
	pairsWith: ["footer-columns"],
} as const satisfies BlockMeta;
