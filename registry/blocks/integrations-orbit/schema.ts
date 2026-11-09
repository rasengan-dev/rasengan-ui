import { z } from "zod";

import { cta, integration, logo } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Integrations'."),
	title: z.string().min(8).max(70).describe("'Works with the tools you already use'."),
	subline: z.string().max(180).optional(),
	product: logo.describe("Your product, at the centre: its name, and its mark if you have one."),
	integrations: z
		.array(integration)
		.min(4)
		.max(12)
		.describe("The tools it connects to. The first four go on the inner ring, the rest on the outer one."),
	cta: cta.optional().describe("Under the orbit: 'See all integrations'."),
	labels: z.object({ pause: z.string().min(1).max(24).describe("The pause button's name: 'Pause the orbit'.") }),
});

export type IntegrationsOrbitContent = z.infer<typeof schema>;
