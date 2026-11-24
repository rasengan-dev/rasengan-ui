"use client";

import * as React from "react";

import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { stickyScrollStyles } from "./sticky-scroll.styles";

const CurrentContext = React.createContext(0);
const IndexContext = React.createContext(0);

export interface StickyScrollProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Called with the index of the item now in the middle of the screen. */
	onCurrentChange?: (index: number) => void;
}

/**
 * Items down one column and a stage beside them that stays in view: as an item crosses the middle of the screen, it
 * becomes current (`aria-current="step"`, `data-current`) and its media takes the stage. Compose `StickyScrollList`
 * with a `StickyScrollItem` per item (each with its own `StickyScrollMedia`), then a `StickyScrollStage` with the same
 * media in the same order.
 *
 * Below @3xl, with reduced motion, `final` or at intensity 0, it is a plain list where each item shows its own media.
 * At intensity 1 the stage cuts from one media to the next; at 2 it fades; at 3 it also slides. The stage is hidden
 * from assistive technology: each item carries its media. Like every sticky element, the stage stops sticking inside
 * an ancestor with `overflow: hidden`.
 */
export function StickyScroll({ onCurrentChange, className, children, ...props }: StickyScrollProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { mode, measured, allows } = useMotion(ref);
	const [current, setCurrent] = React.useState(0);
	const known = mode !== "pending" && measured;
	const layout = !known || allows(1) ? "staged" : "list";
	const effect = allows(3) ? "slide" : allows(2) ? "fade" : "cut";

	// The current item is the one crossing the middle of the viewport.
	React.useEffect(() => {
		const root = ref.current;
		if (!root) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = Number((entry.target as HTMLElement).dataset.index);
					setCurrent(index);
					onCurrentChange?.(index);
				}
			},
			{ rootMargin: "-45% 0px -45% 0px" },
		);
		for (const item of root.querySelectorAll('[data-slot="sticky-scroll-item"]')) observer.observe(item);
		return () => observer.disconnect();
	}, [children, onCurrentChange]);

	return (
		<div ref={ref} data-slot="sticky-scroll" data-layout={layout} data-effect={effect} className={cn(stickyScrollStyles.root, className)} {...props}>
			<CurrentContext.Provider value={current}>
				<div className={stickyScrollStyles.grid}>{children}</div>
			</CurrentContext.Provider>
		</div>
	);
}

/** The items, in order: an `ol`. */
export function StickyScrollList({ className, children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
	return (
		<ol data-slot="sticky-scroll-list" className={cn(stickyScrollStyles.list, className)} {...props}>
			{React.Children.map(children, (child, index) => (
				<IndexContext.Provider value={index}>{child}</IndexContext.Provider>
			))}
		</ol>
	);
}

/** One item: its text, and its `StickyScrollMedia`. */
export function StickyScrollItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
	const index = React.useContext(IndexContext);
	const current = React.useContext(CurrentContext) === index;
	return (
		<li
			data-slot="sticky-scroll-item"
			data-index={index}
			data-current={current || undefined}
			aria-current={current ? "step" : undefined}
			className={cn(stickyScrollStyles.item, className)}
			{...props}
		/>
	);
}

/** The item's own media: shown under its text in the list, hidden beside the stage. */
export function StickyScrollMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div data-slot="sticky-scroll-media" className={cn(stickyScrollStyles.media, className)} {...props} />;
}

/** The stage: one child per item, in the same order; the current one is shown. Hidden from assistive technology. */
export function StickyScrollStage({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const current = React.useContext(CurrentContext);
	return (
		<div aria-hidden="true" data-slot="sticky-scroll-stage" className={cn(stickyScrollStyles.stage, className)} {...props}>
			<div className={stickyScrollStyles.stageInner}>
				{React.Children.map(children, (child, index) => (
					<div data-slot="sticky-scroll-slide" data-current={index === current || undefined} className={stickyScrollStyles.slide}>
						{child}
					</div>
				))}
			</div>
		</div>
	);
}
