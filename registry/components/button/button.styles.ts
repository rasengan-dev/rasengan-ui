import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-village border-transparent text-sm font-medium outline-none select-none transition-[color,background-color,border-color,box-shadow,scale] duration-fast ease-out focus-visible:ring-[3px] focus-visible:ring-ring active:scale-[0.98] ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				outline: "border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/40",
				link: "h-auto px-0 text-primary underline-offset-4 hover:underline active:scale-100",
			},
			size: {
				sm: "h-control-sm gap-1.5 px-3 text-xs",
				default: "h-control px-control-x",
				lg: "h-control-lg px-6 text-base",
				icon: "size-control",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
