import * as React from "react";

import { ScrollProgress } from "@/components/ui/scroll-progress";

const paragraphs = [
	"The bar above this text follows this card, not the page: it fills while the card crosses the window. On a long article, it fills from the article's top reaching the top of the window to its end reaching the bottom.",
	"On a real page it sits at the very top, fixed, and follows the article or the whole page as the reader scrolls.",
	"It moves only with the reader's own scroll, so it keeps working for people who asked for reduced motion.",
];

export default function ScrollProgressDemo() {
	const article = React.useRef<HTMLElement>(null);
	return (
		<article ref={article} className="relative w-full max-w-lg overflow-clip rounded-lg border-village bg-card">
			<div className="sticky top-0 z-10 bg-card">
				<ScrollProgress target={article} position="inline" variant="track" />
			</div>
			<div className="flex flex-col gap-4 p-6 text-sm leading-relaxed text-muted-foreground">
				<h3 className="font-display text-xl font-semibold text-foreground case-heading">How the reading bar works</h3>
				{paragraphs.map((text) => (
					<p key={text} className="m-0">
						{text}
					</p>
				))}
			</div>
		</article>
	);
}
