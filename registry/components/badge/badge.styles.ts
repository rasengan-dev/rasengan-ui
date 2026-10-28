import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-badge border-village border-transparent px-2 py-0.5 font-control text-xs font-semibold tracking-control case-control transition-[color,background-color,border-color] duration-fast ease-out focus-visible:focus-ring [&>svg]:pointer-events-none [&>svg]:size-3",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
				outline: "border-input text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				destructive: "bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
