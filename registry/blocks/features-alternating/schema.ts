import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional(),
	title: z.string().min(8).max(70),
	subline: z.string().max(180).optional(),
	rows: z
		.array(
			z.object({
				label: z.string().max(24).optional().describe("A word above the row's title: 'Invoices'."),
				title: z.string().min(4).max(60).describe("The benefit: 'Invoices that write themselves'."),
				description: z.string().min(20).max(220),
				points: z.array(z.string().min(2).max(60)).max(3).optional().describe("Up to three short facts, ticked."),
				cta: cta.optional(),
				image: image.describe("What the row describes, landscape (16:10)."),
			}),
		)
		.min(2)
		.max(5)
		.describe("Rows alternate: image right, then left. Two to four read best."),
});

export type FeaturesAlternatingContent = z.infer<typeof schema>;
