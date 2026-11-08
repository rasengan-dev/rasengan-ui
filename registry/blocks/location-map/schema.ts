import { z } from "zod";

import { address, cta, image } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Find us', 'Where we are'."),
	address,
	map: image.describe("A static picture of the map around the place, landscape. Its alt names the place and the area."),
	directions: cta.describe("A link to directions in a maps app: 'Get directions'."),
	notes: z
		.array(z.string().min(2).max(100))
		.max(3)
		.optional()
		.describe("Practical details: parking, the floor, the entrance, the nearest taxi stop."),
});

export type LocationMapContent = z.infer<typeof schema>;
