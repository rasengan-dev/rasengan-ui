import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(48).optional().describe("A few words above the headline: 'Invoicing for small studios'."),
	headline: z.string().min(8).max(70).describe("The promise in at most nine words."),
	subline: z.string().min(20).max(180),
	primary: cta,
	secondary: cta.optional(),
	chips: z
		.array(z.object({ value: z.string().min(1).max(12).describe("'94%', '2 days', '12k'."), label: z.string().min(2).max(32) }))
		.max(3)
		.optional()
		.describe("Up to three real figures, shown over the photo's corners on a wide screen, under it on a narrow one."),
	image: image.describe("A person or the product in use, portrait (4:5). Its alt says who or what it shows."),
});

export type HeroSplitContent = z.infer<typeof schema>;
