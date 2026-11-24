import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0011. The area holds its content and a layer of pictures over it that never takes the pointer and is hidden from
 * screen readers. The pictures are a small pool of `img`, each placed and animated in turn by the Web Animations API;
 * between drops they are invisible. The area clips them, so none spills over the page.
 */
export const imageTrailVariants = cva("relative isolate overflow-clip", {
	variants: {
		size: {
			sm: "[--trail-w:6rem]",
			default: "[--trail-w:9rem]",
			lg: "[--trail-w:12rem]",
		},
	},
	defaultVariants: { size: "default" },
});

export type ImageTrailVariantProps = VariantProps<typeof imageTrailVariants>;

export const imageTrailStyles = {
	layer: "pointer-events-none absolute inset-0 z-10 forced-colors:hidden",
	image: "absolute top-0 left-0 aspect-[3/4] w-(--trail-w) rounded-lg object-cover opacity-0 shadow-lg",
};
