import type { GalleryHorizontalContent } from "./schema";

const photo = (name: string, alt: string, caption: string) => ({ src: `/placeholders/${name}.svg`, alt, width: 1200, height: 900, caption });

export const example: GalleryHorizontalContent = {
	eyebrow: "Series",
	title: "A year of pictures",
	subline: "Scroll on: the row moves sideways. Open a photo to see it whole.",
	photos: [
		photo("project-landscape", "A single tree on a dark hill under a grey sky", "Lone Hill, Bafoussam"),
		photo("project-ceramics", "Crackled ceramic bottles on a dark shelf", "Glaze Studies, Mbalmayo"),
		photo("project-architecture", "White walls and stairs under a blue sky", "Court of Steps, Kribi"),
		photo("project-product", "An amber bottle on driftwood under one light", "Oil of the Coast"),
		photo("project-interior", "A bright living room with oak frames", "Maison Bonapriso, Douala"),
		photo("project-packaging", "An open white box on a white table", "Plain Box"),
	],
	labels: { photos: "Photos of the series" },
};
