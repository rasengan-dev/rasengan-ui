import type { AwardsListContent } from "./schema";

export const example: AwardsListContent = {
	eyebrow: "Recognition",
	title: "Awards",
	subline: "A few juries liked what we made. We are proudest of the clients who came back.",
	awards: [
		{ year: 2026, name: "Interior of the Year, shortlisted", by: "Afrika Design Awards", project: "Maison Bonapriso", href: "/work/maison-bonapriso" },
		{ year: 2025, name: "Best Packaging, gold", by: "Lagos Design Week", project: "Plain Box", href: "/work/plain-box" },
		{ year: 2025, name: "Product photography, finalist", by: "Still Life Annual", project: "Oil of the Coast" },
		{ year: 2024, name: "Emerging studio", by: "Douala Creative Prize" },
		{ year: 2023, name: "Series of the year, honourable mention", by: "Lens & Light", project: "Lone Hill" },
	],
	labels: { year: "Year", award: "Award", project: "Project" },
};
