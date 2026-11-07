/*
 * The typed text sits over an invisible copy of the longest string, so the line never jumps while it types. The
 * caret is the text's own colour, a hair wide, at the height of a capital.
 */
export const typewriterStyles = {
	root: "inline-grid align-baseline",
	ghost: "invisible [grid-area:1/1]",
	typed: "[grid-area:1/1]",
	caret: "ms-[0.04em] inline-block h-[0.9em] w-[0.07em] translate-y-[0.1em] rounded-[1px] bg-current",
	pause: "ms-2 inline-flex align-middle",
};
