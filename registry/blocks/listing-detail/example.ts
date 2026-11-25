import type { ListingDetailContent } from "./schema";

const photo = (name: string, alt: string) => ({ src: `/placeholders/place-${name}.svg`, alt, width: 1200, height: 900 });

export const example: ListingDetailContent = {
	listing: {
		title: "Bright flat with a balcony",
		kind: "Apartment",
		status: "To let",
		place: "Bonapriso, Douala",
		price: { amount: 450000, currency: "XAF" },
		period: "month",
		facts: [
			{ label: "beds", value: 2 },
			{ label: "baths", value: 1 },
			{ label: "m²", value: 95 },
		],
		images: [
			photo("living-room", "A bright living room with tall windows and a long sofa"),
			photo("bedroom", "A calm bedroom with wood panels and a plant"),
			photo("kitchen", "A long kitchen in pale wood opening onto a garden"),
		],
		tags: ["Furnished", "Generator"],
		summary: "On the third floor of a quiet street, with a balcony over the trees.",
		href: "/homes/bonapriso-flat",
	},
	description: [
		"The flat takes the whole third floor of a small building on a quiet street, five minutes from the Rond-Point Deido. The living room opens on a balcony that looks over the trees, and gets the morning sun.",
		"Two bedrooms with built-in wardrobes, a bathroom with a walk-in shower, and a kitchen fitted last year. It is let furnished, and the building's generator takes over when the power cuts.",
	],
	amenities: ["Balcony", "Generator", "Water tank", "Guard at night", "Parking for one car", "Fitted kitchen"],
	details: [
		{ label: "Floor", value: "Third, no lift" },
		{ label: "Lease", value: "One year at least" },
		{ label: "Deposit", value: "Two months" },
		{ label: "Available", value: "From 1 January" },
	],
	enquiry: {
		title: "Ask about this home",
		subline: "We answer the same day, and visits are free.",
		channel: { kind: "whatsapp", to: "+237 6 91 00 00 00" },
		fields: {
			name: { label: "Your name", placeholder: "Paul Ngono" },
			phone: { label: "Phone", placeholder: "+237 6 …" },
			message: { label: "Your message", placeholder: "When could you visit? For how long?" },
		},
		submit: "Send my request",
	},
	locale: "en-CM",
	labels: {
		periods: { once: "", month: "a month", week: "a week", night: "a night" },
		about: "About this home",
		amenities: "What it comes with",
		details: "Details",
		reviews: "{count} reviews",
		photos: "Photos of the home",
		all: "All {count} photos",
		open: "Open photo {n} full screen",
		previous: "Previous photo",
		next: "Next photo",
		close: "Close",
		required: "Required",
		intro: "Hello Nyanga, I am writing about {title}.",
		sent: "Your message is ready in WhatsApp: send it, and we answer the same day.",
	},
};
