"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { accordionItemVariants, accordionStyles, accordionVariants, type AccordionVariantProps } from "./accordion.styles";

export { accordionVariants } from "./accordion.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** The nearest Accordion's variant, read by its items (a nested Accordion has its own). */
const AccordionContext = React.createContext<AccordionVariantProps["variant"]>("default");

export function Accordion({ className, variant, children, ...props }: Props<AccordionPrimitive.Root.Props> & AccordionVariantProps) {
	return (
		<AccordionPrimitive.Root data-slot="accordion" data-variant={variant ?? "default"} className={cn(accordionVariants({ variant }), className)} {...props}>
			<AccordionContext.Provider value={variant}>{children}</AccordionContext.Provider>
		</AccordionPrimitive.Root>
	);
}

export function AccordionItem({ className, ...props }: Props<AccordionPrimitive.Item.Props>) {
	const variant = React.useContext(AccordionContext);
	return <AccordionPrimitive.Item data-slot="accordion-item" className={cn(accordionItemVariants({ variant }), className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: Props<AccordionPrimitive.Trigger.Props>) {
	return (
		<AccordionPrimitive.Header className={accordionStyles.header}>
			<AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn(accordionStyles.trigger, className)} {...props}>
				{children}
				<ChevronDownIcon />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

export function AccordionContent({ className, children, ...props }: Props<AccordionPrimitive.Panel.Props>) {
	return (
		<AccordionPrimitive.Panel data-slot="accordion-content" className={accordionStyles.panel} {...props}>
			<div className={cn(accordionStyles.panelInner, className)}>{children}</div>
		</AccordionPrimitive.Panel>
	);
}
