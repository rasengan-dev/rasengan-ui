"use client";

import * as React from "react";

import { useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { scrollProgressStyles, scrollProgressVariants, type ScrollProgressVariantProps } from "./scroll-progress.styles";

export { scrollProgressVariants } from "./scroll-progress.styles";

export interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, ScrollProgressVariantProps {
	/**
	 * The article to follow: the bar fills from its top reaching the top of the viewport to its end reaching the
	 * bottom. Leave it out to follow the whole page.
	 */
	target?: React.RefObject<HTMLElement | null>;
	/** Fixes how full the bar is (0–1), for demos and screenshots. */
	progress?: number;
}

/**
 * A reading bar: fills as the page, or one article, scrolls by. It moves nothing but itself and only with the reader's
 * scroll, so it keeps working with reduced motion (ADR-0020). Hidden from screen readers: the page's own scroll
 * position already says where the reader is.
 */
export function ScrollProgress({ target, progress, variant, tone, size, position, className, ...props }: ScrollProgressProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	useScrollProgress(ref, { range: target ? "contain" : "page", subject: target, progress, feedback: true });
	return (
		<div
			ref={ref}
			aria-hidden="true"
			data-slot="scroll-progress"
			data-variant={variant ?? "default"}
			data-tone={tone ?? "primary"}
			data-size={size ?? "default"}
			className={cn(scrollProgressVariants({ variant, tone, size, position }), className)}
			{...props}
		>
			<div data-slot="scroll-progress-bar" className={scrollProgressStyles.bar} />
		</div>
	);
}
