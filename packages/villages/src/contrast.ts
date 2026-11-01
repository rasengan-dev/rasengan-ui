/**
 * Contrast checks for villages (RFC-0002, "Villages"; RFC-0006, "The engine"). Pure: it reads CSS as strings, so the
 * script (`pnpm contrast`), the village engine and the site's workshop share it.
 *
 * It resolves the tokens the way the browser does for one scope (village × scheme × nature × tint) and checks text
 * pairs against 4.5:1 (WCAG AA) and what identifies a control against 3:1 (WCAG 1.4.11). Translucent colours are
 * composited over what they sit on. Focus rings are reported against 3:1 but do not fail.
 */

export type Tokens = Record<string, string>;

export interface VillageSource {
	light: Tokens;
	dark: Tokens;
}

export interface Sources {
	/** The `:where([data-village])` block of contract.css. */
	defaults: Tokens;
	/** The `:where([data-village], [data-nature])` block: what is derived from the nature. */
	derived: Tokens;
	/** Nature name → hue, from natures.css and from any village file that declares its own. */
	natures: Record<string, number>;
	/** What Onmyōton replaces inside a village. */
	onmyoton: Tokens;
	villages: Record<string, VillageSource>;
}

export type Scheme = "light" | "dark";

// ---- CSS sources -------------------------------------------------------------

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

export const declarations = (body: string): Tokens =>
	Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const block = (css: string, pattern: RegExp, what: string) => {
	const match = css.match(pattern);
	if (!match) throw new Error(`No ${what} block`);
	return declarations(match[1]);
};

/** A village file: its light block (`[data-village="<name>"] { … }`) and its dark block (`:is(.dark …) { … }`). */
export function parseVillage(name: string, source: string): VillageSource {
	const css = stripComments(source);
	const light = css.match(new RegExp(`\\n\\[data-village="${name}"\\]\\s*\\{([^}]*)\\}`));
	if (!light) throw new Error(`No [data-village="${name}"] block`);
	const dark = css.match(/\n:is\(\.dark [^{]*\{([^}]*)\}/);
	return { light: declarations(light[1]), dark: dark ? declarations(dark[1]) : {} };
}

const natureHues = (css: string) =>
	Object.fromEntries([...css.matchAll(/\[data-nature="([\w-]+)"\]\s*\{\s*--nature-hue:\s*([\d.]+)/g)].map((m) => [m[1], Number(m[2])]));

export function parseSources(files: { contract: string; natures: string; villages: Record<string, string> }): Sources {
	const contract = stripComments(files.contract);
	const natures = stripComments(files.natures);
	const villages = Object.fromEntries(Object.entries(files.villages).map(([name, css]) => [name, parseVillage(name, css)]));
	return {
		defaults: block(contract, /:where\(\[data-village\]\)\s*\{([^}]*)\}/, "contract defaults"),
		derived: block(contract, /:where\(\[data-village\], \[data-nature\]\)\s*\{([^}]*)\}/, "nature-derived"),
		natures: Object.assign(natureHues(natures), ...Object.values(files.villages).map((css) => natureHues(stripComments(css)))),
		onmyoton: block(natures, /\[data-village\] \[data-nature="onmyoton"\]\s*\{([^}]*)\}/, "Onmyōton"),
		villages,
	};
}

// ---- Resolution ----------------------------------------------------------------

/** Every token of one scope, as the cascade leaves them: contract defaults, derivations, village, nature, tint. */
export function scope(sources: Sources, village: string, scheme: Scheme, nature: string, tint: number): Tokens {
	const v = sources.villages[village];
	const tokens: Tokens = {
		...sources.defaults,
		...sources.derived,
		...v.light,
		...(scheme === "dark" ? v.dark : {}),
		"--tint": String(tint),
		"--nature-hue": String(sources.natures[nature]),
	};
	if (nature === "onmyoton") Object.assign(tokens, sources.onmyoton);
	return tokens;
}

