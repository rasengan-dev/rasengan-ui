import type { ProductGridContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });
const photo = (name: string, alt: string) => ({ src: `/placeholders/shop-${name}.svg`, alt, width: 1000, height: 1250 });

export const example: ProductGridContent = {
	eyebrow: "The shop",
	title: "Objects for the home",
	subline: "Made by hand in Cameroon, in small runs. Delivered in Douala within two days.",
	products: [
		{
			title: "Clay vases, set of three",
			sku: "KAYA-VASES",
			price: xaf(42000),
			images: [
				photo("vase", "Three hand-shaped clay vases on a concrete plinth"),
				photo("vase-detail", "A close-up of the vases' rough, unglazed clay"),
			],
			badge: "Bestseller",
			category: "Ceramics",
			rating: { score: 4.8, count: 64 },
			summary: "Shaped by hand in Foumban, fired twice, left unglazed.",
			href: "/shop/clay-vases",
		},
		{
			title: "Terracotta cup",
			sku: "KAYA-CUP",
			price: xaf(6500),
			was: xaf(8000),
			images: [photo("mug", "A small terracotta cup on a white table in the sun")],
			category: "Ceramics",
			rating: { score: 4.6, count: 31 },
			summary: "A coffee cup glazed inside only, warm to hold.",
			href: "/shop/terracotta-cup",
		},
		{
			title: "Oak dining chair",
			sku: "KAYA-CHAIR",
			price: xaf(95000),
			images: [
				photo("chair", "A light oak chair with a curved back, against a pale wall"),
				photo("chair-detail", "A close-up of the chair's bolted back and its seat"),
			],
			badge: "New",
			category: "Furniture",
			summary: "Solid oak, bolted at the back, made by our carpenter in Bonabéri.",
			href: "/shop/oak-chair",
		},
		{
			title: "Reading lamp",
			sku: "KAYA-LAMP",
			price: xaf(38000),
			images: [photo("lamp", "A black desk lamp lighting a dark room")],
			category: "Lighting",
			rating: { score: 4.7, count: 18 },
			summary: "A steel arm that holds where you put it.",
			href: "/shop/reading-lamp",
		},
		{
			title: "Woven baskets",
			sku: "KAYA-BASKETS",
			price: xaf(15000),
			images: [
				photo("baskets", "Round and oval woven baskets laid on white boards"),
				photo("baskets-detail", "A close-up of a round basket's braided rim"),
			],
			category: "Textiles",
			summary: "Raffia woven in Bamenda, in three sizes that nest.",
			href: "/shop/woven-baskets",
		},
		{
			title: "Linen cushion",
			sku: "KAYA-CUSHION",
			price: xaf(18000),
			images: [
				photo("cushion", "A rust linen cushion under a white one, on a woven rug"),
				photo("cushion-detail", "A close-up of the washed linen of the two cushions"),
			],
			category: "Textiles",
			rating: { score: 4.9, count: 42 },
			summary: "Washed linen, a cover that comes off, a feather insert.",
			href: "/shop/linen-cushion",
		},
	],
	locale: "en-CM",
	labels: {
		all: "All",
		filter: "Filter by category",
		sort: "Sort by",
		sorts: { featured: "Featured", priceLow: "Lowest price", priceHigh: "Highest price", rating: "Top rated" },
		shown: "{count} products shown",
		was: "Was",
		reviews: "{count} reviews",
	},
};
