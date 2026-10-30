import { cva, type VariantProps } from "class-variance-authority";

/*
 * The thumb travels the track's inner width, whatever the village's border: --switch-w minus the thumb, padding and
 * borders. Checked, the track takes the tone (primary by default) and the thumb the text colour that sits on it.
 */
export const switchVariants = cva(
	"peer inline-flex w-(--switch-w) shrink-0 cursor-pointer items-center rounded-pill border-village border-track-border bg-switch-track p-0.5 outline-none transition-[background-color] duration-base ease-out focus-visible:focus-ring ui-checked:bg-tone ui-disabled:cursor-not-allowed ui-disabled:opacity-50",
	{
		variants: {
			tone: {
				neutral: "tone-neutral",
				primary: "tone-primary",
				success: "tone-success",
				warning: "tone-warning",
				info: "tone-info",
				destructive: "tone-destructive",
			},
			size: {
				sm: "h-[1.125rem] [--switch-w:1.875rem] [--thumb-size:0.75rem]",
				default: "h-[1.375rem] [--switch-w:2.375rem] [--thumb-size:1rem]",
				lg: "h-[1.625rem] [--switch-w:2.875rem] [--thumb-size:1.25rem]",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type SwitchVariantProps = VariantProps<typeof switchVariants>;

export const switchStyles = {
	thumb: "pointer-events-none block size-(--thumb-size) rounded-pill bg-switch-thumb shadow-thumb transition-[translate,background-color] duration-base ease-out ui-checked:translate-x-[calc(var(--switch-w)_-_var(--thumb-size)_-_0.25rem_-_var(--border-width)_*_2)] ui-checked:bg-tone-foreground",
};
