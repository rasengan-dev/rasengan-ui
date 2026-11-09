import type { MenuListContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });

export const example: MenuListContent = {
	eyebrow: "Served from noon to eleven",
	title: "The menu",
	subline: "Cooked to order from the morning market. Ask us what came in today.",
	categories: [
		{
			name: "Starters",
			items: [
				{ name: "Pepper soup", description: "Goat, njansang and country onions.", price: xaf(2500) },
				{ name: "Accra beans", description: "Black-eyed pea fritters, hot pepper sauce.", price: xaf(1500), tags: ["vegetarian"] },
				{ name: "Avocado salad", price: xaf(2000), tags: ["vegetarian"] },
			],
		},
		{
			name: "From the grill",
			items: [
				{ name: "Braised bar fish", description: "Whole, with miondo or plantain.", price: xaf(6000), tags: ["spicy"] },
				{ name: "Soya skewers", description: "Beef, suya spices, raw onions.", price: xaf(3000) },
				{ name: "Half chicken", description: "Marinated overnight in ginger and garlic.", price: xaf(5000) },
			],
		},
		{
			name: "From the pot",
			items: [
				{ name: "Ndolé", description: "With prawns or beef, fried plantain.", price: xaf(4500) },
				{ name: "Eru and waterfufu", price: xaf(4000) },
				{ name: "Poulet DG", description: "Chicken, plantain, carrots, green beans.", price: xaf(5500), tags: ["new"] },
			],
		},
		{
			name: "Drinks",
			items: [
				{ name: "Folere", description: "Hibiscus, ginger and mint, made here.", price: xaf(1000) },
				{ name: "Fresh pineapple juice", price: xaf(1200) },
				{ name: "Palm wine", description: "When the tapper comes by.", price: xaf(800) },
			],
		},
	],
	locale: "en-CM",
	note: "Prices include taxes. Tell us about allergies: most dishes can be made without peanuts.",
};
