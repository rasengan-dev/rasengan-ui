import { z } from "zod";

import { cta, project } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Index'."),
	title: z.string().min(2).max(48).describe("'Selected work', 'Index'."),
	subline: z.string().max(180).optional(),
	projects: z.array(project).min(3).max(20).describe("Newest first. The same projects as projects-grid: write them once."),
	cta: cta.optional().describe("Under the list: 'All work'."),
});

export type ProjectsListContent = z.infer<typeof schema>;
