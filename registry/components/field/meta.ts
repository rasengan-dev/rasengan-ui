export const meta = {
	name: "field",
	title: "Field",
	description: "Groups a label, a control, a description and an error, and links them for assistive technology.",
	status: "beta",
	category: "forms",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react"] },
	registryDependencies: ["label", "input"],
} as const;
