import { existsSync } from "node:fs";
import { join } from "node:path";
import { parseArgs, styleText } from "node:util";
import * as p from "@clack/prompts";
import { type Config, configFile, defaults, writeConfig } from "../config.ts";
import { installPackages, missingPackages } from "../dependencies.ts";
import { checkVersions, detectFramework, findTailwindCss, frameworkNames, htmlFile } from "../framework.ts";
import { readLock, writeItems } from "../install.ts";
import { findRoot, hasAlias } from "../project.ts";
import { choices, type RegistryItem, resolveItems } from "../registry.ts";
import { htmlAttributes, installedVillages, setHtmlAttributes, villageConflicts, writeCssImports } from "../setup.ts";

export const usage = `Usage: rasengan-ui init [options]

Sets up the project: rasengan-ui.json, the core and theme files, a village, the CSS imports,
and the village attributes on <html> (Rasengan.js, Vite and Next.js; other setups get the
lines to add by hand).

Options:
  --village <name>    The village (asked otherwise)
  --nature <name>     The nature, the accent hue (default: the village's)
  --tint <name>       village or neutral greys (default: village)
  --css <path>        The stylesheet that imports Tailwind (found otherwise)
  --registry <url>    Where the registry is: a URL or a folder
  -y, --yes           Take the defaults instead of asking
  --keep-css          Leave the stylesheet's own theme tokens as they are (they override the village)
  --force             Run again over an existing rasengan-ui.json
  --skip-install      Write the files, but don't install npm packages`;

/** A prompt's answer; cancelling (Ctrl+C) leaves before anything is written. */
async function ask<T>(prompt: Promise<T>): Promise<Exclude<T, symbol>> {
	const answer = await prompt;
	if (p.isCancel(answer)) {
		p.cancel("Nothing was changed.");
		process.exit(0);
	}
	return answer as Exclude<T, symbol>;
}

