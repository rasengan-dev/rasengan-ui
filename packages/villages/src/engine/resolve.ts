/**
 * From knobs to tokens (RFC-0006, "The engine", steps 1 and 2): the foundation every village is made on, and how a
 * recipe is merged onto its base village.
 */
import type { Tokens } from "../contrast.ts";
import { fontInfo } from "../fonts.ts";
import { num, parseColor } from "./color.ts";
import { densities, type Entry, type Grey, ladders, motions, shadows } from "./ladders.ts";
import type { BaseRecipe, Knobs, Overrides, Recipe } from "./recipe.ts";

export interface Foundation {
	light: Tokens;
	/** Every token under `.dark`: the light ones, then what the dark scheme changes. */
	dark: Tokens;
	natureHue: number;
	/** The brand is a hue or a colour: the village declares a nature of its own, named after it. */
	ownNature: boolean;
}

const round5 = (n: number) => (Math.round(n / 5) * 5) % 360;
const rem = (n: number) => (n === 0 ? "0px" : `${num(n, 5)}rem`);

/** The tokens the knobs make, before overrides, contrast fixes and the text on the brand colour. */
export function foundation(k: Knobs, natures: Record<string, number>): Foundation {
	const hues = { s: k.neutrals.hue, i: k.neutrals.inkHue, m: round5((k.neutrals.hue + k.neutrals.inkHue) / 2) };
	const grey = ([l, c, role, alpha]: Grey, hue = hues[role]) => {
		const chroma = Math.round(c * k.neutrals.chroma * 10000) / 10000;
		const C = chroma > 0 ? `calc(${num(chroma)} * var(--tint, 1))` : "0";
		return `oklch(${num(l)} ${C} ${num(hue)}${alpha === undefined ? "" : ` / ${alpha}%`})`;
	};
	const render = (entry: Entry) => (typeof entry === "string" ? entry : grey(entry));
	const withAlpha = (entry: Entry | undefined, alpha: number) => (Array.isArray(entry) ? grey([entry[0], entry[1], entry[2], alpha]) : undefined);

	const light: Tokens = {};
	const darkOnly: Tokens = {};
	const both = (token: string, value: string) => {
		light[token] = value;
		darkOnly[token] = value;
	};

	// Shape: 0.5 is Konoha's 0.625rem, 1 is Kiri's 1rem.
	const radius = k.radius <= 0.5 ? k.radius * 1.25 : 0.625 + (k.radius - 0.5) * 0.75;
	light["--radius"] = rem(radius);
	light["--control-radius"] = rem(radius * 0.8);
	if (radius === 0) light["--pill-radius"] = light["--check-radius"] = "0px";
	if (k.radius >= 0.9) light["--badge-radius"] = "var(--pill-radius)";
	light["--border-width"] = `${k.border}px`;

	// Type.
	const heading = fontInfo(k.fonts.heading);
	light["--font-body"] = fontInfo(k.fonts.body).stack;
	light["--font-heading"] = k.fonts.heading === k.fonts.body ? "var(--font-body)" : heading.stack;
	light["--font-code"] =
		k.fonts.code === k.fonts.heading && k.fonts.heading !== k.fonts.body ? "var(--font-heading)" : k.fonts.code === k.fonts.body ? "var(--font-body)" : fontInfo(k.fonts.code).stack;
	light["--display-tracking"] = heading.category === "mono" ? "0em" : heading.category === "serif" ? "-0.01em" : "-0.02em";
	if (k.traits.headings === "capitals") light["--heading-case"] = "uppercase";

	// Controls.
	const d = densities[k.density];
	light["--control-sm"] = rem(d.sm);
	light["--control-md"] = rem(d.md);
	light["--control-lg"] = rem(d.lg);
	light["--control-px"] = rem(d.px);
	light["--control-text"] = rem(k.traits.labels === "mono-capitals" ? 0.75 : d.text);
	light["--control-weight"] = k.traits.labels === "plain" ? "500" : "600";
	if (k.traits.labels === "mono-capitals") light["--control-font"] = "var(--font-code)";
	if (k.traits.labels !== "plain") {
		light["--control-tracking"] = "0.06em";
		light["--control-case"] = "uppercase";
	}

	// Focus and press.
	if (k.traits.focus === "halo") {
		light["--focus-width"] = "3px";
		light["--ring-alpha"] = "42%";
	} else {
		light["--focus-width"] = "2px";
		light["--focus-offset"] = "2px";
		light["--ring-alpha"] = "100%";
	}
	if (k.traits.press === "scale") light["--press-scale"] = "0.98";
	else if (k.traits.press === "sink") {
		light["--press-scale"] = "1";
		light["--press-offset"] = "3px";
		light["--press-shadow"] = "none";
	} else {
		// Drop: straight down by the lip's depth, the lip gone. Without a lip, nothing moves.
		light["--press-scale"] = "1";
		light["--press-x"] = "0px";
		light["--press-y"] = "var(--lip)";
		light["--press-shadow"] = "0 0 #0000";
	}

	// Motion.
	const m = motions[k.motion];
	light["--motion-fast"] = m.fast;
	light["--motion-base"] = m.base;
	light["--motion-slow"] = m.slow;
	light["--motion-ease-out"] = m.out;
	light["--motion-ease-in-out"] = m.inOut;

	// Colour: the ladder of the contrast level.
	const ladder = ladders[k.contrast];
	for (const [token, entry] of Object.entries(ladder.light)) light[token] = render(entry);
	for (const [token, entry] of Object.entries(ladder.dark)) darkOnly[token] = render(entry);

	// Depth.
	const depth = shadows(k.depth, grey);
	Object.assign(light, depth.light);
	Object.assign(darkOnly, depth.dark);

	// Surfaces: glass is Kiri's translucent cards over a misted background.
	if (k.traits.surfaces === "glass") {
		const s = hues.s;
		Object.assign(light, {
			"--card": "oklch(1 0 0 / 55%)",
			"--popover": grey([0.99, 0.004, "s", 82]),
			"--secondary": withAlpha(ladder.light["--secondary"], 80) ?? light["--secondary"],
			"--accent": withAlpha(ladder.light["--accent"], 80) ?? light["--accent"],
			"--input-bg": "oklch(1 0 0 / 60%)",
			"--input-shadow": "inset 0 1px 0 oklch(1 0 0 / 70%)",
			"--surface-blur": "18px",
			"--texture": `radial-gradient(60% 50% at 15% 10%, ${grey([0.9, 0.03, "s", 70], round5(s - 15))}, transparent 70%), radial-gradient(50% 45% at 90% 85%, ${grey([0.9, 0.03, "s", 60], round5(s + 25))}, transparent 70%)`,
		});
		Object.assign(darkOnly, {
			"--card": "oklch(1 0 0 / 6%)",
			"--popover": withAlpha(ladder.dark["--popover"] ?? ladder.dark["--card"], 82) ?? "oklch(1 0 0 / 12%)",
			"--secondary": "oklch(1 0 0 / 9%)",
			"--muted": "oklch(1 0 0 / 6%)",
			"--accent": "oklch(1 0 0 / 10%)",
			"--input-bg": "oklch(1 0 0 / 5%)",
			"--input-shadow": "inset 0 1px 0 oklch(1 0 0 / 5%)",
			"--texture": `radial-gradient(60% 50% at 15% 10%, ${grey([0.32, 0.04, "s", 70], round5(s - 5))}, transparent 70%), radial-gradient(50% 45% at 90% 85%, ${grey([0.3, 0.04, "s", 60], round5(s + 35))}, transparent 70%)`,
		});
	}

	// Edges: ink borders are Iwa's, and with them its bordered tracks and stamped soft tones.
	if (k.traits.edges === "ink") {
		both("--border", "var(--foreground)");
		both("--input", "var(--foreground)");
		both("--control-border", "var(--input)");
		both("--input-bg", "var(--card)");
		both("--field-filled-edge", "var(--foreground)");
		both("--switch-track", "var(--muted)");
		both("--control-track", "var(--muted)");
		both("--switch-thumb", "var(--foreground)");
		both("--track-border", "var(--foreground)");
		both("--soft-edge-alpha", "100%");
	}
	if (k.traits.tabs === "bar") {
		light["--tabs-list"] = "transparent";
		light["--tabs-list-padding"] = "0px";
		light["--tab-active"] = "var(--foreground)";
		light["--tab-active-foreground"] = "var(--background)";
		light["--tab-active-shadow"] = "none";
	}
	if (k.traits.highlight === "inverted") {
		light["--highlight"] = "var(--foreground)";
		light["--highlight-foreground"] = "var(--background)";
	}
	if (k.traits.skeleton === "hatched") {
		light["--skeleton-fill"] = "repeating-linear-gradient(-45deg, var(--muted) 0 6px, var(--secondary) 6px 12px)";
		light["--skeleton-motion"] = "none";
	}

	// Brand: the nature's hue, and the colour's own strength when there is one.
	let natureHue: number;
	const color = k.brand.color ? parseColor(k.brand.color) : undefined;
	if (k.brand.nature !== undefined) {
		if (!(k.brand.nature in natures)) throw new Error(`Unknown nature "${k.brand.nature}": one of ${Object.keys(natures).join(", ")}.`);
		natureHue = natures[k.brand.nature];
	} else natureHue = Math.round(color ? color.h : (k.brand.hue ?? 0)) % 360;
	if (color) {
		light["--primary-l"] = num(color.l, 3);
		light["--primary-c"] = num(color.c, 3);
		darkOnly["--primary-l"] = num(Math.max(color.l, Number(ladder.dark["--primary-l"])), 3);
		darkOnly["--primary-c"] = num(Math.min(color.c, Number(ladder.dark["--primary-c"])), 3);
		// The status colours follow the primary's strength by default; a brand colour is no reason to turn success
		// pale gold. They keep the ladder's, with its text on them.
		light["--status-l"] = String(ladder.light["--primary-l"]);
		darkOnly["--status-l"] = String(ladder.dark["--primary-l"]);
		light["--on-status"] = render(ladder.light["--on-primary"]);
		darkOnly["--on-status"] = render(ladder.dark["--on-primary"]);
	}

	return { light, dark: { ...light, ...darkOnly }, natureHue, ownNature: k.brand.nature === undefined };
}

