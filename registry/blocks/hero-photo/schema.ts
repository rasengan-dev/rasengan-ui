import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(48).optional().describe("What and where, briefly: 'Cameroonian kitchen · Akwa, Douala'."),
	headline: z.string().min(6).max(60).describe("The place's promise, warm and concrete: 'Home cooking, the way Douala likes it'."),
	subline: z.string().min(20).max(180).describe("What people come for, in one or two sentences."),
	primary: cta.describe("The main action: 'See the menu', 'Book a table', 'Order on WhatsApp'."),
	secondary: cta.optional(),
	highlights: z
		.array(z.string().min(2).max(32))
		.max(3)
		.optional()
		.describe("Short facts under the actions: 'Open every day', 'Delivery in Akwa and Bonapriso'."),
	image: image.describe("A photo of the place or its best dish, landscape (4:3). Its alt says what it shows."),
});

export type HeroPhotoContent = z.infer<typeof schema>;
