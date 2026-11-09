import type { BlockMeta } from "@/lib/blocks";

export const meta = {
	name: "integrations-orbit",
	title: "Integrations, orbit",
	family: "marketing",
	category: "integrations",
	status: "beta",
	added: "2026-11-09",
	summary: "Your product at the centre, the tools it connects to on two slowly turning rings, with a pause button and a plain list below.",
	useWhen: "A product whose value grows with the tools it connects to: four to twelve integrations worth naming.",
	avoidWhen: "Dozens of integrations: a searchable integrations page, linked from logos-grid.",
	layout: { columns: "stacked" },
	content: { images: 6, minWords: 15, maxWords: 80 },
	components: ["button"],
	dependencies: ["lucide-react"],
	pairsWith: ["features-alternating", "pricing-plans"],
} as const satisfies BlockMeta;
