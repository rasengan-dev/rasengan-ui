export const meta = {
	name: "date-picker",
	title: "Date Picker",
	description: "A date picked from a calendar, typed, or with a time: single days, ranges with presets, dates of birth.",
	status: "beta",
	category: "dates",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "react-day-picker", "date-fns", "lucide-react"] },
	registryDependencies: ["calendar", "popover", "select", "input-group", "button", "time-picker"],
} as const;
