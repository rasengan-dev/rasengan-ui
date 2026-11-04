import { cva, type VariantProps } from "class-variance-authority";

/*
 * default: a bordered field. filled: a grey well (--field-filled) that turns into the default field on focus.
 * underline: a bottom border only, for dense forms and inline edits; its focus thickens the line instead of a ring.
 */
export const inputVariants = cva(
	"w-full min-w-0 rounded-control border-village font-sans text-foreground outline-none transition-[color,background-color,border-color,outline-color,box-shadow] duration-fast ease-out selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground file:me-3 file:h-full file:border-0 file:bg-transparent file:font-control file:text-control file:font-control-weight file:text-foreground focus-visible:border-primary ui-invalid:border-destructive ui-invalid:[--ring:color-mix(in_oklab,var(--destructive)_40%,transparent)] ui-disabled:cursor-not-allowed ui-disabled:opacity-60",
	{
		variants: {
			variant: {
				default: "border-input bg-input-bg shadow-input focus-visible:focus-ring ui-disabled:bg-muted",
				filled: "border-field-filled-edge bg-field-filled hover:bg-field-filled-hover focus-visible:bg-input-bg focus-visible:focus-ring",
				underline:
					"rounded-none border-x-0 border-t-0 border-input bg-transparent focus-visible:shadow-[0_var(--border-width)_0_0_var(--primary)] ui-invalid:focus-visible:shadow-[0_var(--border-width)_0_0_var(--destructive)]",
			},
			// 16px text below sm, so phones don't zoom into the field.
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

export type InputVariantProps = VariantProps<typeof inputVariants>;
