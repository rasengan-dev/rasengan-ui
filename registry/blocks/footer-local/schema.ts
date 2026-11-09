import { z } from "zod";

import { address, contactLink, cta, openingHours } from "@/lib/block-fields";

export const schema = z.object({
	name: z.string().min(1).max(40).describe("The business's name, as on its sign."),
	tagline: z.string().max(100).optional().describe("One line: what and where."),
	address,
	hours: openingHours.optional().describe("Days with the same slots are grouped: 'Tue – Fri'."),
	contacts: z.array(contactLink).max(6).optional(),
	links: z.array(cta).max(6).optional().describe("The site's pages or sections: 'Menu', 'Book a table'."),
	copyright: z.string().min(1).max(80).describe("'© 2026 Mama Ngono\'s'."),
	locale: z.string().optional().describe("A BCP 47 locale for day names and times ('en-CM'); the page's language when left out."),
	labels: z
		.object({
			visit: z.string().min(1).max(24).describe("Over the address: 'Visit us'."),
			hours: z.string().min(1).max(24).describe("Over the hours: 'Opening hours'."),
			contact: z.string().min(1).max(24).describe("Over the contacts: 'Contact'."),
			closed: z.string().min(1).max(16).describe("'Closed'"),
			directions: z.string().max(24).optional().describe("The map link under the address: 'Directions'."),
		})
		.describe("The columns' headings and the words around the hours."),
});

export type FooterLocalContent = z.infer<typeof schema>;
