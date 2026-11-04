import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { parseArgs, styleText } from "node:util";
import * as p from "@clack/prompts";
import { fontInfo } from "@rasengan-ui/villages/fonts";
import { createVillage, ENGINE_VERSION, options, type Recipe, RECIPE_SCHEMA, recipeFromLink, recipeLink, type Village } from "@rasengan-ui/villages/engine";
import { type Config, readConfig, writeConfig } from "../config.ts";
import { installPackages, missingPackages } from "../dependencies.ts";
import { fetchJson } from "../fetch.ts";
import { detectFramework, htmlFile } from "../framework.ts";
import { readLock, writeItems, writeLock } from "../install.ts";
import { findRoot } from "../project.ts";
import { type Choice, choices, type RegistryItem, resolveItems } from "../registry.ts";
import { htmlAttributes, installedVillages, setHtmlAttributes, writeCssImports } from "../setup.ts";
import { checkProjectVillage, fetchItem, GENERATED, localVillages, projectSources, villageItem, villagePath, writeGenerated } from "../villages.ts";

/* The commands that change how the project looks: village, nature, tint (RFC-0002, "CLI"; RFC-0006 for your own villages). */

export const villageUsage = `Usage: rasengan-ui village <list|set|add|create|check|export> [name...]

  list                The villages, with the installed and current ones marked
  set <name>          Make <name> the project's village (installing it if needed)
  add <name|url...>   Install villages without switching, to use them with VillageScope;
                      a URL or a .json file installs a village someone exported
  create <name>       Found your own village from a recipe, write it and switch to it
  check <name>        Check an installed village's contrast in every nature, scheme and tint
  export <name>       Write a village you made as a registry item, to publish it

Options:
  --nature <name>       With set: the nature to switch to (default: the new village's, unless you picked another)
  --skip-install        Don't install npm packages

Options for create:
  --from <file|url>     A recipe file, a workshop link, or a URL to a recipe or an exported village
  --base <village>      The village to start from: konoha, kiri or iwa (default: konoha)
  --color <colour>      The brand colour: #rrggbb, rgb(r g b) or oklch(L C H)
  --hue <degrees>       A brand hue, when you have no exact colour
  --contrast, --radius, --density, --depth, --motion, --border   One knob each (see the docs)
  --font <family>       The body font; --heading-font for headings
  --title, --description
  --update              Regenerate a village you made from its saved recipe (and these options), keeping your edits
  --no-switch           Write the village without making it the project's
  --dry-run             Print the report and the CSS, write nothing

Options for export:
  --out <file>          Where to write the item (default: village-<name>.json)`;

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
async function installVillages(root: string, config: Config, names: string[], skipInstall = false, extra: { item: RegistryItem; source: string }[] = []) {
	const items = await resolveItems(config, root, [...names.map((name) => `village-${name}`), ...extra.flatMap(({ item }) => item.registryDependencies ?? [])]);
	const all = [...items, ...extra.map(({ item }) => item)];
	for (const { path, outcome } of writeItems(root, config, all)) if (outcome === "created" || outcome === "updated") console.log(`${styleText("green", "+")} ${path}`);
	if (extra.length) {
		const lock = readLock(root);
		for (const { item, source } of extra) lock.items[item.name].source = source;
		writeLock(root, lock);
	}
	if (writeCssImports(root, config.css, installedVillages(readLock(root)))) console.log(`${styleText("green", "~")} ${config.css}`);
	const packages = missingPackages(root, all);
	if (!skipInstall) installPackages(root, packages);
}

/** A village someone exported (`village export`), from a URL or a file; a file is recorded relative to the root. */
async function exportedVillage(root: string, given: string, known: Record<string, Choice>) {
	const absolute = resolve(process.cwd(), given);
	const inside = relative(root, absolute).split("\\").join("/");
	const source = /^https?:\/\//.test(given) ? given : inside.startsWith("../") ? absolute : inside;
	const item = await fetchItem(source, root);
	if (!item.name?.startsWith("village-") || item.files?.length !== 1) throw new Error(`${source} is not a village item (village-<name>, one CSS file).`);
	const name = item.name.slice("village-".length);
	const installed = readLock(root).items[item.name];
	if (installed ? installed.source !== source : name in known)
		throw new Error(`A village named ${name} is already ${installed?.source === GENERATED ? "one you made" : `installed from ${installed?.source ?? "the registry"}`}; the one at ${source} would replace it.`);
	return { name, item, source };
}

const isSource = (name: string) => /^https?:\/\//.test(name) || name.endsWith(".json");

