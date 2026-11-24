import { z } from "zod";

import { testimonial } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Customers'"),
	title: z.string().min(4).max(70).describe("'Loved by studios that hate chasing invoices'."),
	subline: z.string().max(180).optional(),
	testimonials: z.array(testimonial).min(6).max(24).describe("Real customers, in their words; split into three columns on wide screens."),
	labels: z.object({ region: z.string().min(1).max(40).describe("'What customers say', names the moving lists.") }),
});

export type TestimonialsMarqueeContent = z.infer<typeof schema>;
