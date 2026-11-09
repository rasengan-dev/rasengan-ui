import { z } from "zod";

import { formChannel, image } from "@/lib/block-fields";

const field = (example: string) => z.object({ label: z.string().min(1).max(32).describe(example), placeholder: z.string().max(48).optional() });

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Talk to us', 'Events and catering'."),
	subline: z.string().max(180).optional().describe("Who answers and how fast."),
	channel: formChannel.describe("Where the message goes: the visitor's WhatsApp, texts or mail app opens with it written."),
	fields: z.object({
		name: field("'Your name'"),
		email: field("'Email'"),
		topic: z
			.object({ label: z.string().min(1).max(32).describe("'About'"), options: z.array(z.string().min(2).max(40)).min(2).max(6) })
			.optional()
			.describe("A choice of subjects, shown as chips: two to six short ones."),
		message: field("'Your message'"),
	}),
	submit: z.string().min(1).max(32).describe("'Send', 'Send on WhatsApp'."),
	details: z
		.array(z.object({ label: z.string().min(1).max(24).describe("'Email', 'Phone', 'Office'."), value: z.string().min(1).max(80), href: z.string().optional() }))
		.max(4)
		.optional()
		.describe("Other ways to reach you, beside the form."),
	image: image.optional().describe("A static map or a photo, under the details."),
	labels: z
		.object({
			intro: z.string().min(1).max(120).describe("The message's first line: 'Hello, I am writing from your website.'"),
			required: z.string().min(1).max(32).describe("Under an empty required field: 'Required'."),
			invalidEmail: z.string().min(1).max(60).describe("Under a malformed address: 'Enter an email like name@example.com'."),
			sent: z.string().min(1).max(160).describe("Once the app opens: 'Your message is ready: send it from your mail app.'"),
		})
		.describe("Shown only when needed: in the message, under a field, after sending."),
});

export type ContactFormContent = z.infer<typeof schema>;
