"use client";

import * as React from "react";

import { cssEasing, useInViewOnce, useMotion, useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { imageRevealStyles } from "./image-reveal.styles";

export type ImageRevealEffect = "curtain" | "circle" | "diagonal";
export type ImageRevealFrom = "left" | "right" | "top" | "bottom";

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
	/** The media to uncover: an `img`, a `picture`, a `video`, or any element. */
	children: React.ReactNode;
	/** The shape of the mask. */
	effect?: ImageRevealEffect;
	/** Where the curtain opens from. */
	from?: ImageRevealFrom;
	/** Seconds before it starts. */
	delay?: number;
	/** Tie the mask to the scroll instead of playing once (intensity 3; plays once below). */
	scrub?: boolean;
	/** Fixes how open the mask is (0–1), for demos and screenshots. */
	progress?: number;
}

/** The mask, closed (0) to open (1). `p` is a number or a CSS expression. */
function mask(effect: ImageRevealEffect, from: ImageRevealFrom, p: string): string {
	const closed = `calc((1 - ${p}) * 100%)`;
	switch (effect) {
		case "circle":
			return `circle(calc(${p} * 75%) at 50% 50%)`;
		case "diagonal": {
			const reach = `calc(${p} * 200%)`;
			return `polygon(0 0, ${reach} 0, 0 ${reach})`;
		}
		default:
			// inset(top right bottom left): the curtain opens away from `from`.
			return from === "left"
				? `inset(0 ${closed} 0 0)`
				: from === "right"
					? `inset(0 0 0 ${closed})`
					: from === "top"
						? `inset(0 0 ${closed} 0)`
						: `inset(${closed} 0 0 0)`;
	}
}

/** How much larger the media starts, by intensity: none at 1, a slight zoom out from 2. */
const ZOOM = 0.12;

/**
 * Uncovers an image with a mask when it comes into view, once: a curtain, a circle or a diagonal, the image settling
 * from a slight zoom. With `scrub`, the mask follows the scroll instead. Timed by the village; at intensity 1 the image
 * fades in, and with reduced motion, `final` or without JavaScript it is simply there. The mask is a clip-path, never a
 * cover on top: the image stays selectable and a link around it clickable.
 */
export function ImageReveal({ children, effect = "curtain", from = "left", delay = 0, scrub = false, progress, className, style, ...props }: ImageRevealProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { mode, tokens, measured, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	// A fixed progress is a picture of the mask; scrubbing follows the scroll at intensity 3.
	const linked = progress !== undefined || (scrub && allows(3));
	useScrollProgress(ref, { range: "entry", progress, enabled: linked });

	React.useEffect(() => {
		const root = ref.current;
		if (!root || linked || mode === "pending" || !measured || root.hasAttribute("data-revealed")) return;
		if (!allows(1)) {
			root.setAttribute("data-revealed", "");
			return;
		}
		if (!inView) return;

		root.setAttribute("data-revealed", "");
		const timing = { duration: tokens.slow * 2500, delay: delay * 1000, easing: cssEasing(tokens.easeInOut), fill: "backwards" as const };
		const animations: Animation[] = [];
		if (!allows(2)) {
			animations.push(root.animate([{ opacity: 0 }, { opacity: 1 }], { ...timing, duration: tokens.slow * 1000 }));
		} else {
			animations.push(root.animate([{ clipPath: mask(effect, from, "0") }, { clipPath: mask(effect, from, "1") }], timing));
			const media = root.firstElementChild;
			if (media instanceof HTMLElement) {
				animations.push(media.animate([{ scale: String(1 + ZOOM) }, { scale: "1" }], { ...timing, duration: timing.duration * 1.4, easing: cssEasing(tokens.easeOut) }));
			}
		}
		return () => {
			for (const animation of animations) animation.cancel();
		};
	}, [linked, inView, mode, measured, allows, tokens, effect, from, delay]);

	const p = "var(--scroll-progress, 0)";
	return (
		<div
			ref={ref}
			data-slot="image-reveal"
			data-effect={effect}
			data-reveal={linked ? undefined : ""}
			className={cn(imageRevealStyles.root, linked && imageRevealStyles.scrubbed, className)}
			// A fixed progress is written in the HTML too, so the server draws the same mask.
			style={linked ? { ...style, ...(progress === undefined ? {} : { ["--scroll-progress" as string]: progress }), clipPath: mask(effect, from, p) } : style}
			{...props}
		>
			{children}
		</div>
	);
}
