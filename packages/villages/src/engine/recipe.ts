/**
 * The recipe (RFC-0006, "The recipe"): what a village is made from. A team writes a `Recipe`: a base village and the
 * knobs it changes. The built-in villages are `BaseRecipe`s: every knob set, plus the hand-tuned values no knob makes.
 */
import { contract, type TokenSpec } from "../contract.ts";
import { parseColor } from "./color.ts";

/** Bumped when the engine writes a village differently; `doctor` suggests `--update` to villages made by an older one. */
export const ENGINE_VERSION = "1.0.0";

export const RECIPE_SCHEMA = "https://ui.rasengan.dev/schema/village-recipe.json";

export const bases = ["konoha", "kiri", "iwa", "kusa"] as const;
export type Base = (typeof bases)[number];

/** The values each scale knob and each trait takes. */
export const options = {
	contrast: ["soft", "standard", "high"],
	density: ["compact", "default", "comfortable"],
	depth: ["flat", "soft", "raised", "hard", "lip"],
	motion: ["quick", "calm", "gentle", "bouncy"],
	border: [1, 1.5, 2],
} as const;

export const traitOptions = {
	/** Segmented (a well with a raised active tab) or a bar (a rule with an inverted active tab). */
	tabs: ["segmented", "bar"],
	/** The item under the pointer or the keyboard in menus and lists. */
	highlight: ["soft", "inverted"],
	/** A soft halo, or a solid ring with a gap. */
	focus: ["halo", "ring"],
	/** Pressed controls scale down, sink into their shadow, or drop onto their lip (with the lip depth). */
	press: ["scale", "sink", "drop"],
	/** Control labels as written, in capitals, or in the code font and capitals. */
	labels: ["plain", "capitals", "mono-capitals"],
	headings: ["plain", "capitals"],
	/** Opaque surfaces, or translucent ones over a misted background. */
	surfaces: ["solid", "glass"],
	/** Soft grey borders, or ink ones (the foreground). */
	edges: ["soft", "ink"],
	skeleton: ["pulse", "hatched"],
} as const;

export type Contrast = (typeof options.contrast)[number];
export type Density = (typeof options.density)[number];
export type Depth = (typeof options.depth)[number];
export type Motion = (typeof options.motion)[number];
export type Border = (typeof options.border)[number];
export type Traits = { -readonly [K in keyof typeof traitOptions]: (typeof traitOptions)[K][number] };

/** One of: an existing nature, a hue, or a colour. A hue or a colour gives the village a nature of its own. */
export interface Brand {
	nature?: string;
	hue?: number;
	color?: string;
	/** Refuse rather than move the brand colour when contrast needs it moved. */
	exact?: boolean;
}

export interface Neutrals {
	/** The hue of the surfaces (background, cards, muted). */
	hue: number;
	/** The hue of the ink (text, shadows). */
	inkHue: number;
	/** How tinted the greys are: 0 is grey, 1 the contrast level's own tint, 2 twice that. */
	chroma: number;
}

export interface Fonts {
	body: string;
	heading: string;
	code: string;
}

/** Contract tokens set after everything else, per scheme. */
export interface Overrides {
	light?: Record<string, string>;
	dark?: Record<string, string>;
}

export interface Knobs {
	brand: Brand;
	neutrals: Neutrals;
	contrast: Contrast;
	/** 0 (square) to 1 (very round); 0.5 is Konoha's 0.625rem. */
	radius: number;
	density: Density;
	depth: Depth;
	motion: Motion;
	border: Border;
	fonts: Fonts;
	traits: Traits;
}

export interface BaseRecipe extends Knobs {
	name: Base;
	title: string;
	description: string;
	overrides: Overrides;
}

export interface Recipe {
	$schema?: string;
	name: string;
	title?: string;
	description?: string;
	base?: Base;
	brand?: Brand;
	/** `hue` alone moves `inkHue` with it, keeping the base's offset. */
	neutrals?: Partial<Neutrals>;
	contrast?: Contrast;
	radius?: number;
	density?: Density;
	depth?: Depth;
	motion?: Motion;
	border?: Border;
	fonts?: Partial<Fonts>;
	traits?: Partial<Traits>;
	overrides?: Overrides;
}

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const hue = (value: unknown) => typeof value === "number" && value >= 0 && value <= 360;

