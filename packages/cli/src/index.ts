#!/usr/bin/env node
/**
 * rasengan-ui (RFC-0002, "CLI"). Only the command table exists so far; each
 * command lands with its milestone (Rollout, step 4).
 */

interface Command {
	usage: string;
	summary: string;
}

const commands: Record<string, Command> = {
	init: { usage: "init", summary: "Set up a project: engine, village, nature, CSS imports, rasengan-ui.json" },
	add: { usage: "add <name...>", summary: "Install components or blocks for the project's engine" },
	village: { usage: "village <list|set|add> [name]", summary: "List, switch or install villages" },
	nature: { usage: "nature set <name>", summary: "Switch the nature (accent hue)" },
	diff: { usage: "diff [name]", summary: "Show local and upstream changes since install" },
	update: { usage: "update [name]", summary: "Update installed files, keeping local edits (3-way merge)" },
	doctor: { usage: "doctor", summary: "Check config, CSS imports, versions and dependencies" },
};

function help() {
	const width = Math.max(...Object.values(commands).map(({ usage }) => usage.length));
	console.log("Usage: rasengan-ui <command>\n\nCommands:");
	for (const { usage, summary } of Object.values(commands)) console.log(`  ${usage.padEnd(width)}  ${summary}`);
}

const [name] = process.argv.slice(2);

if (!name || name === "help" || name === "--help" || name === "-h") {
	help();
} else if (name in commands) {
	console.error(`rasengan-ui ${name}: not implemented yet.`);
	process.exitCode = 1;
} else {
	console.error(`Unknown command: ${name}\n`);
	help();
	process.exitCode = 1;
}
