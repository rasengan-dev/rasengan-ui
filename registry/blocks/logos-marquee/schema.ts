import { z } from "zod";

import { logo } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(8).max(60).describe("Who these are, briefly: 'Trusted by studios in 30 countries'."),
	logos: z.array(logo).min(4).max(16).describe("Companies that use the product, with their permission. A logo without `src` shows its name."),
});

export type LogosMarqueeContent = z.infer<typeof schema>;
