/**
 * Every word the workshop shows (ADR-0017), in English and in French. Pass your own to `RecipePanel`, `Report` and
 * `VillageStatus` for another language. What the engine itself says (a recipe's error, a note, the reason of an
 * adjustment it does not list here) stays in English.
 */
import type { Traits } from "@rasengan-ui/villages/engine";

export interface WorkshopLabels {
	/** The name field, above the rows. */
	name: string;

	base: string;
	brandColour: string;
	/** The row's value when the recipe names no colour: the base village's nature. */
	baseNature: (base: string) => string;
	brandColourHelp: (base: string) => string;
	pickColour: string;
	brandColourValue: string;
	useBaseNature: (base: string) => string;
	/** The names of the eight colours to start from, in the panel's order. */
	swatches: { ember: string; gold: string; leaf: string; teal: string; tide: string; indigo: string; plum: string; rose: string };

	neutrals: string;
	neutralsValue: (hue: number, percent: number) => string;
	neutralsHelp: string;
	greyHue: string;
	tint: string;

	contrast: string;
	radius: string;
	radiusHelp: string;
	borderWidth: string;
	headingFont: string;
	bodyFont: string;
	density: string;
	depth: string;
	motion: string;
	/** The intensity knob: how much moves, apart from how. */
	intensity: string;
	/** Its four values, 0 to 3. */
	intensities: [string, string, string, string];

	traits: string;
	traitsHelp: string;
	traitsAsBase: (base: string) => string;
	traitsChanged: (count: number, base: string) => string;
	traitNames: Record<keyof Traits, string>;

	/** A knob's or a trait's value (`soft`, `compact`, `lip`…) as shown. A value not listed shows as it is. */
	values: Record<string, string>;

	light: string;
	dark: string;

	status: {
		making: string;
		makingHint: string;
		recipeNeedsFix: string;
		needsChange: string;
		accessible: string;
		accessibleLine: string;
		/** The pill: how many pairs are under their minimum. */
		pairsToFix: (count: number) => string;
		/** The report: the same, as a sentence. */
		pairsTooLow: (count: number) => string;
		/** The pill, after "Accessible": how many values the engine moved. */
		adjusted: (count: number) => string;
	};

	report: {
		brandColour: string;
		brandAsPicked: string;
		brandAdjusted: (from: string, to: string) => string;
		/** Added when the text on the brand colour switched to dark (in light mode) or to light (in dark mode). */
		withDarkText: string;
		withLightText: string;
		tooLow: string;
		pairNeeds: (value: string, min: number) => string;
		adjustments: string;
		adjustmentsMade: (count: number) => string;
		noAdjustments: string;
		/** The engine's reason for an adjustment → the sentence shown. */
		reasons: Record<string, string>;
		/** For a reason not listed above. */
		reasonFallback: (reason: string) => string;
	};
}

