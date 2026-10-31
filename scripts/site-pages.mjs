/**
 * What `pnpm screenshots` and `pnpm axe` share: the site's address, the components, the village
 * combinations, how to dress a page in one, and how to open and close each overlay.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";

export const root = join(import.meta.dirname, "..");
export const base = process.env.RASENGAN_UI_URL ?? "http://localhost:3200";
export const components = readdirSync(join(root, "registry/components")).sort();

/** The components named on the command line (every one by default), and the --flags. */
export function parseArgs(argv = process.argv.slice(2)) {
	const asked = argv.filter((arg) => !arg.startsWith("--"));
	const unknown = asked.filter((name) => !components.includes(name));
	if (unknown.length) throw new Error(`No component named ${unknown.join(", ")}`);
	return { names: asked.length ? asked : components, flags: new Set(argv.filter((arg) => arg.startsWith("--"))) };
}

/* The villages and their default nature, from packages/villages (a .ts file, so read rather than imported). */
const index = readFileSync(join(root, "packages/villages/src/index.ts"), "utf8");
export const villages = [...index.slice(index.indexOf("export const villages")).matchAll(/\n\t(\w+): \{[^}]*?defaultNature: "(\w+)"/g)].map(
	(m) => ({ village: m[1], nature: m[2] }),
);

/** Each village, light and dark, in its own nature and, with `onmyoton`, in Onmyōton too. */
export const combos = ({ onmyoton = true } = {}) =>
	villages.flatMap(({ village, nature }) =>
		["light", "dark"].flatMap((scheme) => (onmyoton ? [nature, "onmyoton"] : [nature]).map((n) => ({ village, scheme, nature: n }))),
	);

export async function siteIsUp() {
	try {
		const response = await fetch(base, { headers: { Accept: "text/html" } });
		if (!response.ok) throw new Error(String(response.status));
	} catch (error) {
		console.error(`The site isn't answering at ${base} (${error.message}). Start it with \`pnpm next:dev\`.`);
		process.exit(1);
	}
}

export const launch = () => chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });

/**
 * Loads a page once React has hydrated it (it tags each DOM node with `__reactProps$…`), so the
 * attributes Base UI sets in effects (a checkbox's aria-labelledby) are there; then still frames:
 * no transitions or animations, no caret.
 */
export async function open(page, path) {
	await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
	await page.waitForFunction(() => {
		const node = document.querySelector('[data-slot="component-preview"] *, main *');
		return node && Object.keys(node).some((key) => key.startsWith("__reactProps$"));
	});
	await page.evaluate(() => Promise.all([document.fonts.ready, new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))]));
	await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }" });
}

/** Puts <html> in one combination, as the header's selectors do, and waits for the repaint. */
export const dress = (page, combo) =>
	page.evaluate(({ village, scheme, nature }) => {
		const html = document.documentElement;
		html.dataset.village = village;
		html.dataset.nature = nature;
		html.dataset.tint = "village";
		html.classList.toggle("dark", scheme === "dark");
		return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	}, combo);

/*
 * Overlays are only a trigger at rest: these open them from the component's preview, and close
 * them again. A popup is at rest once Base UI has dropped data-starting-style (Sonner: both toasts
 * mounted and opaque), whatever the time that took.
 */
const firstButton = (preview) => preview.locator("button").first();
const openers = {
	dialog: (preview) => firstButton(preview).click(),
	"alert-dialog": (preview) => firstButton(preview).click(),
	sheet: (preview) => firstButton(preview).click(),
	popover: (preview) => firstButton(preview).click(),
	"dropdown-menu": (preview) => firstButton(preview).click(),
	select: (preview) => preview.locator('[data-slot="select-trigger"]').first().click(),
	combobox: (preview) => preview.locator('[data-slot="combobox-trigger"]').first().click(),
	"navigation-menu": (preview) => preview.locator('[data-slot="navigation-menu-trigger"]').first().click(),
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

export const isOverlay = (name) => name in openers;
/** A page's main preview (its first); `demo` picks another one, as `<ComponentPreview demo>` names it. */
export const preview = (page, demo) =>
	demo ? page.locator(`[data-slot="component-preview"][data-demo="${demo}"]`) : page.locator('[data-slot="component-preview"]').first();

/** A component's other demos (`button-sizes.demo.tsx` → "button-sizes"), each shown in its own preview on the page. */
export const extraDemos = (name) =>
	readdirSync(join(root, "registry/components", name))
		.filter((file) => file.endsWith(".demo.tsx") && file !== `${name}.demo.tsx`)
		.map((file) => file.slice(0, -".demo.tsx".length))
		.sort();

export async function openOverlay(page, name) {
	await openers[name](preview(page), page);
	if (name === "tooltip") await page.waitForSelector('[data-slot="tooltip-content"]');
	if (name === "toast")
		await page.waitForFunction(() => {
			const shown = [...document.querySelectorAll('[data-sonner-toast][data-mounted="true"]:not([data-removed="true"])')];
			return shown.length === 2 && shown.every((toast) => getComputedStyle(toast).opacity === "1");
		});
	await page.waitForFunction(() => !document.querySelector("[data-starting-style], [data-ending-style]"));
	await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

/** Whether the popup is still there: Sonner's toasts may time out while a slow capture runs. */
export const overlayStillOpen = (page, name) =>
	name === "toast" ? page.evaluate(() => document.querySelectorAll('[data-sonner-toast]:not([data-removed="true"])').length === 2) : true;

export async function closeOverlay(page, name) {
	await (closers[name] ?? ((p) => p.keyboard.press("Escape")))(page);
	await page.waitForFunction(
		() => !document.querySelector('[data-open][role="dialog"], [data-open][role="alertdialog"], [data-open][role="menu"], [data-open][role="listbox"], [data-sonner-toast]'),
	);
}

/** Runs `task` over `items`, a few pages at a time; a failure is retried once (Vite may reload a page right after it starts). */
export async function pool(items, task, size = 4) {
	const queue = [...items];
	await Promise.all(
		Array.from({ length: size }, async () => {
			while (queue.length) {
				const item = queue.shift();
				try {
					await task(item);
				} catch {
					await task(item);
				}
			}
		}),
	);
}
