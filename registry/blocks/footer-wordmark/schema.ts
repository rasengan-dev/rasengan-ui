import { z } from "zod";

const link = z.object({ label: z.string().min(1).max(32), href: z.string().min(1).describe("A path or a full URL.") });

export const schema = z.object({
	brand: z.object({
		name: z.string().min(1).max(32),
		href: z.string().min(1).describe("Usually '/'."),
		tagline: z.string().max(120).optional(),
	}),
	columns: z
		.array(z.object({ title: z.string().min(1).max(24), links: z.array(link).min(1).max(8) }))
		.min(1)
		.max(4),
	legal: z.string().min(1).max(120).describe("The copyright line: '© 2026 Senbon Ltd.'"),
	social: z.array(link).max(6).optional(),
	wordmark: z
		.string()
		.min(2)
		.max(24)
		.optional()
		.describe("The word set huge along the bottom edge; the brand's name when left out. Short words read largest."),
});

export type FooterWordmarkContent = z.infer<typeof schema>;
