"use client";

import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon, PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { bezierEasing, useMotion, type Motion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { carouselStyles } from "./carousel.styles";

type Orientation = "horizontal" | "vertical";

interface CarouselContextValue {
	id: string;
	orientation: Orientation;
	align: "start" | "center";
	viewportRef: React.RefObject<HTMLDivElement | null>;
	trackRef: React.RefObject<HTMLDivElement | null>;
	/** The current snap position. */
	index: number;
	/** How many snap positions there are (fewer than slides when several show at once). */
	count: number;
	snaps: number[];
	slides: number;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	scrollTo: (index: number) => void;
	scrollPrev: () => void;
	scrollNext: () => void;
	setSlides: (count: number) => void;
	motion: Motion;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
	autoplaying: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);
const SlideIndex = React.createContext(0);

/** The carousel around this component: its position, its count and how to move it, for custom controls. */
export function useCarousel() {
	const context = React.useContext(CarouselContext);
	if (!context) throw new Error("useCarousel must be used inside <Carousel>");
	const { index, count, slides, canScrollPrev, canScrollNext, scrollTo, scrollPrev, scrollNext, orientation } = context;
	return { index, count, slides, canScrollPrev, canScrollNext, scrollTo, scrollPrev, scrollNext, orientation };
}

function useCarouselContext(part: string) {
	const context = React.useContext(CarouselContext);
	if (!context) throw new Error(`<${part}> must be used inside <Carousel>`);
	return context;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: Orientation;
	/** Where a slide rests in the viewport. */
	align?: "start" | "center";
	/** Past the last slide, the next arrow goes back to the first (and the reverse). */
	loop?: boolean;
	/** Seconds per slide, to move on its own. It pauses on hover and focus, and shows a pause button (WCAG 2.2.2). */
	autoplay?: number;
	/** Names the carousel for screen readers, e.g. "Featured projects". */
	label?: string;
}

/**
 * A row (or column) of slides on native scroll snapping: swipe, trackpad and wheel move it like the platform does;
 * arrows, dots, keys and a mouse drag move it with the village's easing. Built after the WAI-ARIA carousel pattern.
 */
export function Carousel({ orientation = "horizontal", align = "start", loop = false, autoplay, label, className, children, ...props }: CarouselProps) {
	const id = React.useId();
	const rootRef = React.useRef<HTMLDivElement>(null);
	const viewportRef = React.useRef<HTMLDivElement>(null);
	const trackRef = React.useRef<HTMLDivElement>(null);
	const motion = useMotion(rootRef);
	const [snaps, setSnaps] = React.useState<number[]>([0]);
	const [index, setIndex] = React.useState(0);
	const [position, setPosition] = React.useState({ start: true, end: true });
	const [slides, setSlides] = React.useState(0);
	const [dragging, setDragging] = React.useState(false);
	const [hovered, setHovered] = React.useState(false);
	const [paused, setPaused] = React.useState(false);
	const animation = React.useRef<{ frame: number; restore: () => void } | null>(null);
	const vertical = orientation === "vertical";

	// Snap positions: each slide's resting scroll offset, clamped to what can be scrolled, without duplicates.
	const measure = React.useCallback(() => {
		const viewport = viewportRef.current;
		const track = trackRef.current;
		if (!viewport || !track) return;
		const max = vertical ? viewport.scrollHeight - viewport.clientHeight : viewport.scrollWidth - viewport.clientWidth;
		const view = vertical ? viewport.clientHeight : viewport.clientWidth;
		// Positions closer than this are one: the last slide's padding would otherwise add a position a few pixels
		// before the end.
		const near = Math.max(2, view * 0.1);
		const points: number[] = [];
		for (const slide of Array.from(track.children) as HTMLElement[]) {
			const start = vertical ? slide.offsetTop : slide.offsetLeft;
			const size = vertical ? slide.offsetHeight : slide.offsetWidth;
			points.push(Math.round(Math.min(max, Math.max(0, align === "center" ? start + size / 2 - view / 2 : start))));
		}
		points.push(Math.round(max));
		const merged = points
			.sort((a, b) => a - b)
			.reduce<number[]>((kept, point) => {
				const last = kept[kept.length - 1];
				if (last === undefined || point - last >= near) kept.push(point);
				// The end wins over a point just before it, so the last position shows the last slide whole.
				else if (point === Math.round(max)) kept[kept.length - 1] = point;
				return kept;
			}, []);
		setSnaps(merged.length ? merged : [0]);
	}, [vertical, align]);

	const update = React.useCallback(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const scroll = vertical ? viewport.scrollTop : viewport.scrollLeft;
		const max = vertical ? viewport.scrollHeight - viewport.clientHeight : viewport.scrollWidth - viewport.clientWidth;
		setIndex(snaps.reduce((best, point, i) => (Math.abs(point - scroll) < Math.abs(snaps[best] - scroll) ? i : best), 0));
		setPosition({ start: scroll <= 1, end: scroll >= max - 1 });
	}, [snaps, vertical]);

	React.useLayoutEffect(() => {
		const viewport = viewportRef.current;
		const track = trackRef.current;
		if (!viewport || !track) return;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		observer.observe(track);
		return () => observer.disconnect();
	}, [measure, slides]);

	React.useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		update();
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(update);
		};
		viewport.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			viewport.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, [update]);

	const stop = React.useCallback(() => {
		if (!animation.current) return;
		cancelAnimationFrame(animation.current.frame);
		animation.current.restore();
		animation.current = null;
	}, []);

	const scrollTo = React.useCallback(
		(target: number) => {
			const viewport = viewportRef.current;
			if (!viewport) return;
			const i = Math.max(0, Math.min(snaps.length - 1, target));
			const to = snaps[i];
			const from = vertical ? viewport.scrollTop : viewport.scrollLeft;
			const set = (value: number) => (vertical ? (viewport.scrollTop = value) : (viewport.scrollLeft = value));
			stop();
			setIndex(i);
			if (!motion.allows(1) || Math.abs(to - from) < 1) {
				set(to);
				return;
			}
			// Snapping off while it moves, or the browser would pull it back to a snap point at every frame.
			const snapType = viewport.style.scrollSnapType;
			viewport.style.scrollSnapType = "none";
			const ease = bezierEasing(motion.tokens.easeOut);
			const duration = motion.tokens.slow * 1000;
			const started = performance.now();
			const restore = () => {
				viewport.style.scrollSnapType = snapType;
			};
			const step = (now: number) => {
				const t = Math.min(1, (now - started) / duration);
				set(from + (to - from) * ease(t));
				if (t < 1) animation.current = { frame: requestAnimationFrame(step), restore };
				else {
					set(to);
					restore();
					animation.current = null;
				}
			};
			animation.current = { frame: requestAnimationFrame(step), restore };
		},
		[snaps, vertical, motion, stop],
	);

	const scrollPrev = React.useCallback(() => scrollTo(index === 0 && loop ? snaps.length - 1 : index - 1), [scrollTo, index, loop, snaps.length]);
	const scrollNext = React.useCallback(() => scrollTo(index === snaps.length - 1 && loop ? 0 : index + 1), [scrollTo, index, loop, snaps.length]);

	// A touch or a wheel takes over from an animation in progress.
	React.useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		viewport.addEventListener("wheel", stop, { passive: true });
		viewport.addEventListener("touchstart", stop, { passive: true });
		return () => {
			viewport.removeEventListener("wheel", stop);
			viewport.removeEventListener("touchstart", stop);
		};
	}, [stop]);

	const autoplaying = Boolean(autoplay) && motion.allows(1) && !paused && !hovered && !dragging;
	React.useEffect(() => {
		if (!autoplaying || !autoplay) return;
		const timer = window.setInterval(() => scrollTo(index >= snaps.length - 1 ? 0 : index + 1), autoplay * 1000);
		return () => window.clearInterval(timer);
	}, [autoplaying, autoplay, scrollTo, index, snaps.length]);

	const value: CarouselContextValue = {
		id,
		orientation,
		align,
		viewportRef,
		trackRef,
		index,
		count: snaps.length,
		snaps,
		slides,
		canScrollPrev: loop ? snaps.length > 1 : !position.start,
		canScrollNext: loop ? snaps.length > 1 : !position.end,
		scrollTo,
		scrollPrev,
		scrollNext,
		setSlides,
		motion,
		dragging,
		setDragging,
		autoplaying,
	};

	return (
		<CarouselContext.Provider value={value}>
			<div
				ref={rootRef}
				role="region"
				aria-roledescription="carousel"
				aria-label={label}
				data-slot="carousel"
				data-orientation={orientation}
				className={cn(carouselStyles.root, className)}
				onPointerEnter={() => setHovered(true)}
				onPointerLeave={() => setHovered(false)}
				onFocus={() => setHovered(true)}
				onBlur={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
				}}
				{...props}
			>
				{children}
				{autoplay && motion.allows(1) && (
					<Button
						variant="outline"
						size="icon-sm"
						className={carouselStyles.autoplay}
						aria-pressed={paused}
						aria-label="Pause the carousel"
						onClick={() => setPaused((p) => !p)}
					>
						{paused ? <PlayIcon /> : <PauseIcon />}
					</Button>
				)}
			</div>
		</CarouselContext.Provider>
	);
}

