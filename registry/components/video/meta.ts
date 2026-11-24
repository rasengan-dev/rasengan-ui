export const meta = {
	name: "video",
	title: "Video",
	description: "A video with its poster and a play button, then the browser's controls; a muted background loop; or a video in a dialog.",
	status: "beta",
	added: "2026-11-24",
	category: "display",
	engines: ["base"],
	dependencies: { base: ["class-variance-authority", "lucide-react"] },
	registryDependencies: ["dialog", "rasengan-motion"],
} as const;
