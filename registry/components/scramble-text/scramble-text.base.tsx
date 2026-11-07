"use client";

import * as React from "react";

import { useInViewOnce, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { scrambleTextStyles } from "./scramble-text.styles";

export type ScrambleTextTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";

export interface ScrambleTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
	/** The text to decode to. Changing it scrambles from the old text to the new one. */
	text: string;
	as?: ScrambleTextTag;
	/** `view` decodes when the text enters the viewport, `mount` at once, `hover` each time it is pointed at or focused. */
	trigger?: "view" | "mount" | "hover";
	/** Seconds to decode the whole text; by default it follows the text's length and the village's pace. */
	duration?: number;
	/** The glyphs drawn while scrambling. */
	glyphs?: string;
}

const defaultGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
/* New glyphs about 20 times a second: fast enough to read as noise, far from a flash (WCAG 2.3.1 is about luminance). */
const GLYPH_MS = 50;

type Cell = { char: string; scrambling: boolean };

/**
 * Text that decodes itself from random glyphs, letter after letter, on view, on hover, or when it changes. Screen
 * readers read the final text once; with motion off, or at intensity 0, it is simply there.
 */
export function ScrambleText({ text, as = "span", trigger = "view", duration, glyphs = defaultGlyphs, className, onPointerEnter, onFocus, ...props }: ScrambleTextProps) {
	const ref = React.useRef<HTMLElement>(null);
	const { mode, tokens, measured, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const [cells, setCells] = React.useState<Cell[] | null>(null);
	const [run, setRun] = React.useState(0);
	const animated = allows(1);
	const started = trigger === "hover" || trigger === "mount" || inView;

	React.useEffect(() => {
		const root = ref.current;
		if (!root || mode === "pending" || !measured) return;
		const reveal = () => root.setAttribute("data-revealed", "");
		if (!animated) {
			reveal();
			setCells(null);
			return;
		}
		if (trigger === "hover") {
			// Shown as it is until the first pointer or focus.
			reveal();
			if (run === 0) return;
		} else if (!started) return;
		reveal();

		// The village's pace: the default duration scales with its base duration (Konoha's 200ms = 1).
		const total = (duration ?? Math.min(1.6, 0.5 + text.length * 0.03) * (tokens.base / 0.2)) * 1000;
		const resolveAt = [...text].map((_, i, all) => (i / Math.max(1, all.length)) * total * 0.75 + Math.random() * total * 0.25);
		const pick = (target: string) => {
			const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
			return target === target.toLowerCase() ? glyph.toLowerCase() : glyph;
		};
		const start = performance.now();
		let last = -GLYPH_MS;
		let frame = 0;
		const step = (now: number) => {
			const elapsed = now - start;
			if (elapsed >= total) {
				setCells(null);
				return;
			}
			if (elapsed - last >= GLYPH_MS) {
				last = elapsed;
				setCells([...text].map((char, i) => (char.trim() === "" || elapsed >= resolveAt[i] ? { char, scrambling: false } : { char: pick(char), scrambling: true })));
			}
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [text, run, started, trigger, mode, measured, animated, tokens.base, duration, glyphs]);

	const replay = () => {
		if (trigger === "hover") setRun((n) => n + 1);
	};
	const Tag = as as React.ElementType;

	return (
		<Tag
			ref={ref}
			data-slot="scramble-text"
			data-reveal=""
			className={cn(scrambleTextStyles.root, className)}
			onPointerEnter={(event: React.PointerEvent<HTMLElement>) => {
				replay();
				onPointerEnter?.(event);
			}}
			onFocus={(event: React.FocusEvent<HTMLElement>) => {
				replay();
				onFocus?.(event);
			}}
			{...props}
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true">
				{cells
					? cells.map((cell, i) =>
							cell.scrambling ? (
								<span key={i} className={scrambleTextStyles.glyph}>
									{cell.char}
								</span>
							) : (
								cell.char
							),
						)
					: text}
			</span>
		</Tag>
	);
}
