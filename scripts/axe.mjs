#!/usr/bin/env node
/**
 * An axe pass over the site (RFC-0002, "Quality gate"):
 *
 *   pnpm dev          # the site, on http://localhost:3200
 *   pnpm axe          # every page, or: pnpm axe button dialog
 *
 * Runs axe-core's WCAG 2.2 A and AA rules on the home page, /components, /motion, each component page, /blocks and
 * each block page (also at 360px), the example landing page,
 * in every village, light and dark, and again with each overlay open. Violations are grouped by
 * rule, with where they happen, in the console and in .axe/report.md; the run fails on any.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { blockWidths, closeOverlay, combos as allCombos, dress, isOverlay, launch, open, openOverlay, parseArgs, pool, root, siteIsUp } from "./site-pages.mjs";

const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const { names, blockNames } = parseArgs();
/* Named components: only their pages. Otherwise the home page and the index too. */
const named = process.argv.slice(2).some((arg) => !arg.startsWith("--"));
// /motion twice: animating, and with motion off (what reduced-motion users get).
const pages = [
	...(named ? [] : ["/", "/components", "/motion", "/motion?motion=off"]),
	...names.map((name) => `/components/${name}`),
	...(named ? [] : ["/blocks", "/examples/landing", "/examples/restaurant"]),
	...blockNames.map((name) => `/blocks/${name}`),
];
const combos = allCombos({ onmyoton: false });

await siteIsUp();
const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

/** rule id → { impact, help, url, hits: Map(target → Set(where)) } */
const rules = new Map();

function record(results, where) {
	for (const violation of results.violations) {
		const rule = rules.get(violation.id) ?? { impact: violation.impact, help: violation.help, url: violation.helpUrl, hits: new Map(), summary: new Map() };
		for (const node of violation.nodes) {
			const target = node.target.join(" ");
			if (!rule.hits.has(target)) rule.hits.set(target, new Set());
			rule.hits.get(target).add(where);
			rule.summary.set(target, node.failureSummary?.split("\n").slice(0, 2).join(" ").trim());
		}
		rules.set(violation.id, rule);
	}
}

/*
 * Left out: the focus guards Base UI puts around a popup, aria-hidden but focusable on purpose,
 * since they only catch Tab to send focus back into the popup or out to its trigger.
 */
const exclude = [["[data-base-ui-focus-guard]"]];

/*
 * Rules left out while one overlay is open. Combobox: while its list is open, Base UI hides the rest of the page from
 * screen readers (aria-hidden, not inert) so the virtual cursor stays on the input and the list, as it does for a
 * modal; Tab out of the input closes the list and lifts it. axe sees focusable content under aria-hidden.
 */
const skippedWhenOpen = { combobox: ["aria-hidden-focus"] };

const run = (page, skip = []) =>
	page.evaluate(
		({ runOnly, exclude, skip }) =>
			window.axe.run({ exclude }, { runOnly: { type: "tag", values: runOnly }, rules: Object.fromEntries(skip.map((id) => [id, { enabled: false }])), resultTypes: ["violations"] }),
		{ runOnly: tags, exclude, skip },
	);

const atPhoneWidth = (path) => path.startsWith("/blocks/") || path.startsWith("/examples/");

async function audit(path) {
	const page = await context.newPage();
	try {
		await open(page, path);
		await page.addScriptTag({ content: axeSource });
		const name = path.startsWith("/components/") ? path.slice("/components/".length) : undefined;
		for (const combo of combos) {
			await dress(page, combo);
			const where = `${path} · ${combo.village} ${combo.scheme}`;
			record(await run(page), where);
			if (name && isOverlay(name)) {
				await openOverlay(page, name);
				record(await run(page, skippedWhenOpen[name]), `${where} · open`);
				await closeOverlay(page, name);
			}
		}
		// Blocks lay out by their container (ADR-0013): their pages are audited at a phone's width too.
		if (atPhoneWidth(path)) {
			await page.setViewportSize(blockWidths[0].viewport);
			for (const combo of combos) {
				await dress(page, combo);
				record(await run(page), `${path} · ${combo.village} ${combo.scheme} · ${blockWidths[0].id}px`);
			}
		}
	} finally {
		await page.close();
	}
	process.stdout.write(".");
}

await pool(pages, audit);
await browser.close();
process.stdout.write("\n");

// ---- Report -----------------------------------------------------------------------------

const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const sorted = [...rules.entries()].sort(([, a], [, b]) => order[a.impact] - order[b.impact]);
const runs = (pages.length + names.filter(isOverlay).length + pages.filter(atPhoneWidth).length) * combos.length;

/* Where a target fails everywhere it is checked, say so rather than list every village. */
const places = (wheres) => {
	const list = [...wheres];
	const paths = [...new Set(list.map((w) => w.split(" · ")[0]))];
	return list.length >= combos.length * paths.length ? `${paths.join(", ")} (every village)` : list.join("; ");
};

const lines = [`# axe · ${pages.length} pages × ${combos.length} villages and schemes (${runs} runs)`, ""];
if (sorted.length === 0) lines.push("No violation.");
for (const [id, rule] of sorted) {
	lines.push(`## ${id} (${rule.impact}): ${rule.help}`, "", rule.url, "");
	for (const [target, wheres] of rule.hits) lines.push(`- \`${target}\`: ${places(wheres)}`, `  ${rule.summary.get(target)}`);
	lines.push("");
}
mkdirSync(join(root, ".axe"), { recursive: true });
writeFileSync(join(root, ".axe/report.md"), lines.join("\n"));

console.log(`${runs} axe runs on ${pages.length} pages.`);
if (sorted.length === 0) console.log("No violation.");
else {
	for (const [id, rule] of sorted) console.log(`${rule.impact.padEnd(9)} ${id}: ${rule.hits.size} element${rule.hits.size > 1 ? "s" : ""}`);
	console.log("Details in .axe/report.md.");
	process.exitCode = 1;
}
