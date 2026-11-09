import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	word: z
		.string()
		.min(2)
		.max(24)
		.describe("The brand or one word, set across the full width under the photo: 'Senbon', 'Ngono'. Short words read largest; past about twelve letters it takes two lines on a phone."),
	headline: z.string().min(8).max(70).describe("The page's heading, above the photo: the promise in at most nine words."),
	subline: z.string().max(180).optional(),
	primary: cta,
	secondary: cta.optional(),
	image: image.describe("Wide (16:9 or so): the product, the place or the dish. It overlaps the top of the word."),
});

export type HeroWordmarkContent = z.infer<typeof schema>;
