#!/usr/bin/env node
/**
 * Checks text contrast for every village × nature × scheme × tint (RFC-0002, "Villages"):
 *
 *   pnpm contrast
 *
 * The checks live in packages/villages/src/contrast.ts, shared with the village engine (RFC-0006); this script reads
 * the CSS sources and prints the report. It fails when a text pair is under 4.5:1 (WCAG AA), or a control's border or
 * track under 3:1 (WCAG 1.4.11). Text pairs include every tone: on its solid colour, and its words on the page, a card
 * and its soft wash (CONTRAST_TONES=1 lists them; CONTRAST_CONTROLS=1 the control edges). Focus rings are reported
 * against 3:1 but do not fail the run.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const src = join(root, "packages/villages/src");
const { checkVillages, parseSources, scopeLabel } = await import(pathToFileURL(join(src, "contrast.ts")).href);

const read = (path) => readFileSync(path, "utf8");
const sources = parseSources({
	contract: read(join(src, "contract.css")),
	natures: read(join(src, "natures.css")),
	villages: Object.fromEntries(
		readdirSync(join(src, "villages"))
			.filter((f) => f.endsWith(".css"))
			.map((f) => [f.replace(/\.css$/, ""), read(join(src, "villages", f))]),
	),
});

const failures = [];
const warnings = [];
const controls = [];
const tones = [];
let checked = 0;
for (const result of checkVillages(sources)) {
	const label = scopeLabel(result);
	for (const { kind, fg, on, value, pass } of result.pairs) {
		const pair = `${fg} on ${on.join(" + ")}`;
		if (kind === "ring") {
			if (!pass) warnings.push(`${label}: ${pair} = ${value.toFixed(2)}`);
			continue;
		}
		checked++;
		if (kind === "control") controls.push({ label, pair, value });
		if (kind === "tone") tones.push({ label, pair, value });
		if (!pass)
			failures.push(
				`${label}: ${pair} = ${value.toFixed(2)}${kind === "tone-edge" ? " (tone edge, 3:1)" : kind === "control" ? " (control, 3:1)" : ""}`,
			);
	}
}

const worst = (list, min) => {
	const by = {};
	for (const { label, pair, value } of list) {
		const key = `${label.split(" ").slice(0, 2).join(" ")} · ${pair}`;
		by[key] = Math.min(by[key] ?? Infinity, value);
	}
	for (const [key, value] of Object.entries(by)) console.log(`${value < min ? "✗" : "✓"} ${value.toFixed(2)}  ${key}`);
};
if (process.env.CONTRAST_CONTROLS) worst(controls, 3);
if (process.env.CONTRAST_TONES) worst(tones, 4.5);
console.log(
	`${checked} pairs across ${Object.keys(sources.villages).length} villages × ${Object.keys(sources.natures).length} natures × 2 schemes × 2 tints`,
);
if (warnings.length) console.log(`\nFocus ring under 3:1 (not failing yet, ${warnings.length}):\n  ${warnings.join("\n  ")}`);
if (failures.length) {
	console.error(`\nText under 4.5:1 (${failures.length}):\n  ${failures.join("\n  ")}`);
	process.exitCode = 1;
} else console.log("\nEvery text pair is at least 4.5:1, every control edge at least 3:1.");
