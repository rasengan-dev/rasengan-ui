"use client";

/*
 * rasengan-motion (RFC-0007, "Foundations"): what every motion component shares. Installed as `@/lib/motion`.
 *
 * - Modes: a head script sets <html data-motion> to "ready", "final" or "off" before the first paint; components
 *   animate only under "ready", and render their end state otherwise.
 * - Tokens: durations, easings, the spring, travel, stagger and intensity come from the CSS custom properties of the
 *   element's village (contract.css, villages/*.css), so a component inside a VillageScope moves like that village.
 * - Primitives: Reveal, Stagger, Presence, Parallax, Tilt, Magnetic; bezierEasing and stepSpring for components that
 *   animate what CSS cannot (a scroll position, a cursor), without Motion.
 * - Scroll progress (RFC-0010, ADR-0019): `useScrollProgress` sets `--scroll-progress` (0 to 1) on an element as the
 *   page scrolls, with CSS scroll timelines where the browser has them and one shared frame loop elsewhere.
 *
 * Put <MotionScript /> in <head> and <MotionProvider> once around the app.
 *
 * Weight: Reveal, Stagger, Parallax and the scroll progress use the browser's own APIs and cost nothing from Motion.
 * Presence, Tilt and Magnetic use Motion's `m` components, whose DOM features load on demand from
 * `@/lib/motion-features`.
 */

import * as React from "react";
import { AnimatePresence, LazyMotion, m, useMotionValue, useSpring } from "motion/react";

/** Motion's DOM features, in their own chunk: fetched the first time a component that needs them renders. */
const loadFeatures = () => import("@/lib/motion-features").then((module) => module.default);

/** Gives `m` components their features; nested ones share what is already loaded. */
function Features({ children }: { children: React.ReactNode }) {
	return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}

// ---- Modes -----------------------------------------------------------------------------------------------------

/**
 * - `pending`: before the page state is read (server render, first paint).
 * - `ready`: animate.
 * - `final`: every animation in its end state (screenshots, visual tests, agents).
 * - `off`: no motion (reduced motion, or `?motion=off`).
 */
export type MotionMode = "pending" | "ready" | "final" | "off";

/**
 * Runs before first paint (put it in <head>): decides the page's motion mode and writes it on <html data-motion>.
 * Hidden initial states (contract.css) apply only under "ready", so without JavaScript content stays visible.
 * `?motion=final|off` forces a mode.
 */
export const motionScript = `(function(){try{var d=document.documentElement,p=new URLSearchParams(location.search).get("motion"),m=p||d.getAttribute("data-motion");if(m==="final"||m==="off"){d.setAttribute("data-motion",m);return}if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","off");return}d.setAttribute("data-motion","ready")}catch(e){}})();`;

export function MotionScript({ nonce }: { nonce?: string }) {
	return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: motionScript }} />;
}

/** The mode the head script chose, or the same decision taken now if the script is absent. */
export function readMotionMode(): Exclude<MotionMode, "pending"> {
	const root = document.documentElement;
	const current = root.getAttribute("data-motion");
	if (current === "ready" || current === "final" || current === "off") return current;
	const forced = new URLSearchParams(window.location.search).get("motion");
	const mode = forced === "final" || forced === "off" ? forced : window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "off" : "ready";
	root.setAttribute("data-motion", mode);
	return mode;
}

const ModeContext = React.createContext<Exclude<MotionMode, "pending"> | null>(null);

export interface MotionProviderProps {
	/** Forces a mode for this subtree, e.g. "off" to show what reduced-motion users get. Leave it out to follow the page. */
	mode?: "ready" | "final" | "off";
	children: React.ReactNode;
}

/** Put once around the app (and again to force a mode on part of a page). */
export function MotionProvider({ mode, children }: MotionProviderProps) {
	const [page, setPage] = React.useState<Exclude<MotionMode, "pending"> | null>(null);
	React.useEffect(() => {
		setPage(readMotionMode());
		// Components now own hidden states: turns off the CSS failsafe (contract.css).
		document.documentElement.setAttribute("data-motion-hydrated", "");
	}, []);
	return <ModeContext.Provider value={mode ?? page}>{children}</ModeContext.Provider>;
}

