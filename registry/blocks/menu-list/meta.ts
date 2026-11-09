import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "menu-list",
	title: "Menu, list",
	family: "storefront",
	category: "menu",
	status: "beta",
	added: "2026-11-08",
	summary: "The whole menu as a printed card: every category at once in two columns, each dish with a dotted leader to its price.",
	useWhen: "A menu of up to forty dishes read in one go, for a restaurant that wants the printed-menu feel.",
	avoidWhen: "A long menu: menu-categories puts it in tabs. Dishes that need photos: menu-cards.",
	layout: { columns: "split" },
	content: { images: 0, minWords: 40, maxWords: 500 },
	components: ["badge"],
	pairsWith: ["menu-cards", "booking-form"],
} as const satisfies BlockMeta;
