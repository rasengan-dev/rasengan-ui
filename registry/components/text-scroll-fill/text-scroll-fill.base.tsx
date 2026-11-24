"use client";

import * as React from "react";

import { useMotion, useScrollProgress } from "@/lib/motion";
import { SplitText, splitText, type SplitTag } from "@/lib/split-text";
import { cn } from "@/lib/utils";
import { textScrollFillVariants, type TextScrollFillVariantProps } from "./text-scroll-fill.styles";

export { textScrollFillVariants } from "./text-scroll-fill.styles";

export interface TextScrollFillProps extends Omit<React.HTMLAttributes<HTMLElement>, "children">, TextScrollFillVariantProps {
	/** The statement: a string, so it can be split into words. */
	children: string;
	as?: SplitTag;
	/** Fixes how far the fill has gone (0–1), for demos and screenshots. */
	progress?: number;
}

/**
 * A statement whose words fill with colour one after another as it scrolls up the viewport: from the muted text colour,
 * which is already readable, to the tone's. From intensity 2 each word also rises into place. It follows the scroll,
 * not a clock, so it never moves on its own. With reduced motion, `final` or without JavaScript, the statement is
 * simply in its colour. Screen readers read it once, whole.
 */
export function TextScrollFill({ children, as = "p", tone, progress, className, style, ...props }: TextScrollFillProps) {
	const ref = React.useRef<HTMLElement>(null);
	const { allows } = useMotion(ref);
	const linked = progress !== undefined || allows(1);
	useScrollProgress(ref, { range: "cover", progress, enabled: linked });
	const words = React.useMemo(() => splitText(children).length, [children]);
	return (
		<SplitText
			ref={ref}
			as={as}
			by="words"
			data-slot="text-scroll-fill"
			data-tone={tone ?? "neutral"}
			data-effect={allows(2) ? "rise" : "fill"}
			className={cn(textScrollFillVariants({ tone }), className)}
			style={{ ...style, ["--words" as string]: words }}
			{...props}
		>
			{children}
		</SplitText>
	);
}
