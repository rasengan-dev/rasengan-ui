import type { HeroVideoContent } from "./schema";

export const example: HeroVideoContent = {
	eyebrow: "Akwa, Douala · Since 2009",
	headline: "Dinner by the river, every night from seven",
	subline: "A room of wood and warm light, the grill in sight, and a table for you if you call before six.",
	primary: { label: "Book a table", href: "#booking" },
	secondary: { label: "See the menu", href: "#menu" },
	video: {
		src: "/media/restaurant-room.mp4",
		poster: "/media/restaurant-room-poster.jpg",
		label: "A slow look around the dining room",
	},
	labels: { play: "Play the video", pause: "Pause the video" },
};
