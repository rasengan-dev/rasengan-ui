"use client";

import * as React from "react";

import { cssEasing, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { imageTrailStyles, imageTrailVariants, type ImageTrailVariantProps } from "./image-trail.styles";

export { imageTrailVariants, type ImageTrailVariantProps } from "./image-trail.styles";

export interface ImageTrailProps extends React.HTMLAttributes<HTMLDivElement>, ImageTrailVariantProps {
	/** The pictures dropped in turn. Decorative: they are hidden from screen readers. */
	images: string[];
	/** Pixels of mouse travel between two pictures. */
	spacing?: number;
	/** At most this many pictures on screen at once. */
	max?: number;
}

/**
 * Over an area, pictures drop behind the mouse as it moves, then fade and shrink away: one every `spacing` pixels, at
 * most `max` at a time, for the village's slow duration times four. At intensity 3 they land turned a little. It stops
 * when the mouse leaves. The pictures are decoration: on a touch screen, with the keyboard, with reduced motion, `final`
 * or at intensity 1 and below, the area shows its content alone.
 */
export function ImageTrail({ images, spacing = 80, max = 6, size, className, children, onPointerMove, onPointerLeave, ...props }: ImageTrailProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const pool = React.useRef<(HTMLImageElement | null)[]>([]);
	const { tokens, allows } = useMotion(ref);
	const [fine, setFine] = React.useState(false);
	const enabled = fine && allows(2) && images.length > 0;
	const last = React.useRef<{ x: number; y: number } | null>(null);
	const drops = React.useRef(0);
	const count = Math.max(1, Math.min(max, 24));

	React.useEffect(() => {
		const query = window.matchMedia("(pointer: fine)");
		const sync = () => setFine(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	React.useEffect(() => () => pool.current.forEach((image) => image?.getAnimations().forEach((animation) => animation.cancel())), []);

	const drop = (x: number, y: number) => {
		const n = drops.current++;
		const image = pool.current[n % count];
		if (!image) return;
		const src = images[n % images.length];
		if (image.getAttribute("src") !== src) image.setAttribute("src", src);
		image.getAnimations().forEach((animation) => animation.cancel());
		image.style.zIndex = String(n % 1000);
		const at = `translate3d(${x - image.offsetWidth / 2}px, ${y - image.offsetHeight / 2}px, 0)`;
		// At intensity 3 each picture lands turned a little, one way or the other.
		const turn = allows(3) ? `rotate(${((n * 37) % 17) - 8}deg)` : "rotate(0deg)";
		image.animate(
			[
				{ opacity: 0, transform: `${at} scale(0.6) ${turn}`, easing: cssEasing(tokens.easeOut) },
				{ opacity: 1, transform: `${at} scale(1) ${turn}`, offset: 0.2 },
				{ opacity: 1, transform: `${at} scale(1) ${turn}`, offset: 0.55, easing: "ease-in" },
				{ opacity: 0, transform: `${at} scale(0.8) ${turn}` },
			],
			{ duration: tokens.slow * 4 * 1000, fill: "forwards" },
		);
	};

	return (
		<div
			ref={ref}
			data-slot="image-trail"
			className={cn(imageTrailVariants({ size }), className)}
			onPointerMove={(event) => {
				onPointerMove?.(event);
				if (!enabled || event.pointerType !== "mouse") return;
				const box = event.currentTarget.getBoundingClientRect();
				const point = { x: event.clientX - box.left, y: event.clientY - box.top };
				if (!last.current) {
					last.current = point;
					return;
				}
				if (Math.hypot(point.x - last.current.x, point.y - last.current.y) < spacing) return;
				last.current = point;
				drop(point.x, point.y);
			}}
			onPointerLeave={(event) => {
				onPointerLeave?.(event);
				last.current = null;
			}}
			{...props}
		>
			{children}
			{enabled && (
				<div aria-hidden="true" data-slot="image-trail-layer" className={imageTrailStyles.layer}>
					{Array.from({ length: count }, (_, i) => (
						<img
							key={i}
							ref={(element) => {
								pool.current[i] = element;
							}}
							src={images[i % images.length]}
							alt=""
							decoding="async"
							className={imageTrailStyles.image}
						/>
					))}
				</div>
			)}
		</div>
	);
}
