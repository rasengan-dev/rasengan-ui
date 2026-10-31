import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;

/*
 * The colour is the text's (currentColor) unless a tone is given. With reduced motion it turns slowly instead of
 * stopping: a still spinner would read as frozen.
 */
export const spinnerVariants = cva("shrink-0 animate-spin motion-reduce:animate-[spin_2.5s_linear_infinite]", {
	variants: {
		size: {
			sm: "size-3.5",
			default: "size-4",
			lg: "size-6",
		},
		tone: Object.fromEntries(tones.map((tone) => [tone, `tone-${tone} text-tone-text`])) as Record<(typeof tones)[number], string>,
	},
	defaultVariants: { size: "default" },
});

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants>;
