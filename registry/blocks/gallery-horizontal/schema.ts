import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Series'."),
	title: z.string().min(2).max(48).describe("'Lone Hill', 'From the studio'."),
	subline: z.string().max(180).optional(),
	photos: z
		.array(image.extend({ caption: z.string().max(80).optional().describe("Under the photo, and in the full-screen view.") }))
		.min(3)
		.max(12)
		.describe("Portrait or square photos read best (4:5); each opens full screen."),
	labels: z.object({ photos: z.string().min(1).max(40).describe("'Photos of the series', names the row for screen readers.") }),
});

export type GalleryHorizontalContent = z.infer<typeof schema>;
