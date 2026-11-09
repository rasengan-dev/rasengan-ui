import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(32).optional().describe("'Our story'"),
	title: z.string().min(6).max(70).describe("The heart of the story in one line: 'Mama Ngono's recipes, since 2009'."),
	paragraphs: z.array(z.string().min(20).max(400)).min(1).max(4).describe("The story in the owner's voice: who, why, what makes it different."),
	image: image.describe("A photo of the owner, the team or the kitchen, portrait or square."),
	signature: z.object({ name: z.string().min(1).max(48), role: z.string().max(48).optional() }).optional().describe("Who tells the story."),
	facts: z
		.array(z.object({ value: z.string().min(1).max(12).describe("'2009', '30', '4.8'"), label: z.string().min(1).max(32).describe("'Opened', 'Seats'") }))
		.max(3)
		.optional(),
});

export type AboutStoryContent = z.infer<typeof schema>;
