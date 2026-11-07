import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { Magnetic, MotionProvider, MotionScript, Parallax, Presence, Reveal, Stagger, Tilt, bezierEasing, defaultMotionTokens, motionScript, springAtRest, stepSpring } from "../src/motion";
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

test("bezierEasing follows the curve, overshoot included", () => {
	const linear = bezierEasing([0, 0, 1, 1]);
	assert.ok(Math.abs(linear(0.3) - 0.3) < 1e-3);
	const ease = bezierEasing([0.25, 0.1, 0.25, 1]);
	// CSS "ease" at x = 0.5 is about 0.8024.
	assert.ok(Math.abs(ease(0.5) - 0.8024) < 2e-3);
	const back = bezierEasing([0.34, 1.56, 0.64, 1]);
	assert.ok(Math.max(...Array.from({ length: 99 }, (_, i) => back((i + 1) / 100))) > 1, "Kusa's ease-out overshoots");
	assert.equal(back(0), 0);
	assert.equal(back(1), 1);
});

test("stepSpring settles at the target; a soft damping overshoots first", () => {
	const run = (spring: { stiffness: number; damping: number }) => {
		let state = { value: 0, velocity: 0 };
		let max = 0;
		for (let frame = 0; frame < 240; frame++) {
			state = stepSpring(state, 100, spring, 1 / 60);
			max = Math.max(max, state.value);
		}
		return { state, max };
	};
	const iwa = run({ stiffness: 700, damping: 60 });
	assert.ok(springAtRest(iwa.state, 100));
	assert.ok(iwa.max <= 100.5, "Iwa does not overshoot");
	const kusa = run({ stiffness: 420, damping: 14 });
	assert.ok(springAtRest(kusa.state, 100));
	assert.ok(kusa.max > 110, "Kusa overshoots");
});
