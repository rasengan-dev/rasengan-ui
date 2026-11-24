"use client";

import * as React from "react";

import { springAtRest, stepSpring, useMotion, type SpringState } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { spotlightStyles, spotlightVariants, type SpotlightVariantProps } from "./spotlight.styles";

export { spotlightVariants, type SpotlightVariantProps } from "./spotlight.styles";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement>, SpotlightVariantProps {
	/** Fixes the light's place (0 to 1 across and down the surface) and keeps it lit, for demos and screenshots. */
	at?: { x: number; y: number };
}

/**
 * A soft glow of the tone that follows the mouse over a surface, and lights the surface's border near it. Wrap one
 * surface: `<Spotlight><Card>…</Card></Spotlight>`; the light takes its corners and its border's width. At intensity 1
 * the glow follows; from 2 the border lights up too; at 3 the light trails the mouse on the village's spring. Mouse and
 * trackpad only: on a touch screen, with the keyboard, with reduced motion, `final` or at intensity 0, the surface is
 * shown as it is.
 */
export function Spotlight({ tone, size, at, className, style, children, onPointerEnter, onPointerMove, onPointerLeave, ...props }: SpotlightProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(ref);
	const [fine, setFine] = React.useState(false);
	const [lit, setLit] = React.useState(false);
	const enabled = fine && allows(1) && at === undefined;
	const shown = at !== undefined || (enabled && lit);
	const edged = at !== undefined || allows(2);

	React.useEffect(() => {
		const query = window.matchMedia("(pointer: fine)");
		const sync = () => setFine(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	// The surface's corners and border, so the layers fit it.
	React.useEffect(() => {
		const element = ref.current;
		const surface = element?.firstElementChild;
		if (!element || !(surface instanceof HTMLElement)) return;
		const computed = getComputedStyle(surface);
		element.style.setProperty("--spot-radius", computed.borderRadius || "0px");
		element.style.setProperty("--spot-border", `${Math.max(1, parseFloat(computed.borderTopWidth) || 0)}px`);
	}, []);

	// The light's place: straight to the mouse, or on the village's spring at intensity 3. One write per frame.
	const springs = React.useRef<{ x: SpringState; y: SpringState }>({ x: { value: 0, velocity: 0 }, y: { value: 0, velocity: 0 } });
	const goal = React.useRef({ x: 0, y: 0 });
	const frame = React.useRef(0);
	const last = React.useRef(0);

	const tick = React.useCallback(
		(now: number) => {
			const element = ref.current;
			if (!element) return;
			let resting = true;
			if (allows(3)) {
				const dt = Math.min(1 / 30, (now - (last.current || now)) / 1000) || 1 / 60;
				last.current = now;
				for (const key of ["x", "y"] as const) {
					springs.current[key] = stepSpring(springs.current[key], goal.current[key], tokens.spring, dt);
					if (!springAtRest(springs.current[key], goal.current[key])) resting = false;
				}
			} else springs.current = { x: { value: goal.current.x, velocity: 0 }, y: { value: goal.current.y, velocity: 0 } };
			element.style.setProperty("--spot-x", `${springs.current.x.value}px`);
			element.style.setProperty("--spot-y", `${springs.current.y.value}px`);
			if (resting) {
				frame.current = 0;
				last.current = 0;
			} else frame.current = requestAnimationFrame(tick);
		},
		[allows, tokens.spring],
	);

	React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const aim = (event: React.PointerEvent<HTMLDivElement>, jump: boolean) => {
		const rect = event.currentTarget.getBoundingClientRect();
		goal.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
		// Coming in: the light starts under the mouse, not from where it last left.
		if (jump) springs.current = { x: { value: goal.current.x, velocity: 0 }, y: { value: goal.current.y, velocity: 0 } };
		if (!frame.current) frame.current = requestAnimationFrame(tick);
	};

	return (
		<div
			ref={ref}
			data-slot="spotlight"
			className={cn(spotlightVariants({ tone, size }), className)}
			style={at ? { ...style, ["--spot-x" as string]: `${at.x * 100}%`, ["--spot-y" as string]: `${at.y * 100}%` } : style}
			onPointerEnter={(event) => {
				onPointerEnter?.(event);
				if (!enabled || event.pointerType !== "mouse") return;
				aim(event, true);
				setLit(true);
			}}
			onPointerMove={(event) => {
				onPointerMove?.(event);
				if (!enabled || event.pointerType !== "mouse") return;
				aim(event, !lit);
				if (!lit) setLit(true);
			}}
			onPointerLeave={(event) => {
				onPointerLeave?.(event);
				setLit(false);
			}}
			{...props}
		>
			{children}
			<span aria-hidden="true" data-slot="spotlight-glow" data-lit={shown ? "" : undefined} className={spotlightStyles.glow} />
			{edged && <span aria-hidden="true" data-slot="spotlight-edge" data-lit={shown ? "" : undefined} className={spotlightStyles.edge} />}
		</div>
	);
}
