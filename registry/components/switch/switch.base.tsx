"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";
import { switchStyles, switchVariants, type SwitchVariantProps } from "./switch.styles";

export { switchVariants } from "./switch.styles";

export type SwitchProps = Omit<SwitchPrimitive.Root.Props, "className"> & SwitchVariantProps & { className?: string };

export function Switch({ className, tone, size, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-tone={tone ?? "primary"}
			data-size={size ?? "default"}
			className={cn(switchVariants({ tone, size }), className)}
			{...props}
		>
			<SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchStyles.thumb} />
		</SwitchPrimitive.Root>
	);
}
