/*
 * rasengan-blocks (RFC-0008), the content field types. Installed as `@/lib/block-fields`.
 *
 * In zod 3 (the `zod` entry, as Rasengan.js and Jutsify use): blocks build their schemas from them, so an agent learns a
 * field once. Length limits are part of the design; `.describe()` is writing guidance. Only a block's schema.ts imports
 * this file, so a page that renders blocks without parsing content loads no zod.
 */

import { z } from "zod";

import type { BlockMeta } from "./blocks";

// ---- Field types ---------------------------------------------------------------------------------------------------

export const cta = z.object({
	label: z.string().min(1).max(32).describe("A verb first, two to four words: 'Start free', 'Book a table'."),
	href: z.string().min(1).describe("A path ('/pricing'), an anchor ('#menu'), or a full URL."),
});

export const image = z.object({
	src: z.string().min(1).describe("A local path ('/images/terrace.jpg') or the project's asset URL."),
	alt: z.string().max(140).describe("What the image shows, for people who cannot see it. Empty only if purely decorative."),
	width: z.number().int().positive(),
	height: z.number().int().positive(),
});

export const icon = z.string().min(1).describe("A Lucide icon name in kebab-case, e.g. 'rocket', 'shield-check'.");

export const logo = z.object({
	name: z.string().min(1).max(40).describe("The company's name, read when there is no image."),
	src: z.string().optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
});

export const money = z.object({
	amount: z.number().nonnegative(),
	currency: z.string().length(3).describe("An ISO 4217 code: 'EUR', 'USD', 'XAF'."),
});

export const stat = z.object({
	label: z.string().min(1).max(32),
	value: z.number(),
	format: z.enum(["number", "percent", "currency", "compact"]).default("number").describe("'percent' takes 0.97 for 97%."),
	currency: z.string().length(3).optional().describe("With format 'currency'."),
});

export const testimonial = z.object({
	quote: z.string().min(12).max(240).describe("In the customer's words, one or two sentences."),
	name: z.string().min(1).max(48),
	role: z.string().max(60).optional().describe("Role and company, or the city."),
	avatar: image.optional(),
});

export const pricePlan = z.object({
	name: z.string().min(1).max(24),
	price: money,
	period: z.enum(["month", "year", "once"]).default("month"),
	description: z.string().max(100),
	features: z.array(z.string().min(1).max(60)).min(1).max(8),
	cta,
	highlighted: z.boolean().default(false).describe("At most one highlighted plan."),
});

export const faqItem = z.object({
	question: z.string().min(6).max(120),
	answer: z.string().min(6).max(400),
});

export const menuItem = z.object({
	name: z.string().min(1).max(48),
	description: z.string().max(140).optional(),
	price: money,
	tags: z.array(z.string().min(1).max(16)).max(3).optional().describe("Short labels: 'spicy', 'vegetarian', 'new'."),
});

export const service = z.object({
	name: z.string().min(1).max(48),
	description: z.string().max(140).optional(),
	duration: z.number().int().positive().optional().describe("Minutes."),
	price: money,
});

const time = z.string().regex(/^\d{2}:\d{2}$/).describe("24-hour 'HH:MM'.");

export const openingHours = z.object({
	days: z
		.array(
			z.object({
				day: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
				slots: z.array(z.object({ open: time, close: time })).max(3).describe("Empty for a closed day."),
			}),
		)
		.min(1)
		.max(7),
	note: z.string().max(120).optional().describe("Holidays, exceptions."),
});

export const address = z.object({
	lines: z.array(z.string().min(1).max(60)).min(1).max(4),
	landmark: z.string().max(80).optional().describe("How locals find it: 'opposite the central market'."),
	coordinates: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }).optional(),
	mapUrl: z.string().url().optional().describe("A link to directions."),
});

export const contactLink = z.object({
	kind: z.enum(["phone", "whatsapp", "email", "instagram", "facebook", "tiktok", "x", "website"]),
	value: z.string().min(1).max(120).describe("The number, address or URL."),
	label: z.string().max(32).optional(),
});

// RFC-0009: reviews, staff, branches, offers, comparisons, integrations, and where a form sends its message.

