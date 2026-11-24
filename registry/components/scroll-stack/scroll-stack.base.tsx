"use client";

import * as React from "react";

import { useMotion, useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { scrollStackStyles } from "./scroll-stack.styles";

export interface ScrollStackProps extends React.HTMLAttributes<HTMLUListElement> {
	/** Draws the stack at this point (0–1) in place, without scrolling: for demos and screenshots. */
	progress?: number;
}

/**
 * Cards that stick under the top of the screen one after another as the page scrolls; each shrinks a little as the next
 * covers it. Put one `ScrollStackItem` per card, and the card inside it. At intensity 1 the cards stack
 * without shrinking; with reduced motion, `final` or without JavaScript they are a plain list. Set `--stack-top` (where
 * the first card sticks, under a fixed header) and `--stack-gap` (how much of each card stays visible) on the root.
 *
 * Every item takes one screen of scroll. A sticky element stops sticking inside an ancestor with `overflow: hidden`:
 * use `overflow: clip` on the page's wrappers.
 */
export function ScrollStack({ progress, className, children, ...props }: ScrollStackProps) {
	const ref = React.useRef<HTMLUListElement>(null);
	const { allows } = useMotion(ref);
	const still = progress !== undefined;
	const layout = still ? "still" : allows(1) ? "sticky" : undefined;
	const effect = layout === undefined ? undefined : still || allows(2) ? (allows(3) ? "tilt" : "shrink") : undefined;
	useScrollProgress(ref, { range: "pin", progress, enabled: effect !== undefined });

	// Each item learns its index, and the root the count, for --depth and --arrive.
	React.useLayoutEffect(() => {
		const root = ref.current;
		if (!root) return;
		const items = [...root.children].filter((child): child is HTMLElement => child instanceof HTMLElement && child.dataset.slot === "scroll-stack-item");
		root.style.setProperty("--count", String(items.length));
		items.forEach((item, index) => item.style.setProperty("--i", String(index)));
	}, [children]);

	return (
		<ul ref={ref} data-slot="scroll-stack" data-layout={layout} data-effect={effect} className={cn(scrollStackStyles.root, className)} {...props}>
			{children}
		</ul>
	);
}

/** One card of the stack: the card itself goes inside. */
export function ScrollStackItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
	return <li data-slot="scroll-stack-item" className={cn(scrollStackStyles.item, className)} {...props} />;
}
