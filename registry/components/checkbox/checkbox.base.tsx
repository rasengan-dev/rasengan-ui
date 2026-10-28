import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { checkboxStyles } from "./checkbox.styles";

export type CheckboxProps = Omit<CheckboxPrimitive.Root.Props, "className"> & { className?: string };

export function Checkbox({ className, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root data-slot="checkbox" className={cn(checkboxStyles.root, className)} {...props}>
			<CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={checkboxStyles.indicator}>
				<CheckIcon className={checkboxStyles.check} />
				<MinusIcon className={checkboxStyles.minus} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
