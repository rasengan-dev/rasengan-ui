import { cva, type VariantProps } from "class-variance-authority";

export const toggleVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-control border-village border-transparent font-control text-control font-control-weight tracking-control case-control outline-none select-none transition-[color,background-color,border-color] duration-fast ease-out hover:bg-muted hover:text-muted-foreground focus-visible:focus-ring ui-pressed:bg-accent ui-pressed:text-accent-foreground ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-input bg-input-bg shadow-sm hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				sm: "h-control-sm min-w-control-sm px-2",
				default: "h-control min-w-control px-2.5",
				lg: "h-control-lg min-w-control-lg px-3",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
