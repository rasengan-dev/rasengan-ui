import { z } from "zod";

import { caseSection, image, project } from "@/lib/block-fields";

export const schema = z.object({
	project: project.describe("The same project the lists show: written once, in the project's content."),
	facts: z
		.array(z.object({ label: z.string().min(1).max(24), value: z.string().min(1).max(48) }))
		.max(4)
		.optional()
		.describe("Besides client, kind and year: 'Role', 'Duration', 'Team'."),
	sections: z.array(caseSection).min(1).max(6).describe("Context, problem, approach, results: plain paragraphs, no Markdown."),
	gallery: z
		.array(image.extend({ caption: z.string().max(80).optional() }))
		.max(12)
		.optional()
		.describe("More pictures of the project; each opens full screen."),
	next: z.object({ title: z.string().min(1).max(48), href: z.string().min(1) }).optional().describe("The next project, at the end."),
	locale: z.string().optional().describe("A BCP 47 locale for the results' numbers; the page's language when left out."),
	labels: z
		.object({
			client: z.string().min(1).max(16).describe("'Client'"),
			kind: z.string().min(1).max(16).describe("'Kind'"),
			year: z.string().min(1).max(16).describe("'Year'"),
			results: z.string().min(1).max(24).describe("'Results'"),
			gallery: z.string().min(1).max(24).describe("'Gallery'"),
			next: z.string().min(1).max(24).describe("'Next project'"),
		})
		.describe("The words around the content."),
});

export type CaseStudyContent = z.infer<typeof schema>;
