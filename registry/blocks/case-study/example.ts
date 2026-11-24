import type { CaseStudyContent } from "./schema";

const photo = (name: string, alt: string) => ({ src: `/placeholders/${name}.svg`, alt, width: 1200, height: 900 });

export const example: CaseStudyContent = {
	project: {
		title: "Maison Bonapriso",
		client: "A private client",
		year: 2026,
		kinds: ["Interior"],
		summary: "A family house opened to the garden: one long room, oak frames and a fireplace at its heart.",
		cover: photo("project-interior", "A bright living room with oak window frames, a black fireplace and low sofas"),
		href: "/work/maison-bonapriso",
		results: [
			{ label: "Months on site", value: 7, format: "number" },
			{ label: "Of the old walls kept", value: 0.8, format: "percent" },
			{ label: "Rooms opened into one", value: 3, format: "number" },
		],
	},
	facts: [
		{ label: "Role", value: "Interior architecture" },
		{ label: "Team", value: "Two designers, one carpenter" },
	],
	sections: [
		{
			kind: "context",
			title: "A house of small rooms",
			paragraphs: [
				"Built in the eighties, the house turned its back on a garden its owners loved: three small rooms, each with one window, and a corridor between them and the light.",
			],
		},
		{
			kind: "problem",
			title: "Light, without losing the cool",
			paragraphs: [
				"Opening the house meant more sun in a city where the afternoon is hot. The family wanted the garden in the room, not its heat.",
			],
		},
		{
			kind: "approach",
			title: "One long room, deep frames",
			paragraphs: [
				"We took down two walls and kept the rest, then set oak frames deep enough to shade their own glass. The fireplace, built for the rainy season, holds the middle of the room.",
				"Every piece of furniture is low, so the garden stays in view from the door.",
			],
			images: [photo("project-architecture", "White walls and an outdoor staircase casting long shadows under a blue sky")],
		},
		{
			kind: "results",
			title: "A room the family lives in",
			paragraphs: ["The house now opens on the garden from end to end, and stays cool until late afternoon without air conditioning."],
		},
	],
	gallery: [
		photo("project-ceramics", "Crackled ceramic bottles on a dark shelf, chosen for the room"),
		{ ...photo("project-packaging", "An open white box on a white table"), caption: "Samples of the oak and plaster finishes arrived in our own boxes." },
		photo("project-landscape", "A single tree on a dark hill, the view the family grew up with"),
	],
	next: { title: "Court of Steps", href: "/work/court-of-steps" },
	labels: { client: "Client", kind: "Kind", year: "Year", results: "Results", gallery: "Gallery", next: "Next project" },
};
