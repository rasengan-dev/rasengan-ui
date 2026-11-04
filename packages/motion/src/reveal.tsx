import { useEffect, useRef, type ElementType, type HTMLAttributes, type RefObject } from "react";
import { animate, useInView } from "motion/react";
import { useMotionSettings } from "./context";

export type RevealTag =
	| "div" | "section" | "article" | "header" | "footer" | "figure"
	| "p" | "span" | "h1" | "h2" | "h3" | "h4" | "ul" | "ol" | "li" | "a";

export type RevealFrom = "up" | "down" | "left" | "right" | "none";

export interface RevealOptions {
	from?: RevealFrom;
	/** Seconds. */
	delay?: number;
	/** Pixels; defaults to the revealDistance token. */
	distance?: number;
	/** Reveal now instead of when the element enters the viewport (used by Stagger). */
	trigger?: boolean;
}

/** Marks an element revealed (CSS stops hiding it) and fades it in once. Shared by Reveal and Stagger.Item. */
export function useReveal(ref: RefObject<HTMLElement | null>, { from = "up", delay = 0, distance, trigger }: RevealOptions) {
	const { mode, intensity, tokens } = useMotionSettings();
	const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
	const active = trigger ?? inView;
	const done = useRef(false);

	useEffect(() => {
		const element = ref.current;
		if (!element || done.current || mode === "pending") return;

		if (mode !== "ready" || intensity === 0) {
			done.current = true;
			element.setAttribute("data-revealed", "");
			return;
		}
		if (!active) return;

		done.current = true;
		element.setAttribute("data-revealed", "");
		// Subtle intensity fades in place; travel starts at intensity 2.
		const offset = intensity >= 2 ? (distance ?? tokens.revealDistance) : 0;
		const travel =
			from === "up" ? { y: [offset, 0] }
			: from === "down" ? { y: [-offset, 0] }
			: from === "left" ? { x: [offset, 0] }
			: from === "right" ? { x: [-offset, 0] }
			: {};
		const controls = animate(
			element,
			{ opacity: [0, 1], ...travel },
			{ duration: tokens.durations.base, delay, ease: tokens.easeOut },
		);
		return () => controls.stop();
	}, [active, mode, intensity, from, delay, distance, tokens, ref]);
}

export interface RevealProps extends HTMLAttributes<HTMLElement>, Omit<RevealOptions, "trigger"> {
	as?: RevealTag;
	href?: string;
}

/** Fades and travels in once, when it enters the viewport. */
export function Reveal({ as = "div", from, delay, distance, ...rest }: RevealProps) {
	const ref = useRef<HTMLElement>(null);
	useReveal(ref, { from, delay, distance });
	const Tag = as as ElementType;
	return <Tag ref={ref} data-reveal="" {...rest} />;
}
