import { HeroWordmark } from "@/components/blocks/hero-wordmark";

/** The same block for a place: the restaurant's name under a photo of its room (storefront family). */
export default function HeroWordmarkRestaurantDemo() {
	return (
		<HeroWordmark
			content={{
				word: "Ngono",
				headline: "Home cooking, the way Douala likes it",
				subline: "Ndolé on Fridays, grilled fish every evening, and plantains fried to order.",
				primary: { label: "Book a table", href: "#booking" },
				secondary: { label: "See the menu", href: "#menu" },
				image: { src: "/placeholders/restaurant-room.svg", alt: "The dining room, set for dinner, with wooden tables and warm lights.", width: 1200, height: 900 },
			}}
		/>
	);
}
