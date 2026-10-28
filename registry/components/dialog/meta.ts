export const meta = {
	name: "dialog",
	title: "Dialog",
	description: "A window over the page that keeps focus until it is closed.",
	status: "beta",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "lucide-react"] },
	registryDependencies: ["button"],
} as const;
