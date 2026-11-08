import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "location-map",
	title: "Location, map",
	family: "storefront",
	category: "location",
	status: "beta",
	added: "2026-11-08",
	summary: "The address with how locals find it, a directions link and practical notes beside a static map; an OpenStreetMap embed on request.",
	useWhen: "Any place people come to, especially where street addresses are not enough.",
	avoidWhen: "An online-only business, or a home address that should stay private.",
	layout: { columns: "split" },
	content: { images: 1, minWords: 10, maxWords: 80 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["hours-week", "contact-links"],
} as const satisfies BlockMeta;
