import type { ProductDetailContent } from "./schema";

const photo = (name: string, alt: string) => ({ src: `/placeholders/shop-${name}.svg`, alt, width: 1000, height: 1250 });

export const example: ProductDetailContent = {
	product: {
		title: "Linen cushion",
		sku: "KAYA-CUSHION",
		price: { amount: 18000, currency: "XAF" },
		was: { amount: 22000, currency: "XAF" },
		images: [
			photo("cushion", "A rust linen cushion under a white one, on a woven rug"),
			photo("cushion-detail", "A close-up of the washed linen of the two cushions"),
		],
		badge: "Bestseller",
		category: "Textiles",
		variants: [
			{ name: "Colour", options: ["Rust", "Natural", "Ink"], soldOut: ["Ink"] },
			{ name: "Size", options: ["45 × 45 cm", "60 × 60 cm"] },
		],
		rating: { score: 4.9, count: 42 },
		summary: "Washed linen, a cover that comes off, a feather insert.",
		details: [
			"Linen woven and washed in Bafoussam, so it is soft from the first day. The cover closes with a hidden zip and goes in the machine at 30 °C.",
			"The insert is filled with feathers and keeps its shape; a cotton insert is made on request.",
		],
		href: "/shop/linen-cushion",
	},
	shop: "kaya",
	notes: [
		{ icon: "truck", text: "Delivered in Douala within two days, free from 50,000 XAF" },
		{ icon: "return", text: "Fourteen days to change your mind" },
	],
	locale: "en-CM",
	labels: {
		add: "Add to bag",
		added: "Added to your bag",
		pick: "Pick a {name} first",
		soldOut: "Sold out",
		quantity: "Quantity",
		less: "One less",
		more: "One more",
		was: "Was",
		reviews: "{count} reviews",
		details: "Details",
		photos: "Photos of the product",
		open: "Open the photos full screen",
		previous: "Previous photo",
		next: "Next photo",
		close: "Close",
	},
};
