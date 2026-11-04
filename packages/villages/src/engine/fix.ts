/**
 * The contrast fixer (RFC-0006, "The engine", steps 2 to 4).
 *
 * 1. The brand: the text on it (the scheme's own, or the other scheme's) and the nearest lightness at which the brand
 *    colour holds with that text, in every nature. Only the fill: the brand colour's words (--tone-text-l) and the
 *    edge of what it fills (--primary-border-l) have their own lightness, and darken in step 2 if they need to.
 * 2. Every other failing pair: the lightness of the token behind it moves in 0.01 steps, at most 0.15, and only to a
 *    value that breaks no pair that passed.
 *
 * A pinned token never moves; a pair nothing can fix is a problem, and the village is refused.
 */
import { checkScope, type PairResult, pairValue, type Scheme, type Sources, scope, substitute, type Tokens } from "../contrast.ts";
import { contract, type TokenSpec } from "../contract.ts";
import { num } from "./color.ts";

export interface Adjustment {
	scheme: Scheme;
	token: string;
	from: string;
	to: string;
	/** The pair that asked for it. */
	reason: string;
}

export interface Problem {
	scheme: Scheme;
	pair: string;
	/** The worst ratio across the scopes where it fails. */
	value: number;
	min: number;
	/** `katon`, `suiton neutral`…: the scopes where it fails. */
	scopes: string[];
}

export interface Draft {
	name: string;
	light: Tokens;
	/** Every token under `.dark`, inherited ones included. */
	dark: Tokens;
}

export interface FixContext {
	/** contract.css and natures.css, parsed: the defaults, the derivations, the natures, Onmyōton. */
	base: Omit<Sources, "villages">;
	/** Every nature the village is checked with, its own included. */
	natures: Record<string, number>;
	pinned: Record<Scheme, Set<string>>;
}

const spec = (token: string): TokenSpec | undefined => (contract as Record<string, TokenSpec>)[token];
const schemes: Scheme[] = ["light", "dark"];
const tints = [1, 0];
const STEP = 0.01;
const LIMIT = 0.15;
/** How far the brand colour may move to hold with its text. */
const BRAND_LIMIT = 0.5;

/** The pair the brand fill must hold, whatever the nature. */
const BRAND_PAIRS: [fg: string, on: string[], min: number][] = [["--primary-foreground", ["--primary"], 4.5]];

/** The foreground of a failing pair, as the token behind its lightness: special cases first. */
const LEVERS: Record<string, string> = {
	"--primary-foreground": "--primary-l",
	"--success-foreground": "--status-l",
	"--info-foreground": "--status-l",
	"--warning-foreground": "--warning-l",
};

interface Lever {
	token: string;
	kind: "number" | "color";
	/** A literal to start from, when the token was an alias of it. */
	seed?: string;
}

const pairName = (p: { fg: string; on: string[] }) => `${p.fg} on ${p.on.join(" + ")}`;
const pairKey = (p: PairResult) => `${p.kind} ${pairName(p)}`;
const scopeName = (nature: string, tint: number) => `${nature}${tint ? "" : " neutral"}`;

