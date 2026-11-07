/*
 * The text keeps the type it is given (a heading's, a paragraph's): text-reveal only moves its pieces, which
 * @/lib/split-text makes inline blocks (words, and characters inside them; by lines, words that know their line). A
 * word never breaks between its characters.
 */
export const textRevealStyles = {
	root: "[&_[data-split=word]]:whitespace-nowrap",
};
