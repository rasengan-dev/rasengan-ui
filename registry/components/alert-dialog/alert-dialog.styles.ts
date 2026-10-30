import { cva, type VariantProps } from "class-variance-authority";

/*
 * Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines").
 * The size is the popup's width from the sm breakpoint. No `full`: a question that needs an answer stays small.
 */
export const alertDialogContentVariants = cva(
	"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-5 rounded-xl border-village bg-popover p-6 text-popover-foreground shadow-lg outline-none backdrop-blur-surface duration-base ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	{
		variants: {
			size: {
				sm: "sm:max-w-sm",
				default: "sm:max-w-md",
				lg: "sm:max-w-lg",
			},
		},
		defaultVariants: { size: "default" },
	},
);

export type AlertDialogContentVariantProps = VariantProps<typeof alertDialogContentVariants>;

export const alertDialogStyles = {
	backdrop:
		"fixed inset-0 z-50 bg-overlay duration-base ease-out ui-open:animate-in ui-open:fade-in-0 ui-closed:animate-out ui-closed:fade-out-0",
	header: "flex flex-col gap-2 text-center sm:text-left",
	footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	title: "font-display text-lg leading-tight font-semibold tracking-display case-heading",
	description: "text-sm leading-relaxed text-muted-foreground",
};
