import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import { MotionProvider, Parallax, pageScrollProgress, scrollProgressAt, scrollRangeBounds, scrollTimelinesSupported } from "../src/motion";

// A 300px element in an 800px viewport, and a 2000px one (a pinned section).
const viewport = 800;

test("cover runs from the top entering at the bottom to the bottom leaving at the top", () => {
	assert.deepEqual(scrollRangeBounds("cover", 300, viewport), [800, -300]);
	assert.equal(scrollProgressAt("cover", 800, 300, viewport), 0);
	assert.equal(scrollProgressAt("cover", 250, 300, viewport), 0.5);
	assert.equal(scrollProgressAt("cover", -300, 300, viewport), 1);
	assert.equal(scrollProgressAt("cover", 2000, 300, viewport), 0, "below the viewport");
	assert.equal(scrollProgressAt("cover", -5000, 300, viewport), 1, "above the viewport");
});

test("entry and exit last the element's height, or the viewport's when it is taller", () => {
	assert.deepEqual(scrollRangeBounds("entry", 300, viewport), [800, 500]);
	assert.equal(scrollProgressAt("entry", 650, 300, viewport), 0.5);
	assert.deepEqual(scrollRangeBounds("entry", 2000, viewport), [800, 0]);

	assert.deepEqual(scrollRangeBounds("exit", 300, viewport), [0, -300]);
	assert.equal(scrollProgressAt("exit", -150, 300, viewport), 0.5);
	// A tall element starts to exit when its bottom reaches the viewport's bottom.
	assert.deepEqual(scrollRangeBounds("exit", 2000, viewport), [-1200, -2000]);
});

test("contain and pin: fully in, or filling the viewport while a tall section scrolls by", () => {
	assert.deepEqual(scrollRangeBounds("contain", 300, viewport), [500, 0]);
	assert.equal(scrollProgressAt("contain", 250, 300, viewport), 0.5);
	assert.deepEqual(scrollRangeBounds("pin", 2000, viewport), [0, -1200]);
	assert.equal(scrollProgressAt("pin", 0, 2000, viewport), 0);
	assert.equal(scrollProgressAt("pin", -600, 2000, viewport), 0.5);
	assert.equal(scrollProgressAt("pin", -1200, 2000, viewport), 1);
});

test("an element exactly as tall as the viewport has no contain range: it jumps", () => {
	assert.equal(scrollProgressAt("contain", 1, 800, viewport), 0);
	assert.equal(scrollProgressAt("contain", 0, 800, viewport), 1);
});

test("the page's progress", () => {
	assert.equal(pageScrollProgress(0, 3000, viewport), 0);
	assert.equal(pageScrollProgress(1100, 3000, viewport), 0.5);
	assert.equal(pageScrollProgress(2200, 3000, viewport), 1);
	assert.equal(pageScrollProgress(0, 600, viewport), 0, "a page that does not scroll");
});

test("no scroll timelines outside a browser", () => {
	assert.equal(scrollTimelinesSupported(), false);
});

test("Parallax renders its static form on the server; a fixed progress is drawn", () => {
	const still = renderToString(
		<MotionProvider>
			<Parallax>Layer</Parallax>
		</MotionProvider>,
	);
	assert.match(still, /Layer/);
	assert.doesNotMatch(still, /translate|data-scroll-linked/);

	const fixed = renderToString(
		<MotionProvider>
			<Parallax speed={0.2} progress={0.5}>
				Layer
			</Parallax>
		</MotionProvider>,
	);
	assert.match(fixed, /translate:0 calc\(\(0\.5 - var\(--scroll-progress, 0\)\) \* 80px\)/);
});

test("rasengan-motion follows the scroll without Motion's scroll hooks (ADR-0019)", () => {
	const source = readFileSync(join(import.meta.dirname, "../src/motion.tsx"), "utf8");
	assert.doesNotMatch(source, /\buseScroll\b|\buseTransform\b/);
});
