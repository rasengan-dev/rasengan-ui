import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "location-branches",
	title: "Location, branches",
	family: "storefront",
	category: "location",
	status: "beta",
	added: "2026-11-08",
	summary: "One card per branch: a map or a photo, the address and a landmark, today's hours and open now, and call and directions links.",
	useWhen: "A business with two to six places: a restaurant group, a chain of salons, shops in several districts.",
	avoidWhen: "One place: location-map shows it larger, with an optional embedded map.",
	layout: { columns: "grid" },
	content: { images: 2, minWords: 20, maxWords: 150 },
	components: ["badge", "button"],
	dependencies: ["lucide-react"],
	pairsWith: ["hours-week", "contact-links"],
} as const satisfies BlockMeta;
