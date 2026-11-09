import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "team-grid",
	title: "Team, grid",
	family: "marketing",
	category: "team",
	status: "beta",
	added: "2026-11-09",
	summary: "The company's people in a grid: a portrait, name and role, a line about them and their profiles, and a link to open roles.",
	useWhen: "An about page, or a small company whose people are part of the pitch.",
	avoidWhen: "A business whose clients book a person: team-staff gives each one a booking link.",
	layout: { columns: "grid" },
	content: { images: 6, minWords: 20, maxWords: 200 },
	components: ["button"],
	pairsWith: ["stats-numbers", "cta-banner"],
} as const satisfies BlockMeta;
