"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { useFieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import { inputVariants, type InputVariantProps } from "./input.styles";

export { inputVariants } from "./input.styles";

export type InputProps = Omit<InputPrimitive.Props, "className" | "size"> & InputVariantProps & { className?: string };

/** Base UI's Input is a Field control: inside a Field, its label, description and validity are linked, and it takes the Field's size and variant. */
export function Input({ className, type = "text", variant, size, ...props }: InputProps) {
	const look = useFieldLook({ variant, size });
	return (
		<InputPrimitive
			data-slot="input"
			data-variant={look.variant ?? "default"}
			data-size={look.size ?? "default"}
			type={type}
			className={cn(inputVariants(look), className)}
			{...props}
		/>
	);
}
