import { z } from "zod";

import { ratingSummary, review } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'What our guests say', 'Reviews'."),
	summary: ratingSummary.describe("The average and how many reviews it is over, from where they were left. Real numbers only."),
	reviews: z.array(review).min(3).max(9).describe("Real reviews, in the customers' words; shorten them, never rewrite them."),
	locale: z.string().optional().describe("A BCP 47 locale for the score and dates ('en-CM'); the page's language when left out."),
	labels: z
		.object({
			outOf: z.string().min(1).max(16).describe("After a score: 'out of 5'."),
			reviews: z.string().min(1).max(16).describe("After the count: 'reviews'."),
			on: z.string().max(8).default("on").describe("Before the source: '320 reviews on Google'."),
			readAll: z.string().max(32).optional().describe("The link to all of them: 'Read all reviews'."),
		})
		.describe("The words around the numbers."),
});

export type ReviewsRatingContent = z.input<typeof schema>;