export function substitute(value: string, tokens: Tokens, depth = 0): string {
	if (depth > 20) throw new Error(`var() cycle in ${value}`);
	return value.replace(/var\((--[\w-]+)(?:\s*,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g, (_, name: string, fallback?: string) => {
		const v = tokens[name] ?? fallback;
		if (v === undefined) throw new Error(`undefined ${name}`);
		return substitute(v, tokens, depth + 1);
	});
}

const arithmetic = (expr: string): number => {
	if (!/^[\d.\s*+\-/()]+$/.test(expr)) throw new Error(`not arithmetic: ${expr}`);
	return Function(`return (${expr})`)();
};
const number = (s: string) => (s.startsWith("calc(") ? arithmetic(s.slice(5, -1)) : s.endsWith("%") ? Number(s.slice(0, -1)) / 100 : Number(s));

/** Linear sRGB channels, 0 to 1, with an alpha. */
export interface Color {
	rgb: number[];
	alpha: number;
}

/** oklch(…) or color-mix(in oklab, <oklch> <p>%, transparent), after substituting the tokens. */
export function color(value: string, tokens: Tokens): Color {
	const v = substitute(value, tokens).trim();
	if (v === "transparent") return { rgb: [0, 0, 0], alpha: 0 };
	const mix = v.match(/^color-mix\(in oklab,\s*(oklch\(.*\))\s+([\d.]+)%,\s*transparent\)$/);
	if (mix) {
		const c = color(mix[1], tokens);
		return { ...c, alpha: (c.alpha * Number(mix[2])) / 100 };
	}
	const m = v.match(/^oklch\((.*)\)$/);
	if (!m) throw new Error(`not a colour: ${v}`);
	const [lch, a] = m[1].split("/").map((s) => s.trim());
	const [L, C, H] = (lch.match(/calc\([^)]*\)|[^\s]+/g) ?? []).map(number);
	return { rgb: oklchToSrgb(L, C, H), alpha: a ? number(a) : 1 };
}

export function oklchToSrgb(L: number, C: number, H: number): number[] {
	const a = C * Math.cos((H * Math.PI) / 180);
	const b = C * Math.sin((H * Math.PI) / 180);
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const lin = [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	];
	// Browsers clip out-of-gamut channels for these colours; so do we.
	return lin.map((x) => Math.min(1, Math.max(0, x)));
}

const toGamma = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
const toLinear = (x: number) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);

/** Composites `top` over an opaque `under`, in gamma space like the browser. */
export function over(top: Color, under: number[]): number[] {
	return top.rgb.map((c, i) => toLinear(toGamma(c) * top.alpha + toGamma(under[i]) * (1 - top.alpha)));
}

const luminance = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

export function ratio(x: number[], y: number[]): number {
	const [a, b] = [luminance(x), luminance(y)].sort((p, q) => q - p);
	return (a + 0.05) / (b + 0.05);
}

// ---- Pairs -------------------------------------------------------------------

export const TEXT: [string, string][] = [
	["--foreground", "--background"],
	["--foreground", "--card"],
	["--muted-foreground", "--background"],
	["--muted-foreground", "--muted"],
	["--secondary-foreground", "--secondary"],
	["--accent-foreground", "--accent"],
	["--popover-foreground", "--popover"],
	["--primary-foreground", "--primary"],
	["--destructive-foreground", "--destructive"],
	["--primary", "--background"],
	["--destructive", "--background"],
	["--destructive", "--card"],
	["--tooltip-foreground", "--tooltip"],
	["--highlight-foreground", "--highlight"],
	["--tab-active-foreground", "--tab-active"],
	["--muted-foreground", "--tabs-list"],
];

/*
 * What identifies a state control (WCAG 1.4.11, 3:1 against what is next to it): a checkbox's or
 * radio's border, a switch's track, a slider's track. Text fields keep the softer --input, a gap the RFC records.
 */
