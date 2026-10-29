import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { accordionStyles } from "./accordion.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function Accordion({ className, ...props }: Props<AccordionPrimitive.Root.Props>) {
	return <AccordionPrimitive.Root data-slot="accordion" className={cn(accordionStyles.root, className)} {...props} />;
}

export function AccordionItem({ className, ...props }: Props<AccordionPrimitive.Item.Props>) {
	return <AccordionPrimitive.Item data-slot="accordion-item" className={cn(accordionStyles.item, className)} {...props} />;
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