/** The scrolling viewport and its track. `className` goes on the track (the height of a vertical carousel, or `-ms-2` with `ps-2` items for a smaller gap). */
export function CarouselContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { id, orientation, viewportRef, trackRef, setSlides, scrollPrev, scrollNext, scrollTo, count, snaps, dragging, setDragging, autoplaying } =
		useCarouselContext("CarouselContent");
	const items = React.Children.toArray(children);
	const vertical = orientation === "vertical";

	React.useEffect(() => setSlides(items.length), [items.length, setSlides]);

	// Mouse drag: touch and pens already scroll natively.
	const drag = React.useRef<{ start: number; scroll: number; last: number; time: number; velocity: number; moved: boolean } | null>(null);
	const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
		if (event.pointerType !== "mouse" || event.button !== 0) return;
		const viewport = event.currentTarget;
		const at = vertical ? event.clientY : event.clientX;
		drag.current = { start: at, scroll: vertical ? viewport.scrollTop : viewport.scrollLeft, last: at, time: performance.now(), velocity: 0, moved: false };
	};
	const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		const state = drag.current;
		if (!state) return;
		const viewport = event.currentTarget;
		const at = vertical ? event.clientY : event.clientX;
		if (!state.moved && Math.abs(at - state.start) < 6) return;
		if (!state.moved) {
			state.moved = true;
			viewport.setPointerCapture(event.pointerId);
			viewport.style.scrollSnapType = "none";
			setDragging(true);
		}
		const now = performance.now();
		state.velocity = (at - state.last) / Math.max(1, now - state.time);
		state.last = at;
		state.time = now;
		const scroll = state.scroll - (at - state.start);
		if (vertical) viewport.scrollTop = scroll;
		else viewport.scrollLeft = scroll;
	};
	const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
		const state = drag.current;
		drag.current = null;
		if (!state?.moved) return;
		const viewport = event.currentTarget;
		viewport.style.scrollSnapType = "";
		setDragging(false);
		// A flick carries on: aim a little past where it was let go (at most half a view), then snap there.
		const view = vertical ? viewport.clientHeight : viewport.clientWidth;
		const carry = Math.max(-view / 2, Math.min(view / 2, state.velocity * 160));
		const scroll = (vertical ? viewport.scrollTop : viewport.scrollLeft) - carry;
		scrollTo(snaps.reduce((best, point, i) => (Math.abs(point - scroll) < Math.abs(snaps[best] - scroll) ? i : best), 0));
		// The drag was not a click on what is under the pointer.
		viewport.addEventListener("click", (e) => e.preventDefault(), { capture: true, once: true });
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const back = vertical ? "ArrowUp" : "ArrowLeft";
		const forward = vertical ? "ArrowDown" : "ArrowRight";
		if (event.key === back) scrollPrev();
		else if (event.key === forward) scrollNext();
		else if (event.key === "Home") scrollTo(0);
		else if (event.key === "End") scrollTo(count - 1);
		else return;
		event.preventDefault();
	};

	return (
		<div
			ref={viewportRef}
			id={`${id}-viewport`}
			data-slot="carousel-viewport"
			data-orientation={orientation}
			data-dragging={dragging ? "" : undefined}
			tabIndex={0}
			aria-live={autoplaying ? "off" : "polite"}
			className={carouselStyles.viewport}
			onKeyDown={onKeyDown}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerUp}
		>
			<div ref={trackRef} data-slot="carousel-content" data-orientation={orientation} className={cn(carouselStyles.track, className)} {...props}>
				{items.map((child, i) => (
					<SlideIndex.Provider key={(React.isValidElement(child) && child.key) || i} value={i}>
						{child}
					</SlideIndex.Provider>
				))}
			</div>
		</div>
	);
}

