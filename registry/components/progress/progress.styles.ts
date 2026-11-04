import { cva, type VariantProps } from "class-variance-authority";

/*
 * The root carries the variant, tone and size; the track and bar read them. default: a grey track (muted). soft: the
 * track is a wash of the bar's own tone, for a quieter bar. The size sets the track's height.
 */
export const progressVariants = cva("grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2", {
	variants: {
		variant: {
			default: "[--progress-track:var(--muted)]",
			soft: "[--progress-track:var(--tone-soft)]",
		},
		tone: {
			neutral: "tone-neutral",
			primary: "tone-primary",
			success: "tone-success",
			warning: "tone-warning",
			info: "tone-info",
			destructive: "tone-destructive",
		},
		size: {
			sm: "[--progress-h:0.25rem]",
			default: "[--progress-h:0.5rem]",
			lg: "[--progress-h:0.75rem]",
		},
	},
	defaultVariants: { variant: "default", tone: "primary", size: "default" },
});

export type ProgressVariantProps = VariantProps<typeof progressVariants>;

export const progressStyles = {
	label: "font-control text-control font-control-weight tracking-control text-foreground case-control",
	value: "col-start-2 justify-self-end font-mono text-xs text-muted-foreground tabular-nums",
	track: "relative col-span-2 h-(--progress-h) w-full overflow-hidden rounded-pill border-village border-track-border bg-(--progress-track)",
	indicator: "h-full rounded-pill bg-tone transition-[width] duration-slow ease-out data-[indeterminate]:w-1/3",
};
