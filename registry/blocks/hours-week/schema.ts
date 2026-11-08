import { z } from "zod";

import { openingHours } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Opening hours', 'When to find us'."),
	hours: openingHours,
	timeZone: z.string().min(3).describe("The business's IANA time zone, for 'open now': 'Africa/Douala'."),
	locale: z.string().optional().describe("A BCP 47 locale for day names and times ('en-CM'); the page's language when left out."),
	labels: z
		.object({
			closed: z.string().min(1).max(24).describe("'Closed'"),
			today: z.string().min(1).max(16).describe("'Today'"),
			openNow: z.string().min(1).max(24).describe("'Open now'"),
			closedNow: z.string().min(1).max(24).describe("'Closed now'"),
		})
		.describe("Shown by day and by the live status, which appears once the page has read the clock."),
});

export type HoursWeekContent = z.infer<typeof schema>;
