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
	/** Read after the label, so screen-reader users know to hold. */
	hint?: string;
};

/**
 * A button that acts only once held, for what is hard to undo (delete, publish, pay). A wash fills it while it is held
 * (pointer, Space or Enter) and drains if it is let go early.
 */
export function HoldButton({ onConfirm, duration = 1.2, hint = "Press and hold to confirm", className, children, disabled, ...props }: HoldButtonProps) {
	const [holding, setHolding] = React.useState(false);
	const timer = React.useRef(0);
	const start = () => {
		if (disabled || timer.current) return;
		setHolding(true);
		timer.current = window.setTimeout(() => {
			timer.current = 0;
			setHolding(false);
			onConfirm();
		}, duration * 1000);
	};
	const stop = () => {
		window.clearTimeout(timer.current);
		timer.current = 0;
		setHolding(false);
	};
	React.useEffect(() => () => window.clearTimeout(timer.current), []);

	return (
		<Button
			data-slot="hold-button"
			data-holding={holding ? "" : undefined}
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
				aria-hidden="true"
				data-holding={holding ? "" : undefined}
				className={buttonStyles.holdFill}
				style={holding ? { transform: "scaleX(1)", transitionDuration: `${duration}s` } : undefined}
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
