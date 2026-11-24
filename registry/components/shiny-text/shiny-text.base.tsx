"use client";

import * as React from "react";

import { useInViewOnce, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { shinyTextVariants, type ShinyTextVariantProps } from "./shiny-text.styles";

export interface ShinyTextProps extends React.HTMLAttributes<HTMLSpanElement>, ShinyTextVariantProps {
	/** `view`: sweeps when it comes into view. `hover`: when the pointer or keyboard focus reaches it (or the link or button around it). */
	on?: "view" | "hover";
	/** How many sweeps, then it rests. At most what fits in five seconds; intensity 1 sweeps once. */
	times?: number;
	/** Fixes the sheen's place (0 to 1 across the text), for demos and screenshots. */
	progress?: number;
}

/** Five seconds: what moves on its own longer than that needs a pause control (WCAG 2.2.2, invariant 21). */
const SHORT = 5;

/**
 * A sheen that crosses a word or a label, then rests: on view, or on hover and focus. The glyphs stay in the tone's
 * colour for words, the band a little lighter, so the text reads at every moment. Each sweep takes the village's slow
 * duration times four. With reduced motion, `final`, intensity 0, forced colours or without JavaScript it is plain
 * text, as it is between sweeps.
 */
export function ShinyText({ on = "view", times = 2, progress, tone, className, style, ...props }: ShinyTextProps) {
	const ref = React.useRef<HTMLSpanElement>(null);
	const { tokens, allows } = useMotion(ref);
	const inView = useInViewOnce(ref);
	const [hovers, setHovers] = React.useState(0);
	const played = React.useRef(false);

	// On hover: listen on the element, or the link or button that holds it.
	React.useEffect(() => {
		const element = ref.current;
		if (!element || on !== "hover") return;
		const target = element.closest<HTMLElement>("a, button") ?? element;
		const start = () => setHovers((n) => n + 1);
		target.addEventListener("pointerenter", start);
		target.addEventListener("focusin", start);
		return () => {
			target.removeEventListener("pointerenter", start);
			target.removeEventListener("focusin", start);
		};
	}, [on]);

	React.useEffect(() => {
		const element = ref.current;
		if (!element || progress !== undefined || !allows(1)) return;
		if (on === "view" && (!inView || played.current)) return;
		if (on === "hover" && hovers === 0) return;
		played.current = true;
		const sweep = tokens.slow * 4;
		const count = Math.max(1, Math.min(allows(2) ? times : 1, Math.floor(SHORT / sweep)));
		element.setAttribute("data-shining", "");
		const animation = element.animate([{ backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0" }], {
			duration: sweep * 1000,
			iterations: count,
			easing: "ease-in-out",
		});
		animation.onfinish = () => element.removeAttribute("data-shining");
		return () => {
			animation.cancel();
			element.removeAttribute("data-shining");
		};
	}, [on, inView, hovers, progress, allows, tokens, times]);

	return (
		<span
			ref={ref}
			data-slot="shiny-text"
			data-tone={tone ?? "neutral"}
			data-shining={progress === undefined ? undefined : ""}
			className={cn(shinyTextVariants({ tone }), className)}
			style={progress === undefined ? style : { ...style, backgroundPosition: `${(1 - progress) * 100}% 0` }}
			{...props}
		/>
	);
}
