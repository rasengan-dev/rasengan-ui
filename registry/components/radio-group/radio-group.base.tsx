import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";
import { radioGroupStyles } from "./radio-group.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function RadioGroup({ className, ...props }: Props<RadioGroupPrimitive.Props>) {
	return <RadioGroupPrimitive data-slot="radio-group" className={cn(radioGroupStyles.root, className)} {...props} />;
}

export function RadioGroupItem({ className, ...props }: Props<RadioPrimitive.Root.Props>) {
	return (
		<RadioPrimitive.Root data-slot="radio-group-item" className={cn(radioGroupStyles.item, className)} {...props}>
			<RadioPrimitive.Indicator data-slot="radio-group-indicator" className={radioGroupStyles.indicator} />
		</RadioPrimitive.Root>
	);
}
