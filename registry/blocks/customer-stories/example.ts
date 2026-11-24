import type { CustomerStoriesContent } from "./schema";

const mark = (name: string) => ({ name: name[0].toUpperCase() + name.slice(1), src: `/placeholders/logo-${name}.svg`, width: 96, height: 96 });
const face = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: CustomerStoriesContent = {
	eyebrow: "Customers",
	title: "Studios that close the month in two days",
	subline: "What changed for three teams after they moved their invoicing to Senbon.",
	stories: [
		{
			customer: mark("kelvo"),
			quote: "We used to spend the first week of every month chasing payments. Now the reminders go out on their own.",
			name: "Mireille Kouam",
			role: "Finance lead, Kelvo",
			avatar: face("woman-2", "Mireille, smiling"),
			stat: { label: "Days to close the month", value: 2, format: "number" },
			href: "/customers/kelvo",
		},
		{
			customer: mark("orbel"),
			quote: "Clients pay by mobile money from the invoice itself. Half of them pay the day they receive it.",
			name: "Samuel Eto",
			role: "Founder, Orbel",
			avatar: face("man-1", "Samuel, in a white shirt"),
			stat: { label: "Paid on the first day", value: 0.52, format: "percent" },
			href: "/customers/orbel",
		},
		{
			customer: mark("nimbra"),
			quote: "Approvals used to sit in someone's inbox. Now the right person gets one tap, and we see who is waiting.",
			name: "Christina Ade",
			role: "Producer, Nimbra",
			stat: { label: "Faster approvals", value: 4, format: "number" },
		},
	],
	labels: { read: "Read the story" },
};
