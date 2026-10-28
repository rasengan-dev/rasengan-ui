import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
	"relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg border-village bg-card px-4 py-3.5 text-sm backdrop-blur-surface has-[>svg]:grid-cols-[1.125rem_1fr] has-[>svg]:gap-x-3 [&>svg]:size-[1.125rem] [&>svg]:translate-y-px [&>svg]:text-current",
	{
		variants: {
			variant: {
				default: "text-card-foreground",
				destructive: "border-destructive/50 text-destructive *:data-[slot=alert-description]:text-destructive/90",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;

export const alertStyles = {
	title: "col-start-2 min-h-4 font-display font-semibold tracking-display case-heading",
	description: "col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed text-muted-foreground [&_p]:leading-relaxed",
};
