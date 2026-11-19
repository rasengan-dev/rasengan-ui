import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { serveHttp } from "./commands/mcp.ts";

// A project with no rasengan-ui.json, and a registry folder with one component: what the server reads, offline.
const root = mkdtempSync(join(tmpdir(), "rui-mcp-http-"));
writeFileSync(join(root, "package.json"), JSON.stringify({ name: "site", dependencies: { react: "^19.0.0" } }));
mkdirSync(join(root, "registry", "base"), { recursive: true });
writeFileSync(
	join(root, "registry", "base", "registry.json"),
	JSON.stringify({ name: "rasengan-ui", items: [{ name: "button", type: "registry:ui", title: "Button", description: "A button." }] }),
);

const http = await serveHttp({ cwd: root, registry: join(root, "registry"), port: 0, host: "127.0.0.1" });
after(() => http.close());
const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}`;

async function connect() {
	const client = new Client({ name: "test", version: "0.0.0" });
	await client.connect(new StreamableHTTPClientTransport(new URL(`${url}/mcp`)));
	return client;
}

test("an MCP client over HTTP lists the tools and calls them", async () => {
	const client = await connect();
	const names = (await client.listTools()).tools.map((tool) => tool.name).sort();
	assert.deepEqual(names, ["add_components", "get_component", "get_examples", "get_project", "list_components"]);
	const listed = await client.callTool({ name: "list_components", arguments: {} });
	assert.match(JSON.stringify(listed.content), /button/);
	await client.close();
});

test("each request stands alone: two clients, no session to share", async () => {
	const [first, second] = await Promise.all([connect(), connect()]);
	const [a, b] = await Promise.all([first.listTools(), second.listTools()]);
	assert.equal(a.tools.length, b.tools.length);
	await Promise.all([first.close(), second.close()]);
});

test("the server instructions come with the initialisation", async () => {
	const client = await connect();
	assert.match(client.getInstructions() ?? "", /Rasengan UI is a React component system/);
	await client.close();
});

test("only POST /mcp is served", async () => {
	assert.equal((await fetch(`${url}/mcp`)).status, 405);
	assert.equal((await fetch(`${url}/other`, { method: "POST" })).status, 404);
});
