import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { animate, useInView } from "motion/react";
import { shouldAnimate, useMotionSettings } from "./context";

const visuallyHidden: CSSProperties = {
	position: "absolute",
	width: 1,
	height: 1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
};

export interface CounterProps {
	value: number;
	from?: number;
	decimals?: number;
	/** "compact" renders 12000 as 12K. */
	format?: "standard" | "compact";
	locale?: string;
	prefix?: string;
	suffix?: string;
	className?: string;
}

/**
 * Counts up to `value` when it enters the viewport. The server render and
 * non-animated modes show the final value; screen readers always get it.
 */
export function Counter({ value, from = 0, decimals = 0, format = "standard", locale, prefix = "", suffix = "", className }: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const settings = useMotionSettings();
	const inView = useInView(ref, { once: true });
	const formatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				notation: format === "compact" ? "compact" : "standard",
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			}),
		[locale, format, decimals],
	);
	const final = formatter.format(value);

	useEffect(() => {
		const element = ref.current;
		if (!element || settings.mode === "pending") return;
		if (!shouldAnimate(settings, 1)) {
			element.textContent = final;
			return;
		}
		if (!inView) {
			element.textContent = formatter.format(from);
			return;
		}
		const controls = animate(from, value, {
			duration: settings.tokens.durations.slow * 1.6,
			ease: settings.tokens.easeOut,
			onUpdate: (latest) => {
				element.textContent = formatter.format(latest);
			},
		});
		return () => controls.stop();
	}, [inView, settings, value, from, formatter, final]);

	return (
		<span className={className}>
			<span aria-hidden="true">
				{prefix}
				<span ref={ref}>{final}</span>
				{suffix}
			</span>
			<span style={visuallyHidden}>{`${prefix}${final}${suffix}`}</span>
		</span>
	);
}
