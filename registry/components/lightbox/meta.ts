export const meta = {
	name: "lightbox",
	title: "Lightbox",
	description: "Photos that open full screen, one at a time, with arrows, the arrow keys, a swipe, a counter and the caption.",
	status: "beta",
	added: "2026-11-24",
	category: "overlays",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "lucide-react"] },
	registryDependencies: ["dialog", "button"],
} as const;
