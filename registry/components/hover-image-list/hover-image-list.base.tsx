"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { springAtRest, stepSpring, useMotion, type SpringState } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { hoverImageListStyles, hoverImageListVariants, type HoverImageListVariantProps } from "./hover-image-list.styles";

export { hoverImageListVariants, type HoverImageListVariantProps } from "./hover-image-list.styles";

const HoverImageListContext = React.createContext<string | null>(null);

export interface HoverImageListProps extends React.HTMLAttributes<HTMLUListElement>, HoverImageListVariantProps {
	/** Fixes the current row (an index) and shows its picture beside it, still, for demos and screenshots. */
	active?: number;
}

const rowSelector = '[data-slot="hover-image-list-row"]';
/** Room between the mouse and the picture, in pixels. */
const GAP = 24;

/**
 * A list of rows (projects, services) whose picture floats beside the mouse over the row it hovers, eased by the
 * village's spring; the other rows fade to the muted colour. At intensity 1 the picture fades in beside the row; from 2
 * it follows the mouse; at 3 it also tilts with the mouse's speed. Keyboard focus shows the row's picture beside the
 * row, still. On a touch screen, with reduced motion, `final` or at intensity 0, it is a plain list of rows.
 */
export function HoverImageList({ size, active, className, children, onPointerMove, onPointerLeave, onFocus, onBlur, ...props }: HoverImageListProps) {
	const ref = React.useRef<HTMLUListElement>(null);
	const { tokens, allows } = useMotion(ref);
	const [fine, setFine] = React.useState(false);
	const [current, setCurrent] = React.useState<string | null>(null);
	const [armed, setArmed] = React.useState(false);
	const fixed = active !== undefined;
	const enabled = allows(1) && !fixed;

	React.useEffect(() => {
		setArmed(true);
		const query = window.matchMedia("(pointer: fine)");
		const sync = () => setFine(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);

	// The picture's place (its top-left corner in the list), straight or on the village's spring. One write per frame.
	const springs = React.useRef<{ x: SpringState; y: SpringState }>({ x: { value: 0, velocity: 0 }, y: { value: 0, velocity: 0 } });
	const goal = React.useRef({ x: 0, y: 0 });
	const sprung = React.useRef(false);
	const frame = React.useRef(0);
	const last = React.useRef(0);

	const paint = React.useCallback(() => {
		const element = ref.current;
		if (!element) return;
		const { x, y } = springs.current;
		element.style.setProperty("--hil-x", `${x.value}px`);
		element.style.setProperty("--hil-y", `${y.value}px`);
		// At intensity 3 the picture leans with the mouse's speed, a few degrees at most.
		const lean = sprung.current && allows(3) ? Math.max(-8, Math.min(8, x.velocity / 120)) : 0;
		element.style.setProperty("--hil-rotate", `${lean.toFixed(2)}deg`);
	}, [allows]);

	const tick = React.useCallback(
		(now: number) => {
			const dt = Math.min(1 / 30, (now - (last.current || now)) / 1000) || 1 / 60;
			last.current = now;
			let resting = true;
			for (const key of ["x", "y"] as const) {
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

	React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

	/** The picture's size, from the one shown (they share it). */
	const pictureSize = (list: HTMLElement) => {
		const picture = list.querySelector<HTMLElement>('[data-slot="hover-image-list-image"]');
		return { w: picture?.offsetWidth || 224, h: picture?.offsetHeight || 168 };
	};

	/** Puts the picture somewhere: on the spring (following the mouse), or straight there (beside a row). */
	const place = React.useCallback(
		(x: number, y: number, spring: boolean, jump: boolean) => {
			const list = ref.current;
			if (!list) return;
			const { w } = pictureSize(list);
			goal.current = { x: Math.max(0, Math.min(list.clientWidth - w, x)), y };
			sprung.current = spring;
			if (!spring || jump) {
				cancelAnimationFrame(frame.current);
				frame.current = 0;
				springs.current = { x: { value: goal.current.x, velocity: 0 }, y: { value: goal.current.y, velocity: 0 } };
				paint();
				return;
			}
			if (!frame.current) frame.current = requestAnimationFrame(tick);
		},
		[paint, tick],
	);

	/** Beside a row: past the middle of the list, centred on the row. */
	const besideRow = React.useCallback(
		(row: HTMLElement) => {
			const list = ref.current;
			if (!list) return;
			const { h } = pictureSize(list);
			const listBox = list.getBoundingClientRect();
			const rowBox = row.getBoundingClientRect();
			place(list.clientWidth * 0.55, rowBox.top - listBox.top + rowBox.height / 2 - h / 2, false, true);
		},
		[place],
	);

	// A fixed row: its picture beside it, still.
	React.useEffect(() => {
		const list = ref.current;
		if (!list || active === undefined || !armed) return;
		const row = list.querySelectorAll<HTMLElement>(rowSelector)[active];
		if (!row) return;
		setCurrent(row.dataset.row ?? null);
		besideRow(row);
	}, [active, armed, besideRow]);

	const shown = fixed || enabled ? current : null;

	return (
		<HoverImageListContext.Provider value={shown}>
			<ul
				ref={ref}
				data-slot="hover-image-list"
				data-active={shown ? "" : undefined}
				data-armed={armed ? "" : undefined}
				className={cn(hoverImageListVariants({ size }), className)}
				onPointerMove={(event) => {
					onPointerMove?.(event);
					if (!enabled || !fine || event.pointerType !== "mouse") return;
					const row = event.target instanceof Element ? event.target.closest<HTMLElement>(rowSelector) : null;
					if (!row || !event.currentTarget.contains(row)) return;
					const id = row.dataset.row ?? null;
					const entering = current === null;
					if (id !== current) setCurrent(id);
					if (!allows(2)) {
						if (id !== current) besideRow(row);
						return;
					}
					const box = event.currentTarget.getBoundingClientRect();
					const { h } = pictureSize(event.currentTarget);
					place(event.clientX - box.left + GAP, event.clientY - box.top - h / 2, true, entering);
				}}
				onPointerLeave={(event) => {
					onPointerLeave?.(event);
					if (!fixed && event.pointerType === "mouse") setCurrent(null);
				}}
				onFocus={(event) => {
					onFocus?.(event);
					const row = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>(rowSelector) : null;
					if (!enabled || !row) return;
					setCurrent(row.dataset.row ?? null);
					besideRow(row);
				}}
				onBlur={(event) => {
					onBlur?.(event);
					if (!fixed && !event.currentTarget.contains(event.relatedTarget as Node | null)) setCurrent(null);
				}}
				{...props}
			>
				{children}
			</ul>
		</HoverImageListContext.Provider>
	);
}

export interface HoverImageListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "children"> {
	/** The row's picture. Decorative: the row's own text says where it goes. */
	image: string;
	/** Makes the row a link. */
	href?: string;
	/** Replaces the row's element: a router's link, for example (`render={<Link to="/work/akwa" />}`). */
	render?: useRender.RenderProp;
	children?: React.ReactNode;
}

/**
 * One row of a HoverImageList, with its picture: an `<a>` with `href`, the element given in `render`, or a plain row.
 * Put a `<small>` in it for a quieter line (a year, a kind of work).
 */
export function HoverImageListItem({ image, href, render, className, children, ...props }: HoverImageListItemProps) {
	const id = React.useId();
	const current = React.useContext(HoverImageListContext) === id;
	const row = useRender({
		defaultTagName: "a",
		render: render ?? (href ? undefined : <div />),
		props: mergeProps<"a">({
			href,
			className: hoverImageListStyles.row,
			"data-slot": "hover-image-list-row",
			"data-row": id,
			"data-current": current ? "" : undefined,
			children,
		} as React.ComponentProps<"a">, {}),
	});
	return (
		<li data-slot="hover-image-list-item" className={cn(hoverImageListStyles.item, className)} {...props}>
			{row}
			<img src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" data-slot="hover-image-list-image" data-current={current ? "" : undefined} className={hoverImageListStyles.image} />
		</li>
	);
}
