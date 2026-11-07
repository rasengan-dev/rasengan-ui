"use client";

import * as React from "react";

import { cssEasing, useInViewOnce, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { numberRollStyles } from "./number-roll.styles";

export interface NumberRollProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
	value: number;
	/** How to write the number: currency, percent, compact, units, decimals… (`Intl.NumberFormat` options). */
	format?: Intl.NumberFormatOptions;
	/** A BCP 47 locale; the browser's by default. */
	locale?: string;
	/** `view` rolls in when the number enters the viewport, `mount` at once. Later changes always roll. */
	trigger?: "view" | "mount";
	/** Announce changes to screen readers (live stats). */
	live?: "off" | "polite";
}

/**
 * - `static`: no motion (server render, motion off, intensity 0): the digits are simply there.
 * - `armed`: waiting to come into view, hidden, every column at 0.
 * - `live`: columns slide to their digits, now and on every change.
 */
type Phase = "static" | "armed" | "live";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** One piece of the formatted number: a digit column, or a part (separator, sign, currency, unit). */
type Token = { key: string; digit?: number; text?: string };
/** A token as rendered: entering ones grow in, leaving ones are kept until they have shrunk out. */
type Rendered = Token & { state: "stay" | "enter" | "leave" };

/**
 * Splits the formatted value into tokens with keys that keep their meaning when the number changes: integer digits
 * by their place from the right, fraction digits from the left, group separators by the digits to their right, other
 * parts by their type and occurrence. A column then rolls when its digit changes, and only places that appear or go
 * away grow in or shrink out.
 */
function tokenize(formatter: Intl.NumberFormat, value: number): Token[] {
	const parts = formatter.formatToParts(value);
	let integers = parts.filter((part) => part.type === "integer").reduce((n, part) => n + part.value.length, 0);
	let fraction = 0;
	const seen: Record<string, number> = {};
	const tokens: Token[] = [];
	for (const part of parts) {
		if (part.type === "integer" || part.type === "fraction") {
			for (const char of part.value) {
				const key = part.type === "integer" ? `i${integers--}` : `f${fraction++}`;
				// Digits outside 0-9 (another numbering system) are written as they are.
				tokens.push(/[0-9]/.test(char) ? { key, digit: Number(char) } : { key, text: char });
			}
		} else if (part.type === "group") tokens.push({ key: `g${integers}`, text: part.value });
		else {
			const n = (seen[part.type] = (seen[part.type] ?? -1) + 1);
			tokens.push({ key: `${part.type}${n}`, text: part.value });
		}
	}
	return tokens;
}

/** The new tokens, with the tokens that went away kept in their place (before the next one that stays). */
function merge(previous: Rendered[], next: Token[]): Rendered[] {
	const before = new Set(previous.map((t) => t.key));
	const after = new Set(next.map((t) => t.key));
	const out: Rendered[] = [];
	let n = 0;
	for (const token of previous) {
		if (after.has(token.key)) {
			while (n < next.length) {
				const item = next[n++];
				out.push({ ...item, state: before.has(item.key) ? "stay" : "enter" });
				if (item.key === token.key) break;
			}
		} else out.push({ ...token, state: "leave" });
	}
	while (n < next.length) {
		const item = next[n++];
		out.push({ ...item, state: before.has(item.key) ? "stay" : "enter" });
	}
	return out;
}

function Digit({ digit, order, phase, entering }: { digit: number; order: number; phase: Phase; entering: boolean }) {
	// A new place starts at 0 and rolls to its digit while it grows in.
	const [fresh, setFresh] = React.useState(entering && phase === "live");
	React.useEffect(() => {
		if (!fresh) return;
		const frame = requestAnimationFrame(() => setFresh(false));
		return () => cancelAnimationFrame(frame);
	}, [fresh]);
	const position = phase === "armed" || fresh ? 0 : digit;
	return (
		<>
			<span className={numberRollStyles.placeholder}>{digit}</span>
			<span
				className={numberRollStyles.column}
				style={{
					transform: `translateY(${-position * 10}%)`,
					transition: phase === "live" && !fresh ? `transform var(--motion-slow) var(--motion-ease-out) calc(${order} * var(--motion-stagger))` : "none",
				}}
			>
				{DIGITS.map((d) => (
					<span key={d}>{d}</span>
				))}
			</span>
		</>
	);
}

/**
 * A number whose digits roll to their value: counters, prices, live stats. Formatted with `Intl.NumberFormat`, so
 * currencies, percentages and compact notation work in every locale. Screen readers read the formatted value.
 */
