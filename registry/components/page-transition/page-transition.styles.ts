import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;

/*
 * The curtain: a transparent layer whose panels (one panel, or bars for blinds) wear the tone's fill. Over the whole
 * page it goes to the browser's top layer when it can (a manual popover, so it sits above dialogs without z-index),
 * else it is fixed above everything; over one element it is absolute and clipped by it. It takes the pointer only
 * while it moves, so nothing can be clicked twice in between. Panels move by transform, opacity or clip-path only.
 */
export const pageTransitionVariants = cva(
	"pointer-events-none invisible m-0 overflow-clip border-0 bg-transparent p-0 data-[running]:pointer-events-auto data-[running]:visible",
	{
		variants: {
			scope: {
				page: "fixed inset-0 z-[60] h-full max-h-none w-full max-w-none",
				element: "absolute inset-0 z-10",
			},
			tone: Object.fromEntries(tones.map((tone) => [tone, `tone-${tone}`])) as Record<(typeof tones)[number], string>,
		},
		defaultVariants: { scope: "page", tone: "primary" },
	},
);

export type PageTransitionVariantProps = VariantProps<typeof pageTransitionVariants>;

export const pageTransitionStyles = {
	element: "relative overflow-clip",
	panel: "absolute inset-0 bg-tone will-change-transform",
	blinds: "absolute inset-0 flex flex-col",
	blind: "flex-1 bg-tone",
};
