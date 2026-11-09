import type { TestimonialsWallContent } from "./schema";

const face = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: TestimonialsWallContent = {
	title: "Loved by studios everywhere",
	subline: "Twelve thousand freelancers and small teams send their invoices with Senbon. A few of them, in their words.",
	testimonials: [
		{ quote: "I used to spend Sunday evenings chasing invoices. Now I spend them not thinking about invoices.", name: "Léa Martin", role: "Illustrator, Lyon", avatar: face("woman-4", "Léa Martin") },
		{ quote: "Mobile money changed everything for my clients in Douala. They pay the same day.", name: "Joel Tchami", role: "Developer, Douala", avatar: face("man-1", "Joel Tchami") },
		{ quote: "The reminders are polite enough that nobody gets upset, and firm enough that people pay.", name: "Amara Diallo", role: "Studio owner, Dakar", avatar: face("woman-3", "Amara Diallo") },
		{ quote: "Set up our retainers once in March. Haven't touched them since.", name: "Kofi Mensah", role: "Agency lead, Accra", avatar: face("man-3", "Kofi Mensah") },
		{ quote: "My accountant asked what changed. The exports, that's what changed.", name: "Sarah Owusu", role: "Consultant, London", avatar: face("woman-1", "Sarah Owusu") },
		{ quote: "Clean, fast, and it does exactly one job very well.", name: "Marcos Prado", role: "Photographer, Lisbon", avatar: face("man-2", "Marcos Prado") },
		{ quote: "We moved four people and two hundred clients over in an afternoon. Support answered every question within the hour.", name: "Nadia Ekotto", role: "Design studio, Paris", avatar: face("founder", "Nadia Ekotto") },
		{ quote: "Quotes turn into invoices in one click. I didn't know I needed that until I had it.", name: "Grace Nji", role: "Event planner, Yaoundé", avatar: face("woman-2", "Grace Nji") },
		{ quote: "Finally an invoicing tool that doesn't feel like accounting software.", name: "Eric Ndong", role: "Video editor, Libreville", avatar: face("barber", "Eric Ndong") },
	],
	label: "What customers say",
};
