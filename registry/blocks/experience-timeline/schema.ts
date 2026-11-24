import { z } from "zod";

import { timelineEntry } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Career', 'Since 2015'."),
	title: z.string().min(2).max(70).describe("'Experience', 'How the studio grew'."),
	subline: z.string().max(180).optional(),
	entries: z.array(timelineEntry).min(2).max(16).describe("Newest first."),
	locale: z.string().optional().describe("A BCP 47 locale for the months ('fr-FR'); the page's language when left out."),
	labels: z.object({ now: z.string().min(1).max(16).describe("'Now', for an entry still going on.") }),
});

export type ExperienceTimelineContent = z.infer<typeof schema>;