/** One slide. Set its size with a `basis-*` class: `basis-1/3` shows three at a time. */
export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { align, slides, orientation } = useCarouselContext("CarouselItem");
	const index = React.useContext(SlideIndex);
	return (
		<div
			role="group"
			aria-roledescription="slide"
			aria-label={slides ? `${index + 1} of ${slides}` : undefined}
			data-slot="carousel-item"
			data-align={align}
			data-orientation={orientation}
			className={cn(carouselStyles.item, className)}
			{...props}
		/>
	);
}

type ArrowProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & { onClick?: React.MouseEventHandler<HTMLButtonElement> };

export function CarouselPrevious({ className, variant = "outline", size = "icon-sm", children, onClick, ...props }: ArrowProps) {
	const { id, orientation, canScrollPrev, scrollPrev } = useCarouselContext("CarouselPrevious");
	return (
		<Button
			data-slot="carousel-previous"
			data-orientation={orientation}
			variant={variant}
			size={size}
			aria-label="Previous slide"
			aria-controls={`${id}-viewport`}
			disabled={!canScrollPrev}
			className={cn(carouselStyles.previous, className)}
			onClick={(event) => {
				scrollPrev();
				onClick?.(event as React.MouseEvent<HTMLButtonElement>);
			}}
			{...props}
		>
			{children ?? <ArrowLeftIcon />}
		</Button>
	);
}

