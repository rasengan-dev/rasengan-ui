import { cva, type VariantProps } from "class-variance-authority";

/*
 * default: a raised surface. outline: the border without the shadow, for cards in a list. ghost: neither, for a group
 * that only needs the card's layout. elevated: a deeper shadow, for what stands above the rest. The size (data-size)
 * tightens the padding and gaps of every part.
 */
export const cardVariants = cva("group/card flex flex-col rounded-xl text-card-foreground", {
	variants: {
		variant: {
			default: "border-village bg-card shadow-sm backdrop-blur-surface",
			outline: "border-village bg-transparent",
			ghost: "bg-transparent",
			elevated: "border-village bg-card shadow-md backdrop-blur-surface",
		},
		size: {
			sm: "gap-4 py-4",
			default: "gap-6 py-6",
		},
	},
	defaultVariants: { variant: "default", size: "default" },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;

export const cardStyles = {
	header: "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 group-data-[size=sm]/card:gap-1 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
	title: "font-display text-lg leading-tight font-semibold tracking-display case-heading group-data-[size=sm]/card:text-base",
	description: "text-sm leading-snug text-muted-foreground",
	action: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
	content: "px-6 group-data-[size=sm]/card:px-4",
	footer: "flex items-center gap-2 px-6 group-data-[size=sm]/card:px-4",
};