export const review = z.object({
	author: z.string().min(1).max(48).describe("As the customer signs: 'Aïcha N.', 'Paul from Bonapriso'."),
	rating: z.number().int().min(1).max(5),
	text: z.string().min(12).max(400).describe("In the customer's words."),
	date: z.string().date().optional().describe("'YYYY-MM-DD', shown in the project's locale."),
	source: z.string().max(24).optional().describe("Where it was left, as a label: 'Google', 'In the shop'. Never a logo."),
});

export const ratingSummary = z.object({
	score: z.number().min(0).max(5).describe("The average out of 5, e.g. 4.8."),
	count: z.number().int().nonnegative().describe("How many reviews the average is over."),
	source: z.string().max(24).optional().describe("Where the reviews were left, as a label: 'Google'."),
	href: z.string().optional().describe("A link to read them all or to leave one."),
});

export const staffMember = z.object({
	name: z.string().min(1).max(48),
	role: z.string().min(1).max(48).describe("'Senior barber', 'Head chef'."),
	image: image.optional(),
	specialties: z.array(z.string().min(1).max(24)).max(4).optional().describe("Short: 'fades', 'braids', 'pastry'."),
	cta: cta.optional().describe("Booking with this person, e.g. 'Book with Junior'."),
});

export const branch = z.object({
	name: z.string().min(1).max(48).describe("Which one: 'Akwa', 'Bonamoussadi'."),
	address,
	openingHours: openingHours.optional(),
	phone: z.string().max(24).optional().describe("In international form: '+237 6 99 00 00 00'."),
	image: image.optional().describe("A static map or a photo of the front."),
});

export const offer = z.object({
	title: z.string().min(1).max(48),
	description: z.string().max(140).optional().describe("What it includes."),
	price: money,
	was: money.optional().describe("The usual price, shown struck through."),
	endsAt: z.string().datetime({ offset: true }).optional().describe("When the offer ends, ISO 8601 with its offset; a countdown runs to it."),
	cta: cta.optional(),
});

export const comparisonRow = z.object({
	label: z.string().min(1).max(60).describe("What is compared: 'Set up in a day'."),
	ours: z.union([z.boolean(), z.string().min(1).max(24)]).describe("Yes, no, or a short value ('2 min')."),
	theirs: z.union([z.boolean(), z.string().min(1).max(24)]),
});

export const integration = z.object({
	name: z.string().min(1).max(32),
	logo: logo.optional(),
	category: z.string().max(24).optional().describe("'Payments', 'Calendar'."),
});

export const formChannel = z.object({
	kind: z.enum(["whatsapp", "sms", "email"]).describe("Where the visitor's message opens: their WhatsApp, their texts, or their mail app."),
	to: z.string().min(1).max(120).describe("The business's number in international form, or its email address."),
});

export type Cta = z.infer<typeof cta>;
export type Image = z.infer<typeof image>;
export type Logo = z.infer<typeof logo>;
export type Money = z.infer<typeof money>;
export type Stat = z.infer<typeof stat>;
export type Testimonial = z.infer<typeof testimonial>;
export type PricePlan = z.infer<typeof pricePlan>;
export type FaqItem = z.infer<typeof faqItem>;
export type MenuItem = z.infer<typeof menuItem>;
export type Service = z.infer<typeof service>;
export type OpeningHours = z.infer<typeof openingHours>;
export type Address = z.infer<typeof address>;
export type ContactLink = z.infer<typeof contactLink>;
export type Review = z.infer<typeof review>;
export type RatingSummary = z.infer<typeof ratingSummary>;
export type StaffMember = z.infer<typeof staffMember>;
export type Branch = z.infer<typeof branch>;
export type Offer = z.infer<typeof offer>;
export type ComparisonRow = z.infer<typeof comparisonRow>;
export type Integration = z.infer<typeof integration>;
export type FormChannel = z.infer<typeof formChannel>;

// ---- Definition ----------------------------------------------------------------------------------------------------

/** A block's schema, example and meta, together: what the tests and the catalog read. */
export interface BlockDefinition<Schema extends z.ZodTypeAny> {
	meta: BlockMeta;
	schema: Schema;
	example: z.input<Schema>;
}

export function defineBlock<Schema extends z.ZodTypeAny>(definition: BlockDefinition<Schema>): BlockDefinition<Schema> {
	return definition;
}
