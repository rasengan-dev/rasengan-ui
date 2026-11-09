import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "contact-form",
	title: "Contact, form",
	family: ["marketing", "storefront"],
	category: "contact",
	status: "beta",
	added: "2026-11-09",
	summary: "Name, email, a subject and a message beside your other contact details; sends as a WhatsApp, text or email message.",
	useWhen: "A product's support or sales page, or a business taking requests (events, catering, quotes) without a backend.",
	avoidWhen: "Several ways to reach you and no form needed: contact-links.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 15, maxWords: 80 },
	components: ["button", "field", "input", "label", "radio-group", "textarea"],
	pairsWith: ["faq-accordion", "location-map"],
} as const satisfies BlockMeta;
