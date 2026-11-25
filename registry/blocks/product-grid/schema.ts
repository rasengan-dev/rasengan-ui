import { z } from "zod";

import { product } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'The shop'"),
	title: z.string().min(2).max(60).describe("'Everything for the home'."),
	subline: z.string().max(180).optional(),
	products: z.array(product).min(1).max(48).describe("In the order shown by default ('featured'); each links to its page."),
	controls: z.boolean().optional().describe("false hides the filter and the sort: a short 'You may also like' row. Shown by default."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		all: z.string().min(1).max(16).describe("The chip that shows every product: 'All'."),
		filter: z.string().min(1).max(40).describe("Names the category chips for screen readers: 'Filter by category'."),
		sort: z.string().min(1).max(16).describe("'Sort by'"),
		sorts: z.object({
			featured: z.string().min(1).max(20).describe("The content's own order: 'Featured'."),
			priceLow: z.string().min(1).max(20).describe("'Lowest price'"),
			priceHigh: z.string().min(1).max(20).describe("'Highest price'"),
			rating: z.string().min(1).max(20).describe("'Top rated'; offered when a product has a rating."),
		}),
		shown: z.string().min(1).max(40).describe("Read when the list changes: '{count} products shown'."),
		was: z.string().min(1).max(16).describe("Before a struck price, for screen readers: 'Was'."),
		reviews: z.string().min(1).max(24).describe("'{count} reviews'"),
	}),
});

export type ProductGridContent = z.infer<typeof schema>;
