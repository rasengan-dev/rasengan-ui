import { z } from "zod";

import { contactLink } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Get in touch', 'Talk to us'."),
	subline: z.string().max(160).optional().describe("When you answer, and which way is fastest."),
	links: z
		.array(contactLink)
		.min(1)
		.max(8)
		.describe("Phone and WhatsApp numbers in international format; email addresses; full URLs for the rest."),
});

export type ContactLinksContent = z.infer<typeof schema>;
