import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'The place', 'From our kitchen'."),
	subline: z.string().max(160).optional(),
	photos: z
		.array(image.extend({ caption: z.string().max(80).optional().describe("Shown under the photo when it is open.") }))
		.min(3)
		.max(12)
		.describe("The first is shown large. Real photos of the place, the dishes, the team."),
	labels: z
		.object({
			previous: z.string().min(1).max(24).describe("'Previous photo'"),
			next: z.string().min(1).max(24).describe("'Next photo'"),
		})
		.describe("The names of the buttons in the open photo, for screen readers."),
});

export type GalleryGridContent = z.infer<typeof schema>;
