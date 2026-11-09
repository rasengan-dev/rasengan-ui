import { z } from "zod";

import { logo } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(4).max(70).optional().describe("A line above the grid: 'Trusted by studios in 30 countries'."),
	logos: z.array(logo).min(4).max(12).describe("Customers' logos with their names (read when there is no image). Four, eight or twelve fill the grid."),
});

export type LogosGridContent = z.infer<typeof schema>;
