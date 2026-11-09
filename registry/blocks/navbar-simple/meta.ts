import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "navbar-simple",
	title: "Navbar, simple",
	family: "marketing",
	category: "navbar",
	status: "beta",
	added: "2026-11-08",
	summary: "The product's name, up to six links and two actions; below a narrow width, the links fold into a sheet.",
	useWhen: "At the top of a landing page with a handful of sections and one main action.",
	avoidWhen: "More than six links, or menus with sub-pages: use the Navigation Menu component.",
	layout: { columns: "stacked", aboveTheFold: true },
	content: { images: 0, minWords: 4, maxWords: 20 },
	components: ["button", "sheet"],
	dependencies: ["lucide-react"],
	pairsWith: ["hero-centered"],
} as const satisfies BlockMeta;
