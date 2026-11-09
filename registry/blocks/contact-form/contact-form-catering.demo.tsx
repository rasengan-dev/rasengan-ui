import { ContactForm } from "@/components/blocks/contact-form";

/** The same block for a place: event and catering requests to a restaurant, sent on WhatsApp (storefront family). */
export default function ContactFormCateringDemo() {
	return (
		<ContactForm
			content={{
				title: "Events and catering",
				subline: "Birthdays, weddings, office lunches: tell us the date and how many, we answer the same day.",
				channel: { kind: "whatsapp", to: "+237 6 99 00 00 00" },
				fields: {
					name: { label: "Your name" },
					email: { label: "Email" },
					topic: { label: "Occasion", options: ["Birthday", "Wedding", "Office lunch", "Something else"] },
					message: { label: "Date, guests and what you have in mind" },
				},
				submit: "Send on WhatsApp",
				details: [
					{ label: "WhatsApp", value: "+237 6 99 00 00 00", href: "https://wa.me/237699000000" },
					{ label: "Visit", value: "Rue Joss, Akwa, Douala" },
				],
				image: { src: "/placeholders/map-akwa.svg", alt: "A map of Akwa with the restaurant marked on Rue Joss.", width: 1200, height: 800 },
				labels: {
					intro: "Hello, I would like to organise an event with you.",
					required: "Required",
					invalidEmail: "Enter an email like name@example.com",
					sent: "Your request is ready in WhatsApp: send it, and we answer the same day.",
				},
			}}
		/>
	);
}
