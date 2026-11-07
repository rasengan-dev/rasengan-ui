"use client";

/*
 * splitText and <SplitText> (RFC-0007, "Foundations"): a string as characters, words or lines, each in its own span,
 * ready to animate. Installed as `@/lib/split-text`. No animation here: text-reveal and others animate the spans.
 *
 * Screen readers read the whole text once, from a visually hidden copy; the split spans are hidden from them.
 * Lines depend on the layout: with `by="lines"` the text is split in words, and each word gets the line it sits on
 * (`data-line`, `--line`), measured after mount and again when the width changes. The words are not regrouped, so
 * measuring never changes the layout it measures.
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
 * Renders `children` split into spans: `data-split="word"` (and `"char"` inside, with `by="chars"`), each with
 * `--index`, its position among its kind. With `by="lines"`, words also carry `data-line` and `--line` once measured,
 * so CSS or Motion can stagger them by line.
 */
export const SplitText = React.forwardRef<HTMLElement, SplitTextProps>(function SplitText({ as = "span", by = "words", children, ...rest }, forwarded) {
	const ref = React.useRef<HTMLElement>(null);
	React.useImperativeHandle(forwarded, () => ref.current as HTMLElement);
	const words = React.useMemo(() => splitText(children), [children]);
	const lineOf = useLines(ref, by === "lines" ? words.length : 0);
	const Tag = as as React.ElementType;

	let char = 0;
	return (
		<Tag ref={ref} {...rest}>
			<span style={visuallyHidden}>{children}</span>
			<span aria-hidden="true">
				{words.flatMap((w, index) => {
					const line = lineOf?.[index];
					const word = (
						<span
							key={index}
							data-split="word"
							data-line={line}
							style={{ ...inlineBlock, ["--index" as string]: index, ...(line === undefined ? {} : { ["--line" as string]: line }) }}
						>
							{by === "chars"
								? w.chars.map((c, i) => (
										<span key={i} data-split="char" style={{ ...inlineBlock, ["--index" as string]: char++ }}>
											{c}
										</span>
									))
								: w.text}
						</span>
					);
					return index === 0 ? [word] : [" ", word];
				})}
			</span>
		</Tag>
	);
});

/** The line each word sits on (0, 1, 2…), or null until measured. Measured again when the element's width changes. */
function useLines(ref: React.RefObject<HTMLElement | null>, count: number): number[] | null {
	const [lines, setLines] = React.useState<number[] | null>(null);
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
			const spans = [...element.querySelectorAll<HTMLElement>('[data-split="word"]')];
			let line = -1;
			let top = Number.NaN;
			const lineOf = spans.map((span) => {
				if (span.offsetTop !== top) {
					top = span.offsetTop;
					line += 1;
				}
				return line;
			});
			setLines((current) => (current && current.length === lineOf.length && current.every((l, i) => l === lineOf[i]) ? current : lineOf));
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, count]);
	return lines;
}
