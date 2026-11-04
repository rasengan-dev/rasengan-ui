import { cva, type VariantProps } from "class-variance-authority";

/* default: a solid line. dashed: a dashed border of the same width, for a softer break (a list's "or", a draft). */
export const separatorVariants = cva(
	"shrink-0 data-[orientation=horizontal]:w-full data-[orientation=vertical]:self-stretch",
	{
		variants: {
			variant: {
				default: "bg-border data-[orientation=horizontal]:h-(--border-width) data-[orientation=vertical]:w-(--border-width)",
				dashed:
					"border-dashed border-border data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:border-t-(length:--border-width) data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-s-(length:--border-width)",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export type SeparatorVariantProps = VariantProps<typeof separatorVariants>;
