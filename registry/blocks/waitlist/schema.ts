import { z } from "zod";

import { image } from "@/lib/block-fields";

export const schema = z.object({
	badge: z.string().max(24).optional().describe("A short pill above the title: 'Coming soon', 'Private beta'."),
	title: z.string().min(6).max(70).describe("What they get by joining: 'Get early access to Senbon'."),
	subline: z.string().max(180).optional(),
	form: z.object({
		action: z
			.string()
			.min(1)
			.optional()
			.describe("Your waitlist provider's URL; the form posts there. Leave out when the page takes the address itself (onSubmit)."),
		method: z.enum(["post", "get"]).default("post"),
		name: z.string().min(1).max(32).default("email").describe("The email field's name, as your provider expects it."),
		label: z.string().min(1).max(32).describe("'Email address'"),
		placeholder: z.string().max(48).optional(),
		submit: z.string().min(1).max(24).describe("'Join the waitlist'"),
	}),
	count: z
		.object({ value: z.number().int().nonnegative(), label: z.string().min(1).max(40).describe("'people already waiting'") })
		.optional()
		.describe("Only a real number: it rolls into place beside the faces."),
	faces: z.array(image).max(4).optional().describe("Up to four people already on the list, with their consent."),
	locale: z.string().optional().describe("A BCP 47 locale for the count ('fr-FR'); the page's language when left out."),
	note: z.string().max(140).optional().describe("Under the field: 'No spam. One email when your seat is ready.'"),
	labels: z
		.object({
			invalid: z.string().min(1).max(60).describe("'Enter an email address like name@example.com'"),
			sending: z.string().min(1).max(40).describe("'Joining…'"),
			joined: z.string().min(1).max(140).describe("'You are on the list. We will write when your seat is ready.'"),
			failed: z.string().min(1).max(140).describe("'Something went wrong. Try again in a moment.'"),
		})
		.describe("Shown only when needed."),
});

export type WaitlistContent = z.input<typeof schema>;
