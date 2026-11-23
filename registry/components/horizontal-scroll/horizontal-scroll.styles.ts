/*
 * RFC-0010. Static (no JavaScript, reduced motion, `final`, intensity below 2, a screen under 48rem wide): the track is a
 * native horizontal row, swiped or scrolled with a keyboard, snapping to each item.
 *
 * `data-layout="pinned"`: the root is one screen tall plus the track's overflow (--shift, measured); its viewport sticks
 * to the top for that distance and the track moves left by --scroll-progress × --shift, so a screen of scroll down is a
 * screen of track sideways. `data-layout="still"` (a fixed `progress`): the same moment in place, without pinning.
 * `data-effect="drift"` (intensity 3): each item's content drifts a little against the track, for depth.
 */
export const horizontalScrollStyles = {
	root: [
		"relative [--track-gap:1.5rem] [--track-inset:max(1rem,calc((100%_-_72rem)_/_2))]",
		"data-[layout=pinned]:h-[calc(100svh_+_var(--shift,0px))]",
	].join(" "),
	viewport: [
		"overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory",
		"in-data-[layout]:snap-none in-data-[layout]:overflow-clip",
		"in-data-[layout=pinned]:sticky in-data-[layout=pinned]:top-0 in-data-[layout=pinned]:flex in-data-[layout=pinned]:h-svh in-data-[layout=pinned]:items-center",
	].join(" "),
	track: [
		"m-0 flex w-max list-none gap-(--track-gap) px-(--track-inset) py-2",
		"in-data-[layout]:[translate:calc(var(--scroll-progress,0)_*_var(--shift,0px)_*_-1)_0]",
		"rtl:in-data-[layout]:[translate:calc(var(--scroll-progress,0)_*_var(--shift,0px))_0]",
	].join(" "),
	item: [
		"shrink-0 snap-start scroll-ms-(--track-inset)",
		"in-data-[effect=drift]:[&>*]:[translate:calc((var(--scroll-progress,0)_-_0.5)_*_-2rem)_0]",
	].join(" "),
};
