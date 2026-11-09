import { z } from "zod";

import { testimonial } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(8).max(70).describe("'Loved by studios everywhere'."),
	subline: z.string().max(180).optional(),
	testimonials: z
		.array(testimonial)
		.min(6)
		.max(18)
		.describe("Real quotes, in the customers' words; short and long mixed, the wall looks best with nine or more."),
	label: z.string().min(1).max(48).describe("Names the moving wall for screen readers: 'What customers say'."),
});

export type TestimonialsWallContent = z.infer<typeof schema>;
