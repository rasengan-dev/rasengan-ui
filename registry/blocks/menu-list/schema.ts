import { z } from "zod";

import { menuItem } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(32).optional().describe("Above the title: 'Served from noon to eleven'."),
	title: z.string().min(2).max(48).describe("'The menu', 'À la carte'."),
	subline: z.string().max(160).optional(),
	categories: z
		.array(z.object({ name: z.string().min(2).max(24).describe("'Starters', 'Grills', 'Drinks'."), items: z.array(menuItem).min(1).max(14) }))
		.min(1)
		.max(8)
		.describe("In the order of a meal. They flow into two columns on a wide screen."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Under the menu: allergens, service, prices including taxes."),
});

export type MenuListContent = z.infer<typeof schema>;
