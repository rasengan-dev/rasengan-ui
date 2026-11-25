import type { CartDrawerContent } from "./schema";

export const example: CartDrawerContent = {
	title: "Your bag",
	shop: "kaya",
	checkout: { kind: "message", channel: { kind: "whatsapp", to: "+237 6 90 00 00 00" } },
	freeDelivery: { amount: 50000, currency: "XAF" },
	locale: "en-CM",
	labels: {
		open: "{title}, {count} items",
		empty: "Your bag is empty.",
		emptyLine: "What you add waits here, even if you close the page.",
		browse: "Browse the shop",
		subtotal: "Subtotal",
		note: "Delivery is worked out when we confirm your order.",
		checkout: "Order on WhatsApp",
		continue: "Continue shopping",
		remove: "Remove",
		quantity: "Quantity",
		less: "One less",
		more: "One more",
		close: "Close",
		away: "{amount} away from free delivery",
		free: "Free delivery unlocked",
		intro: "Hello Kaya, I would like to order:",
		total: "Total",
	},
};
