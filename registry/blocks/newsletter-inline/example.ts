import type { NewsletterInlineContent } from "./schema";

export const example: NewsletterInlineContent = {
	title: "One useful email a month",
	subline: "Pricing, getting paid and running a small studio: what we learn from twelve thousand of them.",
	form: { action: "/api/newsletter", method: "post", name: "email", label: "Email address", placeholder: "you@studio.com", submit: "Subscribe" },
	note: "No spam, no selling your address. Unsubscribe in one click.",
	labels: { invalid: "Enter an email address like name@example.com", sent: "Thanks! Check your inbox to confirm." },
};
