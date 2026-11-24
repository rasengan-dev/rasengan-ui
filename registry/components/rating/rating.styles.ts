import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0012. The stars are drawn in the tone's colour (warning, the stars' yellow, by default). Read-only, a star is
 * filled to the tenth over an empty one in the border colour: the score is in the label, the stars are for the eye.
 * As an input, every star is a radio: a filled star is the tone with an edge in the tone's colour for words, an empty
 * one an outline in the muted foreground, so filled and empty stand apart at 3:1 or more (WCAG 1.4.11). The stars
 * scale with the text: `size` sets the font size.
 */
const tones = {
	neutral: "tone-neutral",
	primary: "tone-primary",
	success: "tone-success",
	warning: "tone-warning",
	info: "tone-info",
	destructive: "tone-destructive",
};

export const ratingVariants = cva("inline-flex items-center gap-1.5 align-middle", {
	variants: {
		tone: tones,
		size: {
			sm: "text-sm",
			default: "text-base",
			lg: "text-xl",
		},
	},
	defaultVariants: { tone: "warning", size: "default" },
});

export type RatingVariantProps = VariantProps<typeof ratingVariants>;

export const ratingStyles = {
	stars: "flex gap-[0.125em]",
	star: "relative inline-flex",
	empty: "size-[1em] text-border",
	full: "absolute inset-0 size-[1em] text-tone [clip-path:inset(0_var(--rating-empty)_0_0)] rtl:[clip-path:inset(0_0_0_var(--rating-empty))]",
	value: "font-medium tabular-nums text-foreground",
	group: "inline-flex items-center gap-[0.125em] align-middle",
	item: "inline-flex cursor-pointer rounded-[calc(var(--control-radius)*0.5)] p-[0.0625em] outline-none transition-[scale,translate] duration-fast ease-out focus-visible:focus-ring pressable ui-disabled:cursor-not-allowed ui-disabled:opacity-50",
	icon: "size-[1.25em] fill-transparent stroke-[1.5] text-muted-foreground transition-[fill,color] duration-fast ease-out data-filled:fill-(--tone) data-filled:text-tone-text",
};
