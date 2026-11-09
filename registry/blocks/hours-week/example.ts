import type { HoursWeekContent } from "./schema";

const lunchAndDinner = [
	{ open: "11:30", close: "15:00" },
	{ open: "18:30", close: "23:00" },
];

export const example: HoursWeekContent = {
	title: "Opening hours",
	hours: {
		days: [
			{ day: "monday", slots: [] },
			{ day: "tuesday", slots: lunchAndDinner },
			{ day: "wednesday", slots: lunchAndDinner },
			{ day: "thursday", slots: lunchAndDinner },
			{ day: "friday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "saturday", slots: [{ open: "11:30", close: "00:30" }] },
			{ day: "sunday", slots: [{ open: "12:00", close: "17:00" }] },
		],
		note: "Closed on 1 January and 20 May. The kitchen takes its last orders 30 minutes before closing.",
	},
	timeZone: "Africa/Douala",
	locale: "en-CM",
	labels: { closed: "Closed", today: "Today", openNow: "Open now", closedNow: "Closed now" },
};
