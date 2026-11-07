import { cva, type VariantProps } from "class-variance-authority";

/*
 * The viewport clips a track of copies of the items; each copy carries its trailing gap, so moving the track by one
 * copy loops without a seam. Without JavaScript (no data-motion="ready" on <html>) and with motion off, the items wrap
 * on several lines instead, so all of them can be seen. The edges fade into the background with a mask, not a colour,
 * so it works on any surface.
 */
export const marqueeVariants = cva("relative flex items-center gap-2", {
	variants: {
		orientation: {
			horizontal: "flex-row",
			vertical: "flex-col",
		},
	},
	defaultVariants: { orientation: "horizontal" },
});

export type MarqueeVariantProps = VariantProps<typeof marqueeVariants>;

export const marqueeStyles = {
	viewport: "min-w-0 flex-1 overflow-clip",
	fadeHorizontal: "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
	fadeVertical: "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
	track: "flex w-max",
	trackVertical: "flex h-max flex-col",
	copy: "flex shrink-0 items-center gap-(--marquee-gap) pe-(--marquee-gap)",
	copyVertical: "flex shrink-0 flex-col items-center gap-(--marquee-gap) pb-(--marquee-gap)",
	// Static: one copy, wrapped and centred; a vertical one stacks its items and scrolls within its height.
	still: "flex w-full flex-wrap items-center justify-center gap-(--marquee-gap)",
	stillVertical: "flex h-full flex-col items-center gap-(--marquee-gap) overflow-y-auto",
	pause: "shrink-0",
};
