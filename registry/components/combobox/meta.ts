export const meta = {
	name: "combobox",
	title: "Combobox",
	description: "A select you can type in: filters a long list as you write, picks one item or several as chips.",
	status: "beta",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "lucide-react"] },
	registryDependencies: ["input-group", "select"],
} as const;
