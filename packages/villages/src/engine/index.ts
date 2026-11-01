/**
 * The village engine (RFC-0006): a recipe in, a checked village CSS file out. Pure, so the CLI, the site's workshop
 * and the MCP server share it; the caller passes contract.css and natures.css, parsed with `parseSources`.
 *
 *   const village = createVillage({ name: "acme", base: "kiri", brand: { color: "#ff5a1f" } }, { sources });
 *   village.problems.length === 0 ? write(village.css) : refuse(village.problems);
 */
import type { Scheme, Sources, Tokens } from "../contrast.ts";
import { fontInfo } from "../fonts.ts";
import iwa from "../villages/iwa.recipe.json" with { type: "json" };
import kiri from "../villages/kiri.recipe.json" with { type: "json" };
import konoha from "../villages/konoha.recipe.json" with { type: "json" };
import { type Adjustment, fixContrast, type Problem } from "./fix.ts";
import { type Base, type BaseRecipe, bases, ENGINE_VERSION, type Knobs, type Overrides, type Recipe, validateRecipe } from "./recipe.ts";
import { applyOverrides, foundation, resolveRecipe } from "./resolve.ts";
import { writeVillage } from "./write.ts";

export * from "./color.ts";
export type { Adjustment, Problem } from "./fix.ts";
export * from "./recipe.ts";
export { foundation, resolveRecipe } from "./resolve.ts";

/** Konoha, Kiri and Iwa as recipes: the engine makes their CSS files token for token. */
export const builtinRecipes = { konoha, kiri, iwa } as unknown as Record<Base, BaseRecipe>;

export interface CreateOptions {
	/** contract.css and natures.css, parsed; the villages in it are ignored. */
	sources: Omit<Sources, "villages">;
	/** The base villages to build on; the built-in recipes by default. */
	baseRecipes?: Record<Base, BaseRecipe>;
}

export interface Village {
	name: string;
	title: string;
	description: string;
	css: string;
	light: Tokens;
	/** Every token under `.dark`, inherited ones included. */
	dark: Tokens;
	natureHue: number;
	/** The village declares a nature named after it (a brand hue or colour). */
	ownNature: boolean;
	/** The knobs and overrides it was made from, after merging onto the base. */
	knobs: Knobs;
	overrides: Overrides;
	/** What the fixer changed, in order. */
	adjustments: Adjustment[];
	/** Pairs still under their minimum: when there are any, the village must not be written. */
	problems: Problem[];
	/** Fonts the catalogue does not know, base overrides a knob replaced, focus rings under 3:1. */
	notes: string[];
}

const title = (name: string) => name.replace(/(^|-)(\w)/g, (_, dash: string, c: string) => (dash ? " " : "") + c.toUpperCase());

function build(
	meta: { name: string; title: string; description: string; origin: string },
	knobs: Knobs,
	overrides: Overrides,
	sources: Omit<Sources, "villages">,
	pinned: Record<Scheme, Set<string>>,
	notes: string[],
): Village {
	const made = applyOverrides(foundation(knobs, sources.natures), overrides);
	const natures = made.ownNature ? { ...sources.natures, [meta.name]: made.natureHue } : sources.natures;
	const draft = { name: meta.name, light: { ...made.light }, dark: { ...made.dark } };
	const { adjustments, problems, ringWarnings } = fixContrast(draft, { base: sources, natures, pinned });
	if (ringWarnings) notes.push(`${ringWarnings} focus ring scope${ringWarnings > 1 ? "s are" : " is"} under 3:1 (reported, not failing: RFC-0002, open question 5).`);
	for (const role of ["body", "heading", "code"] as const)
		if (!fontInfo(knobs.fonts[role]).known) notes.push(`The font "${knobs.fonts[role]}" is not in the catalogue: the project loads it.`);
	const css = writeVillage({ ...meta, natureHue: made.natureHue, ownNature: made.ownNature, light: draft.light, dark: draft.dark, defaults: sources.defaults });
	return { ...meta, css, light: draft.light, dark: draft.dark, natureHue: made.natureHue, ownNature: made.ownNature, knobs, overrides, adjustments, problems, notes };
}

/** A village from a recipe on one of the built-in villages. Throws on an invalid recipe. */
export function createVillage(recipe: Recipe, options: CreateOptions): Village {
	const errors = validateRecipe(recipe);
	if (recipe.name in options.sources.natures) errors.push(`"${recipe.name}" is already a nature; the village's own nature would take its name.`);
	if (recipe.brand?.nature !== undefined && !(recipe.brand.nature in options.sources.natures))
		errors.push(`"brand.nature" is one of ${Object.keys(options.sources.natures).join(", ")}.`);
	if (errors.length) throw new Error(`Invalid recipe:\n  ${errors.join("\n  ")}`);

	const baseName = recipe.base ?? "konoha";
	const base = (options.baseRecipes ?? builtinRecipes)[baseName];
	const resolved = resolveRecipe(recipe, base, options.sources);
	const notes = resolved.dropped.length ? [`Replaced by your knobs: ${base.title}'s hand-tuned ${resolved.dropped.join(", ")}.`] : [];
	const pinned: Record<Scheme, Set<string>> = {
		light: new Set(Object.keys(recipe.overrides?.light ?? {})),
		dark: new Set(Object.keys(recipe.overrides?.dark ?? {})),
	};
	if (recipe.brand?.exact) for (const token of ["--primary-l", "--primary-c"]) pinned.light.add(token);
	return build(
		{
			name: recipe.name,
			title: recipe.title ?? title(recipe.name),
			description: recipe.description ?? "",
			origin: `Founded from ${base.title} with engine ${ENGINE_VERSION}.`,
		},
		resolved.knobs,
		resolved.overrides,
		options.sources,
		pinned,
		notes,
	);
}

/** A built-in village from its own recipe: how konoha.css, kiri.css and iwa.css are regenerated. */
export function createBaseVillage(recipe: BaseRecipe, options: Pick<CreateOptions, "sources">): Village {
	if (!(bases as readonly string[]).includes(recipe.name)) throw new Error(`"${recipe.name}" is not a built-in village.`);
	const pinned: Record<Scheme, Set<string>> = { light: new Set(Object.keys(recipe.overrides.light ?? {})), dark: new Set(Object.keys(recipe.overrides.dark ?? {})) };
	return build(
		{ name: recipe.name, title: recipe.title, description: recipe.description, origin: `A built-in village, engine ${ENGINE_VERSION}.` },
		recipe,
		recipe.overrides,
		options.sources,
		pinned,
		[],
	);
}
