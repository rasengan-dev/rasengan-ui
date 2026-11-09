"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "@/lib/utils";
import { buttonStyles, buttonVariants, type ButtonVariantProps } from "./button.styles";

export { buttonVariants, type ButtonVariantProps } from "./button.styles";

export type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & ButtonVariantProps & { className?: string };

export function Button({ className, variant, tone, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			data-variant={variant ?? "default"}
			data-tone={variant === "destructive" ? "destructive" : (tone ?? "primary")}
			className={cn(buttonVariants({ variant, tone, size }), className)}
			{...props}
		/>
	);
}

export type HoldButtonProps = Omit<ButtonProps, "onClick"> & {
	/** Called once the button has been held for `duration`. */
	onConfirm: () => void;
	/** Seconds to hold. */
	duration?: number;
	/** Seconds to drain from full when let go early; by default it follows how full it got (0.9 times its load time). */
	drainDuration?: number;
	/** Where the fill grows from: the start edge, the end edge, the centre, or the bottom. */
	fill?: "start" | "end" | "center" | "bottom";
	/** What the full fill does once confirmed: fade out, flash then fade, or vanish at once. */
	confirmEffect?: "fade" | "flash" | "none";
	/** Called on every frame the fill moves, with how full it is (0 to 1): to show a percentage or a ring elsewhere. */
	onHoldProgress?: (progress: number) => void;
	/** Read after the label, so screen-reader users know to hold. */
	hint?: string;
};

/**
 * A button that acts only once held, for what is hard to undo (delete, publish, pay). A fill sweeps across it while it
 * is held (pointer, Space or Enter) and drains back if it is let go early.
 */
