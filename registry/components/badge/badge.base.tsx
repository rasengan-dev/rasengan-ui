"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariantProps } from "./badge.styles";

export { badgeVariants, type BadgeVariantProps } from "./badge.styles";

export type BadgeProps = useRender.ComponentProps<"span"> & BadgeVariantProps;

/** A <span>, or the element given in `render` (a link: `render={<a href="…" />}`). */
export function Badge({ className, variant, render, ...props }: BadgeProps) {
	return useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(
			{ className: cn(badgeVariants({ variant }), className), "data-slot": "badge", "data-variant": variant ?? "default" } as React.ComponentProps<"span">,
			props,
		),
	});
}
