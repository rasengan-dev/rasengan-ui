import { cva, type VariantProps } from "class-variance-authority";

/*
 * The children touch: inner corners lose their radius and the borders between them collapse into one, at the village's
 * width (Iwa's heavy borders do not double). A focused child rises above its neighbours so its ring is not clipped.
 * Groups inside a group keep a gap between them.
 */
export const buttonGroupVariants = cva(
	"flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 [&>[data-slot=input]]:flex-1 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
	{
		variants: {
			orientation: {
				horizontal:
					"[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>[data-slot=button-group]]:rounded-[inherit]",
				vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
			},
		},
		defaultVariants: { orientation: "horizontal" },
	},
);

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

export const buttonGroupStyles = {
	text: "flex items-center gap-2 rounded-control border-village border-input bg-muted px-control-x font-control text-control font-control-weight tracking-control case-control text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
	separator: "relative self-stretch bg-input data-[orientation=vertical]:h-auto",
};
