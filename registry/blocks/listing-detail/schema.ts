import { z } from "zod";

import { formChannel, listing } from "@/lib/block-fields";

export const schema = z.object({
	listing: listing.describe("The same object as in listing-cards: write a listing once."),
	description: z.array(z.string().min(1).max(800)).min(1).max(8).describe("The listing's own text, in plain paragraphs."),
	amenities: z.array(z.string().min(1).max(32)).max(16).optional().describe("What it comes with: 'Generator', 'Water tank', 'Pool'."),
	details: z
		.array(z.object({ label: z.string().min(1).max(24), value: z.string().min(1).max(40) }))
		.max(10)
		.optional()
		.describe("Facts that are not numbers: 'Year built: 2019', 'Lease: one year at least'."),
	enquiry: z.object({
		title: z.string().min(1).max(48).describe("'Ask about this home'"),
		subline: z.string().max(140).optional(),
		channel: formChannel.describe("Where the enquiry opens: the agency's WhatsApp, texts or email."),
		fields: z.object({
			name: z.object({ label: z.string().min(1).max(24), placeholder: z.string().max(40).optional() }),
			phone: z.object({ label: z.string().min(1).max(24), placeholder: z.string().max(40).optional() }),
			message: z.object({ label: z.string().min(1).max(24), placeholder: z.string().max(80).optional() }),
		}),
		submit: z.string().min(1).max(24).describe("'Send my request'"),
	}),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		periods: z.object({ once: z.string().max(16), month: z.string().max(16), week: z.string().max(16), night: z.string().max(16) }),
		about: z.string().min(1).max(32).describe("'About this home'"),
		amenities: z.string().min(1).max(32).describe("'What it comes with'"),
		details: z.string().min(1).max(32).describe("'Details'"),
		reviews: z.string().min(1).max(24).describe("'{count} reviews'"),
		photos: z.string().min(1).max(40).describe("Names the gallery: 'Photos of the home'."),
		all: z.string().min(1).max(32).describe("On the last tile: 'All {count} photos'."),
		open: z.string().min(1).max(40).describe("On a tile, for screen readers: 'Open photo {n} full screen'."),
		previous: z.string().min(1).max(24),
		next: z.string().min(1).max(24),
		close: z.string().min(1).max(16),
		required: z.string().min(1).max(24),
		intro: z.string().min(1).max(120).describe("The message's first line, {title} is the listing's: 'Hello, I am writing about {title}.'"),
		sent: z.string().min(1).max(140).describe("After sending: 'Your message is ready in WhatsApp: send it, and we answer the same day.'"),
	}),
});

export type ListingDetailContent = z.infer<typeof schema>;
