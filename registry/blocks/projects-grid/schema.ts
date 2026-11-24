import { z } from "zod";

import { project } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Selected work'."),
	title: z.string().min(2).max(48).describe("'All work', 'Projects'. The number of projects shows beside it."),
	subline: z.string().max(180).optional(),
	projects: z.array(project).min(2).max(24).describe("Newest first. Their kinds become the filters, in the order they first appear."),
	labels: z
		.object({
			all: z.string().min(1).max(16).describe("'All'"),
			filter: z.string().min(1).max(40).describe("'Filter projects by kind', for screen readers."),
			shown: z.string().min(1).max(40).describe("'{count} projects shown', read when a filter changes; {count} is replaced."),
		})
		.describe("The filter's words."),
});

export type ProjectsGridContent = z.infer<typeof schema>;
