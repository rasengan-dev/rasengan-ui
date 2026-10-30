import { parseArgs, styleText } from "node:util";
import { type Config, readConfig, writeConfig } from "../config.ts";
import { installPackages, missingPackages } from "../dependencies.ts";
import { detectFramework, htmlFile } from "../framework.ts";
import { readLock, writeItems } from "../install.ts";
import { findRoot } from "../project.ts";
import { type Choice, choices, resolveItems } from "../registry.ts";
import { htmlAttributes, installedVillages, setHtmlAttributes, writeCssImports } from "../setup.ts";

/* The commands that change how the project looks: village, nature, tint (RFC-0002, "CLI"). */

export const villageUsage = `Usage: rasengan-ui village <list|set|add> [name...]

  list           The villages, with the installed and current ones marked
  set <name>     Make <name> the project's village (installing it if needed)
  add <name...>  Install villages without switching, to use them with VillageScope

Options:
  --nature <name>  With set: the nature to switch to (default: the new village's, unless you picked another)
  --skip-install   Don't install npm packages`;

export const natureUsage = `Usage: rasengan-ui nature <list|set> [name]

  list        The natures, with the current one marked
  set <name>  Make <name> the project's nature (the accent hue)`;

export const tintUsage = `Usage: rasengan-ui tint <list|set> [name]

  list        village (the village's own greys) or neutral
  set <name>  Switch the greys`;

function project() {
	const root = findRoot();
	return { root, config: readConfig(root) };
}

/** Saves the config and puts its village, nature and tint on <html>, or says what to write there. */
function apply(root: string, config: Config) {
	writeConfig(root, config);
	const attributes = htmlAttributes(config.village, config.nature, config.tint);
	const page = htmlFile(root, detectFramework(root));
	if (page) {
		if (setHtmlAttributes(root, page, attributes)) console.log(`${styleText("green", "~")} ${page}`);
	} else console.log(`Put them on your <html> element: ${Object.entries(attributes).map(([name, value]) => `${name}="${value}"`).join(" ")}`);
}

function list(known: Record<string, Choice>, current: string, installed?: string[]) {
	const width = Math.max(...Object.keys(known).map((name) => name.length));
	for (const [name, choice] of Object.entries(known)) {
		const mark = name === current ? styleText("green", "●") : installed?.includes(name) ? styleText("dim", "○") : " ";
		const detail = choice.description ?? choice.element ?? choice.title;
		console.log(`${mark} ${name.padEnd(width)}  ${styleText("dim", detail ?? "")}`);
	}
	if (installed) console.log(styleText("dim", `\n● current  ○ installed`));
}

function unknown(kind: string, name: string | undefined, known: Record<string, unknown>): never {
	throw new Error(`${name ? `Unknown ${kind} "${name}"` : `Name a ${kind}`}. Known: ${Object.keys(known).join(", ")}.`);
}

/** Installs villages and rewrites the CSS imports so every installed village is imported. */
async function installVillages(root: string, config: Config, names: string[], skipInstall = false) {
	const items = await resolveItems(config, root, names.map((name) => `village-${name}`));
	for (const { path, outcome } of writeItems(root, config, items)) if (outcome === "created" || outcome === "updated") console.log(`${styleText("green", "+")} ${path}`);
	if (writeCssImports(root, config.css, installedVillages(readLock(root)))) console.log(`${styleText("green", "~")} ${config.css}`);
	const packages = missingPackages(root, items);
	if (!skipInstall) installPackages(root, packages);
}

export async function village(argv: string[]) {
	const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { nature: { type: "string" }, "skip-install": { type: "boolean" }, help: { type: "boolean", short: "h" } } });
	const [action, ...names] = positionals;
	if (values.help || !action) return console.log(villageUsage);
	const { root, config } = project();
	const { villages, natures } = await choices(config, root);
	const installed = installedVillages(readLock(root));

	if (action === "list") return list(villages, config.village, installed);

	for (const name of names) if (!(name in villages)) unknown("village", name, villages);
	if (names.length === 0) unknown("village", undefined, villages);

	if (action === "add") {
		await installVillages(root, config, names, values["skip-install"]);
		console.log(`\nInstalled ${names.join(", ")}. Use ${names.length > 1 ? "them" : "it"} for part of a page:\n  <VillageScope village="${names[0]}">…</VillageScope>`);
		return;
	}

	if (action === "set") {
		if (names.length > 1) throw new Error("`village set` takes one village.");
		const [name] = names;
		if (!installed.includes(name)) await installVillages(root, config, [name], values["skip-install"]);
		const previousDefault = villages[config.village]?.defaultNature;
		if (values.nature && !(values.nature in natures)) unknown("nature", values.nature, natures);
		// A nature the user picked stays; one that was only the old village's default follows the new village.
		const nature = values.nature ?? (config.nature === previousDefault ? (villages[name].defaultNature ?? config.nature) : config.nature);
		apply(root, { ...config, village: name, nature });
		console.log(`\nThe project is in ${villages[name].title}, ${natures[nature]?.title ?? nature}.`);
		return;
	}

	console.log(villageUsage);
	process.exitCode = 1;
}

export async function nature(argv: string[]) {
	const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { help: { type: "boolean", short: "h" } } });
	const [action, name] = positionals;
	if (values.help || !action) return console.log(natureUsage);
	const { root, config } = project();
	const { natures } = await choices(config, root);
	if (action === "list") return list(natures, config.nature);
	if (action !== "set") {
		console.log(natureUsage);
		process.exitCode = 1;
		return;
	}
	if (!name || !(name in natures)) unknown("nature", name, natures);
	apply(root, { ...config, nature: name });
	console.log(`\nThe nature is ${natures[name].title} (${natures[name].element}).`);
}

export async function tint(argv: string[]) {
	const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { help: { type: "boolean", short: "h" } } });
	const [action, name] = positionals;
	if (values.help || !action) return console.log(tintUsage);
	const { root, config } = project();
	const { tints } = await choices(config, root);
	if (action === "list") return list(tints, config.tint);
	if (action !== "set") {
		console.log(tintUsage);
		process.exitCode = 1;
		return;
	}
	if (!name || !(name in tints)) unknown("tint", name, tints);
	apply(root, { ...config, tint: name as Config["tint"] });
	console.log(`\nThe project uses ${tints[name].title.toLowerCase()}.`);
}
