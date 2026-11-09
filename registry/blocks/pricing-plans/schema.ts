import { z } from "zod";

import { money, pricePlan } from "@/lib/block-fields";

const plan = pricePlan.extend({
	yearly: money
		.optional()
		.describe("The price for a whole year, for a monthly plan: usually ten or eleven months. Left out, twelve months of the price."),
});

export const schema = z.object({
	title: z.string().min(8).max(70).describe("The pricing promise: 'Simple pricing that grows with you'."),
	subline: z.string().max(180).optional(),
	plans: z.array(plan).min(1).max(4).describe("One to four plans, cheapest first, at most one highlighted."),
	highlightLabel: z.string().min(1).max(24).describe("The badge on the highlighted plan: 'Most popular'."),
	periods: z
		.object({ month: z.string().max(16), year: z.string().max(16), once: z.string().max(16) })
		.describe("What follows a price, by period: '/ month', '/ year', 'once'."),
	billing: z
		.object({
			label: z.string().min(1).max(32).describe("Names the switch for screen readers: 'Billing period'."),
			month: z.string().min(1).max(16).describe("'Monthly'"),
			year: z.string().min(1).max(16).describe("'Yearly'"),
			saving: z.string().max(24).optional().describe("Next to the yearly option: '2 months free'."),
		})
		.optional()
		.describe("A monthly / yearly switch above the plans. Left out, prices show as written."),
	locale: z.string().optional().describe("A BCP 47 locale for the prices ('fr-FR'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Under the plans: taxes, trials, discounts."),
});

export type PricingPlansContent = z.infer<typeof schema>;
