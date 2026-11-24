import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0010. The root turns the scroll progress into --fill: 0 while the statement enters, 1 once it reaches the upper
 * part of the viewport. Each word (`--index`, from split-text) fills over its share of it, from the muted foreground
 * (readable already, 4.5:1) to the tone's text colour. `data-effect="rise"` also lifts each word into place by a quarter of the
 * village's travel. Not linked (no JavaScript, reduced motion, `final`): the words are in the tone's colour, still.
 */
export const textScrollFillVariants = cva(
	[
		"text-tone-text [&_[data-split=word]]:whitespace-nowrap",
		"data-scroll-linked:[--fill:clamp(0,calc((var(--scroll-progress,0)_-_0.15)_/_0.45),1)]",
		"data-scroll-linked:[&_[data-split=word]]:[--word:clamp(0,calc(var(--fill)_*_var(--words)_-_var(--index)),1)]",
		"data-scroll-linked:[&_[data-split=word]]:[color:color-mix(in_oklab,var(--tone-text)_calc(var(--word)_*_100%),var(--muted-foreground))]",
		"data-[effect=rise]:data-scroll-linked:[&_[data-split=word]]:[translate:0_calc((1_-_var(--word))_*_var(--motion-distance)_*_0.25)]",
	],
	{
		variants: {
			tone: {
				neutral: "tone-neutral",
				primary: "tone-primary",
			},
		},
		defaultVariants: { tone: "neutral" },
	},
);

export type TextScrollFillVariantProps = VariantProps<typeof textScrollFillVariants>;
