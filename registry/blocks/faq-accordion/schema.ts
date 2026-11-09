import { z } from "zod";

import { cta, faqItem } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(6).max(70).describe("Usually 'Questions, answered' or 'Frequently asked questions'."),
	subline: z.string().max(180).optional(),
	items: z.array(faqItem).min(3).max(12).describe("The questions people actually ask before buying, in their words."),
	contact: z
		.object({ text: z.string().min(6).max(80).describe("'Still have a question?'"), cta })
		.optional()
		.describe("A way out for a question not on the list."),
});

export type FaqAccordionContent = z.infer<typeof schema>;
