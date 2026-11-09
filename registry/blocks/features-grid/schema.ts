import { z } from "zod";

/** The icons a feature can show: a fixed set, so the block imports only these. */
export const featureIcons = [
	"bolt",
	"shield",
	"sparkles",
	"clock",
	"chart",
	"globe",
	"lock",
	"users",
	"bell",
	"wallet",
	"repeat",
	"file",
	"plug",
	"rocket",
	"heart",
	"layers",
] as const;

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Features'."),
	title: z.string().min(8).max(70).describe("What the features add up to: 'Everything between the quote and the payment'."),
	subline: z.string().max(180).optional(),
	features: z
		.array(
			z.object({
				icon: z.enum(featureIcons).describe("The closest of the block's icons."),
				title: z.string().min(2).max(40).describe("The benefit, not the mechanism: 'Paid on time', not 'Reminder engine'."),
				description: z.string().min(20).max(160).describe("How it works, in one or two short sentences."),
			}),
		)
		.min(3)
		.max(9)
		.describe("Three, six or nine read best: the grid has up to three columns."),
});

export type FeaturesGridContent = z.infer<typeof schema>;
