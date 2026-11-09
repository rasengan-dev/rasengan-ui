import type { ContactFormContent } from "./schema";

export const example: ContactFormContent = {
	title: "Talk to us",
	subline: "A person on the team reads every message and answers within a working day.",
	channel: { kind: "email", to: "hello@senbon.example" },
	fields: {
		name: { label: "Your name", placeholder: "Nadia Ekotto" },
		email: { label: "Email", placeholder: "you@studio.com" },
		topic: { label: "About", options: ["A question before signing up", "Help with my account", "Partnerships", "Press"] },
		message: { label: "Your message", placeholder: "Tell us what you need…" },
	},
	submit: "Send",
	details: [
		{ label: "Email", value: "hello@senbon.example", href: "mailto:hello@senbon.example" },
		{ label: "Phone", value: "+33 1 84 00 00 00", href: "tel:+33184000000" },
		{ label: "Office", value: "12 rue des Petites Écuries, Paris" },
	],
	labels: {
		intro: "Hello, I am writing from your website.",
		required: "Required",
		invalidEmail: "Enter an email like name@example.com",
		sent: "Your message is ready in your mail app: send it, and we answer within a working day.",
	},
};