export const CONTROLS: [string, string][] = [
	["--control-border", "--background"],
	["--control-border", "--card"],
	["--switch-track", "--background"],
	["--control-track", "--background"],
];
/* Switch and slider tracks carry --track-border: where it is drawn, it is the edge that counts. */
const TRACKS = new Set(["--switch-track", "--control-track"]);
/* A control filled with a tone (a checked box, a slider's thumb) is told apart from the page by its edge. */
export const TONE_EDGES: [string, string][] = ["neutral", "primary", "success", "warning", "info", "destructive"].flatMap((t): [string, string][] => [
	[`--${t}-border`, "--background"],
	[`--${t}-border`, "--card"],
]);

/*
 * Tones (variant × tone): the text on the solid colour, and the tone's text colour on the page, on a card and on
 * its soft wash (itself over the page or a card). Layers are listed from the bottom; the page is always under them.
 */
const TONES = ["neutral", "primary", "success", "warning", "info", "destructive"];
export const TONE_PAIRS: [string, string[]][] = TONES.flatMap((t): [string, string[]][] => [
	[`--${t}-foreground`, [`--${t}`]],
	[`--${t}-text`, []],
	[`--${t}-text`, ["--card"]],
	[`--${t}-text`, [`--${t}-soft`]],
	[`--${t}-text`, ["--card", `--${t}-soft`]],
]);

export type PairKind = "text" | "tone-edge" | "control" | "tone" | "ring";

export interface PairResult {
	kind: PairKind;
	/** The foreground token actually measured (a track's border, where it has one). */
	fg: string;
	/** What it sits on, from the bottom; the page is always under it. */
	on: string[];
	min: number;
	value: number;
	/** A failure fails the check; a ring under 3:1 is only reported (RFC-0002, open question 5). */
	pass: boolean;
}

/** Every pair of one scope's tokens. */
export function checkScope(tokens: Tokens): PairResult[] {
	const results: PairResult[] = [];
	const page = color(tokens["--background"], tokens).rgb;
	const surface = (name: string) => over(color(tokens[name], tokens), page);
	const measure = (kind: PairKind, fg: string, on: string[], under: number[], min: number) => {
		const value = ratio(over(color(tokens[fg], tokens), under), under);
		results.push({ kind, fg, on, min, value, pass: value >= min });
	};
	for (const [fg, bg] of TEXT) measure("text", fg, [bg], surface(bg), 4.5);
	for (const [fg, bg] of TONE_EDGES) measure("tone-edge", fg, [bg], surface(bg), 3);
	for (const [fg, bg] of CONTROLS) {
		const edge = TRACKS.has(fg) && substitute(tokens["--track-border"], tokens) !== "transparent" ? "--track-border" : fg;
		measure("control", edge, [bg], surface(bg), 3);
	}
	for (const [fg, layers] of TONE_PAIRS) {
		const under = layers.reduce((acc, name) => over(color(tokens[name], tokens), acc), page);
		measure("tone", fg, ["--background", ...layers], under, 4.5);
	}
	const ring = ratio(surface("--ring"), page);
	results.push({
		kind: "ring",
		fg: "--ring",
		on: ["--background"],
		min: 3,
		value: ring,
		pass: ring >= 3,
	});
	return results;
}

export interface ScopeResult {
	village: string;
	scheme: Scheme;
	nature: string;
	tint: number;
	pairs: PairResult[];
}

/** Every scope of the given villages: each × both schemes × every nature × both tints. */
export function checkVillages(sources: Sources, villages = Object.keys(sources.villages), natures = Object.keys(sources.natures)): ScopeResult[] {
	const results: ScopeResult[] = [];
	for (const village of villages)
		for (const scheme of ["light", "dark"] as const)
			for (const nature of natures)
				for (const tint of [1, 0])
					results.push({
						village,
						scheme,
						nature,
						tint,
						pairs: checkScope(scope(sources, village, scheme, nature, tint)),
					});
	return results;
}

/** `konoha dark raiton neutral`: how the report names a scope. */
export const scopeLabel = (s: ScopeResult) => `${s.village} ${s.scheme} ${s.nature}${s.tint ? "" : " neutral"}`;