/** The village's type families, from its CSS (`--font-body: "Figtree", …`), to tell what to load. */
function villageFonts(item: RegistryItem): string[] {
	const css = item.files.map((file) => file.content).join("\n");
	return [...new Set([...css.matchAll(/--font-(?:body|heading|code):\s*"([^"]+)"/g)].map((m) => m[1]))];
}

export async function init(argv: string[]) {
	const { values } = parseArgs({
		args: argv,
		options: {
			village: { type: "string" },
			nature: { type: "string" },
			tint: { type: "string" },
			css: { type: "string" },
			registry: { type: "string" },
			yes: { type: "boolean", short: "y" },
			force: { type: "boolean" },
			"keep-css": { type: "boolean" },
			"skip-install": { type: "boolean" },
			help: { type: "boolean", short: "h" },
		},
	});
	if (values.help) return console.log(usage);

	const root = findRoot();
	if (existsSync(join(root, configFile)) && !values.force)
		throw new Error(`${configFile} already exists. \`rasengan-ui village set\` and \`nature set\` change the village; \`init --force\` starts over.`);

	p.intro(styleText("bold", "Rasengan UI"));
	const framework = detectFramework(root);
	const { errors, warnings } = checkVersions(root);
	if (errors.length) throw new Error(errors.join("\n"));
	for (const warning of warnings) p.log.warn(warning);
	p.log.info(`Project: ${frameworkNames[framework]}`);

	const css = values.css ?? findTailwindCss(root);
	if (!css) throw new Error('No stylesheet imports Tailwind (`@import "tailwindcss";`). Add one, or pass `--css <path>`.');
	if (!existsSync(join(root, css))) throw new Error(`${css} doesn't exist.`);

	if (!hasAlias(root, "@/components"))
		throw new Error(
			[
				`The components import \`@/components/…\` and \`@/lib/…\`, and this project has no \`@/\` alias yet. Add it to ${framework === "vite" ? "tsconfig.app.json and tsconfig.json" : "tsconfig.json"}:`,
				'  "compilerOptions": { "paths": { "@/*": ["./src/*"] } }',
				...(framework === "vite" ? ["and to vite.config, with `import path from \"node:path\"`:", '  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } }'] : []),
				"then run `rasengan-ui init` again.",
			].join("\n"),
		);

	const registry = values.registry ?? defaults.registry;
	const draft = { ...defaults, registry, css } as Config;
	const { villages, natures, tints } = await choices(draft, root);
	const check = (kind: string, value: string | undefined, known: Record<string, unknown>) => {
		if (value && !(value in known)) throw new Error(`Unknown ${kind} "${value}". Known: ${Object.keys(known).join(", ")}.`);
		return value;
	};

	const village =
		check("village", values.village, villages) ??
		(values.yes
			? defaults.village
			: await ask(
					p.select({
						message: "Which village?",
						initialValue: defaults.village,
						options: Object.entries(villages).map(([value, v]) => ({ value, label: v.title, hint: v.description })),
					}),
				));
	const villageNature = villages[village]?.defaultNature ?? defaults.nature;
	const nature =
		check("nature", values.nature, natures) ??
		(values.yes || values.village
			? villageNature
			: await ask(
					p.select({
						message: "Which nature (the accent hue)?",
						initialValue: villageNature,
						options: Object.entries(natures).map(([value, n]) => ({ value, label: n.title, hint: value === villageNature ? `${n.element}, ${villages[village].title}'s own` : n.element })),
					}),
				));
	const tint = (check("tint", values.tint, tints) ?? defaults.tint) as Config["tint"];

	const config: Config = { ...draft, village, nature, tint };
	writeConfig(root, config);
	p.log.success(`Wrote ${configFile}`);

	const items = await resolveItems(config, root, ["rasengan-core", "rasengan-theme", `village-${village}`]);
	const written = writeItems(root, config, items);
	p.log.success(`Installed the core, the token contract and ${villages[village].title}:\n${written.map((file) => `  ${file.path}`).join("\n")}`);

	if (writeCssImports(root, css, installedVillages(readLock(root)))) p.log.success(`Imported them in ${css}`);

	/* A starter or shadcn theme in the same stylesheet comes after the imports and would win. */
	const conflicts = villageConflicts(root, css);
	if (conflicts.length) {
		const names = [...new Set(conflicts.map((c) => c.name))];
		const list = `${names.slice(0, 6).join(", ")}${names.length > 6 ? ` and ${names.length - 6} more` : ""}`;
		const comment =
			!values["keep-css"] &&
			(values.yes ||
				(await ask(p.confirm({ message: `${css} sets ${conflicts.length} tokens the village owns (${list}). Comment them out so the village shows?`, initialValue: true }))));
		if (comment) {
			villageConflicts(root, css, { comment: true });
			p.log.success(`Commented out ${conflicts.length} theme declarations in ${css} (${list})`);
		} else p.log.warn(`${css} still sets ${list}: they override the village. Remove them when you're ready.`);
	}

	const attributes = htmlAttributes(village, nature, tint);
	const page = htmlFile(root, framework);
	if (page && setHtmlAttributes(root, page, attributes)) p.log.success(`Set the village on <html> in ${page}`);
	else if (!page || framework === "manual")
		p.log.warn(`Put the village on your <html> element:\n  <html ${Object.entries(attributes).map(([name, value]) => `${name}="${value}"`).join(" ")}>`);

	const fonts = villageFonts(items.find((item) => item.name === `village-${village}`)!);
	if (fonts.length) p.log.info(`${villages[village].title} is set in ${fonts.join(" and ")}: load ${fonts.length > 1 ? "them" : "it"} (Google Fonts, or self-hosted); the system fonts stand in until then.`);

	const packages = missingPackages(root, items);
	if (values["skip-install"]) {
		const all = [...packages.dependencies, ...packages.devDependencies];
		if (all.length) p.log.info(`Packages to install: ${all.join(" ")}`);
	} else installPackages(root, packages);

	p.outro(`Ready. Add components with ${styleText("cyan", "rasengan-ui add button")}.`);
}
