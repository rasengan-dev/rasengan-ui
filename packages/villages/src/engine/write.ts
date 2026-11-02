/** A village as a CSS file, in the shape of konoha.css (RFC-0006, "The engine", step 5). */
import type { Tokens } from "../contrast.ts";
import { contract, type TokenGroup, type TokenSpec } from "../contract.ts";

const titles: Record<TokenGroup, string> = {
	accent: "Brand",
	shape: "Shape",
	type: "Type",
	controls: "Controls",
	focus: "Focus",
	press: "Press",
	motion: "Motion",
	colour: "Colour",
	fields: "Fields",
	tabs: "Tabs",
	lists: "Lists",
	states: "State controls",
	tracks: "Tracks",
	status: "Status colours",
	chart: "Charts",
	depth: "Depth",
	loading: "Loading",
};

export interface WriteInput {
	name: string;
	title: string;
	description: string;
	/** "Founded from Kiri with engine 1.0.0." and the like. */
	origin: string;
	natureHue: number;
	ownNature: boolean;
	light: Tokens;
	dark: Tokens;
	/** contract.css defaults: a value equal to its default is left out. */
	defaults: Tokens;
}

const norm = (value: string | undefined) => value?.replace(/\s+/g, " ").trim();

/** Contract order, one comment per group; anything else the village sets comes last. */
function declarations(tokens: [string, string][]): string {
	const order = Object.keys(contract);
	const sorted = [...tokens].sort(([a], [b]) => (order.indexOf(a) + 1 || 1e4) - (order.indexOf(b) + 1 || 1e4));
	const lines: string[] = [];
	let group: string | undefined;
	for (const [token, value] of sorted) {
		const g = (contract as Record<string, TokenSpec>)[token]?.group;
		if (g !== group) {
			if (lines.length) lines.push("");
			lines.push(`\t/* ${g ? titles[g] : "Other"} */`);
			group = g;
		}
		lines.push(`\t${token}: ${value};`);
	}
	return lines.join("\n");
}

export function writeVillage(v: WriteInput): string {
	const village = `[data-village="${v.name}"]`;
	const light = Object.entries(v.light).filter(([token, value]) => token !== "--nature-hue" && norm(value) !== norm(v.defaults[token]));
	const dark = Object.entries(v.dark).filter(([token, value]) => token !== "--nature-hue" && norm(value) !== norm(v.light[token] ?? v.defaults[token]));
	const parts = [
		`/*
 * ${v.title}${v.description ? `: ${v.description}` : ""}
 * ${v.origin}
 * Made by the village engine (RFC-0006): edit the recipe and regenerate rather than this file; local edits are merged.
 * Greys multiply their chroma by --tint (data-tint="neutral" → 0).
 */`,
		`/* Default nature, only for a top-level village: a nested one keeps the nature it inherits. */
:where(${village}:not([data-village] *)) {
	--nature-hue: ${v.natureHue};
}`,
	];
	if (v.ownNature)
		parts.push(`/* The village's own nature, so its brand colour follows into other villages too. */
[data-nature="${v.name}"] {
	--nature-hue: ${v.natureHue};
}`);
	parts.push(`${village} {\n${declarations(light)}\n}`);
	if (dark.length)
		parts.push(`/* Dark: under a .dark ancestor unless a nearer .light scope says otherwise (VillageScope scheme="light"). */
:is(.dark ${village}:not(.light, .light *), .light .dark ${village}, ${village}.dark) {
${declarations(dark)}
}`);
	return `${parts.join("\n\n")}\n`;
}
