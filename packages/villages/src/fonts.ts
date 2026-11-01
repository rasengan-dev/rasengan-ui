/**
 * The fonts a village can name (RFC-0006, "The recipe"): open licences, all on Google Fonts. Each carries the exact
 * stack a village file writes and the family the site loads. A recipe may name another font: the engine warns and
 * writes it in front of the fallbacks of its category, and the project loads it.
 */

export type FontCategory = "sans" | "serif" | "mono";

export interface FontInfo {
	category: FontCategory;
	stack: string;
	/** The `family` parameter of a Google Fonts css2 URL. */
	google: string;
}

const fallbacks: Record<FontCategory, string> = {
	sans: "ui-sans-serif, system-ui, sans-serif",
	serif: "ui-serif, Georgia, serif",
	mono: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
};

const font = (family: string, category: FontCategory, google: string, extra = ""): FontInfo => ({
	category,
	stack: `"${family}", ${fallbacks[category]}${extra}`,
	google: `${family.replace(/ /g, "+")}:${google}`,
});

export const fonts = {
	Figtree: font("Figtree", "sans", "wght@400;500;600;700", ', "Apple Color Emoji", "Segoe UI Emoji"'),
	Manrope: font("Manrope", "sans", "wght@400;500;600;700"),
	"Space Grotesk": font("Space Grotesk", "sans", "wght@400;500;600;700"),
	Inter: font("Inter", "sans", "wght@400;500;600;700"),
	"DM Sans": font("DM Sans", "sans", "wght@400;500;600;700"),
	"IBM Plex Sans": font("IBM Plex Sans", "sans", "wght@400;500;600;700"),
	Geist: font("Geist", "sans", "wght@400;500;600;700"),
	Fraunces: font("Fraunces", "serif", "opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700"),
	"Instrument Serif": font("Instrument Serif", "serif", "ital@0;1"),
	"JetBrains Mono": font("JetBrains Mono", "mono", "wght@400;500;600;700"),
	"IBM Plex Mono": font("IBM Plex Mono", "mono", "wght@400;500;600;700"),
} as const satisfies Record<string, FontInfo>;

export type FontName = keyof typeof fonts;

/** A known font, or one the project loads itself: a sans-serif unless its name says mono or serif. */
export function fontInfo(family: string): FontInfo & { known: boolean } {
	const known = (fonts as Record<string, FontInfo>)[family];
	if (known) return { ...known, known: true };
	const category: FontCategory = /mono/i.test(family) ? "mono" : /serif/i.test(family) && !/sans/i.test(family) ? "serif" : "sans";
	return { category, stack: `"${family}", ${fallbacks[category]}`, google: "", known: false };
}