/** Applies overrides the way the cascade would: a light value reaches the dark scheme unless the dark one is set. */
export function applyOverrides(f: Foundation, overrides: Overrides): Foundation {
	const light = { ...f.light, ...overrides.light };
	const dark = { ...f.dark };
	for (const [token, value] of Object.entries(overrides.light ?? {})) if (f.dark[token] === f.light[token]) dark[token] = value;
	Object.assign(dark, overrides.dark);
	return { ...f, light, dark };
}

export interface Resolved {
	knobs: Knobs;
	overrides: Overrides;
	/** Base overrides dropped because a knob the recipe changed makes those tokens. */
	dropped: string[];
}

const pick = (tokens: Record<string, string> | undefined, keep: (token: string) => boolean) =>
	Object.fromEntries(Object.entries(tokens ?? {}).filter(([token]) => keep(token)));

/** A token's value with every var() it reads replaced, so `calc(var(--control-px) * 0.75)` changes with the padding. */
function resolved(token: string, tokens: Tokens, depth = 0): string | undefined {
	const value = tokens[token];
	if (value === undefined || depth > 20) return value;
	return value.replace(/var\((--[\w-]+)(?:,[^)]*)?\)/g, (match, name: string) => resolved(name, tokens, depth + 1) ?? match);
}

