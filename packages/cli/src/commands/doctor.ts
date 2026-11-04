import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs, styleText } from "node:util";
import { type Config, configFile, readConfig } from "../config.ts";
import { missingPackages } from "../dependencies.ts";
import { checkVersions, detectFramework, frameworkNames, htmlFile } from "../framework.ts";
import { readLock } from "../install.ts";
import { findRoot, hasAlias } from "../project.ts";
import { ENGINE_VERSION } from "@rasengan-ui/villages/engine";
import { choices, loadLockedItem, type RegistryItem } from "../registry.ts";
import { htmlAttributes, installedVillages, villageConflicts } from "../setup.ts";
import { GENERATED } from "../villages.ts";

export const usage = `Usage: rasengan-ui doctor

Checks the project: config, registry, Tailwind and React versions, the @/ alias, the CSS imports,
the village on <html>, installed files and npm packages. Exits with 1 when something is broken.`;

type Level = "ok" | "warn" | "error";
const marks: Record<Level, string> = { ok: styleText("green", "✓"), warn: styleText("yellow", "!"), error: styleText("red", "✗") };

export async function doctor(argv: string[]) {
	const { values } = parseArgs({ args: argv, options: { help: { type: "boolean", short: "h" } } });
	if (values.help) return console.log(usage);

	const results: { level: Level; message: string }[] = [];
	const report = (level: Level, message: string) => results.push({ level, message });
	const root = findRoot();

	let config: Config;
	try {
		config = readConfig(root);
		report("ok", `${configFile}: ${config.village}, ${config.nature}, ${config.tint} greys`);
	} catch (error) {
		report("error", (error as Error).message);
		return print(results);
	}

	const framework = detectFramework(root);
	const { errors, warnings } = checkVersions(root);
	for (const message of errors) report("error", message);
	for (const message of warnings) report("warn", message);
	if (!errors.length) report("ok", `${frameworkNames[framework]}, Tailwind v4, React`);
	report(hasAlias(root, config.aliases.components) ? "ok" : "error", hasAlias(root, config.aliases.components) ? `Alias ${config.aliases.components} resolves` : `No path in tsconfig.json covers ${config.aliases.components}: the components' imports won't resolve.`);

	// The registry, and what it knows.
	let known: Awaited<ReturnType<typeof choices>> | undefined;
	try {
		known = await choices(config, root);
		report("ok", `Registry: ${config.registry}`);
	} catch (error) {
		report("error", (error as Error).message);
	}
	if (known) {
		for (const [kind, value, list] of [
			["village", config.village, known.villages],
			["nature", config.nature, known.natures],
			["tint", config.tint, known.tints],
		] as const)
			if (!(value in list)) report("error", `The ${kind} "${value}" isn't in the registry (${Object.keys(list).join(", ")}).`);
	}

	// Installed files.
	const lock = readLock(root);
	const villages = installedVillages(lock);
	if (!lock.items["rasengan-core"] || !lock.items["rasengan-theme"]) report("error", "The core or the token contract isn't installed: run `rasengan-ui init`.");
	if (!villages.includes(config.village)) report("error", `The village ${config.village} isn't installed: \`rasengan-ui village set ${config.village}\` installs it.`);
	const missingFiles = Object.values(lock.items).flatMap(({ files }) => Object.keys(files).filter((path) => !existsSync(join(root, path))));
	if (missingFiles.length) report("warn", `Installed files you deleted: ${missingFiles.join(", ")}`);
	else report("ok", `${Object.keys(lock.items).length} items installed, every file in place`);

	// Villages made by `village create` (RFC-0006): the engine that wrote them, and their recipe.
	for (const name of installedVillages(lock).filter((v) => lock.items[`village-${v}`]?.source === GENERATED)) {
		const saved = config.villages?.[name];
		if (!saved) report("warn", `The village ${name} was generated but ${configFile} has no recipe for it: \`village create ${name} --update\` can't regenerate it.`);
		else if (saved.engineVersion !== ENGINE_VERSION)
			report("warn", `The village ${name} was made by engine ${saved.engineVersion}; this CLI has ${ENGINE_VERSION}. \`rasengan-ui village create ${name} --update\` regenerates it, keeping your edits.`);
		else report("ok", `The village ${name} is up to date with the engine (${ENGINE_VERSION})`);
	}

	// The stylesheet.
	const cssPath = join(root, config.css);
	if (!existsSync(cssPath)) report("error", `${config.css} doesn't exist (css in ${configFile}).`);
	else {
		const css = readFileSync(cssPath, "utf8");
		const at = (path: string) => css.search(new RegExp(`@import\\s+["']${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
		const order = ["tailwindcss", "./rasengan/variants.css", "./rasengan/contract.css", ...villages.map((v) => `./rasengan/villages/${v}.css`), "./rasengan/natures.css"];
		const positions = order.map(at);
		const missing = order.filter((_, i) => positions[i] === -1);
		if (missing.length) report("error", `${config.css} doesn't import ${missing.join(", ")}.`);
		else if (positions.some((position, i) => i > 0 && position < positions[i - 1])) report("error", `${config.css} imports them out of order: Tailwind, variants, contract, villages, then natures.`);
		else report("ok", `${config.css} imports the contract, ${villages.join(", ")} and the natures`);
		const conflicts = villageConflicts(root, config.css);
		if (conflicts.length) report("warn", `${config.css} sets ${[...new Set(conflicts.map((c) => c.name))].join(", ")} itself, which overrides the village (line${conflicts.length > 1 ? "s" : ""} ${conflicts.map((c) => c.line).join(", ")}).`);
	}

	// The page.
	const page = htmlFile(root, framework);
	const wanted = htmlAttributes(config.village, config.nature, config.tint);
	if (!page) report("warn", `Can't find the <html> element for ${frameworkNames[framework]}: check it has ${Object.entries(wanted).map(([n, v]) => `${n}="${v}"`).join(" ")}.`);
	else {
		const tag = readFileSync(join(root, page), "utf8").match(/<html\b[^>]*>/)?.[0] ?? "";
		const wrong = Object.entries(wanted).filter(([name, value]) => !tag.includes(`${name}="${value}"`));
		if (wrong.length) report("error", `<html> in ${page} doesn't match ${configFile}: expected ${wrong.map(([n, v]) => `${n}="${v}"`).join(" ")}.`);
		else report("ok", `<html> in ${page} wears ${config.village}`);
	}

	// npm packages the installed items need.
	try {
		const loaded = await Promise.all(Object.entries(lock.items).map(([name, entry]) => loadLockedItem(config, root, name, entry)));
		const items = loaded.filter((item): item is RegistryItem => item !== undefined);
		const packages = missingPackages(root, items);
		const missing = [...packages.dependencies, ...packages.devDependencies];
		report(missing.length ? "error" : "ok", missing.length ? `Missing packages: ${missing.join(" ")}` : "Every npm package the components need is installed");
	} catch {
		// The registry error is already reported.
	}

	print(results);
}

function print(results: { level: Level; message: string }[]) {
	for (const { level, message } of results) console.log(`${marks[level]} ${message}`);
	const errors = results.filter((result) => result.level === "error").length;
	const warnings = results.filter((result) => result.level === "warn").length;
	console.log(`\n${errors ? `${errors} problem${errors > 1 ? "s" : ""}` : "No problem"}${warnings ? `, ${warnings} warning${warnings > 1 ? "s" : ""}` : ""}.`);
	if (errors) process.exitCode = 1;
}
