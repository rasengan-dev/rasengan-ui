import { z } from "zod";

import { cta, formChannel, image, menuItem } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Our signature dishes', 'Popular this week'."),
	subline: z.string().max(160).optional().describe("Why these: the house favourites, what's in season."),
	dishes: z
		.array(menuItem.extend({ image: image.describe("The dish, landscape (4:3). Its alt says what is on the plate.") }))
		.min(2)
		.max(9)
		.describe("Three, six or nine read best: the grid has up to three columns."),
	order: z
		.object({
			channel: formChannel,
			label: z.string().min(1).max(20).describe("On each card: 'Order', 'Order this'."),
			message: z.string().min(1).max(120).describe("The message opens with this, then the dish's name: 'Hello, I would like to order:'."),
		})
		.optional()
		.describe("An order link on each card, opening WhatsApp, a text or an email with the dish written."),
	cta: cta.optional().describe("Under the grid: 'See the whole menu'."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
});

export type MenuCardsContent = z.infer<typeof schema>;
