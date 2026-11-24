/*
 * RFC-0011. The words share one grid cell (the slot), so the slot is as wide as the widest until JavaScript measures the
 * current one and eases the width to it. The slot clips vertically for the slide and the roll, with a little room for
 * accents and descenders. Only the current word is shown; the others are hidden, not removed, so the cell keeps its size.
 */
export const textRotateStyles = {
	slot: "inline-grid overflow-y-clip py-[0.12em] -my-[0.12em] align-bottom whitespace-nowrap [&>*]:[grid-area:1/1] [&>*]:justify-self-start",
	word: "invisible data-current:visible",
	pause: "ms-2 align-middle",
};
