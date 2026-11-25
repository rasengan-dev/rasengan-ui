import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "listing-detail",
	title: "Listing detail",
	family: "listings",
	category: "listing",
	status: "beta",
	added: "2026-11-25",
	summary: "A listing's page: title, status and price, a mosaic of photos in full screen, facts, description, amenities, and an enquiry sent by message.",
	useWhen: "The page of one home, place or rental, opened from listing-cards: people read it, then ask to visit.",
	avoidWhen: "A product with options and a cart: product-detail.",
	layout: { columns: "split", aboveTheFold: true },
	content: { images: 3, minWords: 80, maxWords: 700 },
	components: ["lightbox", "field", "input", "textarea", "button", "badge", "rating"],
	pairsWith: ["listing-cards", "faq-accordion", "contact-form"],
} as const satisfies BlockMeta;