/** The motion mode here: the nearest provider's, or the page's once mounted. `pending` on the server. */
export function useMotionMode(): MotionMode {
	const provided = React.useContext(ModeContext);
	const [page, setPage] = React.useState<MotionMode>("pending");
	React.useEffect(() => {
		if (!provided) setPage(readMotionMode());
	}, [provided]);
	return provided ?? page;
}

// ---- Tokens ----------------------------------------------------------------------------------------------------

export type MotionIntensity = 0 | 1 | 2 | 3;
export type Bezier = [number, number, number, number];

/** The village's motion, in the units Motion takes: seconds, bezier arrays, pixels. */
export interface MotionTokens {
	fast: number;
	base: number;
	slow: number;
	easeOut: Bezier;
	easeInOut: Bezier;
	spring: { stiffness: number; damping: number };
	/** Pixels an element travels when it reveals. */
	distance: number;
	/** Seconds between siblings. */
	stagger: number;
	/** 0 none · 1 fades only · 2 travel, splits · 3 showcase (tilt, magnetic, 3D, overshoot). */
	intensity: MotionIntensity;
}

/** contract.css's defaults (Konoha, `calm`): used on the server and outside any village. */
export const defaultMotionTokens: MotionTokens = {
	fast: 0.12,
	base: 0.2,
	slow: 0.36,
	easeOut: [0.16, 1, 0.3, 1],
	easeInOut: [0.65, 0, 0.35, 1],
	spring: { stiffness: 260, damping: 30 },
	distance: 24,
	stagger: 0.06,
	intensity: 2,
};

const seconds = (value: string, fallback: number) => {
	const match = value.trim().match(/^(-?[\d.]+)(ms|s)$/);
	return match ? Number(match[1]) / (match[2] === "ms" ? 1000 : 1) : fallback;
};
const number = (value: string, fallback: number) => {
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : fallback;
};
const bezier = (value: string, fallback: Bezier): Bezier => {
	const match = value.match(/cubic-bezier\(([^)]+)\)/);
	const points = match?.[1].split(",").map(Number);
	return points?.length === 4 && points.every(Number.isFinite) ? (points as Bezier) : fallback;
};

/** Reads the motion tokens an element inherits from its village. */
export function readMotionTokens(element: Element): MotionTokens {
	const style = getComputedStyle(element);
	const get = (name: string) => style.getPropertyValue(name);
	const d = defaultMotionTokens;
	return {
		fast: seconds(get("--motion-fast"), d.fast),
		base: seconds(get("--motion-base"), d.base),
		slow: seconds(get("--motion-slow"), d.slow),
		easeOut: bezier(get("--motion-ease-out"), d.easeOut),
		easeInOut: bezier(get("--motion-ease-in-out"), d.easeInOut),
		spring: { stiffness: number(get("--motion-spring-stiffness"), d.spring.stiffness), damping: number(get("--motion-spring-damping"), d.spring.damping) },
		distance: number(get("--motion-distance"), d.distance),
		stagger: seconds(get("--motion-stagger"), d.stagger),
		intensity: Math.max(0, Math.min(3, Math.round(number(get("--motion-intensity"), d.intensity)))) as MotionIntensity,
	};
}

export interface Motion {
	mode: MotionMode;
	tokens: MotionTokens;
	/** The tokens were read from the element (false on the server and before the first effect). */
	measured: boolean;
	/** Whether effects of this intensity run here and now: mode "ready" and the village's intensity at least `min`. */
	allows: (min?: MotionIntensity) => boolean;
}

/** The mode and the village's tokens where `ref` sits, read once mounted (defaults before). */
export function useMotion(ref: React.RefObject<Element | null>): Motion {
	const mode = useMotionMode();
	const [tokens, setTokens] = React.useState<MotionTokens | null>(null);
	React.useEffect(() => {
		if (ref.current) setTokens(readMotionTokens(ref.current));
	}, [ref, mode]);
	const intensity = tokens?.intensity ?? 0;
	const allows = React.useCallback((min: MotionIntensity = 1) => mode === "ready" && intensity >= min, [mode, intensity]);
	return { mode, tokens: tokens ?? defaultMotionTokens, measured: tokens !== null, allows };
}

