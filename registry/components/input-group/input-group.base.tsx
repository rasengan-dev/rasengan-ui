"use client";

import type * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { FieldLookProvider, useFieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import {
	inputGroupAddonVariants,
	type InputGroupAddonVariantProps,
	inputGroupButtonSizes,
	inputGroupStyles,
	inputGroupVariants,
	type InputGroupVariantProps,
} from "./input-group.styles";

export { inputGroupAddonVariants, inputGroupVariants, type InputGroupVariantProps } from "./input-group.styles";

/**
 * Draws the field around an InputGroupInput or InputGroupTextarea and its addons. Takes the size and variant of the
 * Field around it, unless it sets its own, and passes the size on to the control.
 */
export function InputGroup({ className, variant, size, children, ...props }: React.ComponentProps<"div"> & InputGroupVariantProps) {
	const look = useFieldLook<NonNullable<InputGroupVariantProps["variant"]>>({ variant, size });
	return (
		<div
			role="group"
			data-slot="input-group"
			data-variant={look.variant ?? "default"}
			data-size={look.size ?? "default"}
			className={cn(inputGroupVariants(look), className)}
			{...props}
		>
			<FieldLookProvider size={look.size} variant="default">
				{children}
			</FieldLookProvider>
		</div>
	);
}

/** Icons, text or buttons beside the control, or above and below it (block-start, block-end). A click on it focuses the control. */
export function InputGroupAddon({ className, align, onClick, ...props }: React.ComponentProps<"div"> & InputGroupAddonVariantProps) {
	return (
		<div
			data-slot="input-group-addon"
			data-align={align ?? "inline-start"}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onClick={(event) => {
				onClick?.(event);
				if ((event.target as HTMLElement).closest("button, a, input, textarea")) return;
				event.currentTarget.parentElement?.querySelector<HTMLElement>(":scope > input, :scope > textarea")?.focus();
			}}
			{...props}
		/>
	);
}

export type InputGroupButtonProps = Omit<ButtonProps, "size"> & { size?: keyof typeof inputGroupButtonSizes };

/** A Button that fits inside the field; ghost unless told otherwise. */
export function InputGroupButton({ className, variant = "ghost", size = "xs", ...props }: InputGroupButtonProps) {
	return (
		<Button
			data-slot="input-group-button"
			data-size={size}
			variant={variant}
			size={size.startsWith("icon") ? "icon-sm" : "sm"}
			className={cn("shadow-none", inputGroupButtonSizes[size], className)}
			{...props}
		/>
	);
}

export function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
	return <span data-slot="input-group-text" className={cn(inputGroupStyles.text, className)} {...props} />;
}

export function InputGroupInput({ className, ...props }: InputProps) {
	return <Input data-slot="input-group-control" className={cn(inputGroupStyles.control, className)} {...props} />;
}

export function InputGroupTextarea({ className, ...props }: TextareaProps) {
	return <Textarea data-slot="input-group-control" className={cn(inputGroupStyles.control, inputGroupStyles.textarea, className)} {...props} />;
}
