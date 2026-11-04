"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./button.styles";

export { buttonVariants, type ButtonVariantProps } from "./button.styles";

export type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & ButtonVariantProps & { className?: string };

export function Button({ className, variant, tone, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			data-variant={variant ?? "default"}
			data-tone={variant === "destructive" ? "destructive" : (tone ?? "primary")}
			className={cn(buttonVariants({ variant, tone, size }), className)}
			{...props}
		/>
	);
}
