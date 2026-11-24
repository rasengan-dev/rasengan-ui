import { cva, type VariantProps } from "class-variance-authority";

/*
 * RFC-0011. The rows are a list of links (or plain rows); while one is current, the others fall to the muted text
 * colour, which still passes 4.5:1. Each row carries its own picture, laid over the list at the place the list writes
 * (--hil-x, --hil-y, and --hil-rotate at intensity 3), so the current picture fades in as the last one fades out. The
 * pictures stay out of the page until the list has mounted (`data-armed`): one styled late would fade out on load. They
 * never take the pointer and are hidden from screen readers: each row's own text says where it goes.
 */
export const hoverImageListVariants = cva("group/hover-image-list relative m-0 list-none p-0", {
	variants: {
		size: {
			sm: "[--hil-w:10rem]",
			default: "[--hil-w:14rem]",
			lg: "[--hil-w:18rem]",
		},
	},
	defaultVariants: { size: "default" },
});

export type HoverImageListVariantProps = VariantProps<typeof hoverImageListVariants>;

export const hoverImageListStyles = {
	item: "border-b-(length:--border-width) border-border first:border-t-(length:--border-width)",
	row: "flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 font-display text-2xl font-semibold tracking-display text-foreground case-heading no-underline outline-none transition-colors duration-base ease-out focus-visible:focus-ring group-data-[active]/hover-image-list:text-muted-foreground data-current:text-foreground [&_small]:font-sans [&_small]:text-sm [&_small]:font-normal [&_small]:tracking-normal [&_small]:normal-case [&_small]:text-muted-foreground",
	image:
		"pointer-events-none absolute top-0 left-0 z-10 hidden group-data-[armed]/hover-image-list:block aspect-[4/3] w-(--hil-w) rounded-lg object-cover shadow-lg opacity-0 scale-90 transition-[opacity,scale] duration-base ease-out [rotate:var(--hil-rotate,0deg)] [transform:translate3d(var(--hil-x,0px),var(--hil-y,0px),0)] data-current:opacity-100 data-current:scale-100",
};
