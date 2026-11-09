import type { ContactLinksContent } from "./schema";

export const example: ContactLinksContent = {
	title: "Get in touch",
	subline: "WhatsApp is the fastest: we answer within the hour, every day from 10:00.",
	links: [
		{ kind: "whatsapp", value: "+237 6 99 00 00 00", label: "WhatsApp" },
		{ kind: "phone", value: "+237 2 33 00 00 00", label: "Phone" },
		{ kind: "email", value: "hello@mamangono.example", label: "Email" },
		{ kind: "instagram", value: "https://www.instagram.com/", label: "Instagram" },
		{ kind: "facebook", value: "https://www.facebook.com/", label: "Facebook" },
		{ kind: "tiktok", value: "https://www.tiktok.com/", label: "TikTok" },
	],
};
