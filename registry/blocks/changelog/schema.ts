import { z } from "zod";

import { cta, release } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Changelog'"),
	title: z.string().min(4).max(70).describe("'What is new in Senbon'."),
	subline: z.string().max(180).optional(),
	subscribe: cta.optional().describe("Where to follow the releases: an RSS feed, a newsletter page."),
	releases: z.array(release).min(1).max(30).describe("Newest first. Each lists what was added, improved and fixed."),
	locale: z.string().optional().describe("A BCP 47 locale for the dates ('fr-FR'); the page's language when left out."),
	labels: z
		.object({
			added: z.string().min(1).max(16).describe("'Added'"),
			improved: z.string().min(1).max(16).describe("'Improved'"),
			fixed: z.string().min(1).max(16).describe("'Fixed'"),
			all: z.string().min(1).max(16).describe("'All'"),
			filter: z.string().min(1).max(40).describe("'Filter releases', for screen readers."),
			shown: z.string().min(1).max(40).describe("'{count} of {total} releases': {count} and {total} are replaced."),
			more: z.string().min(1).max(24).describe("'Read the release'"),
		})
		.describe("The words around the releases."),
});

export type ChangelogContent = z.infer<typeof schema>;
