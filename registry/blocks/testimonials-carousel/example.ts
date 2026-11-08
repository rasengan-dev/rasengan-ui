import type { TestimonialsCarouselContent } from "./schema";

export const example: TestimonialsCarouselContent = {
	title: "Studios that stopped chasing payments",
	subline: "Agencies, freelancers and small teams use Senbon to send invoices and get paid.",
	testimonials: [
		{
			quote: "We used to spend Friday afternoons chasing invoices. Now the reminders do it, and our clients pay faster than before.",
			name: "Amara Nwosu",
			role: "Founder, Lumen Studio",
		},
		{
			quote: "The mobile money links changed everything for our clients in Douala. Half of them pay the same day.",
			name: "Paul Ekambi",
			role: "Director, Northwind Films",
		},
		{
			quote: "Our accountant asked what we changed. Every quarter now closes in an hour instead of a week.",
			name: "Léa Martin",
			role: "Studio manager, Atelier Globex",
		},
		{
			quote: "Retainers used to slip through the cracks. They go out on the first of the month without anyone touching them.",
			name: "Kenji Watanabe",
			role: "Partner, Initech Design",
		},
	],
};