/**
 * A recipe on its base: the recipe's knobs win; the base's overrides stay only on tokens whose foundation value the
 * recipe did not change, so a knob always shows. `defaults` are contract.css's, for values that read other tokens.
 */
export function resolveRecipe(recipe: Recipe, base: BaseRecipe, sources: { natures: Record<string, number>; defaults: Tokens }): Resolved {
	const { natures, defaults } = sources;
	const neutrals = { ...base.neutrals, ...recipe.neutrals };
	if (recipe.neutrals?.hue !== undefined && recipe.neutrals.inkHue === undefined)
		neutrals.inkHue = (((recipe.neutrals.hue + base.neutrals.inkHue - base.neutrals.hue) % 360) + 360) % 360;
	const knobs: Knobs = {
		brand: recipe.brand ?? base.brand,
		neutrals,
		contrast: recipe.contrast ?? base.contrast,
		radius: recipe.radius ?? base.radius,
		density: recipe.density ?? base.density,
		depth: recipe.depth ?? base.depth,
		motion: recipe.motion ?? base.motion,
		border: recipe.border ?? base.border,
		fonts: { ...base.fonts, ...recipe.fonts },
		traits: { ...base.traits, ...recipe.traits },
	};
	const before = foundation(base, natures);
	const after = foundation(knobs, natures);
	const dropped: string[] = [];
	const keep = (scheme: "light" | "dark") => (token: string) => {
		const same = resolved(token, { ...defaults, ...before[scheme] }) === resolved(token, { ...defaults, ...after[scheme] });
		if (!same) dropped.push(`${scheme} ${token}`);
		return same;
	};
	return {
		knobs,
		overrides: {
			light: { ...pick(base.overrides.light, keep("light")), ...recipe.overrides?.light },
			dark: { ...pick(base.overrides.dark, keep("dark")), ...recipe.overrides?.dark },
		},
		dropped,
	};
}
