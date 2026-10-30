#!/usr/bin/env node
/**
 * Checks text contrast for every village × nature × scheme × tint (RFC-0002, "Villages"):
 *
 *   pnpm contrast
 *
 * Reads the CSS sources (contract defaults, villages, natures), resolves the
 * tokens the way the browser does for one scope, and fails when a text pair
 * is under 4.5:1 (WCAG AA), or a control's border or track under 3:1 (WCAG
 * 1.4.11). Translucent colours are composited over the
 * background. Focus rings are reported against 3:1 but do not fail the run.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const src = join(root, "packages/villages/src");
const read = (path) => readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

// ---- CSS sources -------------------------------------------------------------

const declarations = (body) => Object.fromEntries([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const contract = read(join(src, "contract.css"));
const defaults = declarations(contract.match(/:where\(\[data-village\]\)\s*\{([^}]*)\}/)[1]);
const derived = declarations(contract.match(/:where\(\[data-village\], \[data-nature\]\)\s*\{([^}]*)\}/)[1]);

const natures = Object.fromEntries([...read(join(src, "natures.css")).matchAll(/\[data-nature="(\w+)"\]\s*\{\s*--nature-hue:\s*([\d.]+)/g)].map((m) => [m[1], Number(m[2])]));
const onmyoton = declarations(read(join(src, "natures.css")).match(/\[data-village\] \[data-nature="onmyoton"\]\s*\{([^}]*)\}/)[1]);

const villages = {};
for (const file of readdirSync(join(src, "villages")).filter((f) => f.endsWith(".css"))) {
	const css = read(join(src, "villages", file));
	const name = file.replace(/\.css$/, "");
	const light = css.match(new RegExp(`\\n\\[data-village="${name}"\\]\\s*\\{([^}]*)\\}`));
	const dark = css.match(/\n:is\(\.dark [^{]*\{([^}]*)\}/);
	villages[name] = { light: declarations(light[1]), dark: dark ? declarations(dark[1]) : {} };
}

// ---- Resolution ----------------------------------------------------------------

function scope(village, scheme, nature, tint) {
	const v = villages[village];
	const tokens = { ...defaults, ...derived, ...v.light, ...(scheme === "dark" ? v.dark : {}), "--tint": String(tint), "--nature-hue": String(natures[nature]) };
	if (nature === "onmyoton") Object.assign(tokens, onmyoton);
	return tokens;
}

function substitute(value, tokens, depth = 0) {
	if (depth > 20) throw new Error(`var() cycle in ${value}`);
	return value.replace(/var\((--[\w-]+)(?:\s*,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g, (_, name, fallback) => {
		const v = tokens[name] ?? fallback;
		if (v === undefined) throw new Error(`undefined ${name}`);
		return substitute(v, tokens, depth + 1);
	});
}

const arithmetic = (expr) => {
	if (!/^[\d.\s*+\-/()]+$/.test(expr)) throw new Error(`not arithmetic: ${expr}`);
	return Function(`return (${expr})`)();
};
const number = (s) => (s.startsWith("calc(") ? arithmetic(s.slice(5, -1)) : s.endsWith("%") ? Number(s.slice(0, -1)) / 100 : Number(s));

/** oklch(...) or color-mix(in oklab, <oklch> <p>%, transparent) → { rgb: [0..1]*3, alpha } */
function color(value, tokens) {
	const v = substitute(value, tokens).trim();
	if (v === "transparent") return { rgb: [0, 0, 0], alpha: 0 };
	const mix = v.match(/^color-mix\(in oklab,\s*(oklch\(.*\))\s+([\d.]+)%,\s*transparent\)$/);
	if (mix) {
		const c = color(mix[1], tokens);
		return { ...c, alpha: c.alpha * Number(mix[2]) / 100 };
	}
	const m = v.match(/^oklch\((.*)\)$/);
	if (!m) throw new Error(`not a colour: ${v}`);
	const [lch, a] = m[1].split("/").map((s) => s.trim());
	const parts = lch.match(/calc\([^)]*\)|[^\s]+/g);
	const [L, C, H] = parts.map(number);
	return { rgb: oklchToSrgb(L, C, H), alpha: a ? number(a) : 1 };
}

function oklchToSrgb(L, C, H) {
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

const toGamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
const toLinear = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);

/** Composites `top` over an opaque `under`, in gamma space like the browser. */
function over(top, under) {
	return top.rgb.map((c, i) => toLinear(toGamma(c) * top.alpha + toGamma(under[i]) * (1 - top.alpha)));
}

const luminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const ratio = (x, y) => {
	const [a, b] = [luminance(x), luminance(y)].sort((p, q) => q - p);
	return (a + 0.05) / (b + 0.05);
};

// ---- Pairs -------------------------------------------------------------------

const TEXT = [
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
const CONTROLS = [
	["--control-border", "--background"],
	["--control-border", "--card"],
	["--switch-track", "--background"],
	["--control-track", "--background"],
];
/* Switch and slider tracks carry --track-border: where it is drawn, it is the edge that counts. */
const TRACKS = new Set(["--switch-track", "--control-track"]);

const failures = [];
const warnings = [];
const controls = [];
let checked = 0;
for (const village of Object.keys(villages)) {
	for (const scheme of ["light", "dark"]) {
		for (const nature of Object.keys(natures)) {
			for (const tint of [1, 0]) {
				const tokens = scope(village, scheme, nature, tint);
				const page = color(tokens["--background"], tokens).rgb;
				const surface = (name) => over(color(tokens[name], tokens), page);
				const label = `${village} ${scheme} ${nature}${tint ? "" : " neutral"}`;
				for (const [fg, bg] of TEXT) {
					const under = surface(bg);
					const value = ratio(over(color(tokens[fg], tokens), under), under);
					checked++;
					if (value < 4.5) failures.push(`${label}: ${fg} on ${bg} = ${value.toFixed(2)}`);
				}
				for (const [fg, bg] of CONTROLS) {
					const under = surface(bg);
					const edge = TRACKS.has(fg) && substitute(tokens["--track-border"], tokens) !== "transparent" ? "--track-border" : fg;
					const value = ratio(over(color(tokens[edge], tokens), under), under);
					checked++;
					if (value < 3) failures.push(`${label}: ${edge} on ${bg} = ${value.toFixed(2)} (control, 3:1)`);
					controls.push({ label, pair: `${edge} on ${bg}`, value });
				}
				const ring = ratio(surface("--ring"), page);
				if (ring < 3) warnings.push(`${label}: --ring on --background = ${ring.toFixed(2)}`);
			}
		}
	}
}

if (process.env.CONTRAST_CONTROLS) {
	const worst = {};
	for (const { label, pair, value } of controls) {
		const key = `${label.split(" ").slice(0, 2).join(" ")} · ${pair}`;
		worst[key] = Math.min(worst[key] ?? Infinity, value);
	}
	for (const [key, value] of Object.entries(worst)) console.log(`${value < 3 ? "✗" : "✓"} ${value.toFixed(2)}  ${key}`);
}
console.log(`${checked} pairs across ${Object.keys(villages).length} villages × ${Object.keys(natures).length} natures × 2 schemes × 2 tints`);
if (warnings.length) console.log(`\nFocus ring under 3:1 (not failing yet, ${warnings.length}):\n  ${warnings.join("\n  ")}`);
if (failures.length) {
	console.error(`\nText under 4.5:1 (${failures.length}):\n  ${failures.join("\n  ")}`);
	process.exitCode = 1;
} else console.log("\nEvery text pair is at least 4.5:1, every control edge at least 3:1.");
