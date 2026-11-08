import { z } from "zod";

import { cta, image } from "@/lib/block-fields";

const link = z.object({
	label: z.string().min(1).max(24).describe("One or two words: 'Pricing', 'Docs'."),
	href: z.string().min(1).describe("A path or an anchor on the page: '/pricing', '#features'."),
});

export const schema = z.object({
	brand: z.object({
		name: z.string().min(1).max(32).describe("The product's name, shown next to the logo, or alone."),
		href: z.string().min(1).describe("Where the name leads: usually '/'."),
		logo: image.optional().describe("A square mark, about 32px; decorative next to the name, so its alt may be empty."),
	}),
	links: z.array(link).min(1).max(6).describe("The page's main sections or pages, in reading order."),
	menuLabel: z.string().min(1).max(24).describe("The name of the menu button on narrow screens: 'Menu'."),
	secondary: cta.optional().describe("A quiet action before the main one: 'Sign in'."),
	primary: cta.describe("The one action the page is for: 'Start free'."),
});

export type NavbarSimpleContent = z.infer<typeof schema>;