export function fixContrast(draft: Draft, ctx: FixContext): { adjustments: Adjustment[]; problems: Problem[]; ringWarnings: number } {
	const adjustments: Adjustment[] = [];
	const natures = Object.keys(ctx.natures);
	const sources = (): Sources => ({ ...ctx.base, natures: ctx.natures, villages: { [draft.name]: { light: draft.light, dark: draft.dark } } });
	const tokensOf = (scheme: Scheme, nature: string, tint: number) => scope(sources(), draft.name, scheme, nature, tint);
	const valueOf = (scheme: Scheme, token: string) => draft[scheme][token] ?? ctx.base.derived[token] ?? ctx.base.defaults[token];
	const set = (scheme: Scheme, token: string, value: string) => {
		// A light value reaches the dark scheme unless the dark one is set: keep what dark had.
		if (scheme === "light" && !(token in draft.dark)) {
			const inherited = ctx.base.derived[token] ?? ctx.base.defaults[token];
			if (inherited !== undefined) draft.dark[token] = inherited;
		}
		draft[scheme][token] = value;
	};
	const restore = (scheme: Scheme, token: string, value: string | undefined) => {
		if (value === undefined) delete draft[scheme][token];
		else draft[scheme][token] = value;
	};

	// 1. The brand.
	for (const scheme of schemes) {
		const lPinned = ctx.pinned[scheme].has("--primary-l");
		const own = draft[scheme]["--on-primary"];
		const other = draft[scheme === "light" ? "dark" : "light"]["--on-primary"];
		const texts = ctx.pinned[scheme].has("--on-primary") || other === own ? [own] : [own, other];
		const originalL = draft[scheme]["--primary-l"];
		const startL = Number(substitute(valueOf(scheme, "--primary-l"), tokensOf(scheme, natures[0], 1)));
		const holds = () =>
			natures.every((n) =>
				tints.every((t) => {
					const tokens = tokensOf(scheme, n, t);
					return BRAND_PAIRS.every(([fg, on, min]) => pairValue(tokens, fg, on) >= min);
				}),
			);
		let best: { text: string; l: number; distance: number } | undefined;
		for (const text of texts) {
			draft[scheme]["--on-primary"] = text;
			search: for (let distance = 0; distance <= (lPinned ? 0 : BRAND_LIMIT) + 1e-9; distance += STEP)
				for (const sign of distance === 0 ? [0] : [-1, 1]) {
					const l = Math.round((startL + sign * distance) * 1000) / 1000;
					if (l < 0.05 || l > 0.98) continue;
					set(scheme, "--primary-l", num(l, 3));
					if (holds()) {
						if (!best || distance < best.distance - 1e-9) best = { text, l, distance };
						break search;
					}
				}
		}
		draft[scheme]["--on-primary"] = own;
		restore(scheme, "--primary-l", originalL);
		if (!best) continue;
		if (best.text !== own) {
			set(scheme, "--on-primary", best.text);
			adjustments.push({ scheme, token: "--on-primary", from: own, to: best.text, reason: "--primary-foreground on --primary" });
		}
		if (best.distance > 0) {
			set(scheme, "--primary-l", num(best.l, 3));
			adjustments.push({ scheme, token: "--primary-l", from: originalL ?? num(startL, 3), to: num(best.l, 3), reason: "the brand colour holds with its text" });
		}
	}

	// 2. Every other failing pair.
	const lever = (scheme: Scheme, fg: string): Lever | undefined => {
		let token = LEVERS[fg] ?? fg;
		let settable: string | undefined;
		for (let depth = 0; depth < 10; depth++) {
			const s = spec(token);
			if (s?.kind === "number" && !s.derived) return { token, kind: "number" };
			if (s && !s.derived && !settable) settable = token;
			const value = valueOf(scheme, token)?.trim();
			if (!value) return undefined;
			const alias = value.match(/^var\((--[\w-]+)\)$/);
			if (alias) {
				token = alias[1];
				continue;
			}
			if (/^oklch\(\s*[\d.]+\s/.test(value)) {
				if (settable === token) return { token, kind: "color" };
				return settable ? { token: settable, kind: "color", seed: value } : undefined;
			}
			const inner = value.match(/^oklch\(\s*var\((--[\w-]+)\)/);
			if (inner) {
				token = inner[1];
				continue;
			}
			return undefined;
		}
		return undefined;
	};

	/** Moves one lever until the pair passes in this scope without breaking another; reverts when it cannot. */
	const move = (scheme: Scheme, nature: string, tint: number, pair: PairResult, l: Lever, passing: Set<string>) => {
		const original = draft[scheme][l.token];
		const originalDark = draft.dark[l.token];
		const start = l.seed ?? valueOf(scheme, l.token)!;
		let current: number;
		let write: (n: number) => string;
		if (l.kind === "number") {
			current = Number(substitute(start, tokensOf(scheme, nature, tint)));
			write = (n) => num(n, 3);
		} else {
			const m = start.match(/^oklch\(\s*([\d.]+)(\s[\s\S]*)$/)!;
			current = Number(m[1]);
			write = (n) => `oklch(${num(n, 3)}${m[2]}`;
		}
		const value = (n: number) => {
			set(scheme, l.token, write(n));
			return pairValue(tokensOf(scheme, nature, tint), pair.fg, pair.on);
		};
		const direction = value(current + STEP) >= value(current - STEP) ? 1 : -1;
		// The limit guards values someone chose. A token that only followed another (--primary-border-l after the
		// brand's --primary-l) had none of its own, and may go as far as the brand could.
		const limit = /^var\(/.test(start) ? BRAND_LIMIT : LIMIT;
		for (let moved = STEP; moved <= limit + 1e-9; moved += STEP) {
			const n = current + direction * moved;
			if (n < 0 || n > 1) break;
			if (value(n) < pair.min) continue;
			const broken = checkScope(tokensOf(scheme, nature, tint)).some((p) => !p.pass && p.kind !== "ring" && passing.has(pairKey(p)));
			if (broken) continue;
			adjustments.push({ scheme, token: l.token, from: original ?? start, to: draft[scheme][l.token], reason: pairName(pair) });
			return true;
		}
		restore(scheme, l.token, original);
		if (scheme === "light") restore("dark", l.token, originalDark);
		return false;
	};

	for (let pass = 0; pass < 3; pass++) {
		let changed = false;
		for (const scheme of schemes)
			for (const nature of natures)
				for (const tint of tints) {
					const results = checkScope(tokensOf(scheme, nature, tint));
					if (results.every((p) => p.pass || p.kind === "ring")) continue;
					for (const pair of results) {
						if (pair.pass || pair.kind === "ring") continue;
						// An earlier move in this scope may have fixed it already.
						const now = checkScope(tokensOf(scheme, nature, tint));
						const current = now.find((p) => pairKey(p) === pairKey(pair))!;
						if (current.pass) continue;
						const l = lever(scheme, pair.fg);
						if (!l || ctx.pinned[scheme].has(l.token)) continue;
						const passing = new Set(now.filter((p) => p.pass).map(pairKey));
						if (move(scheme, nature, tint, current, l, passing)) changed = true;
					}
				}
		if (!changed) break;
	}

	// 3. What is left.
	const problems = new Map<string, Problem>();
	let ringWarnings = 0;
	for (const scheme of schemes)
		for (const nature of natures)
			for (const tint of tints)
				for (const pair of checkScope(tokensOf(scheme, nature, tint))) {
					if (pair.pass) continue;
					if (pair.kind === "ring") {
						ringWarnings++;
						continue;
					}
					const key = `${scheme} ${pairName(pair)}`;
					const problem = problems.get(key) ?? { scheme, pair: pairName(pair), value: pair.value, min: pair.min, scopes: [] };
					problem.value = Math.min(problem.value, pair.value);
					problem.scopes.push(scopeName(nature, tint));
					problems.set(key, problem);
				}
	// A token moved in several steps (one per scope that asked) is one adjustment: from its first value to its last.
	const merged = new Map<string, Adjustment>();
	for (const a of adjustments) {
		const key = `${a.scheme} ${a.token}`;
		const seen = merged.get(key);
		if (seen) seen.to = a.to;
		else merged.set(key, { ...a });
	}
	return { adjustments: [...merged.values()].filter((a) => a.from !== a.to), problems: [...problems.values()], ringWarnings };
}
