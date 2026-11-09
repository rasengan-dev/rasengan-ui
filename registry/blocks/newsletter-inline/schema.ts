import { z } from "zod";

export const schema = z.object({
	title: z.string().min(6).max(60).describe("What they get, and how often: 'One useful email a month'."),
	subline: z.string().max(160).optional(),
	form: z.object({
		action: z.string().min(1).describe("Where the form posts: your newsletter provider's subscribe URL, or your own endpoint."),
		method: z.enum(["post", "get"]).default("post"),
		name: z.string().min(1).max(32).default("email").describe("The email field's name, as your provider expects it."),
		label: z.string().min(1).max(32).describe("'Email address'"),
		placeholder: z.string().max(48).optional(),
		submit: z.string().min(1).max(24).describe("'Subscribe'"),
		newTab: z.boolean().default(false).describe("Open the provider's confirmation page in a new tab."),
	}),
	note: z.string().max(140).optional().describe("Under the field: how often, and that unsubscribing is one click."),
	labels: z
		.object({
			invalid: z.string().min(1).max(60).describe("Under a wrong address: 'Enter an email address like name@example.com'."),
			sent: z.string().min(1).max(120).describe("When the page handles the address itself (`onSubmit`): 'Thanks! Check your inbox to confirm.'"),
		})
		.describe("Shown only when needed."),
});

export type NewsletterInlineContent = z.input<typeof schema>;
