import { parseArgs, styleText } from "node:util";
import { readConfig } from "../config.ts";
import { installPackages, missingPackages } from "../dependencies.ts";
import { type Outcome, writeItems } from "../install.ts";
import { findRoot } from "../project.ts";
import { resolveItems } from "../registry.ts";

export const usage = `Usage: rasengan-ui add <name...> [options]

Installs components (and what they need) for the project's engine.

Options:
  --overwrite      Replace files you edited since install (otherwise they are kept)
  --skip-install   Write the files, but don't install npm packages
  --dry-run        Show what would change, write nothing`;

const marks: Record<Outcome, string> = {
	created: styleText("green", "+"),
	updated: styleText("cyan", "~"),
	unchanged: styleText("dim", "="),
	kept: styleText("yellow", "!"),
};

export async function add(argv: string[]) {
	const { values, positionals } = parseArgs({
		args: argv,
		allowPositionals: true,
		options: { overwrite: { type: "boolean" }, "skip-install": { type: "boolean" }, "dry-run": { type: "boolean" }, help: { type: "boolean", short: "h" } },
	});
	if (values.help || positionals.length === 0) {
		console.log(usage);
		if (!values.help) process.exitCode = 1;
		return;
	}

	const root = findRoot();
	const config = readConfig(root);
	const items = await resolveItems(config, root, positionals);
	const dryRun = values["dry-run"] ?? false;
	const written = writeItems(root, config, items, { overwrite: values.overwrite, dryRun });

	for (const { path, outcome } of written) if (outcome !== "unchanged") console.log(`${marks[outcome]} ${path}`);
	const kept = written.filter((file) => file.outcome === "kept");
	if (kept.length)
		console.log(
			styleText("yellow", kept.length > 1 ? `\n${kept.length} files kept: you edited them since install. \`--overwrite\` replaces them.` : "\n1 file kept: you edited it since install. `--overwrite` replaces it."),
		);

	const packages = missingPackages(root, items);
	const toInstall = [...packages.dependencies, ...packages.devDependencies];
	if (toInstall.length && (dryRun || values["skip-install"])) console.log(`\nPackages to install: ${toInstall.join(" ")}`);
	else if (toInstall.length) installPackages(root, packages);

	const changed = written.filter((file) => file.outcome === "created" || file.outcome === "updated").length;
	console.log(`\n${dryRun ? "Would write" : "Wrote"} ${changed} file${changed === 1 ? "" : "s"} for ${positionals.join(", ")}.`);
}
