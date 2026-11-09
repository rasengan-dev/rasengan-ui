import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(6).max(60).describe("'Invoices in your pocket'."),
	subline: z.string().max(180).optional(),
	stores: z
		.array(
			z.object({
				store: z.enum(["app-store", "google-play", "web"]).describe("Picks the icon; the label says the store in words."),
				label: z.string().min(2).max(32).describe("'Download on the App Store', 'Get it on Google Play'."),
				href: z.string().min(1),
			}),
		)
		.min(1)
		.max(3)
		.describe("Text links, not the stores' official badges: use those artworks only under their own terms."),
	points: z.array(z.string().min(2).max(48)).max(3).optional().describe("Up to three short facts: 'Works offline'."),
	screen: image.describe("The app's screen, portrait (about 9:19.5), shown in a phone frame."),
});

export type CtaAppContent = z.infer<typeof schema>;
