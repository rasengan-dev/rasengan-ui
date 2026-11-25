import type { ListingCardsContent } from "./schema";

const xaf = (amount: number) => ({ amount, currency: "XAF" });
const photo = (name: string, alt: string) => ({ src: `/placeholders/place-${name}.svg`, alt, width: 1200, height: 900 });

export const example: ListingCardsContent = {
	eyebrow: "Homes",
	title: "To rent and to buy",
	subline: "Every home visited by one of us before it is listed.",
	listings: [
		{
			title: "Bright flat with a balcony",
			kind: "Apartment",
			status: "To let",
			place: "Bonapriso, Douala",
			price: xaf(450000),
			period: "month",
			facts: [
				{ label: "beds", value: 2 },
				{ label: "baths", value: 1 },
				{ label: "m²", value: 95 },
			],
			images: [photo("living-room", "A bright living room with tall windows and a long sofa")],
			tags: ["Furnished", "Generator"],
			href: "/homes/bonapriso-flat",
		},
		{
			title: "Family house with a garage",
			kind: "House",
			status: "For sale",
			place: "Bonamoussadi, Douala",
			price: xaf(185000000),
			period: "once",
			facts: [
				{ label: "beds", value: 4 },
				{ label: "baths", value: 3 },
				{ label: "m²", value: 260 },
			],
			images: [photo("house", "A white house with a wide porch and glass garage doors")],
			href: "/homes/bonamoussadi-house",
		},
		{
			title: "Quiet studio near the market",
			kind: "Studio",
			status: "To let",
			place: "Akwa, Douala",
			price: xaf(180000),
			period: "month",
			facts: [
				{ label: "beds", value: 1 },
				{ label: "baths", value: 1 },
				{ label: "m²", value: 38 },
			],
			images: [photo("bedroom", "A calm bedroom with wood panels and a plant")],
			tags: ["Furnished"],
			href: "/homes/akwa-studio",
		},
		{
			title: "Villa with a pool by the sea",
			kind: "Villa",
			status: "To let",
			place: "Kribi",
			price: xaf(120000),
			period: "night",
			facts: [
				{ label: "beds", value: 5 },
				{ label: "baths", value: 4 },
				{ label: "m²", value: 340 },
			],
			images: [photo("villa", "A white villa with a pool and loungers among palm trees")],
			rating: { score: 4.9, count: 37 },
			tags: ["Pool"],
			href: "/homes/kribi-villa",
		},
	],
	locale: "en-CM",
	labels: {
		periods: { once: "", month: "a month", week: "a week", night: "a night" },
		reviews: "{count} reviews",
		none: "No home matches these filters.",
		reset: "Show every home",
		shown: "{count} homes",
	},
};
