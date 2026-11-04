import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { after, test } from "node:test";
import { fetchJson } from "./fetch.ts";

// A server answering by path, as a registry would, or a site whose fallback sends its page for every path.
const server = createServer((request, response) => {
	const send = (status: number, type: string, body: string) => response.writeHead(status, { "content-type": type }).end(body);
	if (request.url === "/item.json") send(200, "application/json", '{"name":"button"}');
	else if (request.url === "/page.json") send(200, "text/html; charset=utf-8", "<!DOCTYPE html><html></html>");
	else if (request.url === "/text.json") send(200, "text/plain", "not json");
	else if (request.url === "/broken.json") send(500, "text/plain", "");
	else send(404, "text/plain", "");
});
await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
after(() => server.close());
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test("JSON comes back parsed", async () => {
	assert.deepEqual(await fetchJson(`${base}/item.json`), { name: "button" });
});

test("a web page is named as one, with the hint", async () => {
	await assert.rejects(fetchJson(`${base}/page.json`, { what: "the registry", hint: "Check the address." }), {
		message: `The registry at ${base}/page.json sent a web page, not JSON: nothing is published at that address.\nCheck the address.`,
	});
});

test("other bodies that aren't JSON say so", async () => {
	await assert.rejects(fetchJson(`${base}/text.json`), { message: `${base}/text.json sent something that isn't JSON.` });
});

test("a 404 gives the caller's message, other statuses the status", async () => {
	await assert.rejects(fetchJson(`${base}/missing.json`, { notFound: "No item named missing." }), { message: "No item named missing." });
	await assert.rejects(fetchJson(`${base}/missing.json`), { message: `${base}/missing.json answered 404.` });
	await assert.rejects(fetchJson(`${base}/broken.json`, { what: "the registry" }), { message: `The registry at ${base}/broken.json answered 500.` });
});
