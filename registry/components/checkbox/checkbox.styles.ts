import { cva, type VariantProps } from "class-variance-authority";

/* Checked, the box fills with its tone (primary by default) and takes the tone's edge, 3:1 on the page even in amber. */
export const checkboxVariants = cva(
	"group/checkbox peer inline-flex shrink-0 cursor-pointer items-center justify-center rounded-check border-village border-control-border bg-input-bg text-tone-foreground shadow-check outline-none transition-[background-color,border-color] duration-fast ease-out focus-visible:focus-ring ui-checked:border-tone-border ui-checked:bg-tone ui-checked:lip-tone ui-indeterminate:border-tone-border ui-indeterminate:bg-tone ui-indeterminate:lip-tone ui-invalid:border-destructive ui-disabled:cursor-not-allowed ui-disabled:opacity-50 [&_svg]:stroke-[3]",
	{
		variants: {
			tone: {
				neutral: "tone-neutral",
				primary: "tone-primary",
				success: "tone-success",
				warning: "tone-warning",
				info: "tone-info",
				destructive: "tone-destructive",
			},
			size: {
				sm: "size-indicator-sm [&_svg]:size-2.5",
				default: "size-indicator [&_svg]:size-3.5",
				lg: "size-indicator-lg [&_svg]:size-4",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export const checkboxStyles = {
	indicator: "flex items-center justify-center text-current",
	check: "group-data-[indeterminate]/checkbox:hidden",
	minus: "hidden group-data-[indeterminate]/checkbox:block",
};
