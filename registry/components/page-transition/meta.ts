export const meta = {
	name: "page-transition",
	title: "Page Transition",
	description: "A curtain between pages or states (wipe, blinds, iris, fade) that works with any router and moves focus to the new heading.",
	status: "beta",
	category: "motion",
	engines: ["base"],
	dependencies: { base: ["class-variance-authority"] },
	registryDependencies: ["rasengan-motion"],
} as const;
