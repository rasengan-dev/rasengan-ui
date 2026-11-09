import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: cta.optional().describe("A short announcement above the headline, linked: 'New: recurring invoices'."),
	headline: z.string().min(8).max(70).describe("The product's promise in at most nine words: 'Ship invoices before coffee'."),
	subline: z.string().min(20).max(180).describe("Who it is for and what changes for them, in one or two sentences."),
	primary: cta,
	secondary: cta.optional(),
	note: z.string().max(60).optional().describe("Small print under the buttons: 'Free for 14 days, no card needed'."),
	image: image.optional().describe("A product shot, wide (16:10 or so), shown under the text. Its alt says what the screen shows."),
});

export type HeroCenteredContent = z.infer<typeof schema>;
