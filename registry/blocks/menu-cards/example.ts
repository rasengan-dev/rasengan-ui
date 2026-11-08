import type { MenuCardsContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });
const photo = (name: string, alt: string) => ({ src: `/placeholders/dish-${name}.svg`, alt, width: 1200, height: 900 });

export const example: MenuCardsContent = {
	title: "Our signature dishes",
	subline: "The plates people cross the city for, cooked every day from the morning market.",
	dishes: [
		{
			name: "Ndolé with prawns",
			description: "Bitter leaves, peanuts and prawns, with fried plantain.",
			price: xaf(4500),
			tags: ["house favourite"],
			image: photo("stew", "A bowl of dark green ndolé topped with prawns."),
		},
		{
			name: "Braised bar fish",
			description: "Whole fish from the grill, onions, pepper and miondo.",
			price: xaf(6000),
			tags: ["spicy"],
			image: photo("fish", "A whole grilled fish on a plate with sliced onions."),
		},
		{
			name: "Plantain and beans",
			description: "Ripe plantain, red beans in palm oil.",
			price: xaf(2500),
			tags: ["vegetarian"],
			image: photo("plantain", "Fried ripe plantain beside a bowl of red beans."),
		},
		{
			name: "Avocado and tomato salad",
			description: "With onions, lime and pepper.",
			price: xaf(2000),
			tags: ["vegetarian"],
			image: photo("salad", "A salad of avocado, tomato and red onion."),
		},
		{
			name: "Puff-puff and fruit",
			description: "Warm doughnuts, pineapple and papaya.",
			price: xaf(1500),
			image: photo("dessert", "Golden puff-puff beside slices of pineapple and papaya."),
		},
		{
			name: "Poulet DG",
			description: "Chicken, plantain, carrots and green beans.",
			price: xaf(5500),
			tags: ["new"],
			image: photo("stew", "A plate of chicken stewed with plantain and vegetables."),
		},
	],
	order: { channel: { kind: "whatsapp", to: "+237 6 99 00 00 00" }, label: "Order", message: "Hello, I would like to order:" },
	cta: { label: "See the whole menu", href: "#menu" },
	locale: "en-CM",
};
