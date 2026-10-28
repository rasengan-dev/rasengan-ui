import { useEffect, useRef, type ElementType, type HTMLAttributes, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GsapSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { shouldAnimate, useMotionSettings } from "./context";
import type { MotionIntensity, MotionTokens } from "./tokens";
import type { RevealTag } from "./reveal";

let registered = false;

/** Registers the plugins once, in the browser only. */
export function registerGsap() {
	if (registered || typeof window === "undefined") return;
	gsap.registerPlugin(ScrollTrigger, GsapSplitText, useGSAP);
	registered = true;
}

export interface ScrollTimelineContext {
	gsap: typeof gsap;
	tokens: MotionTokens;
	intensity: MotionIntensity;
}

/**
 * The escape hatch for GSAP in a block: runs `build` inside useGSAP, scoped to
 * `scope`, only when motion is allowed (mode "ready", intensity ≥ min, no
 * reduced-motion preference), and reverts everything on unmount or change.
 * `build` may return a cleanup function.
 */
export function useScrollTimeline(
	scope: RefObject<HTMLElement | null>,
	build: (context: ScrollTimelineContext) => void | (() => void),
	{ minIntensity = 1, dependencies = [] }: { minIntensity?: MotionIntensity; dependencies?: unknown[] } = {},
) {
	const settings = useMotionSettings();
	const enabled = shouldAnimate(settings, minIntensity);

	useGSAP(
		() => {
			if (!enabled) return;
			registerGsap();
			const media = gsap.matchMedia();
			media.add("(prefers-reduced-motion: no-preference)", () =>
				build({ gsap, tokens: settings.tokens, intensity: settings.intensity }),
			);
			return () => media.revert();
		},
		{ scope, dependencies: [enabled, settings.intensity, settings.tokens, ...dependencies], revertOnUpdate: true },
	);

	return enabled;
}

/**
 * Shows `scope` and every [data-reveal] inside it when no animation will run
 * ("final" and "off" modes, or intensity below `minIntensity`). Blocks that
 * reveal their own elements with GSAP call it next to useScrollTimeline.
 */
export function useRevealWhenStatic(scope: RefObject<HTMLElement | null>, minIntensity: MotionIntensity) {
	const settings = useMotionSettings();
	useEffect(() => {
		const element = scope.current;
		if (!element || settings.mode === "pending" || shouldAnimate(settings, minIntensity)) return;
		element.setAttribute("data-revealed", "");
		element.querySelectorAll("[data-reveal]").forEach((child) => child.setAttribute("data-revealed", ""));
	}, [settings, minIntensity, scope]);
}

export interface SplitTextProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
	as?: RevealTag;
	children: string;
	/** Unit that animates. "lines" re-splits on resize. */
	by?: "words" | "lines" | "chars";
	/** Slide each unit up out of a clipping mask (default) instead of fading it. */
	mask?: boolean;
	/** Seconds. */
	delay?: number;
}

/**
 * Splits text with GSAP SplitText and reveals it when it enters the viewport.
 * The full sentence stays one accessible string (SplitText `aria: "auto"`).
 * Rich intensity (2); below that the text is shown as is.
 */
export function SplitText({ as = "h2", children, by = "words", mask = true, delay = 0, ...rest }: SplitTextProps) {
	const ref = useRef<HTMLElement>(null);
	useRevealWhenStatic(ref, 2);

	useScrollTimeline(
		ref,
		({ gsap, tokens }) => {
			const element = ref.current;
			if (!element) return;
			const split = GsapSplitText.create(element, {
				type: by === "chars" ? "words,chars" : by,
				mask: mask ? by : undefined,
				aria: "auto",
				autoSplit: by === "lines",
				onSplit(self) {
					element.setAttribute("data-revealed", "");
					const targets = by === "chars" ? self.chars : by === "lines" ? self.lines : self.words;
					return gsap.from(targets, {
						...(mask ? { yPercent: 110 } : { y: tokens.revealDistance, opacity: 0 }),
						duration: tokens.durations.slow,
						ease: tokens.gsapEaseOut,
						stagger: by === "chars" ? 0.02 : tokens.stagger,
						delay,
						scrollTrigger: { trigger: element, start: "top 85%", once: true },
					});
				},
			});
			return () => split.revert();
		},
		{ minIntensity: 2, dependencies: [children, by, mask, delay] },
	);

	const Tag = as as ElementType;
	return (
		<Tag ref={ref} data-reveal="" {...rest}>
			{children}
		</Tag>
	);
}

export interface ScrollSceneProps extends HTMLAttributes<HTMLElement> {
	as?: RevealTag;
	/** Keep the scene on screen while its timeline plays. At most one pinned scene per page. */
	pin?: boolean;
	/** Tie progress to the scrollbar (true, or seconds of smoothing). */
	scrub?: boolean | number;
	/** ScrollTrigger positions. Defaults: "top top" → "+=150%" when pinned, "top 80%" → "bottom 20%" otherwise. */
	start?: string;
	end?: string;
	/**
	 * Adds tweens to the scene's timeline. Write the static layout so that it
	 * reads well without this (reduced motion, "final" screenshots).
	 */
	build: (timeline: gsap.core.Timeline, scene: HTMLElement, context: ScrollTimelineContext) => void;
}

/** A scroll-driven GSAP timeline, optionally pinned: the base of scrollytelling blocks. Rich intensity (2). */
export function ScrollScene({ as = "section", pin = false, scrub = true, start, end, build, ...rest }: ScrollSceneProps) {
	const ref = useRef<HTMLElement>(null);

	useScrollTimeline(
		ref,
		(context) => {
			const scene = ref.current;
			if (!scene) return;
			const timeline = context.gsap.timeline({
				defaults: { ease: "none" },
				scrollTrigger: {
					trigger: scene,
					pin,
					scrub: scrub === true ? 1 : scrub,
					start: start ?? (pin ? "top top" : "top 80%"),
					end: end ?? (pin ? "+=150%" : "bottom 20%"),
					anticipatePin: pin ? 1 : 0,
				},
			});
			build(timeline, scene, context);
		},
		{ minIntensity: 2, dependencies: [pin, scrub, start, end] },
	);

	const Tag = as as ElementType;
	return <Tag ref={ref} {...rest} />;
}

export interface TextScrubProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
	as?: RevealTag;
	children: string;
	/** Opacity of words not reached yet. */
	dimmed?: number;
}

/** Words light up one by one as the reader scrolls through the paragraph. Rich intensity (2). */
export function TextScrub({ as = "p", children, dimmed = 0.15, ...rest }: TextScrubProps) {
	const ref = useRef<HTMLElement>(null);

	useScrollTimeline(
		ref,
		({ gsap }) => {
			const element = ref.current;
			if (!element) return;
			const split = GsapSplitText.create(element, { type: "words", aria: "auto" });
			gsap.fromTo(
				split.words,
				{ opacity: dimmed },
				{ opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 45%", scrub: true } },
			);
			return () => split.revert();
		},
		{ minIntensity: 2, dependencies: [children, dimmed] },
	);

	const Tag = as as ElementType;
	return (
		<Tag ref={ref} {...rest}>
			{children}
		</Tag>
	);
}

export { gsap, ScrollTrigger };
