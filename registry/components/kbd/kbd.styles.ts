import { cva, type VariantProps } from "class-variance-authority";

/*
 * A key cap: the village's border and muted fill, in mono. In the default (inverted) tooltip it turns into a wash of
 * the tooltip's ink, so it reads on the dark surface. The size follows the text it sits in: sm for menus and tooltips.
 */
export const kbdVariants = cva(
	"pointer-events-none inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm border-village bg-muted font-mono font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content][data-variant=default]_&]:border-transparent [[data-slot=tooltip-content][data-variant=default]_&]:bg-tooltip-foreground/15 [[data-slot=tooltip-content][data-variant=default]_&]:text-tooltip-foreground",
	{
		variants: {
			size: {
				sm: "h-4.5 min-w-4.5 px-1 text-[0.625rem]",
				default: "h-5 min-w-5 px-1.5 text-[0.6875rem]",
			},
		},
		defaultVariants: { size: "default" },
	},
);

export type KbdVariantProps = VariantProps<typeof kbdVariants>;

export const kbdStyles = {
	group: "inline-flex items-center gap-1",
};
