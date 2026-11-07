/*
 * Each digit is a window one line tall over a column of 0 to 9; the column slides to the digit with the village's
 * slow duration and ease-out (Kusa's overshoots), one column after another by the village's stagger. The window is
 * cut with clip-path, not overflow, so the digit keeps the text's baseline. Digits share one width (tabular-nums).
 * When the number gets longer or shorter, places and separators grow in or shrink out by width, so the rest slides.
 */
export const numberRollStyles = {
	root: "inline-flex items-baseline tabular-nums whitespace-nowrap",
	digit: "relative inline-block [clip-path:inset(0)]",
	placeholder: "invisible",
	column: "absolute inset-x-0 top-0 flex flex-col",
	part: "inline-block whitespace-pre [clip-path:inset(0)]",
};
