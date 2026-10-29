#!/usr/bin/env node
/**
 * Screenshots of every component for visual review (RFC-0002, "Quality gate"):
 *
 *   pnpm next:dev                    # the site, on http://localhost:3200
 *   pnpm screenshots                 # every component, or: pnpm screenshots button dialog
 *   pnpm screenshots --accept        # the same, then keep this run as the baseline
 *
 * For each component page, the preview in the three villages × light/dark × two natures (the
 * village's default and Onmyōton), plus the whole window with the popup open for the overlays.
 * Each run is compared with the baseline: .screenshots/index.html lists what changed first, with
 * the before, after and a diff, then every capture. It drives the Chrome installed on the machine
 * (CHROME_PATH to pick another) and reports console errors.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";

const root = join(import.meta.dirname, "..");
const base = process.env.RASENGAN_UI_URL ?? "http://localhost:3200";
const out = join(root, ".screenshots");
const dirs = { latest: join(out, "latest"), baseline: join(out, "baseline"), diff: join(out, "diff") };

// ---- What to capture ------------------------------------------------------------

const args = process.argv.slice(2);
const accept = args.includes("--accept");
const all = readdirSync(join(root, "registry/components")).sort();
const asked = args.filter((arg) => !arg.startsWith("--"));
const names = asked.length ? asked : all;
const unknown = names.filter((name) => !all.includes(name));
if (unknown.length) throw new Error(`No component named ${unknown.join(", ")}`);

/* The villages and their default nature, from packages/villages (a .ts file, so read rather than imported). */
const index = readFileSync(join(root, "packages/villages/src/index.ts"), "utf8");
const villagesBlock = index.slice(index.indexOf("export const villages"));
const villages = [...villagesBlock.matchAll(/\n\t(\w+): \{[^}]*?defaultNature: "(\w+)"/g)].map((m) => ({ village: m[1], nature: m[2] }));

const combos = villages.flatMap(({ village, nature }) =>
	["light", "dark"].flatMap((scheme) => [nature, "onmyoton"].map((n) => ({ village, scheme, nature: n }))),
);
const file = ({ village, scheme, nature }, suffix = "") => `${village}-${scheme}-${nature}${suffix}.png`;

/*
 * Overlays are only a trigger at rest: open them, capture the window, close them again.
 * Each opener gets the preview's locator and the page.
 */
const firstButton = (preview) => preview.locator("button").first();
const openers = {
	dialog: (preview) => firstButton(preview).click(),
	"alert-dialog": (preview) => firstButton(preview).click(),
	popover: (preview) => firstButton(preview).click(),
	"dropdown-menu": (preview) => firstButton(preview).click(),
	select: (preview) => preview.locator('[data-slot="select-trigger"]').first().click(),
	tooltip: (preview) => firstButton(preview).hover(),
	toast: async (preview) => {
		await preview.getByRole("button", { name: "Send invite" }).click();
		await preview.getByRole("button", { name: "Fail a save" }).click();
	},
};
const closers = {
	tooltip: (page) => page.mouse.move(0, 0),
	toast: (page) => page.evaluate(() => document.querySelectorAll("[data-sonner-toast] [data-close-button]").forEach((button) => button.click())),
};
const shots = (name) => combos.flatMap((combo) => (openers[name] ? [file(combo), file(combo, "-open")] : [file(combo)]));

// ---- Capture ----------------------------------------------------------------------

try {
	const response = await fetch(base, { headers: { Accept: "text/html" } });
	if (!response.ok) throw new Error(String(response.status));
} catch (error) {
	console.error(`The site isn't answering at ${base} (${error.message}). Start it with \`pnpm next:dev\`.`);
	process.exit(1);
}

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

const errors = {};

/*
 * A popup is only at rest once Base UI has dropped data-starting-style (Sonner: data-mounted),
 * whatever the time that took; the tooltip first waits out its delay.
 */
async function settle(page, name) {
	if (name === "tooltip") await page.waitForSelector('[data-slot="tooltip-content"]');
	if (name === "toast")
		await page.waitForFunction(() => {
			const shown = [...document.querySelectorAll('[data-sonner-toast][data-mounted="true"]:not([data-removed="true"])')];
			return shown.length === 2 && shown.every((toast) => getComputedStyle(toast).opacity === "1");
		});
	await page.waitForFunction(() => !document.querySelector("[data-starting-style], [data-ending-style]"));
	await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function capture(name) {
	const page = await context.newPage();
	errors[name] = [];
	page.on("console", (message) => message.type() === "error" && errors[name].push(message.text().split("\n")[0]));
	page.on("pageerror", (error) => errors[name].push(error.message));

	try {
		await page.goto(`${base}/components/${name}`, { waitUntil: "networkidle" });
		await page.evaluate(() => document.fonts.ready);
		// Still frames: no transitions or animations, no caret.
		await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }" });

		const preview = page.locator('[data-slot="component-preview"]');
		const dir = join(dirs.latest, name);
		rmSync(dir, { recursive: true, force: true });
		mkdirSync(dir, { recursive: true });
		for (const combo of combos) {
			await page.evaluate(({ village, scheme, nature }) => {
				const html = document.documentElement;
				html.dataset.village = village;
				html.dataset.nature = nature;
				html.dataset.tint = "village";
				html.classList.toggle("dark", scheme === "dark");
				return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
			}, combo);
			await preview.screenshot({ path: join(dir, file(combo)) });
			if (openers[name]) {
				await openers[name](preview, page);
				await settle(page, name);
				await page.screenshot({ path: join(dir, file(combo, "-open")) });
				await (closers[name] ?? ((p) => p.keyboard.press("Escape")))(page);
				await page.waitForFunction(() => !document.querySelector('[data-open][role="dialog"], [data-open][role="alertdialog"], [data-open][role="menu"], [data-open][role="listbox"], [data-sonner-toast]'));
			}
		}
	} finally {
		await page.close();
	}
	process.stdout.write(".");
}

/* Right after the dev server starts, Vite may re-optimise its dependencies and reload a page mid-run: try once more. */
async function captureWithRetry(name) {
	try {
		await capture(name);
	} catch {
		await capture(name);
	}
}

// A few pages at a time.
const queue = [...names];
await Promise.all(
	Array.from({ length: 4 }, async () => {
		while (queue.length) await captureWithRetry(queue.shift());
	}),
);
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
