/*
 * The root clips (the mask is its clip-path); the media inside fills it and carries the zoom. The root keeps the
 * media's size from the first render, so nothing shifts when the mask opens. Scrubbed (RFC-0010), both read
 * --scroll-progress: the clip and the scale are written inline from it.
 */
export const imageRevealStyles = {
	/** Scrubbed: the media zooms out from 1.12 as the mask opens (ZOOM in the component). */
	scrubbed: "[&>*]:[scale:calc(1_+_0.12_*_(1_-_var(--scroll-progress,0)))]",
	root: "relative overflow-hidden [&>img]:block [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>video]:block [&>video]:h-full [&>video]:w-full [&>video]:object-cover",
};
