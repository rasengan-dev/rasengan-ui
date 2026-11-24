import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0011. At rest the text is plain, in the tone's colour for words. While it shines (`data-shining`), the glyphs are
 * cut out of a gradient (background-clip: text): the tone's text colour, a band mixed half way toward the text colour
 * (`--foreground`), and the colour again. Toward the foreground, not the background: a tone's colour for words is often
 * at 4.5:1 exactly, so any band lighter than it would fail; one closer to the foreground only gains contrast. The band crosses by background-position. In forced colours, the text stays
 * plain.
 */
export const shinyTextVariants = cva(
	[
		"text-tone-text",
		"data-shining:bg-clip-text data-shining:text-transparent data-shining:[background-size:250%_100%] data-shining:[background-repeat:no-repeat]",
		"data-shining:[background-image:linear-gradient(110deg,var(--tone-text)_40%,color-mix(in_oklab,var(--tone-text)_50%,var(--foreground))_50%,var(--tone-text)_60%)]",
		"forced-colors:data-shining:bg-none forced-colors:data-shining:text-[CanvasText]",
	],
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
		},
		defaultVariants: { tone: "neutral" },
	},
);

export type ShinyTextVariantProps = VariantProps<typeof shinyTextVariants>;