export function CarouselNext({ className, variant = "outline", size = "icon-sm", children, onClick, ...props }: ArrowProps) {
	const { id, orientation, canScrollNext, scrollNext } = useCarouselContext("CarouselNext");
	return (
		<Button
			data-slot="carousel-next"
			data-orientation={orientation}
			variant={variant}
			size={size}
			aria-label="Next slide"
			aria-controls={`${id}-viewport`}
			disabled={!canScrollNext}
			className={cn(carouselStyles.next, className)}
			onClick={(event) => {
				scrollNext();
				onClick?.(event as React.MouseEvent<HTMLButtonElement>);
			}}
			{...props}
		>
			{children ?? <ArrowRightIcon />}
		</Button>
	);
}

/** One dot per resting position; the current one is longer. */
export function CarouselDots({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const { id, index, count, scrollTo } = useCarouselContext("CarouselDots");
	if (count < 2) return null;
	return (
		<div data-slot="carousel-dots" className={cn(carouselStyles.dots, className)} {...props}>
			{Array.from({ length: count }, (_, i) => (
				<button
					key={i}
					type="button"
					aria-label={`Go to slide ${i + 1} of ${count}`}
					aria-current={i === index ? "true" : undefined}
					aria-controls={`${id}-viewport`}
					className={carouselStyles.dot}
					onClick={() => scrollTo(i)}
				/>
			))}
		</div>
	);
}
