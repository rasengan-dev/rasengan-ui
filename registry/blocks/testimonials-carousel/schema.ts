import { z } from "zod";

import { testimonial } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(8).max(70).describe("What customers say, summed up: 'Studios that stopped chasing payments'."),
	subline: z.string().max(180).optional(),
	testimonials: z.array(testimonial).min(3).max(10).describe("Real quotes, with permission. One to three show at a time, by width."),
});

export type TestimonialsCarouselContent = z.infer<typeof schema>;
