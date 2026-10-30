"use client";

import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";

import { useFieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import { textareaVariants, type TextareaVariantProps } from "./textarea.styles";

export { textareaVariants } from "./textarea.styles";

export type TextareaProps = React.ComponentProps<"textarea"> & TextareaVariantProps;

/** A Field control rendered as a <textarea>, so a Field links its label, description and validity, and passes its size and variant. */
export function Textarea({ className, variant, size, ...props }: TextareaProps) {
	const look = useFieldLook({ variant, size });
	return (
		<FieldPrimitive.Control
			data-slot="textarea"
			data-variant={look.variant ?? "default"}
			data-size={look.size ?? "default"}
			className={cn(textareaVariants(look), className)}
			render={<textarea {...props} />}
		/>
	);
}
