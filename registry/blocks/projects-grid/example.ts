import type { ProjectsGridContent } from "./schema";

const cover = (name: string, alt: string) => ({ src: `/placeholders/project-${name}.svg`, alt, width: 1200, height: 900 });

export const example: ProjectsGridContent = {
	eyebrow: "Selected work",
	title: "All work",
	subline: "Rooms, objects and pictures made with people who care about the details.",
	projects: [
		{
			title: "Maison Bonapriso",
			client: "A private client",
			year: 2026,
			kinds: ["Interior"],
			summary: "A family house opened to the garden: one long room, oak frames and a fireplace at its heart.",
			cover: cover("interior", "A bright living room with oak window frames, a black fireplace and low sofas"),
			href: "/work/maison-bonapriso",
		},
		{
			title: "Court of Steps",
			client: "Kribi Residences",
			year: 2025,
			kinds: ["Architecture"],
			summary: "A white courtyard of stairs and shade for a seaside residence, built to stay cool at noon.",
			cover: cover("architecture", "White walls and an outdoor staircase casting long shadows under a blue sky"),
			href: "/work/court-of-steps",
		},
		{
			title: "Oil of the Coast",
			client: "Wouri Botanics",
			year: 2025,
			kinds: ["Product", "Photography"],
			summary: "A body oil and its launch pictures: amber glass, driftwood and one warm light.",
			cover: cover("product", "An amber bottle on a piece of driftwood, lit by a single studio light"),
			href: "/work/oil-of-the-coast",
		},
		{
			title: "Glaze Studies",
			client: "Poterie de Mbalmayo",
			year: 2024,
			kinds: ["Photography"],
			summary: "A catalogue for a potters' workshop: crackled glazes shot in the light of the shelves they dry on.",
			cover: cover("ceramics", "Crackled ceramic bottles in ochre, green and grey on a dark shelf"),
			href: "/work/glaze-studies",
		},
		{
			title: "Plain Box",
			year: 2024,
			kinds: ["Packaging"],
			summary: "Our own shipping box: one white board, no glue, no ink, opened in one move.",
			cover: cover("packaging", "An open white cardboard box on a white table"),
			href: "/work/plain-box",
		},
		{
			title: "Lone Hill",
			client: "Self-initiated",
			year: 2023,
			kinds: ["Photography"],
			summary: "A black and white series on the hills west of Bafoussam, one tree at a time.",
			cover: cover("landscape", "A single tree on a dark hill under a grey, cloudy sky"),
			href: "/work/lone-hill",
		},
	],
	labels: { all: "All", filter: "Filter projects by kind", shown: "{count} projects shown" },
};
