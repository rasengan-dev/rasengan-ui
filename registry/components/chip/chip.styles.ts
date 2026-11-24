import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0012. One look for the chips you pick and the chips you remove: a pill of the control's height, in the tone.
 * At rest a chip is outline (the input's edge), soft (a muted well) or solid (the tone's wash); picked (`ui-pressed`)
 * it takes the tone: soft and outline turn to the tone's wash and words, solid to the tone's fill. A chip that does
 * something is pressable, so it scales, sinks or drops onto its lip as the village presses. ChipRemove is a small
 * round button at the end.
 */
const tones = {
	neutral: "tone-neutral",
	primary: "tone-primary",
	success: "tone-success",
	warning: "tone-warning",
	info: "tone-info",
	destructive: "tone-destructive",
};

export const chipVariants = cva(
	"inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-pill border-village font-control font-control-weight tracking-control text-foreground no-underline case-control outline-none select-none transition-[color,background-color,border-color,box-shadow,scale,translate] duration-fast ease-out focus-visible:focus-ring ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3.5 [:is(button,a)&]:cursor-pointer [:is(button,a)&]:pressable",
	{
		variants: {
			variant: {
				outline: "border-input bg-input-bg shadow-lip-sm [:is(button,a)&]:hover:bg-accent ui-pressed:border-tone-edge ui-pressed:bg-tone-soft ui-pressed:text-tone-text ui-pressed:lip-soft ui-pressed:hover:bg-tone-soft/70",
				soft: "border-transparent bg-muted [:is(button,a)&]:hover:bg-accent ui-pressed:border-tone-edge ui-pressed:bg-tone-soft ui-pressed:text-tone-text ui-pressed:shadow-lip-sm ui-pressed:lip-soft",
				solid: "border-tone-edge bg-tone-soft text-tone-text shadow-lip-sm lip-soft [:is(button,a)&]:hover:bg-tone-soft/70 ui-pressed:border-transparent ui-pressed:bg-tone ui-pressed:text-tone-foreground ui-pressed:lip-tone ui-pressed:hover:bg-tone/90",
			},
			tone: tones,
			size: {
				sm: "h-control-sm min-w-control-sm px-2.5 text-xs has-[[data-slot=chip-remove]]:pe-1",
				default: "h-control min-w-control px-3.5 text-sm has-[[data-slot=chip-remove]]:pe-1.5",
			},
		},
		defaultVariants: { variant: "outline", tone: "primary", size: "default" },
	},
);

export type ChipVariantProps = VariantProps<typeof chipVariants>;

export const chipStyles = {
	group: "flex flex-wrap items-center gap-2",
	remove:
		"inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-current opacity-70 outline-none transition-[opacity,background-color] duration-fast ease-out hover:bg-foreground/10 hover:opacity-100 focus-visible:focus-ring focus-visible:opacity-100 [&_svg]:size-3.5",
};
