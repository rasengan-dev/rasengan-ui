#!/usr/bin/env node
/**
 * Screenshots of every component for visual review (RFC-0002, "Quality gate"):
 *
 *   pnpm next:dev                    # the site, on http://localhost:3200
 *   pnpm screenshots                 # every component, or: pnpm screenshots button dialog
 *   pnpm screenshots --accept        # the same, then keep this run as the baseline
 *
 * For each component page, the preview in the three villages × light/dark × two natures (the
 * village's default and Onmyōton), plus the whole window with the popup open for the overlays, and
 * each of its other demos (variants, sizes…) as `<demo>--<combo>.png`.
 * Each run is compared with the baseline: .screenshots/index.html lists what changed first, with
 * the before, after and a diff, then every capture. It drives the Chrome installed on the machine
 * (CHROME_PATH to pick another) and reports console errors.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { base, closeOverlay, overlayStillOpen, combos as allCombos, components as all, dress, extraDemos, isOverlay, launch, open, openOverlay, parseArgs, pool, preview, root, siteIsUp } from "./site-pages.mjs";

const out = join(root, ".screenshots");
const dirs = { latest: join(out, "latest"), baseline: join(out, "baseline"), diff: join(out, "diff") };

// ---- What to capture ------------------------------------------------------------

const { names, flags } = parseArgs();
const accept = flags.has("--accept");
const combos = allCombos();
const file = ({ village, scheme, nature }, suffix = "") => `${village}-${scheme}-${nature}${suffix}.png`;
/* Overlays are only a trigger at rest: they also get the whole window with the popup open. */
const shots = (name) =>
	combos.flatMap((combo) => [
		...(isOverlay(name) ? [file(combo), file(combo, "-open")] : [file(combo)]),
		...extraDemos(name).map((demo) => `${demo}--${file(combo)}`),
	]);

// ---- Capture ----------------------------------------------------------------------

await siteIsUp();
const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

const errors = {};

async function capture(name) {
	const page = await context.newPage();
	errors[name] = [];
	page.on("console", (message) => message.type() === "error" && errors[name].push(message.text().split("\n")[0]));
	page.on("pageerror", (error) => errors[name].push(error.message));

	try {
		await open(page, `/components/${name}`);
		const dir = join(dirs.latest, name);
		rmSync(dir, { recursive: true, force: true });
		mkdirSync(dir, { recursive: true });
		for (const combo of combos) {
			await dress(page, combo);
			await preview(page).screenshot({ path: join(dir, file(combo)) });
			for (const demo of extraDemos(name)) await preview(page, demo).screenshot({ path: join(dir, `${demo}--${file(combo)}`) });
			if (isOverlay(name)) {
				for (let attempt = 0; attempt < 3; attempt++) {
					await openOverlay(page, name);
					await page.screenshot({ path: join(dir, file(combo, "-open")) });
					const kept = await overlayStillOpen(page, name);
					await closeOverlay(page, name);
					if (kept) break;
				}
			}
		}
	} finally {
		await page.close();
	}
	process.stdout.write(".");
}

await pool(names, capture);
await browser.close();
process.stdout.write("\n");

// ---- Compare with the baseline ---------------------------------------------------------

/** "new" without a baseline, "changed" with a diff image written, or "same". */
function compare(name, shot) {
	const before = join(dirs.baseline, name, shot);
	if (!existsSync(before)) return "new";
	const a = PNG.sync.read(readFileSync(before));
	const b = PNG.sync.read(readFileSync(join(dirs.latest, name, shot)));
	if (a.width !== b.width || a.height !== b.height) return "changed";
	const diff = new PNG({ width: a.width, height: a.height });
	const pixels = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
	if (pixels === 0) return "same";
	mkdirSync(join(dirs.diff, name), { recursive: true });
	writeFileSync(join(dirs.diff, name, shot), PNG.sync.write(diff));
	return "changed";
}

const status = {};
for (const name of names) {
	rmSync(join(dirs.diff, name), { recursive: true, force: true });
	status[name] = Object.fromEntries(shots(name).map((shot) => [shot, compare(name, shot)]));
}

if (accept) {
	for (const name of names) {
		rmSync(join(dirs.baseline, name), { recursive: true, force: true });
		cpSync(join(dirs.latest, name), join(dirs.baseline, name), { recursive: true });
	}
}

