import { z } from "zod";

import { cta, trustPoint } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Security'"),
	title: z.string().min(4).max(70).describe("'Your clients' data, kept like ours'."),
	subline: z.string().max(180).optional(),
	points: z.array(trustPoint).min(2).max(8).describe("Only what is true today; an audit under way is 'in-progress'."),
	cta: cta.optional().describe("'Read our security page', 'Request the SOC 2 report'."),
	labels: z.object({
		certified: z.string().min(1).max(24).describe("'Certified', 'Compliant'"),
		inProgress: z.string().min(1).max(24).describe("'In progress'"),
	}),
});

export type SecurityBadgesContent = z.input<typeof schema>;
