"use client";

import * as React from "react";

import { cssEasing, useInViewOnce, useMotion, type MotionTokens } from "@/lib/motion";
import { SplitText, type SplitBy, type SplitTag } from "@/lib/split-text";
import { cn } from "@/lib/utils";
import { textRevealStyles } from "./text-reveal.styles";

export type TextRevealEffect = "rise" | "fade" | "blur" | "mask";

export interface TextRevealProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
	/** The text to reveal: a string, so it can be split. */
	children: string;
	as?: SplitTag;
	/** The pieces that appear one after another. */
	by?: SplitBy;
	/** How each piece appears. */
	effect?: TextRevealEffect;
	/** `view` waits until the text enters the viewport; `mount` starts at once. */
	trigger?: "view" | "mount";
	/** Seconds before the first piece. */
	delay?: number;
	/** Seconds between pieces; the village's `--motion-stagger` by default (halved for characters). */
	stagger?: number;
}

/** The keyframes of one piece, from hidden to shown. Travel is the village's distance, shorter for small pieces. */
function keyframes(effect: TextRevealEffect, by: SplitBy, tokens: MotionTokens): Keyframe[] {
	const travel = Math.round(tokens.distance * (by === "chars" ? 0.4 : by === "words" ? 0.6 : 1));
	switch (effect) {
		case "fade":
			return [{ opacity: 0 }, { opacity: 1 }];
		case "blur":
			return [
				{ opacity: 0, filter: "blur(8px)", transform: `translateY(${Math.round(travel / 3)}px)` },
				{ opacity: 1, filter: "blur(0)", transform: "none" },
			];
		case "mask":
			return [
				{ clipPath: "inset(0 0 100% 0)", transform: "translateY(0.35em)" },
				{ clipPath: "inset(0 0 0 0)", transform: "none" },
			];
		default:
			return [
				{ opacity: 0, transform: `translateY(${travel}px)` },
				{ opacity: 1, transform: "none" },
			];
	}
}

/**
 * A heading or a paragraph that appears piece by piece: words, characters or lines, rising, fading, unblurring or
 * unmasking, timed by the village. Screen readers read the whole text once. With motion off, or in a village whose
 * intensity is 1, the text simply fades in or is there.
 */
export function TextReveal({ children, as = "p", by = "words", effect = "rise", trigger = "view", delay = 0, stagger, className, ...props }: TextRevealProps) {
	const ref = React.useRef<HTMLElement>(null);
	const { mode, tokens, measured, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const active = trigger === "mount" || inView;

	React.useEffect(() => {
		const root = ref.current;
		if (!root || mode === "pending" || !measured || root.hasAttribute("data-revealed")) return;
		if (!allows(1)) {
			root.setAttribute("data-revealed", "");
			return;
		}
		if (!active) return;

		const animations: Animation[] = [];
		// Lines are measured by split-text before the first paint; a frame later they are there.
		const frame = requestAnimationFrame(() => {
			root.setAttribute("data-revealed", "");
			const timing = { duration: tokens.slow * 1000, easing: cssEasing(tokens.easeOut), fill: "backwards" as const };
			// Intensity 1: the whole text fades in place.
			if (!allows(2)) {
				animations.push(root.animate([{ opacity: 0 }, { opacity: 1 }], { ...timing, delay: delay * 1000 }));
				return;
			}
			const pieces = [...root.querySelectorAll<HTMLElement>(by === "chars" ? '[data-split="char"]' : '[data-split="word"]')];
			const gap = stagger ?? (by === "chars" ? tokens.stagger / 2 : by === "lines" ? tokens.stagger * 2 : tokens.stagger);
			const frames = keyframes(effect, by, tokens);
			pieces.forEach((piece, index) => {
				// By lines: the words of a line move together, one line after another.
				const step = by === "lines" ? Number(piece.dataset.line ?? 0) : index;
				animations.push(piece.animate(frames, { ...timing, delay: (delay + step * gap) * 1000 }));
			});
		});
		return () => {
			cancelAnimationFrame(frame);
			for (const animation of animations) animation.cancel();
		};
	}, [active, mode, measured, allows, tokens, by, effect, delay, stagger]);

	return (
		<SplitText ref={ref} as={as} by={by} data-slot="text-reveal" data-reveal="" className={cn(textRevealStyles.root, className)} {...props}>
			{children}
		</SplitText>
	);
}
