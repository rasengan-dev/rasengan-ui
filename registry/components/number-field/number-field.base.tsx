"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";

import { inputGroupVariants, type InputGroupVariantProps } from "@/components/ui/input-group";
import { useFieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import { numberFieldStyles } from "./number-field.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/**
 * A number with − and + around it: a quantity, a number of guests. Base UI does the work: `min`, `max`, `step` (with
 * `smallStep` and `largeStep` on Alt and Shift), arrow keys, Page Up and Down, Home and End, a long press that repeats,
 * the wheel when asked, and `format` for `Intl.NumberFormat` (a currency, a unit). Inside a Field, its label and
 * validity are linked and the group takes the Field's size and variant.
 */
export function NumberField({ className, ...props }: Props<NumberFieldPrimitive.Root.Props>) {
	return <NumberFieldPrimitive.Root data-slot="number-field" className={cn(numberFieldStyles.root, className)} {...props} />;
}

/** The field: Input Group's look, with the buttons inside. */
export function NumberFieldGroup({ className, variant, size, ...props }: Props<NumberFieldPrimitive.Group.Props> & InputGroupVariantProps) {
	const look = useFieldLook({ variant, size });
	return (
		<NumberFieldPrimitive.Group
			data-slot="number-field-group"
			data-variant={look.variant ?? "default"}
			data-size={look.size ?? "default"}
			className={cn(inputGroupVariants(look), className)}
			{...props}
		/>
	);
}

export function NumberFieldInput({ className, ...props }: Props<NumberFieldPrimitive.Input.Props>) {
	return <NumberFieldPrimitive.Input data-slot="number-field-input" className={cn(numberFieldStyles.input, className)} {...props} />;
}

/** "Decrease" to a screen reader unless you name it: `aria-label="Fewer guests"`. */
export function NumberFieldDecrement({ className, children, ...props }: Props<NumberFieldPrimitive.Decrement.Props>) {
	return (
		<NumberFieldPrimitive.Decrement data-slot="number-field-decrement" className={cn(numberFieldStyles.button, className)} {...props}>
			{children ?? <MinusIcon aria-hidden="true" />}
		</NumberFieldPrimitive.Decrement>
	);
}

/** "Increase" to a screen reader unless you name it: `aria-label="More guests"`. */
export function NumberFieldIncrement({ className, children, ...props }: Props<NumberFieldPrimitive.Increment.Props>) {
	return (
		<NumberFieldPrimitive.Increment data-slot="number-field-increment" className={cn(numberFieldStyles.button, className)} {...props}>
			{children ?? <PlusIcon aria-hidden="true" />}
		</NumberFieldPrimitive.Increment>
	);
}
