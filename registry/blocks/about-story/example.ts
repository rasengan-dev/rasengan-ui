import type { AboutStoryContent } from "./schema";

export const example: AboutStoryContent = {
	eyebrow: "Our story",
	title: "Mama Ngono's recipes, since 2009",
	paragraphs: [
		"It started with four tables in a courtyard and my mother's ndolé. People came for the food and stayed for the evening, so we never left Akwa.",
		"We still cook the way she taught us: the leaves washed by hand, the peanuts ground in the morning, the fish bought before the sun is up. It takes longer. You can taste it.",
	],
	image: { src: "/placeholders/kitchen.svg", alt: "The kitchen, with pans hanging over the stove.", width: 1000, height: 1200 },
	signature: { name: "Esther Ngono", role: "Owner and chef" },
	facts: [
		{ value: "2009", label: "Opened" },
		{ value: "30", label: "Seats inside" },
		{ value: "7", label: "Days a week" },
	],
};
