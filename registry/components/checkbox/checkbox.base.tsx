"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { checkboxStyles, checkboxVariants, type CheckboxVariantProps } from "./checkbox.styles";

export { checkboxVariants } from "./checkbox.styles";

export type CheckboxProps = Omit<CheckboxPrimitive.Root.Props, "className"> & CheckboxVariantProps & { className?: string };

export function Checkbox({ className, tone, size, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			data-tone={tone ?? "primary"}
			data-size={size ?? "default"}
			className={cn(checkboxVariants({ tone, size }), className)}
			{...props}
		>
			<CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={checkboxStyles.indicator}>
				<CheckIcon className={checkboxStyles.check} />
				<MinusIcon className={checkboxStyles.minus} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
