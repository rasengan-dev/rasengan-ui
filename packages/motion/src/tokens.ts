/**
 * Motion tokens in numbers, for Motion and GSAP (which do not read CSS
 * variables). Defaults match the nova direction; a direction or a
 * <MotionProvider tokens={…}> overrides them, and must match its CSS.
 */
export interface MotionTokens {
	/** Seconds. */
	durations: { fast: number; base: number; slow: number };
	/** Cubic bezier for Motion. */
	easeOut: [number, number, number, number];
	easeInOut: [number, number, number, number];
	/** Named eases for GSAP (no CustomEase plugin needed). */
	gsapEaseOut: string;
	gsapEaseInOut: string;
	/** Pixels an element travels when it reveals. */
	revealDistance: number;
	/** Seconds between siblings. */
	stagger: number;
	spring: { stiffness: number; damping: number };
}

export const defaultMotionTokens: MotionTokens = {
	durations: { fast: 0.16, base: 0.52, slow: 0.9 },
	easeOut: [0.16, 1, 0.3, 1],
	easeInOut: [0.65, 0, 0.35, 1],
	gsapEaseOut: "expo.out",
	gsapEaseInOut: "power2.inOut",
	revealDistance: 24,
	stagger: 0.06,
	spring: { stiffness: 260, damping: 30 },
};

/** 0 none · 1 subtle (fades only) · 2 rich (travel, splits, parallax) · 3 showcase (tilt, magnetic). */
export type MotionIntensity = 0 | 1 | 2 | 3;

/**
 * - `pending`: before the provider has read the page state (server render, first paint).
 * - `ready`: animate.
 * - `final`: render every animation in its end state (screenshots, visual tests, agents).
 * - `off`: no motion (reduced motion, or ?motion=off).
 */
export type MotionMode = "pending" | "ready" | "final" | "off";
