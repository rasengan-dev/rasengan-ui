/**
 * @rasengan-ui/motion — shared animation primitives for Rasengan UI v2 blocks (RFC-0001).
 * Motion-based primitives live here; GSAP ones are in "@rasengan-ui/motion/gsap",
 * so pages that do not use them never load GSAP.
 */
export { MotionProvider, MotionScript, motionScript, type MotionProviderProps } from "./provider";
export { useMotionSettings, shouldAnimate, type MotionSettings } from "./context";
export { defaultMotionTokens, type MotionTokens, type MotionIntensity, type MotionMode } from "./tokens";
export { Reveal, useReveal, type RevealProps, type RevealOptions, type RevealTag, type RevealFrom } from "./reveal";
export { Stagger, type StaggerProps, type StaggerItemProps } from "./stagger";
export { Counter, type CounterProps } from "./counter";
export { Marquee, type MarqueeProps } from "./marquee";
export { Tilt, Magnetic, type TiltProps, type MagneticProps } from "./pointer";
export { Parallax, Presence, type ParallaxProps, type PresenceProps } from "./parallax";
