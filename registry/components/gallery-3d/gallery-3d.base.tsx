"use client";

import * as React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { springAtRest, stepSpring, useMotion, type SpringState } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { galleryStyles } from "./gallery-3d.styles";

export type GalleryLayout = "coverflow" | "ring" | "helix" | "sphere" | "stack" | "grid";

export interface GalleryEntry {
	id: string;
	/** Names the item for screen readers, and the image's alt text. */
	label: string;
	/** An image. Or give `content`. */
	src?: string;
	content?: React.ReactNode;
	caption?: string;
	/** Shown in the detail view, under the label. */
	description?: string;
}

export interface Gallery3DProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
	items: GalleryEntry[];
	layout?: GalleryLayout;
	/** Names the gallery for screen readers. */
	label: string;
	/** Item width in pixels; items are 1.3 times as tall. */
	itemSize?: number;
	/** Stage height in pixels. */
	height?: number;
	/** The item in front. Leave it out to let the gallery keep its own. */
	index?: number;
	/** The item in front at first, when `index` is left out. */
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Called when the item in front is opened; by default it opens in a dialog. */
	onOpen?: (item: GalleryEntry) => void;
}

/** The ring turns forever; every other layout has a first and a last item. */
const endless = (layout: GalleryLayout) => layout === "ring";
const mod = (value: number, n: number) => ((value % n) + n) % n;
const deg = (radians: number) => (radians * 180) / Math.PI;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/*
 * Geometry. In the ring, the helix and the sphere the items sit still on their shape and the scene turns, so a move is
 * one interpolated rotation of the scene: smooth, and endless for the ring. Radii are chosen so that neighbours never
 * cut through each other: two flat cards a step `a` apart around a circle of radius R clear each other when
 * R·tan(a/2) is more than half a card wide (and their chord is longer than a card for the helix, whose cards also climb).
 */
function geometry(layout: GalleryLayout, n: number, size: number) {
	const halfWidth = size / 2;
	const gap = 1.12;
	switch (layout) {
		case "ring": {
			const step = (2 * Math.PI) / n;
			return { step, radius: Math.max(size * 0.7, (halfWidth * gap) / Math.tan(step / 2)) };
		}
		case "helix": {
			const step = (2 * Math.PI) / 11;
			return { step, radius: (halfWidth * gap) / Math.sin(step / 2), rise: size * 0.28 };
		}
		case "sphere":
			return { step: 0, radius: size * 1.15 * Math.max(1, Math.sqrt(n / 10)) };
		default:
			return { step: 0, radius: 0 };
	}
}

/** The scene's transform with `p` (a fractional position) in front. */
function sceneTransform(layout: GalleryLayout, p: number, n: number, size: number): string {
	const g = geometry(layout, n, size);
	switch (layout) {
		case "ring":
			return `translateZ(${-g.radius}px) rotateY(${-deg(p * g.step)}deg)`;
		case "helix":
			return `translateZ(${-g.radius}px) translateY(${-p * (g.rise ?? 0)}px) rotateY(${-deg(p * g.step)}deg)`;
		case "sphere": {
			const lat = deg(Math.asin(1 - (2 * (p + 0.5)) / n));
			return `translateZ(${-g.radius}px) rotateX(${-lat}deg) rotateY(${-deg(GOLDEN * p)}deg)`;
		}
		default:
			return "translateZ(0px) rotateX(0deg) rotateY(0deg)";
	}
}

type Place = { transform: string; opacity: number; hidden?: boolean };

/** Where item `i` sits. For the turning layouts it does not depend on the position: the scene turns instead. */
function itemPlace(layout: GalleryLayout, i: number, p: number, n: number, size: number): Place {
	const g = geometry(layout, n, size);
	const d = i - p;
	switch (layout) {
		case "ring":
			return { transform: `rotateY(${deg(i * g.step)}deg) translateZ(${g.radius}px)`, opacity: 1 };
		case "helix":
			// Far turns of the spiral fade out, so the stage shows about one turn.
			return {
				transform: `translateY(${i * (g.rise ?? 0)}px) rotateY(${deg(i * g.step)}deg) translateZ(${g.radius}px)`,
				opacity: Math.abs(d) > 6 ? 0 : 1,
				hidden: Math.abs(d) > 6,
			};
		case "sphere": {
			const lat = deg(Math.asin(1 - (2 * (i + 0.5)) / n));
			return { transform: `rotateY(${deg(GOLDEN * i)}deg) rotateX(${lat}deg) translateZ(${g.radius}px) scale(0.6)`, opacity: 1 };
		}
		case "stack":
			if (d < 0) return { transform: `translateX(${d * size * 1.2}px) rotateZ(${d * 8}deg)`, opacity: d < -1 ? 0 : 1 + d, hidden: d < -1 };
			return { transform: `translateY(${d * 14}px) translateZ(${-d * 60}px) scale(${1 - Math.min(d, 6) * 0.04})`, opacity: d > 5 ? 0 : 1, hidden: d > 5 };
		case "grid": {
			const cols = Math.ceil(Math.sqrt(n));
			const rows = Math.ceil(n / cols);
			const x = ((i % cols) - (cols - 1) / 2) * size * 0.6;
			const y = (Math.floor(i / cols) - (rows - 1) / 2) * size * 0.75;
			return { transform: `translate3d(${x}px, ${y}px, 0px) scale(${Math.abs(d) < 0.5 ? 0.52 : 0.46})`, opacity: 1 };
		}
		default: {
			// Coverflow: the front item faces the viewer, the others turn away on each side.
			const side = Math.max(-1, Math.min(1, d));
			return {
				transform: `translateX(${d * size * 0.42 + side * size * 0.38}px) translateZ(${-Math.abs(side) * size * 0.6}px) rotateY(${-side * 50}deg)`,
				opacity: Math.abs(d) > 5 ? 0 : 1,
				hidden: Math.abs(d) > 5,
			};
		}
	}
}

