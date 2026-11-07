"use client";

import * as React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { marqueeStyles, marqueeVariants } from "./marquee.styles";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Pixels per second: the same speed whatever the number of items. */
	speed?: number;
	direction?: "left" | "right" | "up" | "down";
	/** Space between items, any CSS length. */
	gap?: string;
	/** Fade the items into the edges. */
	fade?: boolean;
	/** Stop while the pointer is over it or focus is inside. */
	pauseOnHover?: boolean;
	/** Show a pause button. Moving content needs a way to stop it (WCAG 2.2.2): turn it off only if the page has another. */
	controls?: boolean;
	/** Names the region for screen readers, e.g. "Companies using Lumen". */
	label?: string;
}

/**
 * An endless loop of items (logos, quotes, tags) at a steady speed, with only as many copies as the width needs. It
 * stops on hover and focus and has a pause button; the copies are hidden from screen readers and the keyboard. With
 * motion off, or at intensity 0, the items wrap on several lines and stand still.
 */
export function Marquee({
	speed = 48,
	direction = "left",
	gap = "2.5rem",
	fade = true,
	pauseOnHover = true,
	controls = true,
	label,
	className,
	style,
	children,
	...props
}: MarqueeProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const viewportRef = React.useRef<HTMLDivElement>(null);
	const firstRef = React.useRef<HTMLDivElement>(null);
	const trackRef = React.useRef<HTMLDivElement>(null);
	const { mode, measured, allows } = useMotion(ref);
	const running = mode === "ready" && measured && allows(1);
	const vertical = direction === "up" || direction === "down";

	const [size, setSize] = React.useState({ viewport: 0, copy: 0 });
	const [paused, setPaused] = React.useState(false);
	const [hovered, setHovered] = React.useState(false);
	const animationRef = React.useRef<Animation | null>(null);

	// Copies needed to cover the viewport while one slides out: at least two.
	const copies = size.copy > 0 ? Math.max(2, Math.ceil(size.viewport / size.copy) + 1) : 2;

	React.useEffect(() => {
		if (!running) return;
		const viewport = viewportRef.current;
		const first = firstRef.current;
		if (!viewport || !first) return;
		const measure = () => {
			const along = (element: HTMLElement) => (vertical ? element.getBoundingClientRect().height : element.getBoundingClientRect().width);
			setSize((current) => {
				const next = { viewport: along(viewport), copy: along(first) };
				return next.viewport === current.viewport && next.copy === current.copy ? current : next;
			});
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		observer.observe(first);
		return () => observer.disconnect();
	}, [running, vertical]);

	React.useEffect(() => {
		const track = trackRef.current;
		if (!running || !track || size.copy === 0) return;
		const axis = vertical ? "Y" : "X";
		const frames = [{ transform: `translate${axis}(0)` }, { transform: `translate${axis}(${-size.copy}px)` }];
		const animation = track.animate(direction === "right" || direction === "down" ? [...frames].reverse() : frames, {
			duration: (size.copy / speed) * 1000,
			iterations: Number.POSITIVE_INFINITY,
			easing: "linear",
		});
		animationRef.current = animation;
		return () => {
			animation.cancel();
			animationRef.current = null;
		};
	}, [running, size.copy, speed, direction, vertical]);

	const halted = paused || (pauseOnHover && hovered);
	React.useEffect(() => {
		const animation = animationRef.current;
		if (!animation) return;
		if (halted) animation.pause();
		else animation.play();
	}, [halted, size.copy]);

	const variables = { ...style, ["--marquee-gap" as string]: gap } as React.CSSProperties;

	if (!running) {
		return (
			<div ref={ref} data-slot="marquee" role={label ? "region" : undefined} aria-label={label} className={cn("w-full", className)} style={variables} {...props}>
				{/* A vertical list may scroll within its height: keyboard users can focus it to scroll. */}
				<div className={vertical ? marqueeStyles.stillVertical : marqueeStyles.still} tabIndex={vertical ? 0 : undefined}>
					{children}
				</div>
			</div>
		);
	}

	return (
		<div
			ref={ref}
			data-slot="marquee"
			role={label ? "region" : undefined}
			aria-label={label}
			className={cn(marqueeVariants({ orientation: vertical ? "vertical" : "horizontal" }), className)}
			style={variables}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			onFocus={() => setHovered(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
			}}
			{...props}
		>
			<div ref={viewportRef} className={cn(marqueeStyles.viewport, vertical && "h-full", fade && (vertical ? marqueeStyles.fadeVertical : marqueeStyles.fadeHorizontal))}>
				<div ref={trackRef} data-slot="marquee-track" className={vertical ? marqueeStyles.trackVertical : marqueeStyles.track}>
					<div ref={firstRef} className={vertical ? marqueeStyles.copyVertical : marqueeStyles.copy}>
						{children}
					</div>
					{Array.from({ length: copies - 1 }, (_, i) => (
						// Copies are decoration: hidden from screen readers, out of the tab order.
						<div key={i} aria-hidden="true" inert className={vertical ? marqueeStyles.copyVertical : marqueeStyles.copy}>
							{children}
						</div>
					))}
				</div>
			</div>
			{controls && (
				<Button variant="ghost" size="icon-sm" className={marqueeStyles.pause} aria-pressed={paused} aria-label="Pause" onClick={() => setPaused((value) => !value)}>
					{paused ? <PlayIcon /> : <PauseIcon />}
				</Button>
			)}
		</div>
	);
}
