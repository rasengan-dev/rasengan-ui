"use client";

import * as React from "react";

import { useInViewOnce, useMotion } from "@/lib/motion";
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

function Digit({ digit, order, phase }: { digit: number; order: number; phase: Phase }) {
	const position = phase === "armed" ? 0 : digit;
	return (
		<span data-slot="number-roll-digit" className={numberRollStyles.digit}>
			<span className={numberRollStyles.placeholder}>{digit}</span>
			<span
				className={numberRollStyles.column}
				style={{
					transform: `translateY(${-position * 10}%)`,
					transition: phase === "live" ? `transform var(--motion-slow) var(--motion-ease-out) calc(${order} * var(--motion-stagger))` : "none",
				}}
			>
				{DIGITS.map((d) => (
					<span key={d}>{d}</span>
				))}
			</span>
		</span>
	);
}

/**
 * A number whose digits roll to their value: counters, prices, live stats. Formatted with `Intl.NumberFormat`, so
 * currencies, percentages and compact notation work in every locale. Screen readers read the formatted value.
 */
export function NumberRoll({ value, format, locale, trigger = "view", live = "off", className, ...props }: NumberRollProps) {
	const ref = React.useRef<HTMLSpanElement>(null);
	const { mode, measured, allows } = useMotion(ref);
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
	const parts = formatter.formatToParts(value);
	// Integer digits are keyed from the right and fraction digits from the left, so a column keeps its place value
	// (and rolls) when the number grows or a group separator appears.
	const integers = parts.filter((part) => part.type === "integer").reduce((n, part) => n + part.value.length, 0);
	let integer = 0;
	let fraction = 0;
	let order = 0;

	return (
		<span ref={ref} data-slot="number-roll" data-reveal="" className={cn(numberRollStyles.root, className)} {...props}>
			<span className="sr-only" aria-live={live === "polite" ? "polite" : undefined}>
				{formatter.format(value)}
			</span>
			<span aria-hidden="true" className={numberRollStyles.root}>
				{parts.flatMap((part, p) => {
					if (part.type !== "integer" && part.type !== "fraction") {
						return (
							<span key={`${part.type}-${p}`} className={numberRollStyles.part}>
								{part.value}
							</span>
						);
					}
					return [...part.value].map((char, i) => {
						const key = part.type === "integer" ? `i${integers - integer++}` : `f${fraction++}`;
						// Digits outside 0-9 (another numbering system) are written as they are.
						if (!/[0-9]/.test(char)) return <span key={`${key}-${i}`}>{char}</span>;
						return <Digit key={key} digit={Number(char)} order={order++} phase={phase} />;
					});
				})}
			</span>
		</span>
	);
}
