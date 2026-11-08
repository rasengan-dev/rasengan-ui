import { z } from "zod";

import { formChannel, image, openingHours, service } from "@/lib/block-fields";

const field = (example: string) =>
	z.object({
		label: z.string().min(1).max(32).describe(example),
		placeholder: z.string().max(48).optional(),
	});

export const schema = z.object({
	title: z.string().min(2).max(48).describe("'Book a table', 'Book an appointment'."),
	subline: z.string().max(160).optional().describe("How booking works: 'Pick a time, we confirm on WhatsApp within the hour.'"),
	image: image.optional().describe("The room, the chair, the team; portrait or square. Left out, the form takes the width."),
	channel: formChannel.describe("Where the request goes: the visitor's app opens with the message written."),
	hours: openingHours.describe("The days and times offered: closed days can't be picked, times stay inside the slots."),
	interval: z.number().int().min(10).max(120).default(30).describe("Minutes between two times offered."),
	daysAhead: z.number().int().min(1).max(365).default(60).describe("How far ahead a date can be picked."),
	fields: z.object({
		name: field("'Your name'"),
		date: field("'Date'"),
		time: field("'Time'"),
		party: z
			.object({ label: z.string().min(1).max(32).describe("'Guests'"), max: z.number().int().min(2).max(40) })
			.optional()
			.describe("For a table: how many people, from 1 to max."),
		services: z
			.object({ label: z.string().min(1).max(32).describe("'Service'"), items: z.array(service).min(1).max(8) })
			.optional()
			.describe("For an appointment: one service to pick, shown with its duration and price."),
		note: field("'Anything we should know?'").optional(),
	}),
	submit: z.string().min(1).max(32).describe("'Send my request', 'Book on WhatsApp'."),
	minutes: z.string().max(8).default("min").describe("After a duration: 'min'."),
	locale: z.string().optional().describe("A BCP 47 locale for dates, times and prices ('en-CM'); the page's language when left out."),
	smallPrint: z.string().max(140).optional().describe("Under the button: 'We confirm every booking by reply.'"),
	labels: z
		.object({
			intro: z.string().min(1).max(120).describe("The message's first line: 'Hello, I would like to book a table.'"),
			required: z.string().min(1).max(32).describe("Under an empty required field: 'Required'."),
			sent: z.string().min(1).max(160).describe("Once the app opens: 'Your message is ready in WhatsApp: send it, and we confirm by reply.'"),
		})
		.describe("Shown only when needed: in the message, under a missing field, after sending."),
});

export type BookingFormContent = z.input<typeof schema>;
