import type { LocationMapContent } from "./schema";

export const example: LocationMapContent = {
	title: "Find us",
	address: {
		lines: ["Rue Joss, Akwa", "Douala, Cameroon"],
		landmark: "Two streets from the Akwa post office, the green door.",
		coordinates: { lat: 4.0469, lng: 9.6966 },
		mapUrl: "https://www.openstreetmap.org/?mlat=4.0469&mlon=9.6966#map=17/4.0469/9.6966",
	},
	map: {
		src: "/placeholders/map-akwa.svg",
		alt: "A map of the streets of Akwa, Douala, with a pin on the restaurant.",
		width: 1200,
		height: 800,
	},
	directions: { label: "Get directions", href: "https://www.openstreetmap.org/directions?to=4.0469%2C9.6966" },
	notes: ["Parking on the street in the evening.", "Taxis stop at the Akwa roundabout, two minutes away."],
};
