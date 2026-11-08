import { z } from "zod";

import { stat } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(8).max(70).describe("What the numbers prove: 'Studios get paid nine days sooner'."),
	subline: z.string().max(180).optional(),
	stats: z.array(stat).min(2).max(4).describe("Real, sourced numbers. Two to four; they roll into place when scrolled into view."),
	locale: z.string().optional().describe("A BCP 47 locale for the numbers ('fr-FR'); the page's language when left out."),
	source: z.string().max(120).optional().describe("Where the numbers come from and when: 'Senbon customers, 2026'."),
});

export type StatsNumbersContent = z.infer<typeof schema>;
