import type { ExperienceTimelineContent } from "./schema";

export const example: ExperienceTimelineContent = {
	eyebrow: "Since 2017",
	title: "How the studio grew",
	subline: "Four people, two cities, one room at a time.",
	entries: [
		{ from: "2024-09", to: "now", title: "Opened a second studio", organisation: "Nkam, Kribi", description: "A small workshop by the sea for the furniture we make ourselves." },
		{ from: "2021-03", to: "2024-08", title: "Interiors and objects", organisation: "Nkam, Douala", description: "From one-room projects to whole houses, with our own carpenter." },
		{ from: "2019", to: "2021", title: "Photography for makers", organisation: "Freelance", description: "Catalogues for potters, weavers and perfumers across the country." },
		{ from: "2017", title: "Founded Nkam", organisation: "Bonanjo, Douala" },
	],
	labels: { now: "Now" },
};
