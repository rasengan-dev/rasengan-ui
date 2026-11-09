import type { MenuCategoriesContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });

export const example: MenuCategoriesContent = {
	title: "Our menu",
	subline: "Cooked every morning with what came in from the market. Some dishes run out by evening.",
	categories: [
		{
			name: "Starters",
			items: [
				{ name: "Accra beans", description: "Black-eyed pea fritters with a fresh pepper sauce.", price: xaf(1500), tags: ["vegetarian"] },
				{ name: "Pepper soup", description: "Goat, njansang and hot spices, served in a bowl.", price: xaf(2500), tags: ["spicy"] },
				{ name: "Avocado salad", description: "Avocado, tomato, onion and lime.", price: xaf(1500), tags: ["vegan"] },
			],
		},
		{
			name: "Mains",
			items: [
				{ name: "Ndolé", description: "Bitter leaves, peanuts and prawns, with plantains or miondo.", price: xaf(4500), tags: ["Friday"] },
				{ name: "Grilled fish", description: "Whole bar fish grilled over wood, with bobolo and pepper.", price: xaf(5500) },
				{ name: "Poulet DG", description: "Chicken with fried plantains, carrots and green beans.", price: xaf(5000), tags: ["new"] },
				{ name: "Eru", description: "Eru and waterleaf with smoked fish and beef, with garri.", price: xaf(4000) },
			],
		},
		{
			name: "Sides",
			items: [
				{ name: "Fried plantains", price: xaf(1000), tags: ["vegan"] },
				{ name: "Miondo", description: "Fermented cassava sticks.", price: xaf(500) },
				{ name: "Rice", price: xaf(500) },
			],
		},
		{
			name: "Drinks",
			items: [
				{ name: "Foléré", description: "Hibiscus juice with ginger, cold.", price: xaf(800) },
				{ name: "Fresh pineapple juice", price: xaf(1000) },
				{ name: "Mineral water", price: xaf(500) },
			],
		},
	],
	locale: "en-CM",
	note: "Prices include taxes. Ask us about allergens.",
};
