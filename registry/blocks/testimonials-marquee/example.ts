import type { TestimonialsMarqueeContent } from "./schema";

const face = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: TestimonialsMarqueeContent = {
	eyebrow: "Customers",
	title: "Loved by studios that hate chasing invoices",
	subline: "What people say after their first month on Senbon.",
	testimonials: [
		{ quote: "The reminders go out on their own. I stopped writing awkward emails.", name: "Amina Bello", role: "Illustrator, Lagos", avatar: face("woman-1", "Amina, smiling") },
		{ quote: "Clients pay by mobile money from the invoice. Half pay the same day.", name: "Samuel Eto", role: "Founder, Orbel", avatar: face("man-1", "Samuel, in a white shirt") },
		{ quote: "Quotes become invoices in one click. That alone saves me an evening a month.", name: "Christina Ade", role: "Producer, Nimbra", avatar: face("woman-3", "Christina, at her desk") },
		{ quote: "Finally an invoicing tool that writes dates and amounts the way my clients read them.", name: "Paul Ngono", role: "Architect, Douala", avatar: face("man-2", "Paul, outdoors") },
		{ quote: "We closed the month in two days instead of nine.", name: "Mireille Kouam", role: "Finance lead, Kelvo", avatar: face("woman-2", "Mireille, smiling") },
		{ quote: "Support answered in French, in an hour, from a real person.", name: "Kofi Mensah", role: "Developer, Accra", avatar: face("man-3", "Kofi, in a blue suit") },
	],
	labels: { region: "What customers say" },
};
