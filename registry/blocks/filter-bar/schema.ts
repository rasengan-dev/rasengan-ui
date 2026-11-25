import { z } from "zod";

import { facet, listing } from "@/lib/block-fields";

export const schema = z.object({
	items: z.array(listing).min(1).max(200).describe("The same listings listing-cards shows: the bar counts them, bounds the price, and offers their values."),
	facets: z
		.array(facet)
		.min(1)
		.max(6)
		.describe("In order. choice: chips on 'kind', 'status', 'place' or 'tags'; range: a slider on 'price'; atLeast: a number on a fact's label ('beds')."),
	search: z.object({ label: z.string().min(1).max(32), placeholder: z.string().max(60).optional() }).optional().describe("A words field, shared with search-hero."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		filters: z.string().min(1).max(32).describe("Names the bar for screen readers: 'Filter homes'."),
		reset: z.string().min(1).max(16).describe("'Reset'"),
		sort: z.string().min(1).max(16).describe("'Sort by'"),
		sorts: z.object({
			featured: z.string().min(1).max(20).describe("The content's own order: 'Recommended'."),
			priceLow: z.string().min(1).max(20),
			priceHigh: z.string().min(1).max(20),
			rating: z.string().min(1).max(20).describe("Offered when a listing has a rating."),
		}),
		shown: z.string().min(1).max(40).describe("'{count} homes', shown and read as the filters change."),
		atLeast: z.string().min(1).max(24).describe("Beside a number: 'or more'."),
	}),
});

export type FilterBarContent = z.infer<typeof schema>;
