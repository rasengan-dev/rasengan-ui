import { BookingForm } from "@/components/blocks/booking-form";

const xaf = (amount: number) => ({ amount, currency: "XAF" });
const day = [{ open: "09:00", close: "19:00" }];

/** An appointment at a hair salon: services to pick instead of a party size, sent by text message. */
export default function BookingFormSalonDemo() {
	return (
		<BookingForm
			content={{
				title: "Book an appointment",
				subline: "Choose your service and a time: we confirm by text, and keep the chair for you.",
				image: { src: "/placeholders/person-beauty.svg", alt: "A client with a full afro, smiling, her hands in her hair.", width: 600, height: 750 },
				channel: { kind: "sms", to: "+237 6 77 00 00 00" },
				hours: {
					days: [
						{ day: "tuesday", slots: day },
						{ day: "wednesday", slots: day },
						{ day: "thursday", slots: day },
						{ day: "friday", slots: day },
						{ day: "saturday", slots: [{ open: "08:00", close: "20:00" }] },
					],
				},
				interval: 45,
				fields: {
					name: { label: "Your name" },
					date: { label: "Day", placeholder: "Pick a day" },
					time: { label: "Time", placeholder: "Pick a time" },
					services: {
						label: "Service",
						items: [
							{ name: "Knotless braids", duration: 240, price: xaf(25000) },
							{ name: "Silk press", duration: 120, price: xaf(15000) },
							{ name: "Cornrows", duration: 90, price: xaf(8000) },
							{ name: "Locs retwist", duration: 120, price: xaf(12000) },
						],
					},
				},
				submit: "Send my request",
				locale: "en-CM",
				labels: {
					intro: "Hello, I would like to book an appointment.",
					required: "Required",
					sent: "Your text is ready: send it, and we confirm within the hour.",
				},
			}}
		/>
	);
}
