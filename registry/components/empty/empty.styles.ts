import { cva, type VariantProps } from "class-variance-authority";

/* default: no frame, for a page or a panel that is already framed. outline: a dashed border, for drop zones and empty lists. */
export const emptyVariants = cva("flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl p-6 text-center text-balance md:p-12", {
	variants: {
		variant: {
			default: "",
			outline: "border-village border-dashed",
		},
	},
	defaultVariants: { variant: "default" },
});

export type EmptyVariantProps = VariantProps<typeof emptyVariants>;

/* default: the media as given (an illustration, an avatar). icon: an icon on a muted tile. */
export const emptyMediaVariants = cva("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-transparent",
			icon: "size-10 rounded-lg border-village bg-muted text-foreground [&_svg:not([class*='size-'])]:size-5",
		},
	},
	defaultVariants: { variant: "default" },
});

export type EmptyMediaVariantProps = VariantProps<typeof emptyMediaVariants>;

export const emptyStyles = {
	header: "flex max-w-sm flex-col items-center gap-2 text-center",
	title: "font-display text-lg font-semibold tracking-display case-heading",
	description: "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
	content: "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
};
