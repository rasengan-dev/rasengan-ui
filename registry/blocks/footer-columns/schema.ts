import { z } from "zod";

const link = z.object({
	label: z.string().min(1).max(32),
	href: z.string().min(1).describe("A path or a full URL."),
});

export const schema = z.object({
	brand: z.object({
		name: z.string().min(1).max(32),
		href: z.string().min(1).describe("Usually '/'."),
		tagline: z.string().max(120).optional().describe("What the product is, in one line."),
	}),
	columns: z
		.array(z.object({ title: z.string().min(1).max(24), links: z.array(link).min(1).max(8) }))
		.min(1)
		.max(4)
		.describe("Grouped links: Product, Company, Resources, Legal."),
	legal: z.string().min(1).max(120).describe("The copyright line: '© 2026 Senbon Ltd.'"),
	social: z.array(link).max(6).optional().describe("Profiles, by name: 'Instagram', 'LinkedIn'."),
});

export type FooterColumnsContent = z.infer<typeof schema>;
