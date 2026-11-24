import { TextRotate } from "@/components/ui/text-rotate";

export default function TextRotateDemo() {
	return (
		<TextRotate
			as="h2"
			words={["fast", "friendly", "yours"]}
			className="text-center font-display text-4xl font-semibold tracking-display case-heading [&_[data-slot=text-rotate-words]]:tone-primary [&_[data-slot=text-rotate-words]]:text-tone-text"
		>
			Websites that are
		</TextRotate>
	);
}
