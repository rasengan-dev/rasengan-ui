import type { GalleryGridContent } from "./schema";

export const example: GalleryGridContent = {
	title: "From our kitchen",
	subline: "The room, the terrace and a few of the dishes people come back for.",
	photos: [
		{ src: "/placeholders/restaurant-room.svg", alt: "The dining room: wooden tables and stools under warm lights.", width: 1200, height: 900, caption: "The dining room, thirty seats." },
		{ src: "/placeholders/dish-fish.svg", alt: "A grilled fish with fried plantain, red onions and lime.", width: 1200, height: 900, caption: "Grilled bar fish, every evening." },
		{ src: "/placeholders/dish-plantain.svg", alt: "Fried ripe plantain in two warming trays.", width: 1200, height: 900, caption: "Plantains, fried to order." },
		{ src: "/placeholders/dish-salad.svg", alt: "A bowl of avocado, tomatoes and greens.", width: 1200, height: 900 },
		{ src: "/placeholders/kitchen.svg", alt: "A chef plating a dish.", width: 1000, height: 1200, caption: "Where it all happens." },
		{ src: "/placeholders/dish-dessert.svg", alt: "A bowl of golden puff-puff.", width: 1200, height: 900, caption: "Puff-puff, warm from the pan." },
	],
	labels: { previous: "Previous photo", next: "Next photo" },
};
