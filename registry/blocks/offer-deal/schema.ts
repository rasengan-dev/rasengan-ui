import { z } from "zod";

import { image, offer } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(32).optional().describe("Above the title: 'Deal of the week', 'Christmas menu'."),
	offer,
	image: image.optional().describe("The dish, the product or the treatment on offer, landscape (4:3)."),
	timeZone: z.string().min(3).describe("The business's IANA time zone, to write the end date: 'Africa/Douala'."),
	locale: z.string().optional().describe("A BCP 47 locale for prices and dates ('en-CM'); the page's language when left out."),
	labels: z
		.object({
			was: z.string().min(1).max(24).describe("Read before the struck-through price: 'Usual price'."),
			until: z.string().min(1).max(24).describe("Before the end date: 'Until'."),
			endsIn: z.string().min(1).max(24).describe("Before the countdown: 'Ends in'."),
			expired: z.string().min(1).max(80).describe("Once it has ended: 'This offer has ended. See you for the next one.'"),
			days: z.string().min(1).max(12).describe("'days'"),
			hours: z.string().min(1).max(12).describe("'hours'"),
			minutes: z.string().min(1).max(12).describe("'min'"),
		})
		.describe("The countdown appears once the page has read the clock; the end date is written before that."),
});

export type OfferDealContent = z.infer<typeof schema>;
