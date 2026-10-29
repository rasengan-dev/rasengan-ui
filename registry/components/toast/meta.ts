export const meta = {
	name: "toast",
	title: "Toast",
	description: "A short message in a corner of the screen, on Sonner. Call toast() from anywhere; render <Toaster /> once.",
	status: "beta",
	engines: ["base"],
	dependencies: { base: ["sonner", "lucide-react"] },
	registryDependencies: ["button"],
} as const;
