"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { cn } from "@/lib/utils";
import { toggleVariants, type ToggleVariantProps } from "./toggle.styles";

export { toggleVariants, type ToggleVariantProps } from "./toggle.styles";

export type ToggleProps = Omit<TogglePrimitive.Props, "className"> & ToggleVariantProps & { className?: string };

export function Toggle({ className, variant, size, ...props }: ToggleProps) {
	return <TogglePrimitive data-slot="toggle" data-variant={variant ?? "default"} className={cn(toggleVariants({ variant, size }), className)} {...props} />;
}
