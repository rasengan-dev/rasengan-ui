"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";
import { inputStyles } from "./input.styles";

export { inputStyles } from "./input.styles";

export type InputProps = Omit<InputPrimitive.Props, "className"> & { className?: string };

/** Base UI's Input is a Field control: inside a Field, its label, description and validity are linked. */
export function Input({ className, type = "text", ...props }: InputProps) {
	return <InputPrimitive data-slot="input" type={type} className={cn(inputStyles, className)} {...props} />;
}
