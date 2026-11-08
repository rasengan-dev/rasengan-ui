import type { ReviewsRatingContent } from "./schema";

export const example: ReviewsRatingContent = {
	title: "What our guests say",
	summary: { score: 4.8, count: 326, source: "Google", href: "https://maps.google.com" },
	reviews: [
		{ author: "Aïcha N.", rating: 5, text: "The best ndolé in Akwa, and I have tried them all. Generous plates, and the folere is made on the spot.", date: "2026-10-18", source: "Google" },
		{ author: "Paul from Bonapriso", rating: 5, text: "We ordered for a family lunch of twenty people. Everything arrived hot and on time.", date: "2026-10-02", source: "Google" },
		{ author: "Mireille K.", rating: 4, text: "Lovely terrace in the evening. Busy on Fridays, so book ahead.", date: "2026-09-27", source: "Google" },
		{ author: "Thomas B.", rating: 5, text: "Came for work, came back three times in a week. The fish is grilled exactly right.", date: "2026-09-12", source: "In the shop" },
		{ author: "Esther M.", rating: 5, text: "They made my mother's birthday cake a surprise, candles and all. Thank you to the whole team.", date: "2026-08-30", source: "Google" },
		{ author: "Didier T.", rating: 4, text: "Good food, fair prices. The plantain could be riper, but I will be back.", date: "2026-08-14", source: "Google" },
	],
	locale: "en-CM",
	labels: { outOf: "out of 5", reviews: "reviews", on: "on", readAll: "Read all reviews" },
};
