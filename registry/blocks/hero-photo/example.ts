import type { HeroPhotoContent } from "./schema";

export const example: HeroPhotoContent = {
	eyebrow: "Cameroonian kitchen · Akwa, Douala",
	headline: "Home cooking, the way Douala likes it",
	subline: "Ndolé on Fridays, grilled fish every evening, and plantains fried to order. Eat in on the terrace or take it home.",
	primary: { label: "See the menu", href: "#menu" },
	secondary: { label: "Order on WhatsApp", href: "#order" },
	highlights: ["Open every day", "Delivery in Akwa and Bonapriso", "Since 2009"],
	image: {
		src: "/placeholders/dish-stew.svg",
		alt: "A bowl of egusi with assorted meats, held in both hands.",
		width: 1200,
		height: 900,
	},
};
