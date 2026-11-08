import type { OrderBannerContent } from "./schema";

export const example: OrderBannerContent = {
	headline: "Hungry? We deliver in Akwa and Bonapriso",
	subline: "Order before 21:30 and your food arrives hot in about forty minutes. Pay on delivery, in cash or mobile money.",
	whatsapp: { number: "+237 6 99 00 00 00", label: "Order on WhatsApp", message: "Hello, I would like to order:" },
	phone: { number: "+237 2 33 00 00 00", label: "Call us" },
	note: "Delivery from 1,000 FCFA, free above 15,000 FCFA.",
};