// ---- Easing and springs, without Motion ------------------------------------------------------------------------

/**
 * A village easing as a function of time (0 to 1), for what CSS and the Web Animations API cannot animate, such as a
 * scroll position. Solves the cubic bezier's x for t (Newton, then bisection), like the browser does.
 */
export function bezierEasing([x1, y1, x2, y2]: Bezier): (t: number) => number {
	const curve = (a: number, b: number, t: number) => ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
	const slope = (a: number, b: number, t: number) => 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
	return (x: number) => {
		if (x <= 0) return 0;
		if (x >= 1) return 1;
		let t = x;
		for (let i = 0; i < 8; i++) {
			const d = slope(x1, x2, t);
			if (Math.abs(d) < 1e-6) break;
			t -= (curve(x1, x2, t) - x) / d;
		}
		if (t < 0 || t > 1 || Math.abs(curve(x1, x2, t) - x) > 1e-4) {
			let lo = 0;
			let hi = 1;
			t = x;
			for (let i = 0; i < 30; i++) {
				if (curve(x1, x2, t) < x) lo = t;
				else hi = t;
				t = (lo + hi) / 2;
			}
		}
		return curve(y1, y2, t);
	};
}

export interface SpringState {
	value: number;
	velocity: number;
}

/**
 * Moves a spring (mass 1) toward `target` by `dt` seconds, with the village's stiffness and damping. Small fixed
 * substeps keep stiff springs (Iwa) stable at any frame rate.
 */
export function stepSpring(state: SpringState, target: number, spring: MotionTokens["spring"], dt: number): SpringState {
	let { value, velocity } = state;
	const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
	const h = dt / steps;
	for (let i = 0; i < steps; i++) {
		velocity += (-spring.stiffness * (value - target) - spring.damping * velocity) * h;
		value += velocity * h;
	}
	return { value, velocity };
}

/** Whether a spring has come to rest at `target` (within half a pixel, barely moving). */
export const springAtRest = (state: SpringState, target: number) => Math.abs(state.value - target) < 0.5 && Math.abs(state.velocity) < 5;

// ---- Reveal and Stagger ----------------------------------------------------------------------------------------

/** True once the element has entered the viewport (less a bottom margin), and from then on. */
export function useInViewOnce(ref: React.RefObject<Element | null>, margin = "0px 0px -10% 0px"): boolean {
	const [seen, setSeen] = React.useState(false);
	React.useEffect(() => {
		const element = ref.current;
		if (!element || seen) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setSeen(true);
					observer.disconnect();
				}
			},
			{ rootMargin: margin },
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, margin, seen]);
	return seen;
}

/** A bezier as CSS, for the Web Animations API. */
export const cssEasing = (points: Bezier) => `cubic-bezier(${points.join(", ")})`;

export type RevealTag = "div" | "section" | "article" | "header" | "footer" | "figure" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "ul" | "ol" | "li" | "a";
export type RevealFrom = "up" | "down" | "left" | "right" | "none";

export interface RevealOptions {
	from?: RevealFrom;
	/** Seconds. */
	delay?: number;
	/** Pixels; defaults to the village's `--motion-distance`. */
	distance?: number;
	/** Reveal now instead of when the element enters the viewport (used by Stagger). */
	trigger?: boolean;
}

