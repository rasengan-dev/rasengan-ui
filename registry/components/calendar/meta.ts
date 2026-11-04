export const meta = {
	name: "calendar",
	title: "Calendar",
	description: "A month grid to pick one day, several days or a range, with month and year dropdowns, week numbers and locales.",
	status: "beta",
	engines: ["base"],
	dependencies: { base: ["react-day-picker", "date-fns", "class-variance-authority", "lucide-react"] },
	registryDependencies: ["button"],
} as const;
