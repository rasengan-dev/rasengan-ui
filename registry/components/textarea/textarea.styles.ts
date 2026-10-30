import { cva, type VariantProps } from "class-variance-authority";

/* The same variants as Input; the size sets the padding, the text and the starting height. */
export const textareaVariants = cva(
	"flex field-sizing-content w-full min-w-0 resize-y rounded-control border-village font-sans text-foreground outline-none transition-[color,background-color,border-color,outline-color,box-shadow] duration-fast ease-out selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-primary ui-invalid:border-destructive ui-invalid:[--ring:color-mix(in_oklab,var(--destructive)_40%,transparent)] ui-disabled:cursor-not-allowed ui-disabled:opacity-60",
	{
		variants: {
			variant: {
				default: "border-input bg-input-bg shadow-input focus-visible:focus-ring ui-disabled:bg-muted",
				filled: "border-field-filled-edge bg-field-filled hover:bg-field-filled-hover focus-visible:bg-input-bg focus-visible:focus-ring",
				underline:
					"rounded-none border-x-0 border-t-0 border-input bg-transparent focus-visible:shadow-[0_var(--border-width)_0_0_var(--primary)] ui-invalid:focus-visible:shadow-[0_var(--border-width)_0_0_var(--destructive)]",
			},
			// leading-relaxed after the text size: tailwind-merge drops a line height set before a font size.
			size: {
				sm: "min-h-16 px-[calc(var(--input-px)*0.8)] py-1.5 text-base leading-relaxed sm:text-[0.8125rem]",
				default: "min-h-24 px-input-x py-2.5 text-base leading-relaxed sm:text-sm",
				lg: "min-h-32 px-control-x py-3 text-base leading-relaxed",
			},
		},
		compoundVariants: [{ variant: "underline", class: "px-0" }],
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
