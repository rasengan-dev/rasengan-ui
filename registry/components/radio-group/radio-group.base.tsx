"use client";

import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";
import { radioGroupStyles, radioVariants, type RadioVariantProps } from "./radio-group.styles";

export { radioVariants } from "./radio-group.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** The group's tone and size, applied to every item that does not set its own. */
const RadioGroupContext = React.createContext<RadioVariantProps>({});

export function RadioGroup({ className, tone, size, children, ...props }: Props<RadioGroupPrimitive.Props> & RadioVariantProps) {
	const look = React.useMemo(() => ({ tone, size }), [tone, size]);
	return (
		<RadioGroupPrimitive data-slot="radio-group" className={cn(radioGroupStyles.root, className)} {...props}>
			<RadioGroupContext.Provider value={look}>{children}</RadioGroupContext.Provider>
		</RadioGroupPrimitive>
	);
}

export function RadioGroupItem({ className, tone, size, ...props }: Props<RadioPrimitive.Root.Props> & RadioVariantProps) {
	const group = React.useContext(RadioGroupContext);
	const look = { tone: tone ?? group.tone, size: size ?? group.size };
	return (
		<RadioPrimitive.Root
			data-slot="radio-group-item"
			data-tone={look.tone ?? "primary"}
			data-size={look.size ?? "default"}
			className={cn(radioVariants(look), className)}
			{...props}
		>
			<RadioPrimitive.Indicator data-slot="radio-group-indicator" />
		</RadioPrimitive.Root>
	);
}
