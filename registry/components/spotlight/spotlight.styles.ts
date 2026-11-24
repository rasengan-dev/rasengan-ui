import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0011. Spotlight wraps one surface (a Card, a pricing plan, a bento cell) and lays two layers over it, which never
 * take the pointer: a soft glow of the tone around the mouse, and the same light drawn only in the surface's border
 * (a mask keeps the gradient to a ring as wide as the surface's own border). Both take the surface's corners
 * (--spot-radius, read from it) and fade in over the village's base duration while lit (`data-lit`). The glow is a
 * faint wash of the tone, so the text under it keeps its contrast. In forced colours, neither is drawn.
 */
export const spotlightVariants = cva("relative isolate grid", {
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
			sm: "[--spot-size:10rem]",
			default: "[--spot-size:16rem]",
			lg: "[--spot-size:24rem]",
		},
	},
	defaultVariants: { tone: "primary", size: "default" },
});

export type SpotlightVariantProps = VariantProps<typeof spotlightVariants>;

const layer =
	"pointer-events-none absolute inset-0 z-1 rounded-(--spot-radius) opacity-0 transition-opacity duration-base ease-out data-lit:opacity-100 forced-colors:hidden";

export const spotlightStyles = {
	glow: `${layer} [background:radial-gradient(var(--spot-size)_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_oklab,var(--tone)_14%,transparent),transparent_70%)]`,
	edge: `${layer} p-(--spot-border) [background:radial-gradient(calc(var(--spot-size)*0.75)_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--tone),transparent_70%)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]`,
};
