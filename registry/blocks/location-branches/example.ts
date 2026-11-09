import type { LocationBranchesContent } from "./schema";

const week = (slots: { open: string; close: string }[], closed: string[] = []) =>
	(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map((day) => ({ day, slots: closed.includes(day) ? [] : slots }));

export const example: LocationBranchesContent = {
	title: "Find us",
	subline: "Two kitchens, the same recipes. Both deliver in their part of town.",
	branches: [
		{
			name: "Akwa",
			address: {
				lines: ["Rue Joss, Akwa", "Douala"],
				landmark: "Two streets from the Akwa post office, the green door.",
				mapUrl: "https://www.openstreetmap.org/?mlat=4.0469&mlon=9.6966#map=17/4.0469/9.6966",
			},
			openingHours: {
				days: [
					{ day: "monday", slots: [] },
					...(["tuesday", "wednesday", "thursday"] as const).map((day) => ({ day, slots: [{ open: "11:30", close: "15:00" }, { open: "18:30", close: "23:00" }] })),
					...(["friday", "saturday"] as const).map((day) => ({ day, slots: [{ open: "11:30", close: "00:30" }] })),
					{ day: "sunday", slots: [{ open: "12:00", close: "17:00" }] },
				],
			},
			phone: "+237 6 99 00 00 00",
			image: { src: "/placeholders/map-akwa.svg", alt: "A map of Akwa with the restaurant marked on Rue Joss.", width: 1200, height: 800 },
		},
		{
			name: "Bonamoussadi",
			address: {
				lines: ["Carrefour Kotto", "Bonamoussadi, Douala"],
				landmark: "Above the Total station, first floor",
				mapUrl: "https://www.openstreetmap.org/?mlat=4.0911&mlon=9.7442#map=17/4.0911/9.7442",
			},
			openingHours: { days: week([{ open: "12:00", close: "22:00" }]) },
			phone: "+237 6 77 00 00 00",
			image: { src: "/placeholders/restaurant-room.svg", alt: "The Bonamoussadi dining room, set for dinner.", width: 1200, height: 900 },
		},
	],
	timeZone: "Africa/Douala",
	locale: "en-CM",
	labels: { today: "Today", closedToday: "Closed today", openNow: "Open now", closedNow: "Closed now", directions: "Directions", call: "Call" },
};
