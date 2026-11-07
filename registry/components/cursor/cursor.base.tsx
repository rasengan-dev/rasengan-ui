"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { springAtRest, stepSpring, useMotion, type SpringState } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { cursorSizes, cursorStyles, cursorVariants, type CursorVariantProps } from "./cursor.styles";

export { cursorVariants, type CursorVariantProps } from "./cursor.styles";

export interface CursorAreaProps extends React.HTMLAttributes<HTMLDivElement>, CursorVariantProps {
	size?: "sm" | "default" | "lg";
	/** Hide the system cursor inside the area. Off by default: some people rely on a large system cursor. */
	hideNative?: boolean;
	/** CSS selector of what the cursor wraps itself around. */
	targets?: string;
}

const defaultTargets = 'a[href], button, [role="button"], summary, label, select, [data-cursor]';
const textFields = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';

type Box = { x: number; y: number; w: number; h: number };
type Look = { radius: string; over: boolean; label: string | null; hidden: boolean };

/**
 * A custom cursor for an area (or the whole app): it follows the pointer on a spring with the village's stiffness and
 * damping, wraps itself around buttons and links, turns into a caret over text fields and into a label over
 * `data-cursor-label` targets. Mouse and trackpad only; touch and keyboard are left alone, and the system cursor stays
 * unless `hideNative`. With motion off, or at intensity 0, there is no custom cursor.
 */
export function CursorArea({ variant = "ring", tone, size = "default", hideNative = false, targets = defaultTargets, className, children, ...props }: CursorAreaProps) {
	const id = React.useId().replace(/:/g, "");
	const areaRef = React.useRef<HTMLDivElement>(null);
	const cursorRef = React.useRef<HTMLDivElement>(null);
	const labelRef = React.useRef<HTMLSpanElement>(null);
	const container = usePortalContainer();
	const { tokens, allows } = useMotion(areaRef);
	const [fine, setFine] = React.useState(false);
	const [look, setLook] = React.useState<Look>({ radius: "9999px", over: false, label: null, hidden: true });
	const enabled = fine && allows(1);
	const idle = cursorSizes[variant ?? "ring"][size];

	React.useEffect(() => {
		const query = window.matchMedia("(pointer: fine)");
		const sync = () => setFine(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	// The springs: one per coordinate and size, stepped each frame until they rest.
	const springs = React.useRef<Record<keyof Box, SpringState>>({ x: { value: 0, velocity: 0 }, y: { value: 0, velocity: 0 }, w: { value: idle, velocity: 0 }, h: { value: idle, velocity: 0 } });
	const goal = React.useRef<Box>({ x: 0, y: 0, w: idle, h: idle });
	const frame = React.useRef(0);
	const last = React.useRef(0);
	const placed = React.useRef(false);

	const paint = React.useCallback(() => {
		const element = cursorRef.current;
		if (!element) return;
		const { x, y, w, h } = springs.current;
		element.style.width = `${Math.max(2, w.value)}px`;
		element.style.height = `${Math.max(2, h.value)}px`;
		element.style.transform = `translate3d(${x.value - w.value / 2}px, ${y.value - h.value / 2}px, 0)`;
	}, []);

	const tick = React.useCallback(
		(now: number) => {
			const dt = Math.min(1 / 30, (now - (last.current || now)) / 1000) || 1 / 60;
			last.current = now;
			let resting = true;
			for (const key of ["x", "y", "w", "h"] as const) {
				springs.current[key] = stepSpring(springs.current[key], goal.current[key], tokens.spring, dt);
				if (!springAtRest(springs.current[key], goal.current[key])) resting = false;
			}
			paint();
			if (resting) {
				frame.current = 0;
				last.current = 0;
			} else frame.current = requestAnimationFrame(tick);
		},
		[tokens.spring, paint],
	);

	const aim = React.useCallback(
		(box: Box) => {
			goal.current = box;
			if (!placed.current) {
				// First appearance: start where the pointer is, not from the corner.
				placed.current = true;
				springs.current = { x: { value: box.x, velocity: 0 }, y: { value: box.y, velocity: 0 }, w: { value: box.w, velocity: 0 }, h: { value: box.h, velocity: 0 } };
				paint();
			}
			if (!frame.current) frame.current = requestAnimationFrame(tick);
		},
		[tick, paint],
	);

	React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!enabled || event.pointerType !== "mouse") return;
		const hit = event.target instanceof Element ? event.target : null;
		const target = hit?.closest<HTMLElement>(`${targets}, ${textFields}`);
		const morph = allows(2) && target && areaRef.current?.contains(target);

		if (target?.dataset.cursor === "none") {
			setLook((l) => (l.hidden ? l : { ...l, hidden: true }));
			return;
		}
		if (morph && target.dataset.cursorLabel) {
			const width = (labelRef.current?.offsetWidth ?? 48) + 2;
			setLook({ radius: "9999px", over: false, label: target.dataset.cursorLabel, hidden: false });
			aim({ x: event.clientX, y: event.clientY, w: Math.max(width, 48), h: 32 });
			return;
		}
		if (morph && target.matches(textFields)) {
			const lineHeight = parseFloat(getComputedStyle(target).fontSize) * 1.25;
			setLook({ radius: "2px", over: false, label: null, hidden: false });
			aim({ x: event.clientX, y: event.clientY, w: 2, h: lineHeight });
			return;
		}
		if (morph) {
			const rect = target.getBoundingClientRect();
			const pad = 6;
			const radius = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
			// At intensity 3 the cursor leans toward the pointer: the target feels magnetic.
			const lean = allows(3) ? 0.12 : 0;
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			setLook({ radius: `${radius + pad}px`, over: true, label: null, hidden: false });
			aim({ x: cx + (event.clientX - cx) * lean, y: cy + (event.clientY - cy) * lean, w: rect.width + pad * 2, h: rect.height + pad * 2 });
			return;
		}
		setLook((l) => (l.over || l.label || l.hidden || l.radius !== "9999px" ? { radius: "9999px", over: false, label: null, hidden: false } : l));
		aim({ x: event.clientX, y: event.clientY, w: idle, h: idle });
	};

	const cursor = enabled ? (
		<div
			ref={cursorRef}
			aria-hidden="true"
			data-slot="cursor"
			data-visible={look.hidden ? undefined : ""}
			data-over={look.over ? "" : undefined}
			data-label={look.label ? "" : undefined}
			className={cursorVariants({ variant, tone })}
			style={{ borderRadius: look.radius }}
		>
			<span ref={labelRef} className={cn(cursorStyles.label, !look.label && "invisible absolute")}>
				{look.label ?? ""}
			</span>
		</div>
	) : null;

	return (
		<div
			ref={areaRef}
			data-slot="cursor-area"
			data-cursor-area={id}
			className={cn(cursorStyles.area, className)}
			onPointerMove={onPointerMove}
			onPointerLeave={() => setLook((l) => ({ ...l, hidden: true }))}
			{...props}
		>
			{enabled && hideNative && (
				<style>{`@media (pointer: fine) { [data-cursor-area="${id}"], [data-cursor-area="${id}"] * { cursor: none !important; } }`}</style>
			)}
			{children}
			{cursor && typeof document !== "undefined" ? createPortal(cursor, container ?? document.body) : null}
		</div>
	);
}