/** Every problem with a recipe, as sentences; empty when it is valid. The natures are checked by the engine. */
export function validateRecipe(input: unknown): string[] {
	if (!isObject(input)) return ["A recipe is a JSON object."];
	const r = input as Record<string, unknown>;
	const errors: string[] = [];
	const known = new Set(["$schema", "name", "title", "description", "base", "brand", "neutrals", "contrast", "radius", "density", "depth", "motion", "border", "fonts", "traits", "overrides"]);
	for (const key of Object.keys(r)) if (!known.has(key)) errors.push(`Unknown field "${key}".`);

	if (typeof r.name !== "string" || !/^[a-z][a-z0-9-]{0,39}$/.test(r.name))
		errors.push('"name" is required: lower case letters, digits and dashes, starting with a letter (it becomes data-village and the file name).');
	else if ((bases as readonly string[]).includes(r.name)) errors.push(`"${r.name}" is a built-in village; give yours another name.`);
	for (const key of ["title", "description"]) if (r[key] !== undefined && typeof r[key] !== "string") errors.push(`"${key}" is a string.`);
	if (r.base !== undefined && !(bases as readonly string[]).includes(r.base as string)) errors.push(`"base" is one of ${bases.join(", ")}.`);

	if (r.brand !== undefined) {
		if (!isObject(r.brand)) errors.push('"brand" is an object.');
		else {
			const set = ["nature", "hue", "color"].filter((key) => (r.brand as Record<string, unknown>)[key] !== undefined);
			if (set.length !== 1) errors.push('"brand" takes one of "nature", "hue" or "color".');
			if (r.brand.nature !== undefined && typeof r.brand.nature !== "string") errors.push('"brand.nature" is a nature name.');
			if (r.brand.hue !== undefined && !hue(r.brand.hue)) errors.push('"brand.hue" is a number from 0 to 360.');
			if (r.brand.color !== undefined && (typeof r.brand.color !== "string" || !parseColor(r.brand.color)))
				errors.push('"brand.color" is a colour: #rrggbb, rgb(r g b) or oklch(L C H).');
			if (r.brand.exact !== undefined && typeof r.brand.exact !== "boolean") errors.push('"brand.exact" is true or false.');
		}
	}

	if (r.neutrals !== undefined) {
		if (!isObject(r.neutrals)) errors.push('"neutrals" is an object.');
		else {
			for (const key of Object.keys(r.neutrals)) if (!["hue", "inkHue", "chroma"].includes(key)) errors.push(`Unknown field "neutrals.${key}".`);
			for (const key of ["hue", "inkHue"]) if (r.neutrals[key] !== undefined && !hue(r.neutrals[key])) errors.push(`"neutrals.${key}" is a number from 0 to 360.`);
			const chroma = r.neutrals.chroma;
			if (chroma !== undefined && !(typeof chroma === "number" && chroma >= 0 && chroma <= 2)) errors.push('"neutrals.chroma" is a number from 0 to 2.');
		}
	}

	for (const [key, values] of Object.entries(options))
		if (r[key] !== undefined && !(values as readonly unknown[]).includes(r[key])) errors.push(`"${key}" is one of ${values.join(", ")}.`);
	if (r.radius !== undefined && !(typeof r.radius === "number" && r.radius >= 0 && r.radius <= 1)) errors.push('"radius" is a number from 0 to 1.');

	if (r.fonts !== undefined) {
		if (!isObject(r.fonts)) errors.push('"fonts" is an object.');
		else
			for (const [key, value] of Object.entries(r.fonts)) {
				if (!["body", "heading", "code"].includes(key)) errors.push(`Unknown field "fonts.${key}".`);
				else if (typeof value !== "string" || !/^[\w][\w .-]{0,60}$/.test(value)) errors.push(`"fonts.${key}" is a font family name.`);
			}
	}

	if (r.traits !== undefined) {
		if (!isObject(r.traits)) errors.push('"traits" is an object.');
		else
			for (const [key, value] of Object.entries(r.traits)) {
				const values = (traitOptions as Record<string, readonly string[]>)[key];
				if (!values) errors.push(`Unknown trait "${key}".`);
				else if (!values.includes(value as string)) errors.push(`"traits.${key}" is one of ${values.join(", ")}.`);
			}
	}

	if (r.overrides !== undefined) {
		if (!isObject(r.overrides)) errors.push('"overrides" is an object with "light" and/or "dark".');
		else
			for (const [scheme, tokens] of Object.entries(r.overrides)) {
				if (scheme !== "light" && scheme !== "dark") errors.push(`"overrides.${scheme}": only "light" and "dark".`);
				else if (!isObject(tokens)) errors.push(`"overrides.${scheme}" maps tokens to values.`);
				else
					for (const [token, value] of Object.entries(tokens)) {
						const spec = (contract as Record<string, TokenSpec>)[token];
						if (!spec || token === "--nature-hue") errors.push(`"overrides.${scheme}": ${token} is not a token a village sets.`);
						else if (spec.derived) errors.push(`"overrides.${scheme}": ${token} is derived by the contract; set what it is derived from.`);
						else if (scheme === "dark" && !spec.schemes) errors.push(`"overrides.dark": ${token} has no dark value.`);
						if (typeof value !== "string" || !value.trim() || /[;{}]/.test(value)) errors.push(`"overrides.${scheme}": ${token} needs a CSS value.`);
					}
			}
	}
	return errors;
}
