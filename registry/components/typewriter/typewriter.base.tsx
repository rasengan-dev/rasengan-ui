"use client";

import * as React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useInViewOnce, useMotion } from "@/lib/motion";
import { typewriterStyles } from "./typewriter.styles";

export type TypewriterTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";

export interface TypewriterProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
	/** One string, or several typed one after another (each deleted before the next). */
	text: string | readonly string[];
	as?: TypewriterTag;
	/** Characters per second, on average. */
	speed?: number;
	/** Seconds a finished string stays before it is deleted. */
	hold?: number;
	/** Start again after the last string. A looping typewriter shows a pause button (WCAG 2.2.2). */
	loop?: boolean;
	caret?: boolean;
	/** `view` waits until the text enters the viewport; `mount` starts at once. */
	trigger?: "view" | "mount";
	/** Seconds before the first character. */
	delay?: number;
	/** What screen readers read; every string, joined, by default. */
	label?: string;
}

/** A small seeded random, so the rhythm is the same on every visit (and in screenshots). */
function random(seed: string) {
	let state = [...seed].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 2654435761), 1779033703) >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Milliseconds to wait after typing `char`: a jittered beat, longer after punctuation and between words. */
function beat(char: string, speed: number, next: () => number) {
	const base = (1000 / speed) * (0.55 + next() * 0.9);
	if (/[.!?…]/.test(char)) return base * 9;
	if (/[,;:—]/.test(char)) return base * 5;
	if (char === " ") return base * 1.4;
	return base;
}

/**
 * Text typed with a natural rhythm: a little irregular, pausing after commas and full stops, then (with several
 * strings) deleted and replaced. The line keeps its final size from the start. Screen readers read the text once;
 * with motion off, or at intensity 0, the last string (the first, when it loops) is simply there.
 */
export function Typewriter({
	text,
	as = "span",
	speed = 16,
	hold = 1.6,
	loop = false,
	caret = true,
	trigger = "view",
	delay = 0,
	label,
	className,
	...props
}: TypewriterProps) {
	const strings = React.useMemo(() => (typeof text === "string" ? [text] : [...text]), [text]);
	const ref = React.useRef<HTMLElement>(null);
	const caretRef = React.useRef<HTMLSpanElement>(null);
	const { mode, measured, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const active = trigger === "mount" || inView;
	const animated = allows(1);
	const resting = loop ? strings[0] : strings[strings.length - 1];

	const [shown, setShown] = React.useState<string | null>(null);
	const [typing, setTyping] = React.useState(false);
	const [paused, setPaused] = React.useState(false);
	const [hovered, setHovered] = React.useState(false);
	const halted = paused || hovered;
	const haltedRef = React.useRef(halted);
	haltedRef.current = halted;

	React.useEffect(() => {
		const root = ref.current;
		if (!root || mode === "pending" || !measured) return;
		if (!animated) {
			root.setAttribute("data-revealed", "");
			setShown(null);
			return;
		}
		if (!active) return;
		root.setAttribute("data-revealed", "");

		const next = random(strings.join("\n"));
		let timer = 0;
		let cancelled = false;
		const wait = (ms: number) =>
			new Promise<void>((resolve) => {
				const tick = () => {
					if (cancelled) return;
					// Paused (button, hover or focus): try again shortly, without losing the place.
					if (haltedRef.current) timer = window.setTimeout(tick, 120);
					else resolve();
				};
				timer = window.setTimeout(tick, ms);
			});

		(async () => {
			setShown("");
			await wait(delay * 1000);
			for (let round = 0; !cancelled; round++) {
				for (let s = 0; s < strings.length && !cancelled; s++) {
					const string = strings[s];
					setTyping(true);
					for (let i = 1; i <= string.length && !cancelled; i++) {
						setShown(string.slice(0, i));
						await wait(beat(string[i - 1], speed, next));
					}
					setTyping(false);
					const last = s === strings.length - 1;
					if (last && !loop) return;
					await wait(hold * 1000);
					setTyping(true);
					for (let i = string.length - 1; i >= 0 && !cancelled; i--) {
						setShown(string.slice(0, i));
						await wait(1000 / (speed * 2.5));
					}
					setTyping(false);
					await wait(250);
				}
			}
		})();
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [active, mode, measured, animated, strings, speed, hold, loop, delay]);

	// The caret blinks only while waiting, and stops after a few blinks once the text is done.
	React.useEffect(() => {
		const element = caretRef.current;
		if (!element || typing || shown === null) return;
		const done = !loop && shown === strings[strings.length - 1];
		const blink = element.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 530,
			easing: "steps(1, end)",
			direction: "alternate",
			iterations: done ? 6 : Number.POSITIVE_INFINITY,
			fill: "forwards",
		});
		return () => blink.cancel();
	}, [typing, shown, loop, strings]);

	const Tag = as as React.ElementType;
	const longest = strings.reduce((a, b) => (b.length > a.length ? b : a), "");
	const typed = shown ?? resting;

	return (
		<Tag
			ref={ref}
			data-slot="typewriter"
			data-reveal=""
			className={className}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			{...props}
		>
			<span className="sr-only">{label ?? strings.join(", ")}</span>
			<span aria-hidden="true" className={typewriterStyles.root}>
				<span className={typewriterStyles.ghost}>{longest}</span>
				<span className={typewriterStyles.typed}>
					{typed}
					{caret && animated && shown !== null && <span ref={caretRef} data-slot="typewriter-caret" className={typewriterStyles.caret} />}
				</span>
			</span>
			{loop && animated && shown !== null && (
				<Button
					variant="ghost"
					size="icon-sm"
					className={typewriterStyles.pause}
					aria-pressed={paused}
					aria-label="Pause typing"
					onClick={() => setPaused((value) => !value)}
				>
					{paused ? <PlayIcon /> : <PauseIcon />}
				</Button>
			)}
		</Tag>
	);
}
