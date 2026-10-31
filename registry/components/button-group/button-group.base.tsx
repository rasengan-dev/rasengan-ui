"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { Separator, type SeparatorProps } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { buttonGroupStyles, buttonGroupVariants, type ButtonGroupVariantProps } from "./button-group.styles";

export { buttonGroupVariants, type ButtonGroupVariantProps } from "./button-group.styles";

/** `role="group"`: give it an `aria-label` when its buttons don't say what they act on together. */
export function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<"div"> & ButtonGroupVariantProps) {
	return (
		<div
			role="group"
			data-slot="button-group"
			data-orientation={orientation ?? "horizontal"}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		/>
	);
}

/** A label or a value inside the group: a <div>, or the element given in `render` (a `<label>`). */
export function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">({ className: cn(buttonGroupStyles.text, className), "data-slot": "button-group-text" } as React.ComponentProps<"div">, props),
	});
}

/** A line between two buttons that share a fill (secondary, soft), where no border separates them. */
export function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: SeparatorProps) {
	return <Separator data-slot="button-group-separator" orientation={orientation} className={cn(buttonGroupStyles.separator, className)} {...props} />;
}
