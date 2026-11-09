import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "footer-local",
	title: "Footer, local",
	family: "storefront",
	category: "footer",
	status: "beta",
	added: "2026-11-08",
	summary: "A footer for a place people visit: the address with a landmark, the week's hours grouped by day, phone and social links, the copyright.",
	useWhen: "Any local business site: the address and hours are what visitors look for at the bottom of the page.",
	avoidWhen: "A product or a startup: footer-columns.",
	layout: { columns: "grid" },
	content: { images: 0, minWords: 15, maxWords: 100 },
	components: [],
	dependencies: ["lucide-react"],
	pairsWith: ["location-map", "contact-links"],
} as const satisfies BlockMeta;
