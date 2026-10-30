import { createTwoFilesPatch } from "diff";
import { parseArgs, styleText } from "node:util";
import { readConfig } from "../config.ts";
import { installPackages, missingPackages } from "../dependencies.ts";
import { hash, readLock, writeFile, writeItems, writeLock } from "../install.ts";
import { findRoot } from "../project.ts";
import { resolveItems } from "../registry.ts";
import { type FileState, fileStates, mergeFile, type State, stateLabels } from "../sync.ts";

export const diffUsage = `Usage: rasengan-ui diff [name...] [options]

Shows where each installed file stands: edited by you, updated in the registry, or both.

Options:
  --patch   Print the changes as patches (the default when you name components)`;

export const updateUsage = `Usage: rasengan-ui update [name...] [options]

Brings installed files up to the registry. A file you didn't edit is replaced; one you edited
gets the registry's changes merged into yours, with conflict markers where both changed the
same lines. A file you deleted stays deleted.

Options:
  --skip-install   Don't install npm packages the update needs
  --dry-run        Show what would change, write nothing`;

const colors: Record<State, Parameters<typeof styleText>[0]> = {
	current: "dim",
	edited: "blue",
	behind: "cyan",
	diverged: "yellow",
	deleted: "dim",
	new: "green",
	removed: "dim",
};

/** A patch with + and - lines coloured; empty when both sides match. */
function patch(label: string, from: string, to: string, before = "", after = ""): string {
	if (before === after) return "";
	const text = createTwoFilesPatch(from, to, before, after, "", "", { context: 3 });
	return [
		styleText("bold", label),
		...text
			.trimEnd()
			.split("\n")
			.filter((line) => !line.startsWith("====="))
			.map((line) => (line.startsWith("+") ? styleText("green", line) : line.startsWith("-") ? styleText("red", line) : line.startsWith("@@") ? styleText("cyan", line) : line)),
	].join("\n");
}

function show(file: FileState) {
	const parts: string[] = [];
	if ((file.state === "edited" || file.state === "diverged") && file.base !== undefined) parts.push(patch("Your changes", `${file.path} (installed)`, `${file.path} (yours)`, file.base, file.local));
	if (file.state === "behind" || file.state === "diverged") parts.push(patch("Registry changes", `${file.path} (installed)`, `${file.path} (registry)`, file.base ?? file.local, file.upstream));
	if (file.state === "new") parts.push(patch("New file", "/dev/null", file.path, "", file.upstream));
	return parts.filter(Boolean).join("\n\n");
}

export async function diff(argv: string[]) {
	const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { patch: { type: "boolean" }, help: { type: "boolean", short: "h" } } });
	if (values.help) return console.log(diffUsage);
	const root = findRoot();
	const { files } = await fileStates(root, readConfig(root), positionals);
	const withPatches = values.patch ?? positionals.length > 0;

	const width = Math.max(...files.map((file) => file.path.length));
	for (const file of files) {
		if (file.state === "current" && positionals.length === 0) continue;
		console.log(`${file.path.padEnd(width)}  ${styleText(colors[file.state], stateLabels[file.state])}`);
		const text = withPatches ? show(file) : "";
		if (text) console.log(`\n${text}\n`);
	}
	const count = (state: State) => files.filter((file) => file.state === state).length;
	const updatable = count("behind") + count("diverged") + count("new");
	const summary = [
		`${files.length} file${files.length === 1 ? "" : "s"}`,
		count("edited") + count("diverged") ? `${count("edited") + count("diverged")} edited by you` : "",
		updatable ? `${updatable} with an update` : "everything up to date with the registry",
	].filter(Boolean);
	console.log(`\n${summary.join(", ")}.${updatable ? " `rasengan-ui update` applies them, keeping your edits." : ""}`);
}

export async function update(argv: string[]) {
	const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { "skip-install": { type: "boolean" }, "dry-run": { type: "boolean" }, help: { type: "boolean", short: "h" } } });
	if (values.help) return console.log(updateUsage);
	const dryRun = values["dry-run"] ?? false;
	const root = findRoot();
	const config = readConfig(root);
	const { files, items } = await fileStates(root, config, positionals);
	const lock = readLock(root);

	const record = (file: FileState) => {
		if (dryRun || file.upstream === undefined) return;
		writeFile(root, file.path, file.upstream, { base: true });
		lock.items[file.item].files[file.path] = hash(file.upstream);
	};

	let updated = 0;
	const conflicted: string[] = [];
	const noBase: string[] = [];
	for (const file of files) {
		if (file.state === "behind" || file.state === "new") {
			console.log(`${styleText("green", file.state === "new" ? "+" : "~")} ${file.path}`);
			if (!dryRun) writeFile(root, file.path, file.upstream!);
			record(file);
			updated++;
		} else if (file.state === "diverged") {
			if (file.base === undefined) {
				noBase.push(file.path);
				continue;
			}
			const { content, conflicts } = mergeFile(file.local!, file.base, file.upstream!);
			if (conflicts) conflicted.push(`${file.path} (${conflicts} conflict${conflicts > 1 ? "s" : ""})`);
			console.log(`${styleText(conflicts ? "yellow" : "green", conflicts ? "!" : "~")} ${file.path} ${styleText("dim", conflicts ? "merged, with conflicts" : "merged with your edits")}`);
			if (!dryRun) writeFile(root, file.path, content);
			record(file);
			updated++;
		} else if (file.state === "deleted" && file.upstream !== undefined && file.base !== file.upstream) {
			console.log(`${styleText("dim", "·")} ${file.path} ${styleText("dim", "deleted by you, left out")}`);
		}
	}
	if (!dryRun) writeLock(root, lock);

	// Dependencies the items gained since install: new registry items, then npm packages.
	const all = await resolveItems(config, root, items.map((item) => item.name));
	const added = all.filter((item) => !lock.items[item.name]);
	if (added.length) {
		for (const { path, outcome } of writeItems(root, config, added, { dryRun })) if (outcome === "created") console.log(`${styleText("green", "+")} ${path}`);
		updated += added.length;
	}
	const packages = missingPackages(root, all);
	const toInstall = [...packages.dependencies, ...packages.devDependencies];
	if (toInstall.length && (dryRun || values["skip-install"])) console.log(`\nPackages to install: ${toInstall.join(" ")}`);
	else if (toInstall.length) installPackages(root, packages);

	if (noBase.length)
		console.log(styleText("yellow", `\nNo installed copy to merge against (.rasengan-ui/base) for ${noBase.join(", ")}: left as they are. \`rasengan-ui add <name> --overwrite\` replaces them.`));
	if (conflicted.length) {
		console.log(styleText("yellow", `\nResolve the conflict markers (<<<<<<< yours … >>>>>>> registry) in ${conflicted.join(", ")}.`));
		process.exitCode = 1;
	}
	console.log(updated ? `\n${dryRun ? "Would update" : "Updated"} ${updated} file${updated === 1 ? "" : "s"}.` : "\nEverything is up to date with the registry.");
}
