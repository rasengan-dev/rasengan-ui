"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { cn } from "@/lib/utils";
import { collapsibleStyles } from "./collapsible.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function Collapsible({ className, ...props }: Props<CollapsiblePrimitive.Root.Props>) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" className={className} {...props} />;
}

export function CollapsibleTrigger(props: Props<CollapsiblePrimitive.Trigger.Props>) {
	return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}

export function CollapsibleContent({ className, ...props }: Props<CollapsiblePrimitive.Panel.Props>) {
	return <CollapsiblePrimitive.Panel data-slot="collapsible-content" className={cn(collapsibleStyles.panel, className)} {...props} />;
}