export const en: WorkshopLabels = {
	name: "Village",

	base: "Base",
	brandColour: "Brand colour",
	baseNature: (base) => `${base}'s nature`,
	brandColourHelp: (base) => `Any colour. If text on it would be hard to read, it is adjusted as little as possible. Empty: ${base}'s own colour.`,
	pickColour: "Pick a colour",
	brandColourValue: "Brand colour value",
	useBaseNature: (base) => `Use ${base}'s nature instead`,
	swatches: { ember: "Ember", gold: "Gold", leaf: "Leaf", teal: "Teal", tide: "Tide", indigo: "Indigo", plum: "Plum", rose: "Rose" },

	neutrals: "Neutrals",
	neutralsValue: (hue, percent) => `${hue}° · ${percent}% tint`,
	neutralsHelp: "The greys of backgrounds, borders and text: their hue, and how tinted they are.",
	greyHue: "Grey hue",
	tint: "Tint",

	contrast: "Contrast",
	radius: "Radius",
	radiusHelp: "0 is square; Konoha is 0.625rem, Kiri 1rem.",
	borderWidth: "Border width",
	headingFont: "Heading font",
	bodyFont: "Body font",
	density: "Density",
	depth: "Depth",
	motion: "Motion",
	intensity: "Motion intensity",
	intensities: ["None", "Fades only", "Travel", "Showcase"],

	traits: "Traits",
	traitsHelp: "How tabs, focus, labels, surfaces and other details look. Any you leave come from the base village.",
	traitsAsBase: (base) => `As ${base}`,
	traitsChanged: (count, base) => `${count} changed from ${base}`,
	traitNames: {
		tabs: "Tabs",
		highlight: "Highlight",
		focus: "Focus",
		press: "Press",
		labels: "Control labels",
		headings: "Headings",
		surfaces: "Surfaces",
		edges: "Edges",
		skeleton: "Loading",
	},

	values: {
		soft: "Soft",
		standard: "Standard",
		high: "High",
		compact: "Compact",
		default: "Default",
		comfortable: "Airy",
		flat: "Flat",
		raised: "Raised",
		hard: "Hard",
		lip: "Lip",
		quick: "Quick",
		calm: "Calm",
		gentle: "Gentle",
		bouncy: "Bouncy",
		segmented: "Segmented",
		bar: "Bar",
		inverted: "Inverted",
		halo: "Halo",
		ring: "Ring",
		scale: "Scale",
		sink: "Sink",
		drop: "Drop",
		plain: "Plain",
		capitals: "Caps",
		"mono-capitals": "Mono caps",
		solid: "Solid",
		glass: "Glass",
		ink: "Ink",
		pulse: "Pulse",
		hatched: "Hatched",
	},

	light: "Light",
	dark: "Dark",

	status: {
		making: "Making the village…",
		makingHint: "Everything happens in your browser.",
		recipeNeedsFix: "The recipe needs a fix",
		needsChange: "Needs a change",
		accessible: "Accessible",
		accessibleLine: "Every text and colour pair is readable, in every nature, light and dark.",
		pairsToFix: (count) => `${count} pair${count > 1 ? "s" : ""} to fix`,
		pairsTooLow: (count) => `${count} colour pair${count > 1 ? "s are" : " is"} too low in contrast. Change the recipe to export the village.`,
		adjusted: (count) => `${count} adjusted`,
	},

	report: {
		brandColour: "Brand colour",
		brandAsPicked: "as you picked it",
		brandAdjusted: (from, to) => `adjusted so text on it stays readable (lightness ${from} → ${to})`,
		withDarkText: "with dark text on it",
		withLightText: "with light text on it",
		tooLow: "Too low in contrast",
		pairNeeds: (value, min) => `${value}:1, needs at least ${min}:1`,
		adjustments: "Adjustments",
		adjustmentsMade: (count) => `${count} made to keep text readable`,
		noAdjustments: "None: the village uses your values as they are.",
		reasons: {
			"the brand colour holds with its text": "so the colour holds with the text on it",
			"--primary-text on --background": "so the brand colour’s words read on the page",
			"--primary-border on --background": "so what the brand colour fills stands out from the page",
		},
		reasonFallback: (reason) => `so ${reason} stays readable`,
	},
};

