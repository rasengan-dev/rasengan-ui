import { cva, type VariantProps } from "class-variance-authority";

const tones = ["neutral", "primary", "success", "warning", "info", "destructive"] as const;
/* Outline and ghost keep the neutral look in primary, as in shadcn; another tone colours their text and edge. */
const accented = ["neutral", "success", "warning", "info", "destructive"] as const;

/*
 * In a village with a lip (Kusa), filled styles stand on a darker shade of their tone, soft ones on a stronger wash,
 * outline on the edge colour; ghost and link have none.
 *
 * The variant is the style, the tone the colour (primary by default). Tones are applied through compoundVariants so
 * that `variant="destructive"` (shorthand for the default style in the destructive tone) never meets a second tone,
 * and `secondary` stays grey whatever the tone.
 */
export const buttonVariants = cva(
	"group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-control border-village border-transparent font-control text-control font-control-weight tracking-control case-control outline-none select-none transition-[color,background-color,border-color,box-shadow,scale,translate] duration-fast ease-out focus-visible:focus-ring pressable ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-tone text-tone-foreground shadow-sm lip-tone hover:bg-tone/90",
				secondary: "bg-secondary text-secondary-foreground shadow-lip lip-secondary hover:bg-secondary/80",
				outline: "border-input bg-input-bg shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				soft: "border-tone-edge bg-tone-soft text-tone-text shadow-lip lip-soft hover:bg-tone-soft/70",
				destructive: "tone-destructive bg-tone text-tone-foreground shadow-sm lip-tone hover:bg-tone/90 focus-visible:ring-destructive/40",
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

/*
 * HoldButton: a wash of the button's own text colour fills it from the start while it is held, over exactly the hold
 * time (it is the feedback, so it runs under reduced motion too), and drains quickly when let go.
 * ButtonRollingText: on hover or keyboard focus the label rolls up and a copy rolls in from below, with the village's
 * base duration and ease-out; letter by letter with `stagger`.
 */
export const buttonStyles = {
	hold: "relative overflow-hidden",
	holdFill: "pointer-events-none absolute inset-0 origin-left scale-x-0 bg-current/20 transition-transform duration-fast ease-out data-[holding]:ease-linear",
	roll: "relative inline-flex overflow-clip",
	rollLine: "inline-block transition-[translate] duration-base ease-out group-hover/button:-translate-y-full group-focus-visible/button:-translate-y-full",
	// The copy waits below, invisible (so it is never read as text out of place); it shows while it rolls in and stays until it has rolled out.
	rollCopy:
		"invisible absolute inset-x-0 top-full inline-block transition-[translate,visibility] duration-base ease-out group-hover/button:visible group-hover/button:-translate-y-full group-focus-visible/button:visible group-focus-visible/button:-translate-y-full",
	rollCopyLetters: "invisible absolute inset-x-0 top-full inline-block transition-[visibility] duration-slow group-hover/button:visible group-focus-visible/button:visible",
	rollLetter:
		"inline-block whitespace-pre transition-[translate] duration-base ease-out [transition-delay:calc(var(--index)*var(--motion-stagger)/3)] group-hover/button:-translate-y-full group-focus-visible/button:-translate-y-full",
};
