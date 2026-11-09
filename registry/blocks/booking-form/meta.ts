import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "booking-form",
	title: "Booking, form",
	family: "storefront",
	category: "booking",
	status: "beta",
	added: "2026-11-08",
	summary: "A name, a day, a time inside the opening hours and a party size or a service; sends the request as a WhatsApp, text or email message.",
	useWhen: "A restaurant taking table bookings, or a salon, barber or spa taking appointments, without a booking system.",
	avoidWhen: "Live availability or payment at booking: embed the booking system instead.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 20, maxWords: 120 },
	components: ["button", "date-picker", "field", "input", "label", "radio-group", "select", "textarea", "time-picker"],
	pairsWith: ["hours-week", "location-map"],
} as const satisfies BlockMeta;
