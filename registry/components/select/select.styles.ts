import { cva, type VariantProps } from "class-variance-authority";

/* The trigger takes Input's variants, plus ghost: no border or fill until hovered, for toolbars. */
export const selectTriggerVariants = cva(
	"flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-control border-village font-sans text-foreground outline-none transition-[background-color,border-color,outline-color,box-shadow] duration-fast ease-out select-none focus-visible:border-primary ui-open:border-primary ui-invalid:border-destructive ui-disabled:cursor-not-allowed ui-disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "border-input bg-input-bg shadow-input focus-visible:focus-ring",
				filled: "border-field-filled-edge bg-field-filled hover:bg-field-filled-hover focus-visible:focus-ring ui-open:bg-input-bg",
				underline:
					"rounded-none border-x-0 border-t-0 border-input bg-transparent focus-visible:shadow-[0_var(--border-width)_0_0_var(--primary)] ui-open:shadow-[0_var(--border-width)_0_0_var(--primary)]",
				ghost: "border-transparent bg-transparent hover:bg-accent focus-visible:border-transparent focus-visible:focus-ring ui-open:border-transparent ui-open:bg-accent",
			},
			size: {
				sm: "h-control-sm px-[calc(var(--input-px)*0.8)] text-base sm:text-[0.8125rem]",
				default: "h-control px-input-x text-base sm:text-sm",
				lg: "h-control-lg px-control-x text-base",
			},
		},
		compoundVariants: [{ variant: "underline", class: "px-0" }],
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;

/* Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines"). */
export const selectStyles = {
	value: "flex-1 truncate text-start data-[placeholder]:text-muted-foreground",
	icon: "flex text-muted-foreground",
	positioner: "z-50 outline-none",
	popup:
		"relative max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg border-village bg-popover p-1 text-popover-foreground shadow-lg backdrop-blur-surface outline-none duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	item: "relative flex min-h-control-sm w-full cursor-default items-center gap-2 rounded-[calc(var(--control-radius)*0.75)] ps-2.5 pe-8 text-sm outline-none select-none ui-highlighted:bg-highlight ui-highlighted:text-highlight-foreground ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	itemIndicator: "absolute end-2.5 flex items-center justify-center",
	groupLabel: "px-2.5 pt-2 pb-1 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase",
	separator: "-mx-1 my-1 h-(--border-width) bg-border",
};
