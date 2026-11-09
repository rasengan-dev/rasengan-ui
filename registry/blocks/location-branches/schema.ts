import { z } from "zod";

import { branch } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Find us', 'Our shops'."),
	subline: z.string().max(160).optional(),
	branches: z.array(branch).min(2).max(6).describe("One card each. With opening hours, a card says today's hours and whether it is open now."),
	timeZone: z.string().min(3).describe("The business's IANA time zone, for 'open now': 'Africa/Douala'."),
	locale: z.string().optional().describe("A BCP 47 locale for times ('en-CM'); the page's language when left out."),
	labels: z
		.object({
			today: z.string().min(1).max(16).describe("'Today'"),
			closedToday: z.string().min(1).max(24).describe("'Closed today'"),
			openNow: z.string().min(1).max(24).describe("'Open now'"),
			closedNow: z.string().min(1).max(24).describe("'Closed now'"),
			directions: z.string().min(1).max(24).describe("'Directions'"),
			call: z.string().min(1).max(16).describe("'Call'"),
		})
		.describe("Today's line and the badge appear once the page has read the clock."),
});

export type LocationBranchesContent = z.infer<typeof schema>;
