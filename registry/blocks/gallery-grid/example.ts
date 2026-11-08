import type { GalleryGridContent } from "./schema";

export const example: GalleryGridContent = {
	title: "From our kitchen",
	subline: "The room, the terrace and a few of the dishes people come back for.",
	photos: [
		{ src: "/placeholders/restaurant-room.svg", alt: "The dining room: three round tables under paper lamps.", width: 1200, height: 900, caption: "The dining room, thirty seats." },
		{ src: "/placeholders/dish-fish.svg", alt: "A whole grilled fish with plantain slices on a plate.", width: 1200, height: 900, caption: "Grilled bar fish, every evening." },
		{ src: "/placeholders/dish-plantain.svg", alt: "Fried plantains arranged in a circle around a pepper sauce.", width: 1200, height: 900, caption: "Plantains, fried to order." },
		{ src: "/placeholders/dish-salad.svg", alt: "A green salad with tomatoes on a plate.", width: 1200, height: 900 },
		{ src: "/placeholders/kitchen.svg", alt: "The kitchen: pans hanging over a stove.", width: 1000, height: 1200, caption: "Where it all happens." },
		{ src: "/placeholders/dish-dessert.svg", alt: "A chocolate cake with red berries.", width: 1200, height: 900, caption: "Chocolate cake with bush berries." },
	],
	labels: { previous: "Previous photo", next: "Next photo" },
};
