"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "@/lib/utils";
import { badgeIndicatorStyles, badgeVariants, type BadgeVariantProps } from "./badge.styles";

export { badgeVariants, type BadgeVariantProps } from "./badge.styles";

export type BadgeProps = useRender.ComponentProps<"span"> &
	BadgeVariantProps & {
		/** `live`: a dot before the label that pulses, for "Live", "Open now", "Available for work". Still with reduced motion. */
		indicator?: "live";
	};

function LiveDot() {
	return (
		<span aria-hidden="true" data-slot="badge-indicator" className={badgeIndicatorStyles.root}>
			<span className={badgeIndicatorStyles.ring}>
				<span className={badgeIndicatorStyles.ping} />
			</span>
			<span className={badgeIndicatorStyles.dot} />
		</span>
	);
}

/** A <span>, or the element given in `render` (a link: `render={<a href="…" />}`). */
export function Badge({ className, variant, tone, size, render, indicator, children, ...props }: BadgeProps) {
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
				"data-indicator": indicator,
				children: indicator === "live" ? (
					<>
						<LiveDot />
						{children}
					</>
				) : (
					children
				),
			} as React.ComponentProps<"span">,
			props,
		),
	});
}
