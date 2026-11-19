import type { MenuCardsContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });
const photo = (name: string, alt: string) => ({ src: `/placeholders/dish-${name}.svg`, alt, width: 1200, height: 900 });

export const example: MenuCardsContent = {
	title: "Our signature dishes",
	subline: "The plates people cross the city for, cooked every day from the morning market.",
	dishes: [
		{
			name: "Egusi with assorted meats",
			description: "Ground melon seeds, palm oil and assorted meats, with fried plantain.",
			price: xaf(4500),
			tags: ["house favourite"],
			image: photo("stew", "A bowl of egusi with assorted meats, held in both hands."),
		},
		{
			name: "Braised bar fish",
			description: "Whole fish from the grill, onions, pepper and miondo.",
			price: xaf(6000),
			tags: ["spicy"],
			image: photo("fish", "A grilled fish with fried plantain, red onions and lime."),
		},
		{
			name: "Fried plantain",
			description: "Ripe plantain, fried to order, with pepper sauce.",
			price: xaf(2500),
			tags: ["vegetarian"],
			image: photo("plantain", "Fried ripe plantain in two warming trays."),
		},
		{
			name: "Avocado bowl",
			description: "Avocado, tomatoes, chickpeas, sweet potato and greens.",
			price: xaf(2000),
			tags: ["vegetarian"],
			image: photo("salad", "A bowl of avocado, cherry tomatoes, chickpeas, sweet potato and greens."),
		},
		{
			name: "Puff-puff",
			description: "Warm doughnuts, fried to order.",
			price: xaf(1500),
			image: photo("dessert", "A bowl of golden puff-puff."),
		},
		{
			name: "Poulet DG",
			description: "Chicken, plantain, carrots and green beans.",
			price: xaf(5500),
			tags: ["new"],
			image: photo("chicken", "A plate of chicken with plantain and carrots, held out by a server."),
		},
	],
	order: { channel: { kind: "whatsapp", to: "+237 6 99 00 00 00" }, label: "Order", message: "Hello, I would like to order:" },
	cta: { label: "See the whole menu", href: "#menu" },
	locale: "en-CM",
};
