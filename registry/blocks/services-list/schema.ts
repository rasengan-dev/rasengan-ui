import { z } from "zod";

import { cta, service } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Services and prices', 'What we do'."),
	subline: z.string().max(160).optional(),
	services: z.array(service).min(1).max(20).describe("What a customer can book, with its duration and price."),
	minutes: z.string().min(1).max(12).describe("What follows a duration: 'min'."),
	book: cta.optional().describe("One action for every service: 'Book an appointment'."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Under the list: deposits, cancellations, home visits."),
});

export type ServicesListContent = z.infer<typeof schema>;
