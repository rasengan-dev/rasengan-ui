import { z } from "zod";

import { listing } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional(),
	title: z.string().min(2).max(60).describe("'To rent and to buy'."),
	subline: z.string().max(180).optional(),
	listings: z.array(listing).min(1).max(200).describe("In the order shown by default; each links to its page."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		periods: z
			.object({ once: z.string().max(16), month: z.string().max(16), week: z.string().max(16), night: z.string().max(16) })
			.describe("After a price: '' for a sale, 'a month', 'a week', 'a night'."),
		reviews: z.string().min(1).max(24).describe("'{count} reviews'"),
		none: z.string().min(1).max(60).describe("When the filters leave nothing: 'No home matches these filters.'"),
		reset: z.string().min(1).max(24).describe("Clears the filters: 'Show every home'."),
		shown: z.string().min(1).max(40).describe("Read when the list changes: '{count} homes'."),
	}),
});

export type ListingCardsContent = z.infer<typeof schema>;
