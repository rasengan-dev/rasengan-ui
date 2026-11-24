import type { WaitlistContent } from "./schema";

const face = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: WaitlistContent = {
	badge: "Private beta",
	title: "Get early access to Senbon Teams",
	subline: "Invoices, approvals and payments for studios of five to fifty. We open a few seats every week.",
	form: { label: "Email address", placeholder: "you@studio.com", submit: "Join the waitlist" },
	count: { value: 1284, label: "studios already waiting" },
	faces: [
		face("woman-1", "Amina, a studio owner"),
		face("man-2", "Paul, a freelance designer"),
		face("woman-3", "Christina, an agency producer"),
	],
	note: "No spam. One email when your seat is ready.",
	labels: {
		invalid: "Enter an email address like name@example.com",
		sending: "Joining…",
		joined: "You are on the list. We will write when your seat is ready.",
		failed: "Something went wrong. Try again in a moment.",
	},
};
