import type { TeamStaffContent } from "./schema";

const portrait = (name: string, alt: string) => ({ src: `/placeholders/person-${name}.svg`, alt, width: 600, height: 750 });

export const example: TeamStaffContent = {
	title: "Our barbers",
	subline: "Four chairs, four styles. Book with the one you like, or let us pick who is free first.",
	members: [
		{
			name: "Junior",
			role: "Founder, master barber",
			image: portrait("barber", "Junior, in a black shirt, trimming a client's hair."),
			specialties: ["fades", "beard design"],
			cta: { label: "Book with Junior", href: "#booking" },
		},
		{
			name: "Eric",
			role: "Barber",
			image: portrait("man-1", "Eric, smiling, outdoors."),
			specialties: ["line-ups", "kids' cuts"],
			cta: { label: "Book with Eric", href: "#booking" },
		},
		{
			name: "Grace",
			role: "Stylist",
			image: portrait("woman-2", "Grace, in glasses, with long braids."),
			specialties: ["braids", "locs"],
			cta: { label: "Book with Grace", href: "#booking" },
		},
		{
			name: "Samuel",
			role: "Barber",
			image: portrait("man-2", "Samuel, smiling, in a black t-shirt."),
			specialties: ["waves", "hot towel shave"],
			cta: { label: "Book with Samuel", href: "#booking" },
		},
	],
};