/** Marks an element revealed (CSS stops hiding it) and fades it in once. Shared by Reveal and Stagger.Item. */
export function useReveal(ref: React.RefObject<HTMLElement | null>, { from = "up", delay = 0, distance, trigger }: RevealOptions) {
	const { mode, tokens, measured, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const active = trigger ?? inView;
	const done = React.useRef(false);

	React.useEffect(() => {
		const element = ref.current;
		if (!element || done.current || mode === "pending" || !measured) return;
		if (!allows(1)) {
			done.current = true;
			element.setAttribute("data-revealed", "");
			return;
		}
		if (!active) return;

		done.current = true;
		element.setAttribute("data-revealed", "");
		// Intensity 1 fades in place; travel starts at 2.
		const offset = allows(2) ? (distance ?? tokens.distance) : 0;
		const start =
			from === "up" ? `translateY(${offset}px)` : from === "down" ? `translateY(${-offset}px)` : from === "left" ? `translateX(${offset}px)` : from === "right" ? `translateX(${-offset}px)` : "none";
		const animation = element.animate([{ opacity: 0, transform: start }, { opacity: 1, transform: "none" }], {
			duration: tokens.slow * 1000,
			delay: delay * 1000,
			easing: cssEasing(tokens.easeOut),
			// Hidden during the delay; afterwards the element's own styles (it is revealed now).
			fill: "backwards",
		});
		return () => animation.cancel();
	}, [active, mode, measured, allows, from, delay, distance, tokens, ref]);
}

export interface RevealProps extends React.HTMLAttributes<HTMLElement>, Omit<RevealOptions, "trigger"> {
	as?: RevealTag;
	href?: string;
}

/** Fades and travels in once, when it enters the viewport. */
export function Reveal({ as = "div", from, delay, distance, ...rest }: RevealProps) {
	const ref = React.useRef<HTMLElement>(null);
	useReveal(ref, { from, delay, distance });
	const Tag = as as React.ElementType;
	return <Tag ref={ref} data-reveal="" {...rest} />;
}

const StaggerGroup = React.createContext<{ inView: boolean; delay: number; stagger?: number } | null>(null);
const StaggerIndex = React.createContext(0);

export interface StaggerProps extends React.HTMLAttributes<HTMLElement> {
	as?: RevealTag;
	/** Seconds before the first item. */
	delay?: number;
	/** Seconds between items; defaults to the village's `--motion-stagger`. */
	stagger?: number;
	children: React.ReactNode;
}

/** Its direct children reveal one after another when the group enters the viewport. Wrap each in <Stagger.Item>. */
function StaggerRoot({ as = "div", delay = 0, stagger, children, ...rest }: StaggerProps) {
	const ref = React.useRef<HTMLElement>(null);
	const inView = useInViewOnce(ref);
	const Tag = as as React.ElementType;
	return (
		<Tag ref={ref} {...rest}>
			<StaggerGroup.Provider value={{ inView, delay, stagger }}>
				{React.Children.map(children, (child, index) => (
					<StaggerIndex.Provider key={index} value={index}>
						{child}
					</StaggerIndex.Provider>
				))}
			</StaggerGroup.Provider>
		</Tag>
	);
}

export interface StaggerItemProps extends React.HTMLAttributes<HTMLElement> {
	as?: RevealTag;
	from?: RevealFrom;
}

function StaggerItem({ as = "div", from, ...rest }: StaggerItemProps) {
	const ref = React.useRef<HTMLElement>(null);
	const group = React.useContext(StaggerGroup);
	const index = React.useContext(StaggerIndex);
	const { tokens } = useMotion(ref);
	useReveal(ref, {
		from,
		delay: (group?.delay ?? 0) + index * (group?.stagger ?? tokens.stagger),
		trigger: group ? group.inView : undefined,
	});
	const Tag = as as React.ElementType;
	return <Tag ref={ref} data-reveal="" {...rest} />;
}

export const Stagger = Object.assign(StaggerRoot, { Item: StaggerItem });

// ---- Scroll progress (RFC-0010, ADR-0019) ----------------------------------------------------------------------

/**
 * Which part of an element's way through the viewport maps to 0–1, as CSS view timelines name them:
 * - `cover`: from its top entering at the bottom of the viewport to its bottom leaving at the top;
 * - `entry`: while it comes in, until it is fully in (or fills the viewport);
 * - `exit`: while it goes out, from the moment it starts to leave (or stops filling the viewport);
 * - `contain`: while it is fully in, or, taller than the viewport, while it fills it;
 * - `pin`: `contain`, named for tall sections whose content sticks while they scroll by (scroll-stack, horizontal-scroll);
 * - `page`: the page's own scroll, from the top to the bottom (scroll-progress).
 */
export type ScrollRange = "cover" | "entry" | "exit" | "contain" | "pin" | "page";

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * Where the element's top sits in the viewport (in px from the viewport's top) when the range starts and ends.
 * `height` is the element's, `viewport` the viewport's.
 */
