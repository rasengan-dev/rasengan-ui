/*
 * Motion's DOM animation features, in a file of their own (RFC-0007): `@/lib/motion` imports this one dynamically,
 * so bundlers put it in a separate chunk, fetched only when a component that needs it (Presence, Parallax, Tilt,
 * Magnetic) renders. Installed as `@/lib/motion-features`.
 */
export { domAnimation as default } from "motion/react";
