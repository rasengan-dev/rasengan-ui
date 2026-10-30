import { cva, type VariantProps } from "class-variance-authority";

/*
 * Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines").
 * The size is the popup's width from the sm breakpoint; `full` fills the window less a margin, its body scrolling.
 */
export const dialogContentVariants = cva(
	"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border-village bg-popover p-6 text-popover-foreground shadow-lg outline-none backdrop-blur-surface duration-base ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	{
		variants: {
			size: {
				sm: "sm:max-w-sm",
				default: "sm:max-w-lg",
				lg: "sm:max-w-2xl",
				full: "h-[calc(100%-2rem)] grid-rows-[auto_1fr_auto] overflow-y-auto sm:h-[calc(100%-4rem)] sm:max-w-[calc(100%-4rem)]",
			},
		},
		defaultVariants: { size: "default" },
	},
);

export type DialogContentVariantProps = VariantProps<typeof dialogContentVariants>;

export const dialogStyles = {
	backdrop:
		"fixed inset-0 z-50 bg-overlay duration-base ease-out ui-open:animate-in ui-open:fade-in-0 ui-closed:animate-out ui-closed:fade-out-0",
	close:
		"absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 outline-none transition-opacity duration-fast hover:opacity-100 focus-visible:focus-ring [&_svg]:size-4",
	header: "flex flex-col gap-1.5 text-center sm:text-left",
	footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	title: "font-display text-lg leading-none font-semibold tracking-display",
	description: "text-sm text-muted-foreground",
};
