"use client";

import * as React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cssEasing, useInViewOnce, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { textRotateStyles } from "./text-rotate.styles";

export type TextRotateTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

export interface TextRotateProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
	/** The words that take turns, in order. The first one is shown before anything moves. */
	words: string[];
	/** The rest of the sentence. */
	children?: string;
	as?: TextRotateTag;
	/** Where the words sit: after the sentence (`end`) or before it (`start`). */
	position?: "start" | "end";
	/** Seconds each word stays. */
	interval?: number;
	/** How many times every word is shown before it stops on the last one. `Infinity` never stops. */
	loops?: number;
	/** The language that joins the words for screen readers ("fast, friendly or yours"). */
	locale?: string;
	/** Fixes the word shown (an index into `words`), for demos and screenshots. */
	index?: number;
}

const visuallyHidden: React.CSSProperties = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0,
};

/** Five seconds: what moves on its own longer than that needs a pause control (WCAG 2.2.2, invariant 21). */
const SHORT = 5;

/**
 * One word in a sentence changes in turn: "Websites that are fast / friendly / yours". The words fade at intensity 1,
 * slide by the village's travel at 2 and roll in like a slot machine at 3, each change timed by the village. It stops on
 * the last word after `loops` passes; when that takes more than five seconds it shows a pause button after the text.
 * Hover and focus pause it. Screen readers read the sentence once, with every word: "Websites that are fast, friendly
 * or yours". With reduced motion, `final` or without JavaScript, the first word stays.
 */
export function TextRotate({
	words,
	children,
	as = "span",
	position = "end",
	interval = 2.5,
	loops = 1,
	locale = "en",
	index: fixed,
	className,
	...props
}: TextRotateProps) {
	const ref = React.useRef<HTMLElement>(null);
	const slot = React.useRef<HTMLSpanElement>(null);
	const { tokens, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const [current, setCurrent] = React.useState(0);
	const [paused, setPaused] = React.useState(false);
	const [held, setHeld] = React.useState(false);
	const shown = fixed ?? current;
	const changes = Number.isFinite(loops) ? Math.max(0, words.length * loops - 1) : Number.POSITIVE_INFINITY;
	const runs = fixed === undefined && allows(1) && words.length > 1;
	const long = changes * interval > SHORT;
	const done = current >= changes;

	// The next word, every `interval` seconds, while in view and not paused or held.
	React.useEffect(() => {
		if (!runs || !inView || paused || held || done) return;
		const timer = window.setTimeout(() => setCurrent((value) => value + 1), interval * 1000);
		return () => window.clearTimeout(timer);
	}, [runs, inView, paused, held, done, current, interval]);

	// The change: the leaving word goes, the coming one arrives, and the slot eases to the new width.
	const previous = React.useRef(shown % words.length);
	React.useEffect(() => {
		const root = slot.current;
		const now = shown % words.length;
		const before = previous.current;
		previous.current = now;
		if (!root) return;
		const spans = [...root.children] as HTMLElement[];
		const coming = spans[now];
		root.style.width = `${coming.offsetWidth}px`;
		if (before === now || !allows(1)) return;
		const leaving = spans[before];
		const timing = { duration: tokens.slow * 1000, easing: cssEasing(tokens.easeOut) };
		const travel = allows(3) ? "100%" : allows(2) ? `${tokens.distance}px` : "0px";
		const animations = [
			leaving.animate([{ visibility: "visible", opacity: 1, translate: "0 0" }, { visibility: "visible", opacity: 0, translate: `0 calc(${travel} * -1)` }], timing),
			coming.animate([{ opacity: 0, translate: `0 ${travel}` }, { opacity: 1, translate: "0 0" }], timing),
			root.animate([{ width: `${leaving.offsetWidth}px` }, { width: `${coming.offsetWidth}px` }], timing),
		];
		return () => {
			for (const animation of animations) animation.cancel();
		};
	}, [shown, words.length, allows, tokens]);

	const sentence = React.useMemo(() => {
		// Intl.ListFormat is in every current browser, but not in every project's TypeScript library (ES2021).
		const { ListFormat } = Intl as unknown as { ListFormat: new (locale: string, options: { type: "disjunction" }) => { format: (items: string[]) => string } };
		const list = new ListFormat(locale, { type: "disjunction" }).format(words);
		const rest = children?.trim();
		if (!rest) return list;
		return position === "end" ? `${rest} ${list}` : `${list} ${rest}`;
	}, [children, words, locale, position]);

	const Tag = as as React.ElementType;
	const slotNode = (
		<span ref={slot} data-slot="text-rotate-words" className={textRotateStyles.slot}>
			{words.map((word, i) => (
				<span key={`${word}-${i}`} data-current={i === shown % words.length || undefined} className={textRotateStyles.word}>
					{word}
				</span>
			))}
		</span>
	);

	return (
		<>
			<Tag
				ref={ref}
				data-slot="text-rotate"
				className={cn(className)}
				onPointerEnter={() => setHeld(true)}
				onPointerLeave={() => setHeld(false)}
				onFocus={() => setHeld(true)}
				onBlur={() => setHeld(false)}
				{...props}
			>
				<span style={visuallyHidden}>{sentence}</span>
				<span aria-hidden="true">
					{position === "start" ? (
						<>
							{slotNode} {children}
						</>
					) : (
						<>
							{children} {slotNode}
						</>
					)}
				</span>
			</Tag>
			{runs && long && !done && (
				<Button variant="ghost" size="icon-sm" className={textRotateStyles.pause} aria-pressed={paused} aria-label="Pause the changing words" onClick={() => setPaused((value) => !value)}>
					{paused ? <PlayIcon /> : <PauseIcon />}
				</Button>
			)}
		</>
	);
}
