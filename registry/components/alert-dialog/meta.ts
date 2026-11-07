export const meta = {
	name: "alert-dialog",
	title: "Alert dialog",
	description: "Asks to confirm something that cannot be undone. It does not close on an outside click; focus starts on Cancel.",
	status: "beta",
	category: "overlays",
	engines: ["base"],
	dependencies: { base: ["@base-ui/react", "class-variance-authority"] },
	registryDependencies: ["button"],
} as const;
