import { z } from "zod";

import { comparisonRow, cta } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(8).max(70).describe("'Why teams switch from spreadsheets'."),
	subline: z.string().max(180).optional(),
	columns: z
		.object({
			ours: z.string().min(1).max(24).describe("Your product: 'Senbon'."),
			theirs: z.string().min(1).max(32).describe("The usual way, not a competitor's brand: 'Spreadsheets and email'."),
		})
		.describe("The two columns' headings."),
	rows: z.array(comparisonRow).min(3).max(12).describe("What matters to the reader, honestly: rows where you lose are allowed."),
	labels: z
		.object({
			feature: z.string().min(1).max(24).describe("Heads the first column, for screen readers: 'Feature'."),
			yes: z.string().min(1).max(16).describe("Read for a tick: 'Yes'."),
			no: z.string().min(1).max(16).describe("Read for a cross: 'No'."),
		})
		.describe("Words read by screen readers where the table shows signs."),
	cta: cta.optional(),
	note: z.string().max(140).optional(),
});

export type ComparisonTableContent = z.infer<typeof schema>;