// ---- Contact sheet ------------------------------------------------------------------

/* Every component captured so far, this run's first in its own state. */
const listed = readdirSync(dirs.latest).filter((name) => all.includes(name)).sort();
const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const caption = (shot) => shot.replace(/\.png$/, "").replaceAll("-", " · ");
const img = (dir, name, shot) => `<a href="${dir}/${name}/${shot}"><img loading="lazy" src="${dir}/${name}/${shot}" alt="${name}, ${caption(shot)}"></a>`;

const changed = names.flatMap((name) => shots(name).filter((shot) => status[name][shot] === "changed").map((shot) => ({ name, shot })));
const changes = changed.length
	? `<section id="changes"><h2>Changed since the baseline (${changed.length})</h2>${changed
			.map(
				({ name, shot }) =>
					`<div class="change"><h3><a href="#${name}">${name}</a> · ${caption(shot)}</h3><div class="trio"><figure>${img("baseline", name, shot)}<figcaption>baseline</figcaption></figure><figure>${img("latest", name, shot)}<figcaption>latest</figcaption></figure><figure>${img("diff", name, shot)}<figcaption>diff</figcaption></figure></div></div>`,
			)
			.join("")}</section>`
	: "";

const sections = listed
	.map((name) => {
		const cells = shots(name)
			.filter((shot) => existsSync(join(dirs.latest, name, shot)))
			.map((shot) => `<figure class="${status[name]?.[shot] ?? ""}">${img("latest", name, shot)}<figcaption>${caption(shot)}</figcaption></figure>`)
			.join("");
		const problems = errors[name]?.length ? `<ul class="errors">${errors[name].map((e) => `<li>${escape(e)}</li>`).join("")}</ul>` : "";
		return `<section id="${name}"><h2><a href="${base}/components/${name}">${name}</a></h2>${problems}<div class="grid">${cells}</div></section>`;
	})
	.join("\n");

writeFileSync(
	join(out, "index.html"),
	`<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rasengan UI screenshots</title>
<style>
  body { margin: 0; padding: 24px; font: 14px/1.5 system-ui, sans-serif; background: #f4f4f5; color: #18181b; }
  nav { display: flex; flex-wrap: wrap; gap: 4px 12px; margin-bottom: 24px; }
  section { margin-bottom: 48px; }
  h2 { margin: 0 0 12px; font-size: 18px; }
  h3 { margin: 16px 0 8px; font-size: 14px; }
  .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .trio { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  figure { margin: 0; background: #fff; border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; }
  figure.changed { outline: 3px solid #f97316; }
  figure.new { outline: 3px dashed #a1a1aa; }
  img { display: block; width: 100%; height: auto; }
  figcaption { padding: 6px 10px; font-size: 12px; color: #52525b; border-top: 1px solid #e4e4e7; }
  .errors { color: #b91c1c; }
</style>
<h1>Rasengan UI · ${listed.length} components × ${combos.length} combinations</h1>
<p>Orange: changed since the baseline. Dashed: no baseline yet. <code>pnpm screenshots --accept</code> makes this run the baseline.</p>
<nav>${changed.length ? `<a href="#changes"><strong>${changed.length} changed</strong></a>` : ""}${listed.map((name) => `<a href="#${name}">${name}</a>`).join("")}</nav>
${changes}
${sections}
</html>
`,
);

// ---- Report ---------------------------------------------------------------------------

const count = names.reduce((n, name) => n + shots(name).length, 0);
const fresh = names.reduce((n, name) => n + Object.values(status[name]).filter((s) => s === "new").length, 0);
console.log(`${count} screenshots in .screenshots/latest, browse .screenshots/index.html`);
if (fresh === count) {
	if (!accept) console.log("No baseline yet: run with --accept to keep this one.");
} else console.log(`${changed.length} changed since the baseline${fresh ? `, ${fresh} without one` : ""}${changed.length ? ` (${[...new Set(changed.map((c) => c.name))].join(", ")})` : ""}.`);
if (accept) console.log("Kept as the baseline.");

const failing = names.filter((name) => errors[name].length);
if (failing.length) {
	console.error(`Console errors on ${failing.join(", ")} (listed in the sheet).`);
	process.exitCode = 1;
}
