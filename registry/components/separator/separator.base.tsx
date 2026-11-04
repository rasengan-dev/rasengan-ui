"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";
import { separatorVariants, type SeparatorVariantProps } from "./separator.styles";

export { separatorVariants } from "./separator.styles";

export type SeparatorProps = Omit<SeparatorPrimitive.Props, "className"> & SeparatorVariantProps & { className?: string };

export function Separator({ className, orientation = "horizontal", variant, ...props }: SeparatorProps) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			data-variant={variant ?? "default"}
			orientation={orientation}
			className={cn(separatorVariants({ variant }), className)}
			{...props}
		/>
	);
}
