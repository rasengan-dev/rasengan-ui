import { z } from "zod";

import { cta } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'How it works'"),
	title: z.string().min(4).max(70).describe("'From quote to paid in three steps'."),
	subline: z.string().max(180).optional(),
	steps: z
		.array(z.object({ title: z.string().min(2).max(48), description: z.string().min(6).max(160) }))
		.min(3)
		.max(6)
		.describe("In order; they are numbered 01, 02, 03…"),
	cta: cta.optional(),
});

export type ProcessStepsContent = z.infer<typeof schema>;
