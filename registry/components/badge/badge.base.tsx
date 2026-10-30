"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge.styles";

export { badgeVariants, type BadgeVariantProps } from "./badge.styles";

export type BadgeProps = useRender.ComponentProps<"span"> & BadgeVariantProps;

/** A <span>, or the element given in `render` (a link: `render={<a href="…" />}`). */
export function Badge({ className, variant, tone, size, render, ...props }: BadgeProps) {
	return useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ variant, tone, size }), className),
				"data-slot": "badge",
				"data-variant": variant ?? "default",
				"data-tone": variant === "destructive" ? "destructive" : (tone ?? "primary"),
				"data-size": size ?? "default",
			} as React.ComponentProps<"span">,
			props,
		),
	});
}
