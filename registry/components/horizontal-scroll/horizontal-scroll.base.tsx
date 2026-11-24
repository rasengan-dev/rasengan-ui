"use client";

import * as React from "react";

import { useMotion, useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { horizontalScrollStyles } from "./horizontal-scroll.styles";

/** Below this screen width the row stays a native swipeable row: a phone pins nothing well. */
const PINNED_SCREENS = "(min-width: 48rem)";

export interface HorizontalScrollProps extends React.HTMLAttributes<HTMLElement> {
	/** Draws the track at this point (0–1) in place, without pinning: for demos and screenshots. */
	progress?: number;
	/** The section's name for assistive technology, when it has no heading of its own. */
	"aria-label"?: string;
}

/**
 * A section whose row of items moves sideways while the page scrolls down: it pins to the top for as long as the row
 * overflows, then lets the page go on. Put a `HorizontalScrollTrack` inside, and a `HorizontalScrollItem` per card.
 *
 * On screens under 48rem wide, at intensity 1, with reduced motion, `final` or without JavaScript, the row is a native horizontal
 * scroller that snaps to each item. When a keyboard user tabs to an item the track has not reached, the page scrolls to
 * bring it in. Like every sticky element, it stops pinning inside an ancestor with `overflow: hidden`.
 */
export function HorizontalScroll({ progress, className, children, ...props }: HorizontalScrollProps) {
	const ref = React.useRef<HTMLElement>(null);
	const { allows } = useMotion(ref);
	const [wide, setWide] = React.useState(false);
	const still = progress !== undefined;
	const layout = still ? "still" : allows(2) && wide ? "pinned" : undefined;
	useScrollProgress(ref, { range: "pin", progress, enabled: layout !== undefined });

	// The screen decides whether to pin; the track's overflow is how far it moves (--shift).
	React.useEffect(() => {
		const root = ref.current;
		const viewport = root?.querySelector<HTMLElement>('[data-slot="horizontal-scroll-viewport"]');
		const track = root?.querySelector<HTMLElement>('[data-slot="horizontal-scroll-track"]');
		if (!root || !viewport || !track) return;
		const screens = window.matchMedia(PINNED_SCREENS);
		const measure = () => {
			setWide(screens.matches);
			root.style.setProperty("--shift", `${Math.max(0, track.scrollWidth - viewport.clientWidth)}px`);
		};
		const observer = new ResizeObserver(measure);
		observer.observe(root);
		observer.observe(track);
		screens.addEventListener("change", measure);
		measure();
		return () => {
			observer.disconnect();
			screens.removeEventListener("change", measure);
		};
	}, []);

	// Keyboard: the track is moved by transform, so the browser cannot scroll a focused item into view. Scroll the page
	// to the point where the track shows it.
	React.useEffect(() => {
		const root = ref.current;
		if (!root || layout !== "pinned") return;
		const onFocus = (event: FocusEvent) => {
			const item = (event.target as Element).closest<HTMLElement>('[data-slot="horizontal-scroll-item"]');
			const track = root.querySelector<HTMLElement>('[data-slot="horizontal-scroll-track"]');
			const viewport = root.querySelector<HTMLElement>('[data-slot="horizontal-scroll-viewport"]');
			if (!item || !track || !viewport) return;
			const shift = Math.max(0, track.scrollWidth - viewport.clientWidth);
			if (shift === 0) return;
			// How far along the track the item should be to sit in the middle of the viewport.
			const rtl = getComputedStyle(track).direction === "rtl";
			const start = rtl ? track.scrollWidth - item.offsetLeft - item.offsetWidth : item.offsetLeft;
			const along = Math.min(shift, Math.max(0, start - (viewport.clientWidth - item.offsetWidth) / 2));
			const top = root.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top: top + along, behavior: "instant" });
		};
		root.addEventListener("focusin", onFocus);
		return () => root.removeEventListener("focusin", onFocus);
	}, [layout]);

	return (
		<section
			ref={ref}
			data-slot="horizontal-scroll"
			data-layout={layout}
			data-effect={layout && allows(3) ? "drift" : undefined}
			className={cn(horizontalScrollStyles.root, className)}
			{...props}
		>
			<div data-slot="horizontal-scroll-viewport" className={horizontalScrollStyles.viewport}>
				{children}
			</div>
		</section>
	);
}

/** The row: one `HorizontalScrollItem` per card. Put a heading before it, inside the section, if it has one. */
export function HorizontalScrollTrack({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
	return <ul data-slot="horizontal-scroll-track" className={cn(horizontalScrollStyles.track, className)} {...props} />;
}

/** One card of the row: give it a width (`w-80`, `w-[min(80vw,28rem)]`). */
export function HorizontalScrollItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
	return <li data-slot="horizontal-scroll-item" className={cn(horizontalScrollStyles.item, className)} {...props} />;
}
