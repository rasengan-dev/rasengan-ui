import { z } from "zod";

const number = z
	.string()
	.regex(/^\+?[0-9 ]{6,20}$/)
	.describe("In international format, spaces allowed: '+237 6 99 00 00 00'.");

export const schema = z
	.object({
		headline: z.string().min(6).max(60).describe("The offer, as an invitation: 'Hungry? We deliver in Akwa and Bonapriso'."),
		subline: z.string().max(160).optional().describe("How it works: when, where, how long."),
		whatsapp: z
			.object({
				number,
				label: z.string().min(1).max(32).describe("'Order on WhatsApp'"),
				message: z.string().max(200).optional().describe("The message the chat opens with: 'Hello, I would like to order…'."),
			})
			.optional(),
		phone: z.object({ number, label: z.string().min(1).max(32).describe("'Call us'") }).optional(),
		note: z.string().max(80).optional().describe("Small print: 'Delivery from 1,000 FCFA'."),
	})
	.refine((content) => content.whatsapp || content.phone, { message: "Give a WhatsApp number, a phone number, or both." });

export type OrderBannerContent = z.infer<typeof schema>;
