"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";

import { labelStyles } from "@/components/ui/label";
import { FieldLookProvider, type FieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./field.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/**
 * Links the label, control (Input, Textarea, a Select's trigger…), description and error inside it.
 * `size` and `variant` go to that control, unless it sets its own; `size` scales the label and texts too.
 */
export function Field({ className, size, variant, children, ...props }: Props<FieldPrimitive.Root.Props> & FieldLook) {
	return (
		<FieldPrimitive.Root data-slot="field" data-size={size ?? "default"} className={cn(fieldStyles.root, className)} {...props}>
			<FieldLookProvider size={size} variant={variant}>
				{children}
			</FieldLookProvider>
		</FieldPrimitive.Root>
	);
}

export function FieldLabel({ className, ...props }: Props<FieldPrimitive.Label.Props>) {
	return <FieldPrimitive.Label data-slot="field-label" className={cn(labelStyles, fieldStyles.label, className)} {...props} />;
}

export function FieldDescription({ className, ...props }: Props<FieldPrimitive.Description.Props>) {
	return <FieldPrimitive.Description data-slot="field-description" className={cn(fieldStyles.description, className)} {...props} />;
}

/** Shown when the field is invalid (or for the validity state named by `match`). */
export function FieldError({ className, ...props }: Props<FieldPrimitive.Error.Props>) {
	return <FieldPrimitive.Error data-slot="field-error" className={cn(fieldStyles.error, className)} {...props} />;
}
