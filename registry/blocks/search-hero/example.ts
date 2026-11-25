import type { SearchHeroContent } from "./schema";

export const example: SearchHeroContent = {
	eyebrow: "Nyanga · homes in Douala and Kribi",
	title: "Find the home that fits your days",
	subline: "Flats, houses and villas to rent or buy, visited by us before they are listed.",
	image: { src: "/placeholders/place-villa.svg", alt: "A white villa with a pool and loungers among palm trees", width: 1200, height: 900 },
	action: "/homes#listings",
	fields: {
		query: { label: "What are you looking for?", placeholder: "A balcony, a garden, a pool…" },
		kind: { label: "Type", any: "Any type", options: ["Apartment", "House", "Studio", "Villa"] },
		place: { label: "Where", any: "Anywhere", options: ["Douala", "Kribi"] },
	},
	submit: "Search",
	suggestions: [
		{ label: "Furnished flats", href: "/homes?kind=Apartment&q=furnished#listings" },
		{ label: "Villas by the sea", href: "/homes?kind=Villa&place=Kribi#listings" },
		{ label: "To buy", href: "/homes?status=For%20sale#listings" },
	],
	labels: { search: "Search homes", suggestions: "Popular" },
};
