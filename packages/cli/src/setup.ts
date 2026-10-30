import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Lock } from "./install.ts";

const marker = "/* Rasengan UI (rasengan-ui): engine variants, token contract, villages, then natures. */";

/** The villages the project installed, from the lockfile. */
export const installedVillages = (lock: Lock) =>
	Object.keys(lock.items)
		.filter((name) => name.startsWith("village-"))
		.map((name) => name.slice("village-".length))
		.sort();

/**
 * Rewrites the stylesheet's Rasengan UI imports, right after Tailwind's, in the order the contract
 * needs: variants, contract, each installed village, then the natures (last, so Onmyōton can
 * override what a village derives). Running it again only replaces that block.
 */
export function writeCssImports(root: string, css: string, villages: string[]): boolean {
	const file = join(root, css);
	const before = readFileSync(file, "utf8");
	const ours = /^[ \t]*@import\s+["'](?:tw-animate-css|\.\/rasengan\/[^"']+)["'][^;\n]*;[ \t]*\n?/gm;
	const text = before.replace(ours, "").replace(`${marker}\n`, "");
	const tailwind = text.match(/^[ \t]*@import\s+["']tailwindcss["'][^;\n]*;[ \t]*\n/m);
	if (!tailwind || tailwind.index === undefined) throw new Error(`${css} doesn't import Tailwind (\`@import "tailwindcss";\`).`);
	const block = [
		marker,
		`@import "tw-animate-css";`,
		`@import "./rasengan/variants.css";`,
		`@import "./rasengan/contract.css";`,
		...villages.map((village) => `@import "./rasengan/villages/${village}.css";`),
		`@import "./rasengan/natures.css";`,
	].join("\n");
	const at = tailwind.index + tailwind[0].length;
	const after = `${text.slice(0, at)}\n${block}\n${text.slice(at).replace(/^\n*/, "\n")}`.replace(/\n{3,}/g, "\n\n");
	if (after === before) return false;
	writeFileSync(file, after);
	return true;
}

/**
 * Sets attributes on the first <html> tag of a JSX or HTML file (Rasengan's template, Next's
 * layout, Vite's index.html), replacing their current values. False when there is no <html> tag.
 */
export function setHtmlAttributes(root: string, path: string, attributes: Record<string, string>): boolean {
	const file = join(root, path);
	const before = readFileSync(file, "utf8");
	const tag = before.match(/<html\b[^>]*>/);
	if (!tag || tag.index === undefined) return false;
	let html = tag[0];
	for (const [name, value] of Object.entries(attributes)) {
		const current = new RegExp(`\\s${name}=(?:"[^"]*"|'[^']*'|\\{[^}]*\\})`);
		html = current.test(html) ? html.replace(current, ` ${name}="${value}"`) : html.replace(/\s*\/?>$/, (end) => ` ${name}="${value}"${end}`);
	}
	const after = before.slice(0, tag.index) + html + before.slice(tag.index + tag[0].length);
	if (after === before) return false;
	writeFileSync(file, after);
	return true;
}

/** The attributes for the page, as `init`, `village set`, `nature set` and `tint set` write them. */
export const htmlAttributes = (village: string, nature: string, tint: string) => ({ "data-village": village, "data-nature": nature, "data-tint": tint });

/* The tokens a village sets; a stylesheet that also sets them would override it. */
const villageTokens = new Set([
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"destructive-foreground",
	"border",
	"input",
	"ring",
	"radius",
	"chart-1",
	"chart-2",
	"chart-3",
	"chart-4",
	"chart-5",
]);
/* And in @theme, the ones the contract maps differently (radius steps, the village's type). */
const contractTheme = new Set(["radius-sm", "radius-md", "radius-lg", "radius-xl", "font-sans", "font-mono"]);

export interface Conflict {
	name: string;
	line: number;
}

/**
 * Finds, outside the Rasengan UI imports, the declarations that would override the village: its
 * tokens on `:root`, `.dark` or any rule (shadcn and starter themes), and the contract's own @theme
 * entries. With `comment`, they are commented out in place, with a note.
 */
export function villageConflicts(root: string, css: string, { comment = false } = {}): Conflict[] {
	const file = join(root, css);
	const text = readFileSync(file, "utf8");
	const conflicts: Conflict[] = [];
	const lineAt = (index: number) => text.slice(0, index).split("\n").length;
	const after = text.replace(/([^{}]*)\{([^{}]*)\}/g, (block, header: string, body: string, offset: number) => {
		const selector = header.replace(/\/\*[\s\S]*?\*\//g, "").split(";").pop()!.trim();
		const theme = selector.startsWith("@theme");
		const bodyStart = offset + header.length + 1;
		// Comments are matched first and left alone: declarations commented out by an earlier run stay as they are.
		const newBody = body.replace(/\/\*[\s\S]*?\*\/|(--([\w-]+))\s*:([^;{}]*);/g, (declaration: string, property: string | undefined, name: string, value: string, at: number) => {
			if (!property) return declaration;
			const harmless = theme && name.startsWith("color-") && value.trim() === `var(--${name.slice("color-".length)})`;
			const owned = theme ? contractTheme.has(name) || (name.startsWith("color-") && villageTokens.has(name.slice("color-".length)) && !harmless) : villageTokens.has(name);
			if (!owned) return declaration;
			conflicts.push({ name: `--${name}`, line: lineAt(bodyStart + at) });
			return `/* ${declaration.replace(/\s*\n\s*/g, " ")} (rasengan-ui: the village sets it) */`;
		});
		return `${header}{${newBody}}`;
	});
	if (comment && conflicts.length) writeFileSync(file, after);
	return conflicts;
}
