"use client";

import type * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";

import { cn } from "@/lib/utils";
import { textareaStyles } from "./textarea.styles";

export { textareaStyles } from "./textarea.styles";

/** A Field control rendered as a <textarea>, so a Field links its label, description and validity. */
export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return <FieldPrimitive.Control data-slot="textarea" className={cn(textareaStyles, className)} render={<textarea {...props} />} />;
}
