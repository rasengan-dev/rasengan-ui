import { z } from "zod";

import { image } from "@/lib/block-fields";

const choice = z.object({
	label: z.string().min(1).max(24).describe("'Type', 'Area'"),
	any: z.string().min(1).max(24).describe("The choice that keeps every value: 'Any type'."),
	options: z.array(z.string().min(1).max(32)).min(1).max(16).describe("As the listings write them: 'Apartment', 'Douala'."),
});

export const schema = z.object({
	eyebrow: z.string().max(40).optional(),
	title: z.string().min(4).max(70).describe("'Find a home in Douala and Kribi'."),
	subline: z.string().max(180).optional(),
	image: image.describe("A wide photo of the places listed; the search panel sits over its lower edge."),
	action: z.string().min(1).describe("The list page the search opens, with its section: '/homes#listings'. On that page, the list filters in place."),
	fields: z.object({
		query: z.object({ label: z.string().min(1).max(40).describe("'What are you looking for?'"), placeholder: z.string().max(60).optional() }),
		kind: choice.optional().describe("Matches the listings' kind."),
		place: choice.optional().describe("Matches the listings' place: a city or an area."),
	}),
	submit: z.string().min(1).max(20).describe("'Search'"),
	suggestions: z
		.array(z.object({ label: z.string().min(1).max(24), href: z.string().min(1).describe("A search already made: '/homes?kind=Villa#listings'.") }))
		.max(6)
		.optional(),
	labels: z.object({
		search: z.string().min(1).max(32).describe("Names the form for screen readers: 'Search homes'."),
		suggestions: z.string().min(1).max(24).describe("Before the suggestions: 'Popular'."),
	}),
});

export type SearchHeroContent = z.infer<typeof schema>;
