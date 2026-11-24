import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	badge: z.string().max(40).optional().describe("A pill above the headline: 'Trusted by 1,200 studios', 'New: mobile money'."),
	headline: z.string().min(6).max(80).describe("What the product does, for whom."),
	subline: z.string().max(180).optional(),
	primary: cta,
	secondary: cta.optional(),
	note: z.string().max(60).optional().describe("Under the actions: 'No card needed', 'Free for 14 days'."),
	screen: image.describe("A screenshot of the product (16:10 reads best). Its alt says what the screen shows."),
	url: z.string().max(48).optional().describe("The address shown in the frame's bar: 'senbon.app/dashboard'."),
});

export type HeroProductContent = z.infer<typeof schema>;
