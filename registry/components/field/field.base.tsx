"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";

import { labelStyles } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./field.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Links the label, control (Input, Textarea…), description and error inside it. */
export function Field({ className, ...props }: Props<FieldPrimitive.Root.Props>) {
	return <FieldPrimitive.Root data-slot="field" className={cn(fieldStyles.root, className)} {...props} />;
}

export function FieldLabel({ className, ...props }: Props<FieldPrimitive.Label.Props>) {
	return <FieldPrimitive.Label data-slot="field-label" className={cn(labelStyles, className)} {...props} />;
}

export function FieldDescription({ className, ...props }: Props<FieldPrimitive.Description.Props>) {
	return <FieldPrimitive.Description data-slot="field-description" className={cn(fieldStyles.description, className)} {...props} />;
}

/** Shown when the field is invalid (or for the validity state named by `match`). */
export function FieldError({ className, ...props }: Props<FieldPrimitive.Error.Props>) {
	return <FieldPrimitive.Error data-slot="field-error" className={cn(fieldStyles.error, className)} {...props} />;
}