function Media({ item }: { item: GalleryEntry }) {
	return (
		<>
			{item.src ? <img src={item.src} alt="" className={galleryStyles.media} draggable={false} /> : item.content}
			{item.caption && <span className={galleryStyles.caption}>{item.caption}</span>}
		</>
	);
}

/**
 * Images (or any content) arranged in 3D: coverflow, ring, helix, sphere, stack or grid, with smooth moves between
 * layouts. Every card has a back. Drag, wheel, arrows, Home and End, or a click on any card bring it to the front; the
 * ring turns forever. Opening the card in front shows a detail view. Below intensity 2, or with motion off, it is a
 * flat grid of the same items.
 */
export function Gallery3D({ items, layout = "coverflow", label, itemSize = 220, height = 420, index, defaultIndex = 0, onIndexChange, onOpen, className, style, ...props }: Gallery3DProps) {
	const rootRef = React.useRef<HTMLDivElement>(null);
	const { tokens, allows } = useMotion(rootRef);
	const threeD = allows(2);
	const n = items.length;
	// `turn` is the position in front: an item index, or any integer for the endless ring.
	const [turn, setTurn] = React.useState(index ?? defaultIndex);
	const [dragged, setDragged] = React.useState<number | null>(null);
	const [opened, setOpened] = React.useState<GalleryEntry | null>(null);
	const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
	const spring = React.useRef<{ state: SpringState; frame: number }>({ state: { value: 0, velocity: 0 }, frame: 0 });
	const drag = React.useRef<{ x: number; start: number; moved: boolean } | null>(null);
	const loops = endless(layout);
	const clamp = React.useCallback((value: number) => (loops ? value : Math.max(0, Math.min(n - 1, value))), [loops, n]);
	const active = mod(Math.round(turn), Math.max(1, n));
	const position = dragged ?? turn;

	// Leaving the ring, fold an endless turn back into the items' range.
	React.useEffect(() => {
		if (!loops) setTurn((t) => mod(Math.round(t), Math.max(1, n)));
	}, [loops, n]);

	/** The turn that shows item `i`: for the ring, the nearest one, so it turns the short way. */
	const turnFor = React.useCallback(
		(i: number, from: number) => {
			if (!loops) return Math.max(0, Math.min(n - 1, i));
			const delta = mod(i - from + n / 2, n) - n / 2;
			return Math.round(from + delta);
		},
		[loops, n],
	);

	const goTo = React.useCallback(
		(nextTurn: number, focus = false) => {
			const t = clamp(Math.round(nextTurn));
			setTurn(t);
			const i = mod(t, Math.max(1, n));
			onIndexChange?.(i);
			if (focus) itemRefs.current[i]?.focus({ preventScroll: true });
		},
		[clamp, n, onIndexChange],
	);

	// A controlled `index` brings that item to the front the short way.
	React.useEffect(() => {
		if (index === undefined || index === active) return;
		setTurn((t) => turnFor(index, t));
	}, [index, active, turnFor]);

	// After a drag, a spring carries the fractional position to the nearest card, then CSS transitions take over.
	const settle = React.useCallback(
		(from: number, velocity: number) => {
			const target = clamp(Math.round(from - velocity * 0.15));
			cancelAnimationFrame(spring.current.frame);
			spring.current.state = { value: from, velocity: -velocity };
			let last = 0;
			const tick = (now: number) => {
				const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60;
				last = now;
				spring.current.state = stepSpring(spring.current.state, target, tokens.spring, dt);
				if (springAtRest({ value: spring.current.state.value * 100, velocity: spring.current.state.velocity * 100 }, target * 100)) {
					setDragged(null);
					goTo(target);
					return;
				}
				setDragged(spring.current.state.value);
				spring.current.frame = requestAnimationFrame(tick);
			};
			spring.current.frame = requestAnimationFrame(tick);
		},
		[clamp, tokens.spring, goTo],
	);
	React.useEffect(() => () => cancelAnimationFrame(spring.current.frame), []);

	const open = (item: GalleryEntry) => (onOpen ? onOpen(item) : setOpened(item));
	const onKeyDown = (event: React.KeyboardEvent) => {
		const flat = !threeD || layout === "stack" || layout === "grid";
		const back = flat ? ["ArrowLeft", "ArrowUp"] : ["ArrowLeft"];
		const forward = flat ? ["ArrowRight", "ArrowDown"] : ["ArrowRight"];
		if (back.includes(event.key)) goTo(turn - 1, true);
		else if (forward.includes(event.key)) goTo(turn + 1, true);
		else if (event.key === "Home") goTo(turnFor(0, turn), true);
		else if (event.key === "End") goTo(turnFor(n - 1, turn), true);
		else return;
		event.preventDefault();
	};

	const variables = { ...style, ["--gallery-item" as string]: `${itemSize}px`, ["--gallery-height" as string]: `${height}px` } as React.CSSProperties;
	const moving = dragged === null;

	const card = (item: GalleryEntry, i: number, place?: Place) => (
		<button
			key={item.id}
			ref={(element) => {
				itemRefs.current[i] = element;
			}}
			type="button"
			data-slot="gallery-item"
			data-active={i === active ? "" : undefined}
			aria-current={i === active ? "true" : undefined}
			tabIndex={i === active ? 0 : -1}
			className={place ? cn(galleryStyles.item, moving && galleryStyles.moving) : galleryStyles.flatItem}
			style={place ? { transform: place.transform, opacity: place.opacity, pointerEvents: place.hidden ? "none" : undefined } : undefined}
			onClick={() => {
				if (drag.current?.moved) return;
				if (i === active) open(item);
				// Any card that is not in front comes to the front, the short way round.
				else goTo(turnFor(i, turn), true);
			}}
		>
			{/* The name is the label; what is drawn (image, content, caption, the back) is decoration for it. */}
			<span className="sr-only">{item.label}</span>
			<span aria-hidden="true" className={place ? galleryStyles.front : "contents"}>
				<Media item={item} />
			</span>
			{place && (
				<span aria-hidden="true" className={galleryStyles.back}>
					<span className={galleryStyles.backLabel}>{item.caption ?? item.label}</span>
				</span>
			)}
		</button>
	);

	return (
		<div
			ref={rootRef}
			role="group"
			aria-roledescription="gallery"
			aria-label={label}
			data-slot="gallery-3d"
			data-layout={threeD ? layout : "flat"}
			className={cn(galleryStyles.root, className)}
			style={variables}
			onKeyDown={onKeyDown}
			{...props}
		>
			{threeD ? (
				<div
					data-slot="gallery-stage"
					className={galleryStyles.stage}
					onPointerDown={(event) => {
						if (event.button !== 0) return;
						cancelAnimationFrame(spring.current.frame);
						drag.current = { x: event.clientX, start: position, moved: false };
					}}
					onPointerMove={(event) => {
						const state = drag.current;
						if (!state) return;
						const dx = event.clientX - state.x;
						if (!state.moved && Math.abs(dx) < 6) return;
						if (!state.moved) {
							state.moved = true;
							event.currentTarget.setPointerCapture(event.pointerId);
						}
						const next = state.start - dx / (itemSize * 0.8);
						setDragged(loops ? next : Math.max(-0.5, Math.min(n - 0.5, next)));
					}}
					onPointerUp={(event) => {
						const state = drag.current;
						if (state?.moved) {
							settle(position, ((event.clientX - state.x) / (itemSize * 0.8)) * 0.6);
							// Let the click that ends the drag be ignored, then forget it.
							setTimeout(() => (drag.current = null));
						} else drag.current = null;
					}}
					onPointerCancel={() => (drag.current = null)}
					onWheel={(event) => {
						if (Math.abs(event.deltaX) < 20 && Math.abs(event.deltaY) < 20) return;
						if (layout !== "stack" && Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
						goTo(turn + Math.sign(event.deltaX || event.deltaY));
					}}
				>
					<div className={cn(galleryStyles.scene, moving && galleryStyles.moving)} style={{ transform: sceneTransform(layout, position, n, itemSize) }}>
						{items.map((item, i) => card(item, i, itemPlace(layout, i, loops ? position : Math.max(-0.5, Math.min(n - 0.5, position)), n, itemSize)))}
					</div>
				</div>
			) : (
				<div data-slot="gallery-grid" className={galleryStyles.flat}>
					{items.map((item, i) => card(item, i))}
				</div>
			)}
			{!onOpen && (
				<Dialog open={opened !== null} onOpenChange={(value) => !value && setOpened(null)}>
					<DialogContent size="lg">
						{opened && (
							<>
								<div className="relative aspect-video overflow-hidden rounded-lg">
									<Media item={{ ...opened, caption: undefined }} />
								</div>
								<DialogTitle>{opened.label}</DialogTitle>
								{(opened.description ?? opened.caption) && <DialogDescription>{opened.description ?? opened.caption}</DialogDescription>}
							</>
						)}
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
