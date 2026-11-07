"use client";

import * as React from "react";

import { cssEasing, useMotion, type Bezier, type MotionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { pageTransitionStyles, pageTransitionVariants, type PageTransitionVariantProps } from "./page-transition.styles";

export { pageTransitionVariants, type PageTransitionVariantProps } from "./page-transition.styles";

export type PageTransitionEffect = "wipe" | "blinds" | "iris" | "fade";
export type WipeDirection = "left" | "right" | "up" | "down";

interface TransitionContextValue {
	/** Covers, runs `change` (navigate, set state), and uncovers once `id` has changed. */
	run: (change: () => void, origin?: { x: number; y: number }) => void;
	/** `navigate(to)` behind the curtain, when the transition was given a `navigate` function. */
	navigate: (to: string, origin?: { x: number; y: number }) => void;
}

const TransitionContext = React.createContext<TransitionContextValue | null>(null);

/** The nearest PageTransition's `run` and `navigate`. */
export function usePageTransition(): TransitionContextValue {
	const context = React.useContext(TransitionContext);
	if (!context) throw new Error("usePageTransition must be used inside <PageTransition>");
	return context;
}

export interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement>, PageTransitionVariantProps {
	/** What changes: the pathname for pages, a step or tab for an element. The curtain uncovers when it changes. */
	id: string;
	effect?: PageTransitionEffect;
	/** Wipe: the way the panel travels. */
	direction?: WipeDirection;
	/** Wipe: the slant of the panel's edges, in degrees. */
	angle?: number;
	/** Wipe and blinds: uncover back the way the curtain came, instead of carrying on past. */
	reverse?: boolean;
	/** Seconds to cover and to uncover; by default the village's slow duration, and 1.2 times that. */
	duration?: number | [cover: number, uncover: number];
	/** Your router's navigate function, for `TransitionLink` and `usePageTransition().navigate`. */
	navigate?: (to: string) => void;
	/** Where focus goes once uncovered (a selector inside the transition), or false to leave it. */
	focus?: string | false;
	/** Scroll to the top while covered (page scope). */
	scrollToTop?: boolean;
	/** Blinds: how many bars; by default one per 64px of height. */
	blinds?: number;
}

/* A cancelled animation (unmount, a newer transition) rejects its `finished` promise: that is not an error here. */
const ignore = () => undefined;

/**
 * The cover accelerates and the reveal decelerates: the reveal uses the village's ease-out, the cover its mirror (an
 * ease-in), so the curtain is fastest where the two meet and reads as one continuous gesture, without a stop.
 */
const easeIn = ([x1, y1, x2, y2]: Bezier): Bezier => [1 - x2, 1 - y2, 1 - x1, 1 - y1];

type Box = { width: number; height: number };

/** The wipe panel's keyframes: off one side, over the box, then off the far side (or back). */
function wipe(phase: "in" | "out", direction: WipeDirection, angle: number, reverse: boolean, box: Box): Keyframe[] {
	const horizontal = direction === "left" || direction === "right";
	const sign = direction === "right" || direction === "down" ? 1 : -1;
	// The slant makes the panel overhang by size·tan(angle) on each side; travel that much further to clear the box.
	const span = horizontal ? box.width : box.height;
	const overhang = Math.abs(Math.tan((angle * Math.PI) / 180)) * (horizontal ? box.height : box.width);
	const away = span + overhang;
	const skew = horizontal ? `skewX(${-angle * sign}deg)` : `skewY(${-angle * sign}deg)`;
	const at = (offset: number) => ({ transform: `${horizontal ? "translateX" : "translateY"}(${offset}px) ${skew}` });
	if (phase === "in") return [at(-sign * away), at(0)];
	return [at(0), at(reverse ? -sign * away : sign * away)];
}

/**
 * A curtain between two pages, or two states of an element: it covers the old content with a wipe, blinds, an iris or
 * a fade, the content changes underneath, and it uncovers the new one, then moves focus to its heading. It works with
 * any router: give it the pathname as `id` and your `navigate`. With motion off, the content simply changes.
 */
export function PageTransition({
	id,
	effect = "wipe",
	direction = "right",
	angle = 10,
	reverse = false,
	duration,
	scope = "page",
	tone,
	navigate,
	focus = "h1",
	scrollToTop = scope === "page",
	blinds,
	className,
	children,
	...props
}: PageTransitionProps) {
	const rootRef = React.useRef<HTMLDivElement>(null);
	const curtainRef = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(rootRef);
	const tokensRef = React.useRef<MotionTokens>(tokens);
	tokensRef.current = tokens;
	const pending = React.useRef<{ origin: { x: string; y: string } } | null>(null);
	const previous = React.useRef(id);
	const running = React.useRef(false);
	const [bars, setBars] = React.useState(blinds ?? 8);

	// Blinds: one slat per 64px of the box's height, measured before the first run.
	React.useLayoutEffect(() => {
		if (effect !== "blinds" || blinds !== undefined) return;
		const height = scope === "page" ? window.innerHeight : (rootRef.current?.getBoundingClientRect().height ?? 0);
		setBars(Math.max(4, Math.round(height / 64)));
	}, [effect, blinds, scope]);

	const box = React.useCallback((): Box => {
		if (scope === "page") return { width: window.innerWidth, height: window.innerHeight };
		const rect = rootRef.current?.getBoundingClientRect();
		return { width: rect?.width ?? 0, height: rect?.height ?? 0 };
	}, [scope]);

	// The page curtain goes to the top layer while it runs, where the browser can.
	const show = React.useCallback(() => {
		const curtain = curtainRef.current;
		if (!curtain) return;
		curtain.setAttribute("data-running", "");
		if (scope === "page" && "showPopover" in curtain && !curtain.matches(":popover-open")) curtain.showPopover();
	}, [scope]);
	const hide = React.useCallback(() => {
		const curtain = curtainRef.current;
		if (!curtain) return;
		curtain.removeAttribute("data-running");
		if (scope === "page" && "hidePopover" in curtain && curtain.matches(":popover-open")) curtain.hidePopover();
	}, [scope]);

	const animate = React.useCallback(
		async (phase: "in" | "out", origin: { x: string; y: string }) => {
			const curtain = curtainRef.current;
			if (!curtain) return;
			const t = tokensRef.current;
			const [cover, uncover] = Array.isArray(duration) ? duration : duration !== undefined ? [duration, duration * 1.2] : [t.slow, t.slow * 1.2];
			const timing: KeyframeAnimationOptions = {
				duration: (phase === "in" ? cover : uncover) * 1000,
				easing: cssEasing(phase === "in" ? easeIn(t.easeOut) : t.easeOut),
				fill: "both",
			};
			if (effect === "blinds") {
				const slats = Array.from(curtain.firstElementChild?.children ?? []) as HTMLElement[];
				const from = phase === "in" || reverse ? "top" : "bottom";
				const spread = 0.35;
				await Promise.all(
					slats.map(
						(slat, i) =>
							slat.animate(phase === "in" ? [{ transform: "scaleY(0)", transformOrigin: from }, { transform: "scaleY(1)", transformOrigin: from }] : [{ transform: "scaleY(1)", transformOrigin: from }, { transform: "scaleY(0)", transformOrigin: from }], {
								...timing,
								duration: (timing.duration as number) * (1 - spread),
								delay: ((timing.duration as number) * spread * i) / Math.max(1, slats.length - 1),
							}).finished.catch(ignore),
					),
				);
				return;
			}
			const panel = curtain.firstElementChild as HTMLElement | null;
			if (!panel) return;
			const at = `at ${origin.x} ${origin.y}`;
			const keyframes: Keyframe[] =
				effect === "fade"
					? phase === "in"
						? [{ opacity: 0 }, { opacity: 1 }]
						: [{ opacity: 1 }, { opacity: 0 }]
					: effect === "iris"
						? phase === "in"
							? [{ clipPath: `circle(0% ${at})` }, { clipPath: `circle(150% ${at})` }]
							: [{ clipPath: `circle(150% ${at})` }, { clipPath: `circle(0% ${at})` }]
						: wipe(phase, direction, angle, reverse, box());
			await panel.animate(keyframes, timing).finished.catch(ignore);
		},
		[effect, direction, angle, reverse, duration, box],
	);

	const land = React.useCallback(() => {
		const root = rootRef.current;
		if (!root || focus === false) return;
		const target = root.querySelector<HTMLElement>(focus);
		if (!target) return;
		if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
		target.focus({ preventScroll: true });
	}, [focus]);

	const finish = React.useCallback(() => {
		const curtain = curtainRef.current;
		running.current = false;
		if (curtain) {
			for (const animation of curtain.getAnimations({ subtree: true })) animation.cancel();
			hide();
		}
		land();
	}, [land, hide]);

	const run = React.useCallback(
		(change: () => void, at?: { x: number; y: number }) => {
			const root = rootRef.current;
			if (!root || !curtainRef.current || running.current) return;
			if (!allows(1)) {
				change();
				// Focus once the new content is there.
				requestAnimationFrame(land);
				return;
			}
			running.current = true;
			const rect = scope === "page" ? { left: 0, top: 0 } : root.getBoundingClientRect();
			const origin = at ? { x: `${at.x - rect.left}px`, y: `${at.y - rect.top}px` } : { x: "50%", y: "50%" };
			pending.current = { origin };
			show();
			animate("in", origin).then(() => {
				if (scrollToTop) window.scrollTo(0, 0);
				change();
				// If the change did not change `id` (a cancelled navigation), never leave the curtain down.
				window.setTimeout(() => {
					if (!pending.current) return;
					const { origin: from } = pending.current;
					pending.current = null;
					animate("out", from).then(finish, finish);
				}, 1200);
			});
		},
		[allows, animate, finish, land, scope, scrollToTop, show],
	);

	// The id changed: uncover, in the same frame the new content is committed (before it paints). Without a run (the
	// browser's back button), the curtain starts covered.
	React.useLayoutEffect(() => {
		if (previous.current === id) return;
		previous.current = id;
		if (!curtainRef.current) return;
		if (!allows(1)) {
			requestAnimationFrame(land);
			return;
		}
		const origin = pending.current?.origin ?? { x: "50%", y: "50%" };
		pending.current = null;
		if (!running.current) {
			running.current = true;
			show();
		}
		animate("out", origin).then(finish, finish);
	}, [id, allows, animate, finish, land, show]);

	const value = React.useMemo<TransitionContextValue>(
		() => ({
			run,
			navigate: (to, at) => {
				if (!navigate) throw new Error("PageTransition needs a `navigate` function for navigate() and TransitionLink");
				run(() => navigate(to), at);
			},
		}),
		[run, navigate],
	);

	return (
		<TransitionContext.Provider value={value}>
			<div ref={rootRef} data-slot="page-transition" className={cn(scope === "element" && pageTransitionStyles.element, className)} {...props}>
				{children}
				<div
					ref={curtainRef}
					aria-hidden="true"
					data-slot="page-transition-curtain"
					popover={scope === "page" ? "manual" : undefined}
					className={pageTransitionVariants({ scope, tone })}
				>
					{effect === "blinds" ? (
						<div className={pageTransitionStyles.blinds}>
							{Array.from({ length: blinds ?? bars }, (_, i) => (
								<div key={i} className={pageTransitionStyles.blind} style={{ transform: "scaleY(0)" }} />
							))}
						</div>
					) : (
						<div className={pageTransitionStyles.panel} />
					)}
				</div>
			</div>
		</TransitionContext.Provider>
	);
}

export interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

/** A link that navigates behind the curtain. New tabs, modified clicks and other sites behave as plain links. */
export function TransitionLink({ href, onClick, target, ...props }: TransitionLinkProps) {
	const { navigate } = usePageTransition();
	return (
		<a
			href={href}
			target={target}
			onClick={(event) => {
				onClick?.(event);
				if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
				if ((target && target !== "_self") || new URL(href, window.location.href).origin !== window.location.origin) return;
				event.preventDefault();
				navigate(href, { x: event.clientX, y: event.clientY });
			}}
			{...props}
		/>
	);
}
