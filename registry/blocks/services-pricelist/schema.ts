import { z } from "zod";

import { cta, image, service } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Price list', 'Treatments and prices'."),
	subline: z.string().max(160).optional(),
	image: image.optional().describe("One photo beside the list, portrait (4:5): the room, a treatment, a result."),
	groups: z
		.array(z.object({ name: z.string().min(2).max(24).describe("'Hair', 'Nails', 'Face'."), services: z.array(service).min(1).max(10) }))
		.min(1)
		.max(6),
	minutes: z.string().max(8).default("min").describe("After a duration: 'min'."),
	cta: cta.optional().describe("Under the list: 'Book an appointment'."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Small print: deposits, home visits, prices from."),
});

export type ServicesPricelistContent = z.input<typeof schema>;
