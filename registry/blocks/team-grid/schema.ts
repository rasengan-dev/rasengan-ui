import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Our team'."),
	title: z.string().min(4).max(70).describe("'The people behind Senbon'."),
	subline: z.string().max(180).optional(),
	members: z
		.array(
			z.object({
				name: z.string().min(1).max(48),
				role: z.string().min(1).max(48),
				image: image.optional().describe("A portrait (4:5). Left out, the initials stand in."),
				bio: z.string().max(140).optional().describe("One line: where they come from, what they care about."),
				links: z.array(cta).max(3).optional().describe("Profiles: 'LinkedIn', 'GitHub', 'Website'."),
			}),
		)
		.min(3)
		.max(12),
	cta: cta.optional().describe("Under the grid: 'We're hiring'."),
});

export type TeamGridContent = z.infer<typeof schema>;
