import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToString } from "react-dom/server";
import {
	Counter,
	Magnetic,
	Marquee,
	MotionProvider,
	MotionScript,
	Parallax,
	Presence,
	Reveal,
	Stagger,
	Tilt,
	motionScript,
} from "../src/index";
import { ScrollScene, SplitText, TextScrub } from "../src/gsap";

function page() {
	return renderToString(
		<MotionProvider intensity={3}>
			<MotionScript />
			<SplitText as="h1">Ship invoices before coffee</SplitText>
			<Reveal as="p">Every invoice, chased for you.</Reveal>
			<Stagger as="ul">
				<Stagger.Item as="li">First</Stagger.Item>
				<Stagger.Item as="li">Second</Stagger.Item>
			</Stagger>
			<Counter value={12500} suffix="+" format="standard" locale="en-US" />
			<Marquee label="Customers">
				<span>Acme</span>
				<span>Lumen</span>
			</Marquee>
			<Tilt>Card</Tilt>
			<Magnetic>Button</Magnetic>
			<Parallax>Layer</Parallax>
			<Presence id="monthly">Monthly prices</Presence>
			<ScrollScene pin build={(timeline) => timeline.to({}, { duration: 1 })}>
				<p>Step one</p>
			</ScrollScene>
			<TextScrub>Words light up as you scroll.</TextScrub>
		</MotionProvider>,
	);
}

test("every primitive renders on the server without touching window", () => {
	assert.equal(typeof globalThis.window, "undefined");
	const html = page();
	assert.match(html, /Ship invoices before coffee/);
	assert.match(html, /Words light up as you scroll\./);
});

test("server HTML keeps content visible without JavaScript", () => {
	const html = page();
	// Hidden states come from tokens.css once motion is ready, never from inline styles.
	assert.doesNotMatch(html, /opacity:\s*0[;"]/);
	assert.match(html, /data-reveal=""/);
	assert.doesNotMatch(html, /data-revealed/);
});

test("Counter renders its final value for crawlers and screen readers", () => {
	const html = page();
	assert.match(html, /12,500/);
	assert.match(html, /aria-hidden="true"/);
});

test("Marquee hides its duplicate copy from assistive tech", () => {
	const html = page();
	const copies = html.match(/>Acme</g) ?? [];
	assert.equal(copies.length, 2);
	assert.match(html, /role="region" aria-label="Customers"/);
});

test("the head script is valid JavaScript and decides a mode", () => {
	const attributes = new Map<string, string>();
	const fakeWindow = {
		matchMedia: (query: string) => ({ matches: query.includes("reduce") && reduce }),
	};
	let reduce = false;
	let search = "";
	const run = () => {
		attributes.clear();
		new Function("document", "location", "window", motionScript)(
			{ documentElement: { getAttribute: (name: string) => attributes.get(name) ?? null, setAttribute: (name: string, value: string) => attributes.set(name, value) } },
			{ search },
			fakeWindow,
		);
		return attributes.get("data-motion");
	};

	assert.equal(run(), "ready");
	search = "?motion=final";
	assert.equal(run(), "final");
	search = "?motion=off";
	assert.equal(run(), "off");
	search = "";
	reduce = true;
	assert.equal(run(), "off");
});
