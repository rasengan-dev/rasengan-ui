import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, m, useScroll, useTransform } from "motion/react";
import { shouldAnimate, useMotionSettings } from "./context";

export interface ParallaxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> {
	/** How far it drifts while crossing the viewport, as a share of 200px (0.2 → ±40px). */
	speed?: number;
	children: ReactNode;
}

/** Moves at a different rate than the page while it scrolls past. Rich intensity (2). */
export function Parallax({ speed = 0.2, children, ...rest }: ParallaxProps) {
	const ref = useRef<HTMLDivElement>(null);
	const settings = useMotionSettings();
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

	return (
		<m.div ref={ref} {...rest} style={shouldAnimate(settings, 2) ? { y } : undefined}>
			{children}
		</m.div>
	);
}

export interface PresenceProps {
	/** Change it to swap the content (tab id, step number…). */
	id: string | number;
	children: ReactNode;
	className?: string;
}

/** Cross-fades between contents keyed by `id` (tabs, toggles, steps). */
export function Presence({ id, children, className }: PresenceProps) {
	const settings = useMotionSettings();
	const animated = shouldAnimate(settings, 1);
	const distance = settings.intensity >= 2 ? 8 : 0;
	return (
		<AnimatePresence mode="wait" initial={false}>
			<m.div
				key={id}
				className={className}
				initial={animated ? { opacity: 0, y: distance } : false}
				animate={{ opacity: 1, y: 0 }}
				exit={animated ? { opacity: 0, y: -distance } : undefined}
				transition={{ duration: animated ? settings.tokens.durations.fast * 1.5 : 0, ease: settings.tokens.easeOut }}
			>
				{children}
			</m.div>
		</AnimatePresence>
	);
}
