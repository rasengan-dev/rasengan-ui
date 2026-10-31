import { cva, type VariantProps } from "class-variance-authority";

/*
 * Transitions, not keyframes: Base UI's Drawer moves the panel with --drawer-swipe-movement-* while it is dragged and
 * animates from there on release, so enter and exit are transforms between data-starting-style / data-ending-style
 * and the swipe offset. The surface, shadow, blur and motion are Dialog's tokens. A side panel is flush with its
 * edge; a top or bottom sheet rounds its free corners. The size is the width of a side panel, the height of the others.
 */
export const sheetContentVariants = cva(
	"pointer-events-auto relative flex flex-col bg-popover text-popover-foreground shadow-lg outline-none backdrop-blur-surface transition-transform duration-slow ease-out data-swiping:duration-0 data-swiping:select-none",
	{
		variants: {
			side: {
				right: "h-full w-3/4 border-s-(length:--border-width) [transform:translateX(var(--drawer-swipe-movement-x))] data-starting-style:[transform:translateX(100%)] data-ending-style:[transform:translateX(100%)]",
				left: "h-full w-3/4 border-e-(length:--border-width) [transform:translateX(var(--drawer-swipe-movement-x))] data-starting-style:[transform:translateX(-100%)] data-ending-style:[transform:translateX(-100%)]",
				top: "w-full rounded-b-xl border-b-(length:--border-width) [transform:translateY(var(--drawer-swipe-movement-y))] data-starting-style:[transform:translateY(-100%)] data-ending-style:[transform:translateY(-100%)]",
				bottom:
					"w-full rounded-t-xl border-t-(length:--border-width) [transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)))] data-starting-style:[transform:translateY(100%)] data-ending-style:[transform:translateY(100%)]",
			},
			size: {
				sm: "",
				default: "",
				lg: "",
			},
		},
		compoundVariants: [
			...(["left", "right"] as const).flatMap((side) => [
				{ side, size: "sm" as const, class: "sm:max-w-xs" },
				{ side, size: "default" as const, class: "sm:max-w-sm" },
				{ side, size: "lg" as const, class: "sm:max-w-xl" },
			]),
			...(["top", "bottom"] as const).flatMap((side) => [
				{ side, size: "sm" as const, class: "max-h-[40vh]" },
				{ side, size: "default" as const, class: "max-h-[80vh]" },
				{ side, size: "lg" as const, class: "max-h-[calc(100vh-2rem)]" },
			]),
		],
		defaultVariants: { side: "right", size: "default" },
	},
);

export type SheetContentVariantProps = VariantProps<typeof sheetContentVariants>;

/* Where the viewport puts the panel. */
export const sheetViewports = {
	right: "justify-end",
	left: "justify-start",
	top: "flex-col justify-start",
	bottom: "flex-col justify-end",
} as const;

export const sheetStyles = {
	backdrop:
		"fixed inset-0 z-50 bg-overlay opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-slow ease-out data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0",
	viewport: "pointer-events-none fixed inset-0 z-50 flex",
	content: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain",
	handle: "mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-pill bg-muted",
	close:
		"absolute end-4 top-4 cursor-pointer rounded-sm opacity-70 outline-none transition-opacity duration-fast hover:opacity-100 focus-visible:focus-ring [&_svg]:size-4",
	header: "flex flex-col gap-1.5 p-6 pb-0",
	footer: "mt-auto flex flex-col gap-2 p-6 pt-0",
	title: "pe-8 font-display text-lg leading-none font-semibold tracking-display",
	description: "text-sm text-muted-foreground",
};
