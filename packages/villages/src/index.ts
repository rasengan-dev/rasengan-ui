/**
 * The villages, natures and tints that exist, for the site and the CLI.
 * Their values live in the CSS files (contract.css, natures.css, villages/*.css).
 */

export const natures = {
	katon: { title: "Katon", element: "Fire" },
	doton: { title: "Doton", element: "Earth" },
	futon: { title: "Futon", element: "Wind" },
	suiton: { title: "Suiton", element: "Water" },
	raiton: { title: "Raiton", element: "Lightning" },
	onmyoton: { title: "Onmyōton", element: "Yin–Yang" },
} as const;

export type Nature = keyof typeof natures;

/** The village's own greys, or the same lightness with no chroma. */
export const tints = {
	village: { title: "Village greys" },
	neutral: { title: "Neutral greys" },
} as const;

export type Tint = keyof typeof tints;

export const defaultTint: Tint = "village";

export interface VillageInfo {
	title: string;
	/** One line, for the switcher and `rasengan-ui village list`. */
	description: string;
	/** The nature used when neither the page nor the CLI config sets one. */
	defaultNature: Nature;
	status: "beta" | "stable";
}

export const villages = {
	konoha: {
		title: "Konoha",
		description: "The Leaf: warm, rounded and balanced. The default.",
		defaultNature: "katon",
		status: "beta",
	},
	kiri: {
		title: "Kiri",
		description: "The Mist: soft contrast, translucent surfaces, airy controls.",
		defaultNature: "suiton",
		status: "beta",
	},
	iwa: {
		title: "Iwa",
		description: "The Stone: no radius, heavy borders, mono labels, dense.",
		defaultNature: "doton",
		status: "beta",
	},
} as const satisfies Record<string, VillageInfo>;

export type Village = keyof typeof villages;

export const defaultVillage: Village = "konoha";
