"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import { toggleVariants, type ToggleVariantProps } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { toggleGroupStyles } from "./toggle-group.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** The group's variant and size, applied to every item that does not set its own. */
const ToggleGroupContext = React.createContext<ToggleVariantProps>({ variant: "default", size: "default" });

export function ToggleGroup({ className, variant, size, children, ...props }: Props<ToggleGroupPrimitive.Props> & ToggleVariantProps) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant ?? "default"}
			data-size={size ?? "default"}
			className={cn(toggleGroupStyles.root, className)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
}

export function ToggleGroupItem({ className, variant, size, ...props }: Props<TogglePrimitive.Props> & ToggleVariantProps) {
	const group = React.useContext(ToggleGroupContext);
	return (
		<TogglePrimitive
			data-slot="toggle-group-item"
			className={cn(toggleVariants({ variant: variant ?? group.variant, size: size ?? group.size }), toggleGroupStyles.item, className)}
			{...props}
		/>
	);
}