export async function village(argv: string[]) {
	const { values, positionals } = parseArgs({
		args: argv,
		allowPositionals: true,
		options: {
			nature: { type: "string" },
			"skip-install": { type: "boolean" },
			from: { type: "string" },
			base: { type: "string" },
			color: { type: "string" },
			hue: { type: "string" },
			contrast: { type: "string" },
			radius: { type: "string" },
			density: { type: "string" },
			depth: { type: "string" },
			motion: { type: "string" },
			border: { type: "string" },
			font: { type: "string" },
			"heading-font": { type: "string" },
			title: { type: "string" },
			description: { type: "string" },
			update: { type: "boolean" },
			"no-switch": { type: "boolean" },
			"dry-run": { type: "boolean" },
			out: { type: "string" },
			help: { type: "boolean", short: "h" },
		},
	});
	const [action, ...names] = positionals;
	if (values.help || !action) return console.log(villageUsage);
	const { root, config } = project();

	if (action === "create") return create(root, config, names, values);
	if (action === "check") return check(root, config, names);
	if (action === "export") return exportVillage(root, config, names, values.out);

	const { villages, natures } = await choices(config, root);
	const installed = installedVillages(readLock(root));

	if (action === "list") return list(villages, config.village, installed);

	if (action === "add") {
		if (names.length === 0) unknown("village", undefined, villages);
		const exported = await Promise.all(names.filter(isSource).map((source) => exportedVillage(root, source, villages)));
		const named = names.filter((name) => !isSource(name));
		for (const name of named) if (!(name in villages)) unknown("village", name, villages);
		await installVillages(root, config, named, values["skip-install"], exported);
		const all = [...named, ...exported.map((e) => e.name)];
		console.log(`\nInstalled ${all.join(", ")}. Use ${all.length > 1 ? "them" : "it"} for part of a page:\n  <VillageScope village="${all[0]}">…</VillageScope>`);
		return;
	}

	for (const name of names) if (!(name in villages)) unknown("village", name, villages);
	if (names.length === 0) unknown("village", undefined, villages);

	if (action === "set") {
		if (names.length > 1) throw new Error("`village set` takes one village.");
		const [name] = names;
		if (!installed.includes(name)) await installVillages(root, config, [name], values["skip-install"]);
		const previousDefault = villages[config.village]?.defaultNature;
		if (values.nature && !(values.nature in natures)) unknown("nature", values.nature, natures);
		// A nature the user picked stays; one that was only the old village's default follows the new village.
		const nature = values.nature ?? (config.nature === previousDefault ? (villages[name].defaultNature ?? config.nature) : config.nature);
		apply(root, { ...config, village: name, nature });
		console.log(`\nThe project is in ${villages[name].title}, ${nature === name ? "with its own nature" : (natures[nature]?.title ?? nature)}.`);
		return;
	}

	console.log(villageUsage);
	process.exitCode = 1;
}

// ---- village create (RFC-0006) ------------------------------------------------------------

type Values = Record<string, string | boolean | undefined>;