export function scrollRangeBounds(range: Exclude<ScrollRange, "page">, height: number, viewport: number): [start: number, end: number] {
	const shorter = Math.min(height, viewport);
	switch (range) {
		case "cover":
			return [viewport, -height];
		case "entry":
			return [viewport, viewport - shorter];
		case "exit": {
			const start = Math.min(0, viewport - height);
			return [start, start - shorter];
		}
		case "contain":
		case "pin":
			return [Math.max(viewport - height, 0), Math.min(viewport - height, 0)];
	}
}

/** The progress (0–1) of an element whose top is at `top` in the viewport. What the fallback writes; also for tests. */
export function scrollProgressAt(range: Exclude<ScrollRange, "page">, top: number, height: number, viewport: number): number {
	const [start, end] = scrollRangeBounds(range, height, viewport);
	if (start === end) return top <= start ? 1 : 0;
	return clamp01((start - top) / (start - end));
}

/** The page's progress (0–1): how far it has scrolled of what it can scroll. */
export function pageScrollProgress(scrollY: number, scrollHeight: number, viewport: number): number {
	const scrollable = scrollHeight - viewport;
	return scrollable <= 0 ? 0 : clamp01(scrollY / scrollable);
}

// Scroll timelines are not in TypeScript's DOM library yet.
type AnyTimeline = AnimationTimeline;
type TimelineConstructors = {
	ViewTimeline?: new (options: { subject: Element; axis?: "block" | "inline" }) => AnyTimeline;
	ScrollTimeline?: new (options: { source: Element; axis?: "block" | "inline" }) => AnyTimeline;
};

let progressRegistered: boolean | undefined;

/**
 * Registers `--scroll-progress` as a number, so the browser can animate it and `calc()` can use it. Once per page; a
 * second registration (two copies of this file, a hot reload) counts as done.
 */
function registerScrollProgress(): boolean {
	if (progressRegistered !== undefined) return progressRegistered;
	try {
		CSS.registerProperty({ name: "--scroll-progress", syntax: "<number>", inherits: true, initialValue: "0" });
		progressRegistered = true;
	} catch (error) {
		progressRegistered = error instanceof DOMException && error.name === "InvalidModificationError";
	}
	return progressRegistered;
}

/** Whether the browser drives `--scroll-progress` itself: scroll timelines, and the property registered. */
export function scrollTimelinesSupported(): boolean {
	const timelines = globalThis as unknown as TimelineConstructors;
	return typeof timelines.ViewTimeline === "function" && typeof timelines.ScrollTimeline === "function" && registerScrollProgress();
}

/** Lets the browser drive the property on its own timeline: no JavaScript per frame. */
function driveWithTimeline(element: HTMLElement, range: ScrollRange): () => void {
	const { ViewTimeline, ScrollTimeline } = globalThis as unknown as Required<TimelineConstructors>;
	const page = range === "page";
	const timeline = page ? new ScrollTimeline({ source: document.documentElement, axis: "block" }) : new ViewTimeline({ subject: element, axis: "block" });
	const name = range === "pin" ? "contain" : range;
	const options = { timeline, fill: "both", easing: "linear", ...(page ? {} : { rangeStart: `${name} 0%`, rangeEnd: `${name} 100%` }) };
	const animation = element.animate({ "--scroll-progress": [0, 1] } as PropertyIndexedKeyframes, options as KeyframeAnimationOptions);
	return () => animation.cancel();
}

// The fallback: one passive scroll listener and one frame for every watched element on the page.
interface Watched {
	element: HTMLElement;
	range: ScrollRange;
	/** Near the viewport: measured on every frame. */
	near: boolean;
	/** Just left or entered: measured once more, so it settles at 0 or 1. */
	dirty: boolean;
	last: number;
}

const watched = new Set<Watched>();
let frame = 0;
let nearObserver: IntersectionObserver | null = null;

const requestUpdate = () => {
	if (!frame) frame = requestAnimationFrame(update);
};

