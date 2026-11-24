import { z } from "zod";

import { cta, position } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Careers'"),
	title: z.string().min(4).max(70).describe("'Open roles'"),
	subline: z.string().max(180).optional(),
	positions: z.array(position).max(40).describe("Grouped by team, in the order the teams first appear. Empty shows `labels.none`."),
	cta: cta.optional().describe("For people who do not see their role: 'Send us your work'."),
	labels: z
		.object({
			all: z.string().min(1).max(16).describe("'All teams'"),
			filter: z.string().min(1).max(40).describe("'Filter roles by team', for screen readers."),
			none: z.string().min(1).max(120).describe("When there is no open role: 'No open roles right now. We still read every letter.'"),
			kinds: z
				.object({
					"full-time": z.string().min(1).max(16),
					"part-time": z.string().min(1).max(16),
					contract: z.string().min(1).max(16),
					internship: z.string().min(1).max(16),
					freelance: z.string().min(1).max(16),
				})
				.describe("How each kind of position is written: 'Full time', 'Contract'…"),
			view: z.string().min(1).max(24).describe("'View the role'"),
		})
		.describe("The words of the filter and the rows."),
});

export type CareersContent = z.infer<typeof schema>;
