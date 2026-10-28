import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { shouldAnimate, useMotionSettings } from "./context";

type DivProps = Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> & {
	children: ReactNode;
};

/** Where the pointer is inside the element, from -0.5 to 0.5 on each axis. */
function pointerOffset(event: PointerEvent<HTMLElement>) {
	const rect = event.currentTarget.getBoundingClientRect();
	return {
		x: (event.clientX - rect.left) / rect.width - 0.5,
		y: (event.clientY - rect.top) / rect.height - 0.5,
	};
}

export interface TiltProps extends DivProps {
	/** Maximum rotation in degrees. */
	max?: number;
}

/** Cards that tilt toward the pointer in 3D. Mouse only; showcase intensity (3). */
export function Tilt({ max = 8, children, ...rest }: TiltProps) {
	const settings = useMotionSettings();
	const enabled = shouldAnimate(settings, 3);
	const rotateX = useSpring(useMotionValue(0), settings.tokens.spring);
	const rotateY = useSpring(useMotionValue(0), settings.tokens.spring);

	return (
		<m.div
			{...rest}
			style={{ rotateX, rotateY, transformPerspective: 900 }}
			onPointerMove={(event) => {
				if (!enabled || event.pointerType !== "mouse") return;
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
	);
}

export interface MagneticProps extends DivProps {
	/** Share of the pointer offset the element follows (0–1). */
	strength?: number;
}

/** Drifts toward the pointer, then springs back (buttons, CTAs). Mouse only; showcase intensity (3). */
export function Magnetic({ strength = 0.3, children, ...rest }: MagneticProps) {
	const settings = useMotionSettings();
	const enabled = shouldAnimate(settings, 3);
	const x = useSpring(useMotionValue(0), settings.tokens.spring);
	const y = useSpring(useMotionValue(0), settings.tokens.spring);

	return (
		<m.div
			{...rest}
			style={{ x, y, display: "inline-block" }}
			onPointerMove={(event) => {
				if (!enabled || event.pointerType !== "mouse") return;
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
	);
}
