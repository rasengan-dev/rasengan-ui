import { z } from "zod";

import { award } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Recognition'."),
	title: z.string().min(2).max(70).describe("'Awards', or a sentence: 'Recognised by the people whose work we admire'."),
	subline: z.string().max(180).optional(),
	awards: z.array(award).min(2).max(30).describe("Newest first, as you want them read."),
	labels: z
		.object({
			year: z.string().min(1).max(16).describe("'Year'"),
			award: z.string().min(1).max(16).describe("'Award'"),
			project: z.string().min(1).max(16).describe("'Project'"),
		})
		.describe("The table's column headings."),
});

export type AwardsListContent = z.infer<typeof schema>;
