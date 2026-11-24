import { z } from "zod";

import { customerStory } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Customers'"),
	title: z.string().min(4).max(70).describe("'Studios that close the month in two days'."),
	subline: z.string().max(180).optional(),
	stories: z.array(customerStory).min(2).max(6).describe("Real customers, in their words, with one number that moved."),
	locale: z.string().optional().describe("A BCP 47 locale for the numbers; the page's language when left out."),
	labels: z.object({ read: z.string().min(1).max(24).describe("'Read the story'") }),
});

export type CustomerStoriesContent = z.infer<typeof schema>;
