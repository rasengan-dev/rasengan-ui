import { z } from "zod";

import { image, stat } from "@/lib/block-fields";

/** The icons a feature tile can show: a fixed set, so the block imports only these. */
export const bentoIcons = ["bolt", "shield", "bell", "wallet", "globe", "chart", "file", "users", "lock", "repeat", "plug", "sparkles"] as const;

const size = z
	.enum(["small", "wide", "tall", "large"])
	.default("small")
	.describe("On a wide screen (four columns): small is one cell, wide two across, tall two down, large two by two.");

const tile = z.discriminatedUnion("kind", [
	z.object({
		kind: z.literal("feature"),
		size,
		icon: z.enum(bentoIcons),
		title: z.string().min(2).max(40).describe("The benefit: 'Paid on time'."),
		description: z.string().min(20).max(140),
	}),
	z.object({
		kind: z.literal("stat"),
		size,
		stat: stat.describe("A real number, with its label: '94% · invoices paid on time'."),
		description: z.string().max(100).optional().describe("Where it comes from, or what it means."),
	}),
	z.object({
		kind: z.literal("image"),
		size,
		title: z.string().min(2).max(40),
		description: z.string().max(140).optional(),
		image: image.describe("A product shot or an illustration; it fills the tile under its text."),
	}),
]);

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("One or two words above the title: 'Why Senbon'."),
	title: z.string().min(8).max(70),
	subline: z.string().max(180).optional(),
	tiles: z
		.array(tile)
		.min(4)
		.max(9)
		.describe("Sizes should fill rows of four cells: one large, two small and one wide make two full rows."),
	locale: z.string().optional().describe("A BCP 47 locale for the numbers ('en-US'); the page's language when left out."),
});

export type BentoFeaturesContent = z.input<typeof schema>;
