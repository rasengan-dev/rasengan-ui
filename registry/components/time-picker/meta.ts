export const meta = {
	name: "time-picker",
	title: "Time Picker",
	description: "A time typed in a field (hours, minutes, seconds) or picked from slots between two hours, in 12 or 24 hours.",
	status: "beta",
	engines: ["base"],
	dependencies: { base: ["lucide-react"] },
	registryDependencies: ["input-group", "select"],
} as const;