function update() {
	frame = 0;
	const viewport = window.innerHeight;
	const writes: Array<[Watched, number]> = [];
	// Every read first, then every write, so the frame lays out once.
	for (const item of watched) {
		if (item.range === "page") {
			writes.push([item, pageScrollProgress(window.scrollY, document.documentElement.scrollHeight, viewport)]);
		} else if (item.near || item.dirty) {
			const rect = item.element.getBoundingClientRect();
			writes.push([item, scrollProgressAt(item.range, rect.top, rect.height, viewport)]);
		}
		item.dirty = false;
	}
	for (const [item, value] of writes) {
		const rounded = Math.round(value * 10000) / 10000;
		if (rounded === item.last) continue;
		item.last = rounded;
		item.element.style.setProperty("--scroll-progress", String(rounded));
	}
}

/** Writes `--scroll-progress` from JavaScript, for browsers without scroll timelines. */
function driveWithFrames(element: HTMLElement, range: ScrollRange): () => void {
	if (watched.size === 0) {
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		// Measured only within a viewport of the screen, above or below.
		nearObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					for (const item of watched) {
						if (item.element !== entry.target) continue;
						item.near = entry.isIntersecting;
						item.dirty = true;
					}
				}
				requestUpdate();
			},
			{ rootMargin: "100% 0px" },
		);
	}
	const item: Watched = { element, range, near: false, dirty: true, last: Number.NaN };
	watched.add(item);
	if (range !== "page") nearObserver?.observe(element);
	requestUpdate();
	return () => {
		watched.delete(item);
		nearObserver?.unobserve(element);
		if (watched.size > 0) return;
		window.removeEventListener("scroll", requestUpdate);
		window.removeEventListener("resize", requestUpdate);
		nearObserver?.disconnect();
		nearObserver = null;
		if (frame) cancelAnimationFrame(frame);
		frame = 0;
	};
}

export interface ScrollProgressOptions {
	/** Which part of the element's way through the viewport maps to 0–1. Default `cover`. */
	range?: ScrollRange;
	/** Fixes the progress (demos, screenshots, tests): nothing follows the scroll. */
	progress?: number;
	/**
	 * The element moves nothing but itself, and only with the user's scroll (a reading bar): it keeps following the
	 * scroll under reduced motion (ADR-0020). Leave it out for anything that moves content.
	 */
	feedback?: boolean;
	/** Turn it off where the effect does not run here (an intensity the village does not allow). Default true. */
	enabled?: boolean;
}

/**
 * Sets `--scroll-progress` (0 to 1) on the element as the page scrolls, and `data-scroll-linked` while it does. Read it
 * in the element's styles or its children's: `scale: calc(1 - var(--scroll-progress) * 0.06)`.
 *
 * Measure a box that does not move with the progress (put the moving part inside it), or the effect feeds itself.
 * Under `pending`, `final` and `off`, nothing is set and the element keeps its static form, except `feedback` under
 * `off` and a fixed `progress`.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>, { range = "cover", progress, feedback = false, enabled = true }: ScrollProgressOptions = {}) {
	const mode = useMotionMode();
	React.useEffect(() => {
		const element = ref.current;
		if (!element || !enabled || mode === "pending") return;
		const drives = progress !== undefined || mode === "ready" || (feedback && mode === "off");
		if (!drives) return;

		element.setAttribute("data-scroll-linked", "");
		let stop: () => void;
		if (progress !== undefined) {
			element.style.setProperty("--scroll-progress", String(clamp01(progress)));
			stop = () => {};
		} else {
			stop = scrollTimelinesSupported() ? driveWithTimeline(element, range) : driveWithFrames(element, range);
		}
		return () => {
			stop();
			element.removeAttribute("data-scroll-linked");
			element.style.removeProperty("--scroll-progress");
		};
	}, [ref, mode, range, progress, feedback, enabled]);
}

// ---- Presence and Parallax -------------------------------------------------------------------------------------

export interface PresenceProps {
	/** Change it to swap the content (tab id, step number…). */
	id: string | number;
	children: React.ReactNode;
	className?: string;
}

