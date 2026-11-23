import { TextScrollFill } from "@/components/ui/text-scroll-fill";

export default function TextScrollFillDemo() {
	return (
		<TextScrollFill as="h2" className="max-w-2xl font-display text-3xl leading-tight font-semibold tracking-display case-heading text-balance">
			We cook what the market brings in the morning, and we keep cooking until the last table goes home.
		</TextScrollFill>
	);
}
