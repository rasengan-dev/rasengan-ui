import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./button.styles";

export { buttonVariants, type ButtonVariantProps } from "./button.styles";

export type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & ButtonVariantProps & { className?: string };

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			data-variant={variant ?? "default"}
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