export const fr: WorkshopLabels = {
	name: "Village",

	base: "Base",
	brandColour: "Couleur de marque",
	baseNature: (base) => `La nature de ${base}`,
	brandColourHelp: (base) => `N'importe quelle couleur. Si un texte posé dessus devient difficile à lire, elle est ajustée le moins possible. Vide : la couleur de ${base}.`,
	pickColour: "Choisir une couleur",
	brandColourValue: "Valeur de la couleur de marque",
	useBaseNature: (base) => `Utiliser la nature de ${base}`,
	swatches: { ember: "Braise", gold: "Or", leaf: "Feuille", teal: "Sarcelle", tide: "Marée", indigo: "Indigo", plum: "Prune", rose: "Rose" },

	neutrals: "Neutres",
	neutralsValue: (hue, percent) => `${hue}° · teinte ${percent} %`,
	neutralsHelp: "Les gris des fonds, des bordures et du texte : leur teinte, et à quel point ils sont colorés.",
	greyHue: "Teinte des gris",
	tint: "Coloration",

	contrast: "Contraste",
	radius: "Arrondi",
	radiusHelp: "0 donne des angles droits ; Konoha est à 0.625rem, Kiri à 1rem.",
	borderWidth: "Épaisseur des bordures",
	headingFont: "Police des titres",
	bodyFont: "Police du texte",
	density: "Densité",
	depth: "Relief",
	motion: "Mouvement",
	intensity: "Intensité du mouvement",
	intensities: ["Aucun", "Fondus seulement", "Déplacements", "Spectacle"],

	traits: "Traits",
	traitsHelp: "L'allure des onglets, du focus, des libellés, des surfaces et d'autres détails. Ceux que vous laissez viennent du village de base.",
	traitsAsBase: (base) => `Comme ${base}`,
	traitsChanged: (count, base) => `${count} modifié${count > 1 ? "s" : ""} par rapport à ${base}`,
	traitNames: {
		tabs: "Onglets",
		highlight: "Survol",
		focus: "Focus",
		press: "Appui",
		labels: "Libellés des contrôles",
		headings: "Titres",
		surfaces: "Surfaces",
		edges: "Bords",
		skeleton: "Chargement",
	},

	values: {
		soft: "Doux",
		standard: "Standard",
		high: "Fort",
		compact: "Compacte",
		default: "Par défaut",
		comfortable: "Aérée",
		flat: "Plat",
		raised: "Surélevé",
		hard: "Dur",
		lip: "Lèvre",
		quick: "Vif",
		calm: "Calme",
		gentle: "Lent",
		bouncy: "Rebond",
		segmented: "Segmentés",
		bar: "Barre",
		inverted: "Inversé",
		halo: "Halo",
		ring: "Anneau",
		scale: "Réduction",
		sink: "Enfoncement",
		drop: "Chute",
		plain: "Tels quels",
		capitals: "Capitales",
		"mono-capitals": "Capitales mono",
		solid: "Opaques",
		glass: "Verre",
		ink: "Encre",
		pulse: "Pulsation",
		hatched: "Hachures",
	},

	light: "Clair",
	dark: "Sombre",

	status: {
		making: "Fabrication du village…",
		makingHint: "Tout se passe dans votre navigateur.",
		recipeNeedsFix: "La recette est à corriger",
		needsChange: "À modifier",
		accessible: "Accessible",
		accessibleLine: "Chaque texte et chaque paire de couleurs est lisible, dans toutes les natures, en clair et en sombre.",
		pairsToFix: (count) => `${count} paire${count > 1 ? "s" : ""} à corriger`,
		pairsTooLow: (count) => `${count} paire${count > 1 ? "s" : ""} de couleurs manque${count > 1 ? "nt" : ""} de contraste. Modifiez la recette pour utiliser le village.`,
		adjusted: (count) => `${count} ajustée${count > 1 ? "s" : ""}`,
	},

	report: {
		brandColour: "Couleur de marque",
		brandAsPicked: "telle que vous l'avez choisie",
		brandAdjusted: (from, to) => `ajustée pour que le texte posé dessus reste lisible (clarté ${from} → ${to})`,
		withDarkText: "avec un texte sombre dessus",
		withLightText: "avec un texte clair dessus",
		tooLow: "Contraste insuffisant",
		pairNeeds: (value, min) => `${value}:1, il faut au moins ${min}:1`,
		adjustments: "Ajustements",
		adjustmentsMade: (count) => `${count} fait${count > 1 ? "s" : ""} pour garder le texte lisible`,
		noAdjustments: "Aucun : le village utilise vos valeurs telles quelles.",
		reasons: {
			"the brand colour holds with its text": "pour que la couleur tienne avec le texte posé dessus",
			"--primary-text on --background": "pour que les mots à la couleur de marque se lisent sur la page",
			"--primary-border on --background": "pour que ce que remplit la couleur de marque se détache de la page",
		},
		reasonFallback: (reason) => `pour garder lisible : ${reason}`,
	},
};
