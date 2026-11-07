import { cva, type VariantProps } from "class-variance-authority";

/* Checked, the ring takes the tone's edge (3:1 on the page) and the dot its colour. */
export const radioVariants = cva(
	"peer inline-flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-pill border-village border-control-border bg-input-bg shadow-check outline-none transition-[border-color] duration-fast ease-out focus-visible:focus-ring ui-checked:border-tone-border ui-checked:lip-tone ui-invalid:border-destructive ui-disabled:cursor-not-allowed ui-disabled:opacity-50 *:data-[slot=radio-group-indicator]:rounded-pill *:data-[slot=radio-group-indicator]:bg-tone",
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
				sm: "size-indicator-sm *:data-[slot=radio-group-indicator]:size-1.5",
				default: "size-indicator *:data-[slot=radio-group-indicator]:size-2",
				lg: "size-indicator-lg *:data-[slot=radio-group-indicator]:size-2.5",
			},
		},
		defaultVariants: { tone: "primary", size: "default" },
	},
);

export type RadioVariantProps = VariantProps<typeof radioVariants>;

export const radioGroupStyles = {
	root: "grid gap-3",
};
