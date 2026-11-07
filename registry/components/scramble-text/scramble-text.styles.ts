/*
 * Glyphs that are still scrambling wear the nature's colour (the primary's words), and fall back to the text's own
 * colour once decoded. Digits keep one width so the line moves less while it decodes.
 */
export const scrambleTextStyles = {
	root: "tabular-nums",
	glyph: "tone-primary text-tone-text",
};
