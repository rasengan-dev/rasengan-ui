import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Follow us', 'From our kitchen'."),
	subline: z.string().max(160).optional(),
	account: z.object({
		handle: z.string().min(2).max(32).describe("As people search for it: '@mamangono'."),
		href: z.string().url().describe("The profile's address."),
		follow: z.string().min(1).max(24).describe("The button: 'Follow us', 'See more on Instagram'."),
	}),
	photos: z
		.array(image)
		.min(3)
		.max(9)
		.describe("The project's own photos, shown square: three, six or nine. Nothing is loaded from the network."),
});

export type GallerySocialContent = z.infer<typeof schema>;
