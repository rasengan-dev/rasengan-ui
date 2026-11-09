import { z } from "zod";

import { cta } from "@/lib/block-fields";

export const schema = z.object({
	headline: z.string().min(8).max(60).describe("The one thing to do next, as a promise: 'Ship your landing page today'."),
	subline: z.string().max(140).optional().describe("One sentence that removes a doubt: price, time, risk."),
	primary: cta,
	secondary: cta.optional(),
	note: z.string().max(60).optional().describe("Small print under the buttons: 'No card needed'."),
});

export type CtaBannerContent = z.infer<typeof schema>;
