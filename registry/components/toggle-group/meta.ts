export const meta = {
	name: "toggle-group",
	title: "Toggle group",
	description: "A row of toggles: one choice (day, week, month) or several (bold, italic). Arrow keys move between them.",
	status: "beta",
	category: "forms",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react"] },
	registryDependencies: ["toggle"],
} as const;
