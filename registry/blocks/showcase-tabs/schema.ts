import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'The product'."),
	title: z.string().min(8).max(70),
	subline: z.string().max(180).optional(),
	tabs: z
		.array(
			z.object({
				label: z.string().min(2).max(20).describe("The tab: one or two words, 'Invoices', 'Payments'."),
				title: z.string().min(4).max(60).describe("What this part does for the reader."),
				description: z.string().min(20).max(220),
				points: z.array(z.string().min(2).max(60)).max(4).optional().describe("Up to four short facts, ticked."),
				cta: cta.optional(),
				image: image.describe("The part of the product, landscape (16:10)."),
			}),
		)
		.min(2)
		.max(5),
});

export type ShowcaseTabsContent = z.infer<typeof schema>;
