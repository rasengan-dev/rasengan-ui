#!/usr/bin/env node
/**
 * rasengan-ui (RFC-0002, "CLI"): sets up a project, adds components, switches villages and natures,
 * and updates installed files without losing local edits. Commands land with their milestone.
 */
import { styleText } from "node:util";
import { add } from "./commands/add.ts";
import { init } from "./commands/init.ts";
import { nature, tint, village } from "./commands/look.ts";
import { diff, update } from "./commands/sync.ts";

interface Command {
	usage: string;
	summary: string;
	run?: (argv: string[]) => Promise<void>;
}

const commands: Record<string, Command> = {
	init: { usage: "init", summary: "Set up a project: engine, village, nature, CSS imports, rasengan-ui.json", run: init },
	add: { usage: "add <name...>", summary: "Install components or blocks for the project's engine", run: add },
	village: { usage: "village <list|set|add> [name]", summary: "List, switch or install villages", run: village },
	nature: { usage: "nature <list|set> [name]", summary: "List or switch the nature (accent hue)", run: nature },
	tint: { usage: "tint <list|set> [name]", summary: "Switch between the village's greys and neutral greys", run: tint },
	diff: { usage: "diff [name...]", summary: "Show local and registry changes since install", run: diff },
	update: { usage: "update [name...]", summary: "Update installed files, keeping local edits (3-way merge)", run: update },
	doctor: { usage: "doctor", summary: "Check config, CSS imports, versions and dependencies" },
};

function help() {
	const width = Math.max(...Object.values(commands).map(({ usage }) => usage.length));
	console.log("Usage: rasengan-ui <command>\n\nCommands:");
	for (const { usage, summary } of Object.values(commands)) console.log(`  ${usage.padEnd(width)}  ${summary}`);
	console.log("\n`rasengan-ui <command> --help` for a command's options.");
}

const [name, ...argv] = process.argv.slice(2);
const command = name ? commands[name] : undefined;

if (!name || name === "help" || name === "--help" || name === "-h") {
	help();
} else if (!command) {
	console.error(`Unknown command: ${name}\n`);
	help();
	process.exitCode = 1;
} else if (!command.run) {
	console.error(`rasengan-ui ${name}: not implemented yet.`);
	process.exitCode = 1;
} else {
	try {
		await command.run(argv);
	} catch (error) {
		console.error(styleText("red", error instanceof Error ? error.message : String(error)));
		process.exitCode = 1;
	}
}
