import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "bento-features",
	title: "Bento, features",
	family: "marketing",
	category: "bento",
	status: "beta",
	added: "2026-11-09",
	summary: "Features, numbers that roll in and a product shot in a bento grid of small, wide, tall and large tiles.",
	useWhen: "A product with one strong visual, a couple of real numbers and four to six features worth showing at once.",
	avoidWhen: "Features of equal weight and no numbers: features-grid is calmer.",
	layout: { columns: "grid" },
	content: { images: 1, minWords: 40, maxWords: 200 },
	components: ["number-roll"],
	dependencies: ["lucide-react"],
	pairsWith: ["hero-centered", "testimonials-carousel"],
} as const satisfies BlockMeta;
