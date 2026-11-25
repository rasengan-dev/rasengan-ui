import { z } from "zod";

import { formChannel, money } from "@/lib/block-fields";

export const schema = z.object({
	title: z.string().min(1).max(24).describe("The drawer's title and its button's name: 'Your bag'."),
	shop: z.string().min(1).max(24).optional().describe("The cart it shows, shared with product-detail: 'kaya'. 'shop' when left out."),
	checkout: z
		.discriminatedUnion("kind", [
			z.object({ kind: z.literal("message"), channel: formChannel }).describe("The order written out, opened in the visitor's WhatsApp, texts or mail app."),
			z.object({ kind: z.literal("url"), href: z.string().min(1).describe("A payment link or an external checkout.") }),
		])
		.describe("Where an order goes: by message (RFC-0009) or to a URL. A project's `onCheckout` takes precedence."),
	freeDelivery: money.optional().describe("The subtotal from which delivery is free: a bar shows how far the cart is."),
	locale: z.string().optional().describe("A BCP 47 locale for prices ('en-CM'); the page's language when left out."),
	labels: z.object({
		open: z.string().min(1).max(32).describe("The button's name with the count: '{title}, {count} items'."),
		empty: z.string().min(1).max(48).describe("'Your bag is empty.'"),
		emptyLine: z.string().min(1).max(90).describe("Under it: 'What you add waits here, even if you close the page.'"),
		browse: z.string().min(1).max(24).describe("Closes the drawer: 'Browse the shop'."),
		subtotal: z.string().min(1).max(16).describe("'Subtotal'"),
		note: z.string().min(1).max(90).describe("'Delivery is worked out when we confirm your order.'"),
		checkout: z.string().min(1).max(32).describe("'Order on WhatsApp', 'Go to payment'."),
		continue: z.string().min(1).max(24).describe("Closes the drawer: 'Continue shopping'."),
		remove: z.string().min(1).max(16).describe("'Remove'"),
		quantity: z.string().min(1).max(16).describe("'Quantity'"),
		less: z.string().min(1).max(24).describe("'One less'"),
		more: z.string().min(1).max(24).describe("'One more'"),
		close: z.string().min(1).max(16).describe("'Close'"),
		away: z.string().min(1).max(48).describe("'{amount} away from free delivery'"),
		free: z.string().min(1).max(48).describe("'Free delivery unlocked'"),
		intro: z.string().min(1).max(120).describe("The order message's first line: 'Hello Kaya, I would like to order:'."),
		total: z.string().min(1).max(16).describe("The order message's last line: 'Total'."),
	}),
});

export type CartDrawerContent = z.infer<typeof schema>;