/** Cross-fades between contents keyed by `id` (tabs, toggles, steps). Intensity 1 fades, 2 also travels. */
export function Presence({ id, children, className }: PresenceProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(ref);
	const animated = allows(1);
	const distance = allows(2) ? Math.round(tokens.distance / 3) : 0;
	return (
		<div ref={ref} className={className}>
			<Features>
				<AnimatePresence mode="wait" initial={false}>
					<m.div
						key={id}
						initial={animated ? { opacity: 0, y: distance } : false}
						animate={{ opacity: 1, y: 0 }}
						exit={animated ? { opacity: 0, y: -distance } : undefined}
						transition={{ duration: animated ? tokens.base : 0, ease: tokens.easeOut }}
					>
						{children}
					</m.div>
				</AnimatePresence>
			</Features>
		</div>
	);
}

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> & {
	children: React.ReactNode;
};

export interface ParallaxProps extends DivProps {
	/** How far it drifts while crossing the viewport, as a share of 200px (0.2 → ±40px). */
	speed?: number;
	/** Fixes the progress (0–1), for demos and screenshots. */
	progress?: number;
}

/**
 * Moves at a different rate than the page while it scrolls past. Intensity 2. The outer box is measured and stays put;
 * the inner one drifts, from `speed × 200px` below its place to as much above, following `--scroll-progress`.
 */
export function Parallax({ speed = 0.2, progress, children, ...rest }: ParallaxProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { allows } = useMotion(ref);
	// A fixed progress is a picture, not motion: it shows whatever the mode.
	const moves = progress !== undefined || allows(2);
	useScrollProgress(ref, { range: "cover", progress, enabled: moves });
	return (
		<div ref={ref} {...rest}>
			<div data-slot="parallax-layer" style={moves ? { translate: `0 calc((0.5 - var(--scroll-progress, 0)) * ${speed * 400}px)` } : undefined}>
				{children}
			</div>
		</div>
	);
}

// ---- Pointer effects -------------------------------------------------------------------------------------------

/** Where the pointer is inside the element, from -0.5 to 0.5 on each axis. */
function pointerOffset(event: React.PointerEvent<HTMLElement>) {
	const rect = event.currentTarget.getBoundingClientRect();
	return { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
}

export interface TiltProps extends DivProps {
	/** Maximum rotation in degrees. */
	max?: number;
}

/** Tilts toward the pointer in 3D. Mouse only; intensity 3. */
export function Tilt({ max = 8, children, ...rest }: TiltProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(ref);
	const rotateX = useSpring(useMotionValue(0), tokens.spring);
	const rotateY = useSpring(useMotionValue(0), tokens.spring);
	return (
		<Features>
			<m.div
				ref={ref}
				{...rest}
				style={{ rotateX, rotateY, transformPerspective: 900 }}
				onPointerMove={(event) => {
					if (!allows(3) || event.pointerType !== "mouse") return;
					const { x, y } = pointerOffset(event);
					rotateY.set(x * max * 2);
					rotateX.set(-y * max * 2);
				}}
				onPointerLeave={() => {
					rotateX.set(0);
					rotateY.set(0);
				}}
			>
				{children}
			</m.div>
		</Features>
	);
}

export interface MagneticProps extends DivProps {
	/** Share of the pointer offset the element follows (0–1). */
	strength?: number;
}

/** Drifts toward the pointer, then springs back (buttons, calls to action). Mouse only; intensity 3. */
export function Magnetic({ strength = 0.3, children, ...rest }: MagneticProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(ref);
	const x = useSpring(useMotionValue(0), tokens.spring);
	const y = useSpring(useMotionValue(0), tokens.spring);
	return (
		<Features>
			<m.div
				ref={ref}
				{...rest}
				style={{ x, y, display: "inline-block" }}
				onPointerMove={(event) => {
					if (!allows(3) || event.pointerType !== "mouse") return;
					const rect = event.currentTarget.getBoundingClientRect();
					const offset = pointerOffset(event);
					x.set(offset.x * rect.width * strength);
					y.set(offset.y * rect.height * strength);
				}}
				onPointerLeave={() => {
					x.set(0);
					y.set(0);
				}}
			>
				{children}
			</m.div>
		</Features>
	);
}