/** A recipe from a file, a workshop link, or a URL serving a recipe or an exported village (its meta.recipe). */
async function readRecipe(from: string): Promise<Partial<Recipe>> {
	const linked = recipeFromLink(from);
	if (linked) return linked as Partial<Recipe>;
	let json: Record<string, unknown>;
	if (/^https?:\/\//.test(from)) json = await fetchJson<Record<string, unknown>>(from);
	else {
		const path = resolve(process.cwd(), from);
		if (!existsSync(path)) throw new Error(`No recipe at ${from}.`);
		json = JSON.parse(readFileSync(path, "utf8"));
	}
	const recipe = (json.meta as Record<string, unknown> | undefined)?.recipe ?? json;
	if (typeof recipe !== "object" || recipe === null) throw new Error(`${from} holds no recipe.`);
	return recipe as Partial<Recipe>;
}

const KNOB_FLAGS = ["base", "color", "hue", "contrast", "radius", "density", "depth", "motion", "border", "font", "heading-font", "title", "description"];

/** The options given on the command line, as recipe fields. Numbers are checked by the engine's validation. */
function fromFlags(values: Values): Partial<Recipe> {
	const out: Record<string, unknown> = {};
	const text = (key: string) => (typeof values[key] === "string" ? (values[key] as string) : undefined);
	const number = (key: string) => (text(key) === undefined ? undefined : Number(text(key)));
	if (text("base")) out.base = text("base");
	if (text("color")) out.brand = { color: text("color") };
	else if (text("hue")) out.brand = { hue: number("hue") };
	for (const key of ["contrast", "density", "depth", "motion", "title", "description"]) if (text(key)) out[key] = text(key);
	for (const key of ["radius", "border"]) if (text(key) !== undefined) out[key] = number(key);
	if (text("font") || text("heading-font")) out.fonts = { ...(text("font") ? { body: text("font") } : {}), ...(text("heading-font") ? { heading: text("heading-font") } : {}) };
	return out as Partial<Recipe>;
}

async function ask<T>(prompt: Promise<T>): Promise<Exclude<T, symbol>> {
	const answer = await prompt;
	if (p.isCancel(answer)) {
		p.cancel("Nothing was changed.");
		process.exit(0);
	}
	return answer as Exclude<T, symbol>;
}

/** The questions `create` asks when it is given nothing but a name, in a terminal. */
async function interview(name: string): Promise<Partial<Recipe>> {
	p.intro(styleText("bold", `Found ${name}`));
	const base = await ask(
		p.select({
			message: "Start from which village?",
			initialValue: "konoha",
			options: [
				{ value: "konoha", label: "Konoha", hint: "warm, rounded, balanced" },
				{ value: "kiri", label: "Kiri", hint: "soft contrast, glass, airy" },
				{ value: "iwa", label: "Iwa", hint: "square, ink borders, mono labels" },
			],
		}),
	);
	const color = await ask(p.text({ message: "Your brand colour? (#rrggbb; empty to keep the village's nature)", placeholder: "#ff5a1f", defaultValue: "" }));
	const density = await ask(
		p.select({ message: "Density?", initialValue: "keep", options: [{ value: "keep", label: "As the village is" }, ...options.density.map((value) => ({ value, label: value }))] }),
	);
	p.outro("Making it…");
	return { base: base as Recipe["base"], ...(color.trim() ? { brand: { color: color.trim() } } : {}), ...(density !== "keep" ? { density: density as Recipe["density"] } : {}) };
}

function report(village: Village, path: string, verb: string) {
	console.log(`${verb} ${styleText("bold", village.name)} → ${path}`);
	for (const a of village.adjustments) console.log(`  ${styleText("cyan", "~")} ${a.scheme} ${a.token}: ${a.from} → ${a.to} ${styleText("dim", `(${a.reason})`)}`);
	for (const note of village.notes) console.log(`  ${styleText("dim", `· ${note}`)}`);
	for (const problem of village.problems)
		console.log(
			`  ${styleText("red", "✗")} ${problem.scheme} ${problem.pair}: ${problem.value.toFixed(2)}:1, needs ${problem.min}:1 ${styleText("dim", `(${problem.scopes.slice(0, 4).join(", ")}${problem.scopes.length > 4 ? `, ${problem.scopes.length - 4} more` : ""})`)}`,
		);
	if (!village.problems.length) console.log(`  ${styleText("green", "✓")} every pair passes, in every nature, both schemes and both tints`);
}

async function create(root: string, config: Config, names: string[], values: Values) {
	if (names.length > 1) throw new Error("`village create` takes one name.");
	const lock = readLock(root);
	const saved = names[0] ? config.villages?.[names[0]] : undefined;
	let recipe: Partial<Recipe> = {};
	if (values.update) {
		if (!names[0] || !saved) throw new Error(`${names[0] ? `${names[0]} was not made with \`village create\`` : "Name the village to update"}: --update regenerates a village from the recipe saved in rasengan-ui.json.`);
		recipe = structuredClone(saved.recipe);
	}
	if (typeof values.from === "string") recipe = { ...recipe, ...(await readRecipe(values.from)) };
	const flags = fromFlags(values);
	recipe = { ...recipe, ...flags, ...(flags.fonts ? { fonts: { ...recipe.fonts, ...flags.fonts } } : {}) };
	const name = names[0] ?? recipe.name;
	if (!name) throw new Error("Name the village: `rasengan-ui village create <name>`.");
	if (!values.update && !values.from && !KNOB_FLAGS.some((key) => values[key] !== undefined) && process.stdin.isTTY) recipe = { ...(await interview(name)) };
	recipe = { $schema: RECIPE_SCHEMA, ...recipe, name };

	const item = `village-${name}`;
	if (lock.items[item] && lock.items[item].source !== GENERATED) throw new Error(`The village ${name} is installed from ${lock.items[item].source ?? "the registry"}; give yours another name.`);
	if (lock.items[item] && !values.update) throw new Error(`You already made ${name}: \`rasengan-ui village create ${name} --update\` regenerates it (with any options you pass), keeping your edits.`);

	const village = createVillage(recipe as Recipe, { sources: projectSources(root, config) });
	const path = villagePath(config, name);
	report(village, path, values["dry-run"] ? "Would make" : values.update ? "Regenerated" : "Founded");
	if (village.problems.length) {
		console.log(styleText("red", `\nNothing was written: change the recipe (or drop the overrides that fail) and run again.`));
		process.exitCode = 1;
		return;
	}
	if (values["dry-run"]) {
		console.log(`\n${village.css}`);
		return;
	}

	const written = writeGenerated(root, path, name, village.css);
	if (written.outcome === "merged")
		console.log(written.conflicts ? styleText("yellow", `  ! ${path}: merged with your edits, ${written.conflicts} conflict${written.conflicts > 1 ? "s" : ""} to resolve`) : `  ~ ${path}: merged with your edits`);
	if (writeCssImports(root, config.css, installedVillages(readLock(root)))) console.log(`${styleText("green", "~")} ${config.css}`);

	const next: Config = { ...config, villages: { ...config.villages, [name]: { recipe: recipe as Recipe, engineVersion: ENGINE_VERSION } } };
	const nature = village.ownNature ? name : (village.knobs.brand.nature ?? config.nature);
	if (values["no-switch"] || (values.update && config.village !== name)) writeConfig(root, next);
	else apply(root, { ...next, village: name, nature });

	const fonts = [...new Set([village.knobs.fonts.body, village.knobs.fonts.heading, village.knobs.fonts.code])].map(fontInfo);
	const google = fonts.filter((f) => f.known && f.google).map((f) => `family=${f.google}`);
	if (google.length) console.log(`\nIts fonts: https://fonts.googleapis.com/css2?${google.join("&")}&display=swap`);
	console.log(`\nOpen it in the workshop: ${recipeLink(recipe as Recipe)}`);
	if (written.outcome === "merged" && written.conflicts) process.exitCode = 1;
}

// ---- village check, village export ----------------------------------------------------------

function check(root: string, config: Config, names: string[]) {
	const targets = names.length ? names : [config.village];
	for (const name of targets) {
		const path = villagePath(config, name);
		if (!existsSync(join(root, path))) throw new Error(`${path} doesn't exist: is ${name} installed?`);
		const result = checkProjectVillage(root, config, name, readFileSync(join(root, path), "utf8"));
		console.log(`${styleText("bold", name)}: ${result.checked} pairs in ${result.natures} natures × 2 schemes × 2 tints`);
		const worst = new Map<string, (typeof result.failures)[number] & { count: number }>();
		for (const f of result.failures) {
			const key = `${f.scope.split(" ")[0]} ${f.fg} on ${f.on.join(" + ")}`;
			const seen = worst.get(key);
			if (!seen || f.value < seen.value) worst.set(key, { ...f, count: (seen?.count ?? 0) + 1 });
			else seen.count++;
		}
		for (const [key, f] of worst) console.log(`  ${styleText("red", "✗")} ${key}: ${f.value.toFixed(2)}:1, needs ${f.min}:1 ${styleText("dim", `(${f.count} scope${f.count > 1 ? "s" : ""})`)}`);
		if (result.rings) console.log(styleText("dim", `  · ${result.rings} focus ring scopes under 3:1 (reported, not failing)`));
		if (!result.failures.length) console.log(`  ${styleText("green", "✓")} every pair passes`);
		else process.exitCode = 1;
	}
}

function exportVillage(root: string, config: Config, names: string[], out: string | undefined) {
	if (names.length !== 1) throw new Error("Name one village: `rasengan-ui village export <name>`.");
	const [name] = names;
	const local = localVillages(root, config)[name];
	if (!local || local.source !== GENERATED) throw new Error(`${name} wasn't made with \`village create\`: only your own villages are exported.`);
	const path = villagePath(config, name);
	const css = readFileSync(join(root, path), "utf8");
	const saved = config.villages?.[name];
	const item = villageItem(config, name, css, local, saved?.recipe, saved?.engineVersion);
	const target = resolve(process.cwd(), out ?? `village-${name}.json`);
	writeFileSync(target, `${JSON.stringify(item, null, 2)}\n`);
	console.log(`${styleText("green", "+")} ${target}`);
	console.log(`\nPublish it anywhere (a registry, a gist, your site); others install it with:\n  npx rasengan-ui village add <its URL>`);
}

// ---- nature, tint -----------------------------------------------------------------------------

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
