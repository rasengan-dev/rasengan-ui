import type { GallerySocialContent } from "./schema";

const photo = (file: string, alt: string, width = 1200, height = 900) => ({ src: `/placeholders/${file}.svg`, alt, width, height });

export const example: GallerySocialContent = {
	title: "From our kitchen",
	subline: "What came out of the pots this week. Tag us when you eat with us.",
	account: { handle: "@mamangono", href: "https://www.instagram.com/", follow: "Follow us" },
	photos: [
		photo("dish-stew", "A bowl of ndolé topped with prawns."),
		photo("restaurant-room", "The dining room, set for dinner."),
		photo("dish-fish", "A whole grilled fish with onions."),
		photo("person-chef", "Our chef in his whites, smiling.", 600, 750),
		photo("dish-plantain", "Fried plantain and red beans."),
		photo("kitchen", "The open kitchen during the lunch rush."),
		photo("dish-salad", "An avocado and tomato salad."),
		photo("person-woman-1", "A guest laughing at the table.", 600, 750),
		photo("dish-dessert", "Puff-puff with pineapple and papaya."),
	],
};
