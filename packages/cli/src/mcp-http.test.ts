import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { serveHttp } from "./commands/mcp.ts";

// A project with no rasengan-ui.json, and a registry folder with a component and two blocks: what the server reads, offline.
const root = mkdtempSync(join(tmpdir(), "rui-mcp-http-"));
writeFileSync(join(root, "package.json"), JSON.stringify({ name: "site", dependencies: { react: "^19.0.0" } }));
mkdirSync(join(root, "registry", "base"), { recursive: true });
writeFileSync(
	join(root, "registry", "base", "registry.json"),
	JSON.stringify({
		name: "rasengan-ui",
		items: [
			{ name: "button", type: "registry:ui", title: "Button", description: "A button." },
			{ name: "hero-a", type: "registry:block", title: "Hero A", description: "A hero.", meta: { family: "marketing", category: "hero" } },
			{ name: "rooms", type: "registry:block", title: "Rooms", description: "Rooms.", meta: { family: ["hotels", "marketing"], category: "rooms" } },
		],
	}),
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

test("the family filter takes any family the registry has, and names them when it has not", async () => {
	const client = await connect();
	const call = async (family: string) => {
		const result = await client.callTool({ name: "list_components", arguments: { kind: "block", family } });
		return (result.content as { text: string }[])[0].text;
	};
	const hotels = await call("hotels");
	assert.match(hotels, /rooms/);
	assert.doesNotMatch(hotels, /hero-a/);
	assert.match(await call("marketing"), /hero-a[\s\S]*rooms/);
	assert.match(await call("events"), /No block family is named "events"\. The registry's families: hotels and marketing\./);
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
