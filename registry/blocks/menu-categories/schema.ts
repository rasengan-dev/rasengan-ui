import { z } from "zod";

import { menuItem } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("Usually 'Our menu' or 'The menu'."),
	subline: z.string().max(160).optional().describe("A line about the food: where it comes from, what changes."),
	categories: z
		.array(
			z.object({
				name: z.string().min(2).max(24).describe("'Starters', 'Grills', 'Drinks'."),
				items: z.array(menuItem).min(1).max(16),
			}),
		)
		.min(1)
		.max(8)
		.describe("In the order of a meal. Each category is a tab."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Under the menu: allergens, service, prices including taxes."),
});

export type MenuCategoriesContent = z.infer<typeof schema>;
