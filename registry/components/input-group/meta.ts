export const meta = {
	name: "input-group",
	title: "Input Group",
	description: "An input or a textarea with icons, text, buttons or a toolbar inside its border: search, passwords, URLs, prompts.",
	status: "beta",
	category: "forms",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "class-variance-authority"] },
	registryDependencies: ["button", "input", "textarea"],
} as const;
