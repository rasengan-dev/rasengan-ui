import { z } from "zod";

import { cta, money } from "@/lib/block-fields";

const value = z.union([z.boolean(), z.string().min(1).max(24)]).describe("Yes, no, or a short value: '5 people', 'Unlimited'.");

export const schema = z
	.object({
		title: z.string().min(8).max(70).describe("'Compare plans'."),
		subline: z.string().max(180).optional(),
		plans: z
			.array(
				z.object({
					name: z.string().min(1).max(24),
					price: money,
					period: z.enum(["month", "year", "once"]).default("month"),
					description: z.string().max(80).optional(),
					cta,
					highlighted: z.boolean().default(false).describe("At most one."),
				}),
			)
			.min(2)
			.max(4)
			.describe("The columns, cheapest first."),
		groups: z
			.array(
				z.object({
					name: z.string().min(2).max(32).describe("'Invoicing', 'Payments', 'Support'."),
					rows: z
						.array(z.object({ label: z.string().min(2).max(60), values: z.array(value).min(2).max(4).describe("One per plan, in the plans' order.") }))
						.min(1)
						.max(12),
				}),
			)
			.min(1)
			.max(6),
		highlightLabel: z.string().min(1).max(24).describe("The badge on the highlighted plan: 'Most popular'."),
		periods: z.object({ month: z.string().max(16), year: z.string().max(16), once: z.string().max(16) }).describe("After a price: '/ month'."),
		labels: z
			.object({
				feature: z.string().min(1).max(24).describe("Heads the first column, for screen readers: 'Feature'."),
				included: z.string().min(1).max(24).describe("Read for a tick: 'Included'."),
				notIncluded: z.string().min(1).max(24).describe("Read for a dash: 'Not included'."),
			})
			.describe("Words read by screen readers where the table shows signs."),
		locale: z.string().optional().describe("A BCP 47 locale for prices ('en-US'); the page's language when left out."),
		note: z.string().max(140).optional(),
	})
	.refine((content) => content.groups.every((group) => group.rows.every((row) => row.values.length === content.plans.length)), {
		message: "Every row needs one value per plan.",
	});

export type PricingComparisonContent = z.input<typeof schema>;
