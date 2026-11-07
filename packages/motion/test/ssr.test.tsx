import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { Magnetic, MotionProvider, MotionScript, Parallax, Presence, Reveal, Stagger, Tilt, defaultMotionTokens, motionScript } from "../src/motion";
import { SplitText, splitText } from "../src/split-text";

function page() {
	return renderToString(
		<MotionProvider>
			<MotionScript />
			<SplitText as="h1" by="chars">
				Ship invoices before coffee
			</SplitText>
			<SplitText as="p" by="lines">
				Every invoice, chased for you.
			</SplitText>
			<Reveal as="p">Every invoice, chased for you.</Reveal>
			<Stagger as="ul">
				<Stagger.Item as="li">First</Stagger.Item>
				<Stagger.Item as="li">Second</Stagger.Item>
			</Stagger>
			<Tilt>Card</Tilt>
			<Magnetic>Button</Magnetic>
			<Parallax>Layer</Parallax>
			<Presence id="monthly">Monthly prices</Presence>
		</MotionProvider>,
	);
}

test("every primitive renders on the server without touching window", () => {
	assert.equal(typeof globalThis.window, "undefined");
	const html = page();
	assert.match(html, /Ship invoices before coffee/);
	assert.match(html, /Monthly prices/);
});

test("server HTML keeps content visible without JavaScript", () => {
	const html = page();
	// Hidden states come from contract.css once motion is ready, never from inline styles.
	assert.doesNotMatch(html, /opacity:\s*0[;"]/);
	assert.match(html, /data-reveal=""/);
	assert.doesNotMatch(html, /data-revealed/);
});

test("split text: screen readers get the sentence once, the spans are hidden", () => {
	const html = page();
	// The visually hidden copy, then the split copy under aria-hidden.
	assert.match(html, /<h1><span style="[^"]*position:absolute[^"]*">Ship invoices before coffee<\/span><span aria-hidden="true">/);
	assert.equal(html.match(/data-split="word"/g)?.length, 4 + 5);
	assert.equal(html.match(/data-split="char"/g)?.length, "Shipinvoicesbeforecoffee".length);
	// Lines are measured in the browser: the server renders words without a line.
	assert.doesNotMatch(html, /data-line=/);
});

test("splitText keeps graphemes whole", () => {
	assert.deepEqual(splitText("  café 👩🏽‍💻 ok "), [
		{ text: "café", chars: ["c", "a", "f", "é"] },
		{ text: "👩🏽‍💻", chars: ["👩🏽‍💻"] },
		{ text: "ok", chars: ["o", "k"] },
	]);
});

test("the defaults match contract.css and Konoha", () => {
	assert.match(motionScript, /prefers-reduced-motion: reduce/);
	const read = (file: string) => readFileSync(join(import.meta.dirname, "../../villages/src", file), "utf8");
	// Konoha's own block, then contract.css's defaults block (not its reduced-motion rule).
	const contract = read("contract.css");
	const defaults = contract.slice(contract.indexOf(":where([data-village]) {"));
	const css = `${read("villages/konoha.css")}\n${defaults.slice(0, defaults.indexOf("\n}"))}`;
	const value = (token: string) => css.match(new RegExp(`${token}:\\s*([^;]+);`))?.[1].trim();
	const d = defaultMotionTokens;
	assert.equal(value("--motion-fast"), `${d.fast * 1000}ms`);
	assert.equal(value("--motion-base"), `${d.base * 1000}ms`);
	assert.equal(value("--motion-slow"), `${d.slow * 1000}ms`);
	assert.equal(value("--motion-ease-out"), `cubic-bezier(${d.easeOut.join(", ")})`);
	assert.equal(value("--motion-ease-in-out"), `cubic-bezier(${d.easeInOut.join(", ")})`);
	assert.equal(value("--motion-spring-stiffness"), String(d.spring.stiffness));
	assert.equal(value("--motion-spring-damping"), String(d.spring.damping));
	assert.equal(value("--motion-distance"), `${d.distance}px`);
	assert.equal(value("--motion-stagger"), `${Math.round(d.stagger * 1000)}ms`);
	assert.equal(value("--motion-intensity"), String(d.intensity));
});
