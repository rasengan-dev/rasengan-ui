import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;
/* Outline and ghost keep the neutral look in primary, as in shadcn; another tone colours their text and edge. */
const accented = ["neutral", "success", "warning", "info", "destructive"] as const;

/*
 * The variant is the style, the tone the colour (primary by default). Tones are applied through compoundVariants so
 * that `variant="destructive"` (shorthand for the default style in the destructive tone) never meets a second tone,
 * and `secondary` stays grey whatever the tone.
 */
export const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-control border-village border-transparent font-control text-control font-control-weight tracking-control case-control outline-none select-none transition-[color,background-color,border-color,box-shadow,scale,translate] duration-fast ease-out focus-visible:focus-ring pressable ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-tone text-tone-foreground shadow-sm hover:bg-tone/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				outline: "border-input bg-input-bg shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				soft: "border-tone-edge bg-tone-soft text-tone-text hover:bg-tone-soft/70",
				destructive: "tone-destructive bg-tone text-tone-foreground shadow-sm hover:bg-tone/90 focus-visible:ring-destructive/40",
				// Onmyōton sets --link-underline: a black-and-white link cannot rely on colour.
				link: "text-tone-text underline-offset-4 [text-decoration-line:var(--link-underline,none)] hover:underline",
			},
			tone: Object.fromEntries(tones.map((tone) => [tone, ""])) as Record<(typeof tones)[number], string>,
			size: {
				sm: "h-control-sm gap-1.5 px-3",
				default: "h-control px-control-x",
				lg: "h-control-lg px-6",
				icon: "size-control",
				"icon-sm": "size-control-sm",
				"icon-lg": "size-control-lg",
			},
		},
		compoundVariants: [
			...tones.flatMap((tone) => (["default", "outline", "ghost", "soft", "link"] as const).map((variant) => ({ variant, tone, class: `tone-${tone}` }))),
			...accented.flatMap((tone) =>
				(["outline", "ghost"] as const).map((variant) => ({ variant, tone, class: "text-tone-text hover:bg-tone-soft hover:text-tone-text" })),
			),
			...accented.map((tone) => ({ variant: "outline" as const, tone, class: "border-tone-border/50" })),
			// After the size, so a link sits in the text: no height or padding of its own.
			{ variant: "link", class: "h-auto px-0" },
		],
		defaultVariants: { variant: "default", tone: "primary", size: "default" },
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
