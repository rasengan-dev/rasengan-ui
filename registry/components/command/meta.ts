export const meta = {
	name: "command",
	title: "Command",
	description: "A search field over a list of actions or pages, filtered as you type: the command palette, in a dialog or inline.",
	status: "beta",
	category: "navigation",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "lucide-react"] },
	registryDependencies: ["dialog", "kbd"],
} as const;
