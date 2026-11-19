import { createServer as createHttpServer, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { parseArgs } from "node:util";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "../mcp.ts";

export const usage = `Usage: rasengan-ui mcp [options]

Starts the Rasengan UI MCP server, for agents (Claude Code, Cursor, VS Code…). Over stdio by default:

  claude mcp add rasengan-ui -- npx rasengan-ui mcp

With --http, over Streamable HTTP at http://<host>:<port>/mcp, for an agent that reaches the project
through a port (a container, a remote sandbox):

  rasengan-ui mcp --http --port 7330 --host 0.0.0.0 --cwd /workspace/app

Options:
  --cwd <path>       The project (default: the folder the client starts the server in)
  --registry <url>   The registry to read when the project has no rasengan-ui.json
  --http             Serve over HTTP instead of stdio
  --port <n>         With --http: the port (default: 7330)
  --host <address>   With --http: the address to listen on (default: 127.0.0.1, this machine only)`;

export const defaultPort = 7330;

export interface HttpOptions {
	cwd: string;
	registry?: string;
	port: number;
	host: string;
}

/** The request's body, parsed as JSON; undefined when it is not JSON, for the transport to refuse. */
async function readJson(request: IncomingMessage): Promise<unknown> {
	const chunks: Buffer[] = [];
	for await (const chunk of request) chunks.push(chunk as Buffer);
	try {
		return JSON.parse(Buffer.concat(chunks).toString("utf8"));
	} catch {
		return undefined;
	}
}

/**
 * The MCP server over Streamable HTTP, without sessions: every POST to /mcp gets a server and a transport of its own,
 * answered in JSON. A client keeps no state between calls, and the server reads the project again on each one, as over
 * stdio. GET and DELETE (server-sent events, session close) have nothing to serve without sessions.
 */
export async function serveHttp(options: HttpOptions): Promise<Server> {
	const http = createHttpServer(async (request, response) => {
		const path = new URL(request.url ?? "/", "http://localhost").pathname;
		if (path !== "/mcp") return response.writeHead(404, { "content-type": "text/plain" }).end("Not found: the MCP endpoint is /mcp.");
		if (request.method !== "POST") {
			return response.writeHead(405, { allow: "POST", "content-type": "text/plain" }).end("This server keeps no sessions: POST to /mcp.");
		}
		const server = createServer({ cwd: options.cwd, registry: options.registry });
		const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
		response.on("close", () => {
			void transport.close();
			void server.close();
		});
		try {
			await server.connect(transport);
			await transport.handleRequest(request, response, await readJson(request));
		} catch (error) {
			console.error(error);
			if (!response.headersSent) {
				response
					.writeHead(500, { "content-type": "application/json" })
					.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: "Internal error" }, id: null }));
			}
		}
	});
	await new Promise<void>((listening, failed) => {
		http.once("error", failed);
		http.listen(options.port, options.host, () => listening());
	});
	return http;
}

export async function mcp(argv: string[]) {
	const { values } = parseArgs({
		args: argv,
		options: {
			cwd: { type: "string" },
			registry: { type: "string" },
			http: { type: "boolean" },
			port: { type: "string" },
			host: { type: "string" },
			help: { type: "boolean", short: "h" },
		},
	});
	if (values.help) return console.log(usage);
	const cwd = values.cwd ?? process.cwd();

	if (values.http) {
		const port = values.port === undefined ? defaultPort : Number(values.port);
		if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error(`--port takes a port number, not "${values.port}".`);
		const http = await serveHttp({ cwd, registry: values.registry, port, host: values.host ?? "127.0.0.1" });
		const address = http.address() as AddressInfo;
		console.error(`Rasengan UI MCP server on http://${address.address}:${address.port}/mcp`);
		return;
	}
	if (values.port !== undefined || values.host !== undefined) throw new Error("--port and --host go with --http.");

	const server = createServer({ cwd, registry: values.registry });
	await server.connect(new StdioServerTransport());
	console.error("Rasengan UI MCP server on stdio.");
}
