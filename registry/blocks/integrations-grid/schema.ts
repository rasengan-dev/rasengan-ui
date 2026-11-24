import { z } from "zod";

import { integration } from "@/lib/block-fields";

export const schema = z.object({
	eyebrow: z.string().max(24).optional().describe("'Integrations'"),
	title: z.string().min(4).max(70).describe("'Works with the tools you already pay for'."),
	subline: z.string().max(180).optional(),
	integrations: z.array(integration).min(3).max(48).describe("Each with a category (they become the filters), a line and its page."),
	labels: z
		.object({
			all: z.string().min(1).max(16).describe("'All'"),
			filter: z.string().min(1).max(40).describe("'Filter by category', for screen readers."),
			search: z.string().min(1).max(32).describe("'Search integrations'"),
			empty: z.string().min(1).max(80).describe("'No integration matches. Try another word.'"),
			shown: z.string().min(1).max(40).describe("'{count} integrations shown'"),
			isNew: z.string().min(1).max(12).describe("'New'"),
			more: z.string().min(1).max(24).describe("'Learn more'"),
		})
		.describe("The words of the filter and the cards."),
});

export type IntegrationsGridContent = z.infer<typeof schema>;
