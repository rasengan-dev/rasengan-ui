import { parseArgs } from "node:util";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "../mcp.ts";

export const usage = `Usage: rasengan-ui mcp [options]

Starts the Rasengan UI MCP server over stdio, for agents (Claude Code, Cursor, VS Code…):

  claude mcp add rasengan-ui -- npx rasengan-ui mcp

Options:
  --cwd <path>       The project (default: the folder the client starts the server in)
  --registry <url>   The registry to read when the project has no rasengan-ui.json`;

export async function mcp(argv: string[]) {
	const { values } = parseArgs({ args: argv, options: { cwd: { type: "string" }, registry: { type: "string" }, help: { type: "boolean", short: "h" } } });
	if (values.help) return console.log(usage);
	const server = createServer({ cwd: values.cwd ?? process.cwd(), registry: values.registry });
	await server.connect(new StdioServerTransport());
	console.error("Rasengan UI MCP server on stdio.");
}