export function HoldButton({
	onConfirm,
	duration = 1.2,
	drainDuration,
	fill = "start",
	confirmEffect = "fade",
	onHoldProgress,
	hint = "Press and hold to confirm",
	className,
	children,
	disabled,
	...props
}: HoldButtonProps) {
	const fillRef = React.useRef<HTMLSpanElement>(null);
	const animation = React.useRef<Animation | null>(null);
	const holding = React.useRef(false);
	const frame = React.useRef(0);
	const [state, setState] = React.useState<"idle" | "holding" | "done">("idle");
	const axis = fill === "bottom" ? "Y" : "X";
	const scale = (value: number) => `scale${axis}(${value})`;
	const progressRef = React.useRef(onHoldProgress);
	progressRef.current = onHoldProgress;

	/** How full the button is now, 0 to 1, read from the fill's current transform. */
	const progress = React.useCallback(() => {
		const element = fillRef.current;
		if (!element) return 0;
		const transform = getComputedStyle(element).transform;
		if (transform === "none") return 0;
		const matrix = new DOMMatrixReadOnly(transform);
		return axis === "Y" ? matrix.d : matrix.a;
	}, [axis]);
	/** The village's ease-out, read from the contract (the fill drains with it). */
	const easeOut = () => (fillRef.current ? getComputedStyle(fillRef.current).getPropertyValue("--motion-ease-out").trim() : "") || "ease-out";

	/** Reports progress on every frame while an animation of the fill runs. */
	const report = React.useCallback(() => {
		cancelAnimationFrame(frame.current);
		if (!progressRef.current) return;
		const tick = () => {
			progressRef.current?.(Math.max(0, Math.min(1, progress())));
			if (animation.current && animation.current.playState === "running") frame.current = requestAnimationFrame(tick);
		};
		frame.current = requestAnimationFrame(tick);
	}, [progress]);

	const start = () => {
		const element = fillRef.current;
		if (disabled || !element || holding.current) return;
		holding.current = true;
		setState("holding");
		const from = progress();
		animation.current?.cancel();
		// Loading: linear, over the time left, from wherever a drain had got to.
		const load = element.animate([{ transform: scale(from), opacity: 1 }, { transform: scale(1), opacity: 1 }], {
			duration: Math.max(0, (1 - from) * duration * 1000),
			easing: "linear",
			fill: "forwards",
		});
		animation.current = load;
		report();
		load.finished.then(
			() => {
				if (animation.current !== load) return;
				holding.current = false;
				setState("done");
				progressRef.current?.(1);
				onConfirm();
				const reset = () => {
					animation.current?.cancel();
					animation.current = null;
					setState("idle");
					progressRef.current?.(0);
				};
				if (confirmEffect === "none") return reset();
				// Done: the full fill fades away, after a flash with "flash". The village's ease-out shapes each step.
				const ease = easeOut();
				const frames: Keyframe[] =
					confirmEffect === "flash"
						? [
								{ transform: scale(1), opacity: 1, easing: ease },
								{ transform: scale(1), opacity: 0.35, offset: 0.25, easing: ease },
								{ transform: scale(1), opacity: 1, offset: 0.5, easing: ease },
								{ transform: scale(1), opacity: 0 },
							]
						: [
								{ transform: scale(1), opacity: 1, easing: ease },
								{ transform: scale(1), opacity: 0 },
							];
				const end = element.animate(frames, { duration: confirmEffect === "flash" ? 700 : 400, easing: "linear", fill: "forwards" });
				animation.current = end;
				end.finished.then(() => animation.current === end && reset(), () => undefined);
			},
			() => undefined,
		);
	};

	const stop = () => {
		const element = fillRef.current;
		if (!holding.current || !element) return;
		holding.current = false;
		setState("idle");
		const from = progress();
		animation.current?.cancel();
		// Unloading: back to empty from where it was, easing out.
		const drain = element.animate([{ transform: scale(from) }, { transform: scale(0) }], {
			duration: drainDuration !== undefined ? from * drainDuration * 1000 : Math.max(320, from * duration * 1000 * 0.9),
			easing: easeOut(),
			fill: "forwards",
		});
		animation.current = drain;
		report();
	};
	React.useEffect(
		() => () => {
			animation.current?.cancel();
			cancelAnimationFrame(frame.current);
		},
		[],
	);

	// The fill's origin: the start or end edge follows the writing direction.
	const origin = fill === "bottom" ? "bottom" : fill === "center" ? "center" : fill === "end" ? "right" : "left";
	return (
		<Button
			data-slot="hold-button"
			data-state={state === "idle" ? undefined : state}
			disabled={disabled}
			className={cn(buttonStyles.hold, className)}
			onPointerDown={(event) => {
				if (event.button === 0) start();
			}}
			onPointerUp={stop}
			onPointerLeave={stop}
			onPointerCancel={stop}
			onKeyDown={(event) => {
				if ((event.key === " " || event.key === "Enter") && !event.repeat) {
					event.preventDefault();
					start();
				}
			}}
			onKeyUp={(event) => {
				if (event.key === " " || event.key === "Enter") stop();
			}}
			onBlur={stop}
			{...props}
		>
			<span
				ref={fillRef}
				aria-hidden="true"
				data-slot="hold-button-fill"
				data-fill={fill}
				className={buttonStyles.holdFill}
				style={{ transform: scale(0), transformOrigin: origin }}
			/>
			{children}
			<span className="sr-only">, {hint}</span>
		</Button>
	);
}

/**
 * A button label that rolls up on hover and keyboard focus while a copy rolls in from below; letter by letter with
 * `stagger`. Put it inside a Button: `<Button><ButtonRollingText>Get started</ButtonRollingText></Button>`.
 */
export function ButtonRollingText({ children, stagger = false, className, ...props }: Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & { children: string; stagger?: boolean }) {
	const letters = (copy: boolean) =>
		[...children].map((letter, i) => (
			<span key={i} className={buttonStyles.rollLetter} style={{ ["--index" as string]: i }} aria-hidden={copy || undefined}>
				{letter}
			</span>
		));
	return (
		<span data-slot="button-rolling-text" className={cn(buttonStyles.roll, className)} {...props}>
			{stagger ? (
				<>
					<span className="sr-only">{children}</span>
					<span aria-hidden="true" className="inline-block">
						{letters(true)}
					</span>
					<span aria-hidden="true" className={buttonStyles.rollCopyLetters}>
						{letters(true)}
					</span>
				</>
			) : (
				<>
					<span className={buttonStyles.rollLine}>{children}</span>
					<span aria-hidden="true" className={buttonStyles.rollCopy}>
						{children}
					</span>
				</>
			)}
		</span>
	);
}
