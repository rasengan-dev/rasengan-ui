import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'How it works'."),
	title: z.string().min(8).max(70).describe("The whole journey in a line: 'From quote to paid in three steps'."),
	subline: z.string().max(180).optional(),
	steps: z
		.array(
			z.object({
				title: z.string().min(2).max(48).describe("A verb first: 'Send the invoice'."),
				description: z.string().min(20).max(220),
				image: image.describe("What the step looks like in the product, landscape (16:10)."),
			}),
		)
		.min(2)
		.max(5)
		.describe("In order. Each step's image takes the stage while its text is in the middle of the screen."),
});

export type StepsScrollContent = z.infer<typeof schema>;