export function NumberRoll({ value, format, locale, trigger = "view", live = "off", className, ...props }: NumberRollProps) {
	const ref = React.useRef<HTMLSpanElement>(null);
	const { mode, measured, allows, tokens: motion } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const active = trigger === "mount" || inView;
	const animated = allows(1);
	const [phase, setPhase] = React.useState<Phase>("static");

	React.useEffect(() => {
		const root = ref.current;
		if (!root || mode === "pending" || !measured) return;
		if (!animated) {
			root.setAttribute("data-revealed", "");
			setPhase("static");
			return;
		}
		if (!active) {
			setPhase((current) => (current === "live" ? current : "armed"));
			return;
		}
		root.setAttribute("data-revealed", "");
		// One painted frame at 0, then the columns slide.
		let second = 0;
		const first = requestAnimationFrame(() => {
			second = requestAnimationFrame(() => setPhase("live"));
		});
		return () => {
			cancelAnimationFrame(first);
			cancelAnimationFrame(second);
		};
	}, [mode, measured, animated, active]);

	const formatter = React.useMemo(() => new Intl.NumberFormat(locale, format), [locale, format]);
	const tokens = React.useMemo(() => tokenize(formatter, value), [formatter, value]);
	const [rendered, setRendered] = React.useState<Rendered[]>(() => tokens.map((t) => ({ ...t, state: "stay" })));
	const renderedRef = React.useRef(rendered);
	renderedRef.current = rendered;

	// A new value: keep what went away in place (to shrink it out), mark what is new (to grow it in). Without motion,
	// the new tokens at once. Runs before the paint, so nothing jumps.
	React.useLayoutEffect(() => {
		const current = renderedRef.current.filter((t) => t.state !== "leave");
		const same = current.length === tokens.length && current.every((t, i) => t.key === tokens[i].key && t.digit === tokens[i].digit && t.text === tokens[i].text);
		if (same) return;
		setRendered(phase === "live" ? merge(renderedRef.current, tokens) : tokens.map((t) => ({ ...t, state: "stay" })));
	}, [tokens, phase]);

	// Grow in and shrink out, by width (so the digits around and the text after it slide along) and opacity.
	const nodes = React.useRef(new Map<string, HTMLSpanElement>());
	const running = React.useRef(new Set<Animation>());
	React.useEffect(() => () => running.current.forEach((animation) => animation.cancel()), []);
	React.useLayoutEffect(() => {
		const timing = { duration: motion.slow * 1000, easing: cssEasing(motion.easeOut) };
		const animations = running.current;
		for (const token of rendered) {
			const node = nodes.current.get(token.key);
			// Already growing or shrinking (this effect runs again when the list is updated): leave it be.
			if (!node || token.state === "stay" || node.getAnimations().length > 0) continue;
			const width = `${node.getBoundingClientRect().width}px`;
			const animation =
				token.state === "enter"
					? node.animate([{ width: "0px", opacity: 0 }, { width, opacity: 1 }], timing)
					: node.animate([{ width, opacity: 1 }, { width: "0px", opacity: 0 }], { ...timing, fill: "forwards" });
			animations.add(animation);
			animation.finished.then(
				() => {
					animations.delete(animation);
					// A token that has shrunk out goes away.
					if (token.state === "leave") setRendered((list) => list.filter((t) => t.key !== token.key || t.state !== "leave"));
				},
				() => animations.delete(animation),
			);
		}
		// Entered tokens stay put from now on (their animation carries on).
		if (rendered.some((t) => t.state === "enter")) setRendered((list) => list.map((t) => (t.state === "enter" ? { ...t, state: "stay" } : t)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rendered]);

	let order = 0;
	return (
		<span ref={ref} data-slot="number-roll" data-reveal="" className={cn(numberRollStyles.root, className)} {...props}>
			<span className="sr-only" aria-live={live === "polite" ? "polite" : undefined}>
				{formatter.format(value)}
			</span>
			<span aria-hidden="true" className={numberRollStyles.root}>
				{rendered.map((token) => (
					<span
						key={token.key}
						ref={(node) => {
							if (node) nodes.current.set(token.key, node);
							else nodes.current.delete(token.key);
						}}
						data-slot={token.digit === undefined ? "number-roll-part" : "number-roll-digit"}
						data-state={token.state === "stay" ? undefined : token.state}
						className={token.digit === undefined ? numberRollStyles.part : numberRollStyles.digit}
					>
						{token.digit === undefined ? token.text : <Digit digit={token.digit} order={token.state === "leave" ? 0 : order++} phase={phase} entering={token.state === "enter"} />}
					</span>
				))}
			</span>
		</span>
	);
}
