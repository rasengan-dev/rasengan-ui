import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";
import { switchStyles } from "./switch.styles";

export type SwitchProps = Omit<SwitchPrimitive.Root.Props, "className"> & { className?: string };

export function Switch({ className, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root data-slot="switch" className={cn(switchStyles.root, className)} {...props}>
			<SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchStyles.thumb} />
		</SwitchPrimitive.Root>
	);
}
