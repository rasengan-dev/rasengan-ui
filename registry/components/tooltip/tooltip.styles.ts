import { cva, type VariantProps } from "class-variance-authority";

/*
 * Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines").
 * default: inverted, in the village's ink. outline: a popover surface with a border, for a tooltip over dark content
 * or one that should stay quiet. The arrow draws the border on its two outer edges only.
 */
export const tooltipVariants = cva(
	"w-fit max-w-xs origin-(--transform-origin) rounded-[calc(var(--control-radius)*0.7)] px-2.5 py-1.5 font-control text-xs font-medium tracking-control text-balance case-control duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95 data-[instant]:animate-none",
	{
		variants: {
			variant: {
				default: "bg-tooltip text-tooltip-foreground *:data-[slot=tooltip-arrow]:bg-tooltip",
				outline:
					"border-village bg-popover text-popover-foreground shadow-md *:data-[slot=tooltip-arrow]:border-border *:data-[slot=tooltip-arrow]:bg-popover *:data-[slot=tooltip-arrow]:data-[side=bottom]:border-s-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=bottom]:border-t-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=left]:border-e-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=left]:border-t-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=right]:border-b-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=right]:border-s-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=top]:border-e-(length:--border-width) *:data-[slot=tooltip-arrow]:data-[side=top]:border-b-(length:--border-width)",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export type TooltipVariantProps = VariantProps<typeof tooltipVariants>;

export const tooltipStyles = {
	positioner: "z-50",
	arrow:
		"size-2.5 rotate-45 rounded-[min(2px,var(--control-radius))] border-solid data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1",
};
