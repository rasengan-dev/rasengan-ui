import type { BookingFormContent } from "./schema";

const lunchAndDinner = [
	{ open: "11:30", close: "15:00" },
	{ open: "18:30", close: "23:00" },
];

export const example: BookingFormContent = {
	title: "Book a table",
	subline: "Pick a day and a time: your WhatsApp opens with the request written, and we confirm by reply within the hour.",
	image: { src: "/placeholders/restaurant-room.svg", alt: "The dining room, set for dinner, with wooden tables and warm lights.", width: 1200, height: 900 },
	channel: { kind: "whatsapp", to: "+237 6 99 00 00 00" },
	hours: {
		days: [
			{ day: "monday", slots: [] },
			{ day: "tuesday", slots: lunchAndDinner },
			{ day: "wednesday", slots: lunchAndDinner },
			{ day: "thursday", slots: lunchAndDinner },
			{ day: "friday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "saturday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "sunday", slots: [{ open: "12:00", close: "17:00" }] },
		],
	},
	interval: 30,
	daysAhead: 60,
	fields: {
		name: { label: "Your name", placeholder: "Aïcha Nkolo" },
		date: { label: "Date", placeholder: "Pick a day" },
		time: { label: "Time", placeholder: "Pick a time" },
		party: { label: "Guests", max: 12 },
		note: { label: "Anything we should know?", placeholder: "A birthday, a high chair, an allergy…" },
	},
	submit: "Send my request on WhatsApp",
	locale: "en-CM",
	smallPrint: "Groups of more than twelve: call us, we will set up the terrace.",
	labels: {
		intro: "Hello, I would like to book a table.",
		required: "Required",
		sent: "Your request is ready in WhatsApp: send it, and we confirm by reply.",
	},
};
