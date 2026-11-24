import { TextScrollFill } from "@/components/ui/text-scroll-fill";

/** Both tones, half filled: `progress` fixes them for a still picture. */
export default function TextScrollFillTonesDemo() {
	return (
		<div className="flex max-w-xl flex-col gap-6">
			<TextScrollFill progress={0.4} className="font-display text-2xl font-semibold case-heading">
				Neutral fills to the text colour, word after word.
			</TextScrollFill>
			<TextScrollFill tone="primary" progress={0.4} className="font-display text-2xl font-semibold case-heading">
				Primary fills to the nature's colour for words.
			</TextScrollFill>
		</div>
	);
}
