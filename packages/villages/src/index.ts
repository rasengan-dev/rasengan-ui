/**
 * The villages and natures that exist, for the site and the CLI. Their
 * values live in the CSS files (contract.css, natures.css, villages/*.css).
 */

export const natures = {
	katon: { title: "Katon", element: "Fire" },
	doton: { title: "Doton", element: "Earth" },
	futon: { title: "Futon", element: "Wind" },
	suiton: { title: "Suiton", element: "Water" },
	raiton: { title: "Raiton", element: "Lightning" },
} as const;

export type Nature = keyof typeof natures;

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
} as const satisfies Record<string, VillageInfo>;

export type Village = keyof typeof villages;

export const defaultVillage: Village = "konoha";
