/*
 * RFC-0010. The root is a container (ADR-0013): below @3xl it is one column, and each item shows its own media under
 * its text (`StickyScrollMedia`); the stage is not shown.
 *
 * From @3xl, `data-layout="staged"` (the server's guess, and what JavaScript keeps at intensity 1 and up): the list and
 * the stage sit side by side, each item takes most of a screen, the items' own media hide and the stage sticks to the
 * middle of the viewport, showing the current item's media. `data-layout="list"` (reduced motion, `final`, intensity 0):
 * one column at every width, every item with its media.
 *
 * `data-effect` is how the stage changes: `cut` (intensity 1), `fade` (2, the village's slow duration), `slide` (3,
 * also the village's travel). Inactive items' titles go to the muted foreground, never below contrast.
 */
export const stickyScrollStyles = {
	root: "@container",
	grid: "grid gap-12 @3xl:in-data-[layout=staged]:grid-cols-[2fr_3fr]",
	list: "m-0 flex list-none flex-col gap-12 p-0 @3xl:in-data-[layout=staged]:gap-0",
	item: "group/sticky-item @3xl:in-data-[layout=staged]:flex @3xl:in-data-[layout=staged]:min-h-[60svh] @3xl:in-data-[layout=staged]:items-center",
	media: "mt-4 @3xl:in-data-[layout=staged]:hidden",
	stage: "hidden @3xl:in-data-[layout=staged]:block",
	stageInner: "sticky top-[var(--stage-top,calc(50svh_-_13rem))] grid",
	slide: [
		"col-start-1 row-start-1 opacity-0 data-current:opacity-100",
		"in-data-[effect=fade]:transition-opacity in-data-[effect=fade]:duration-slow in-data-[effect=fade]:ease-out",
		"in-data-[effect=slide]:transition-[opacity,translate] in-data-[effect=slide]:duration-slow in-data-[effect=slide]:ease-out",
		"in-data-[effect=slide]:[translate:0_var(--motion-distance)] in-data-[effect=slide]:data-current:[translate:0_0]",
	].join(" "),
};
