import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-control border-village border-transparent font-control text-control font-control-weight tracking-control case-control outline-none select-none transition-[color,background-color,border-color,box-shadow,scale,translate] duration-fast ease-out focus-visible:focus-ring pressable ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				outline: "border-input bg-input-bg shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/40",
				// Onmyōton sets --link-underline: a black-and-white link cannot rely on colour.
				link: "h-auto px-0 text-primary underline-offset-4 [text-decoration-line:var(--link-underline,none)] hover:underline",
			},
			size: {
				sm: "h-control-sm gap-1.5 px-3",
				default: "h-control px-control-x",
				lg: "h-control-lg px-6",
				icon: "size-control",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
