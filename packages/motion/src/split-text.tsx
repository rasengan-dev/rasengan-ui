"use client";

/*
 * splitText and <SplitText> (RFC-0007, "Foundations"): a string as characters, words or lines, each in its own span,
 * ready to animate. Installed as `@/lib/split-text`. No animation here: text-reveal and others animate the spans.
 *
 * Screen readers read the whole text once, from a visually hidden copy; the split spans are hidden from them.
 * Lines depend on the layout, so they are measured after mount and again when the width changes; the server renders
 * words.
 */

import * as React from "react";

export type SplitBy = "chars" | "words" | "lines";

export interface SplitWord {
	text: string;
	/** Graphemes, so an emoji or an accented letter stays one character. */
	chars: string[];
}

/* Typed here rather than through the ES2022 lib, which a project's tsconfig may not include. */
type Segmenter = new (locale: undefined, options: { granularity: "grapheme" }) => { segment(input: string): Iterable<{ segment: string }> };
const Segmenter = (globalThis.Intl as { Segmenter?: Segmenter } | undefined)?.Segmenter;

const graphemes = (word: string): string[] => (Segmenter ? [...new Segmenter(undefined, { granularity: "grapheme" }).segment(word)].map((part) => part.segment) : Array.from(word));

/** Splits a string into words (on whitespace) and each word into characters. */
export function splitText(text: string): SplitWord[] {
	return text
		.split(/\s+/)
		.filter(Boolean)
		.map((word) => ({ text: word, chars: graphemes(word) }));
}

const visuallyHidden: React.CSSProperties = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	border: 0,
};

const inlineBlock: React.CSSProperties = { display: "inline-block" };

export type SplitTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

export interface SplitTextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
	as?: SplitTag;
	by?: SplitBy;
	children: string;
}

/**
 * Renders `children` split into spans: `data-split="char" | "word" | "line"`, each with `--index` (its position among
 * its kind), so CSS or Motion can stagger them.
 */
export const SplitText = React.forwardRef<HTMLElement, SplitTextProps>(function SplitText({ as = "span", by = "words", children, ...rest }, forwarded) {
	const ref = React.useRef<HTMLElement>(null);
	React.useImperativeHandle(forwarded, () => ref.current as HTMLElement);
	const words = React.useMemo(() => splitText(children), [children]);
	const lines = useLines(ref, by === "lines" ? words.length : 0);
	const Tag = as as React.ElementType;

	let char = 0;
	const word = (w: SplitWord, index: number) => (
		<span key={index} data-split="word" style={{ ...inlineBlock, ["--index" as string]: index }}>
			{by === "chars"
				? w.chars.map((c, i) => (
						<span key={i} data-split="char" style={{ ...inlineBlock, ["--index" as string]: char++ }}>
							{c}
						</span>
					))
				: w.text}
		</span>
	);
	const spaced = (indices: number[]) => indices.flatMap((i, n) => (n === 0 ? [word(words[i], i)] : [" ", word(words[i], i)]));

	return (
		<Tag ref={ref} {...rest}>
			<span style={visuallyHidden}>{children}</span>
			<span aria-hidden="true">
				{lines
					? lines.map((indices, l) => (
							<span key={l} data-split="line" style={{ display: "block", ["--index" as string]: l }}>
								{spaced(indices)}
							</span>
						))
					: spaced(words.map((_, i) => i))}
			</span>
		</Tag>
	);
});

/** Groups the element's word spans by the line they sit on; null until measured. Re-measures when the width changes. */
function useLines(ref: React.RefObject<HTMLElement | null>, count: number): number[][] | null {
	const [lines, setLines] = React.useState<number[][] | null>(null);
	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element || count === 0) {
			setLines(null);
			return;
		}
		let width = -1;
		const measure = () => {
			const next = element.getBoundingClientRect().width;
			if (next === width) return;
			width = next;
			// Measure the words laid out as one flow: drop the line spans first.
			setLines(null);
			requestAnimationFrame(() => {
				const spans = [...element.querySelectorAll<HTMLElement>('[data-split="word"]')];
				const grouped: number[][] = [];
				let top = Number.NaN;
				spans.forEach((span, index) => {
					if (span.offsetTop !== top) {
						top = span.offsetTop;
						grouped.push([]);
					}
					grouped[grouped.length - 1].push(index);
				});
				setLines(grouped);
			});
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, count]);
	return lines;
}
