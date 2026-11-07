import { TextReveal } from "@/components/ui/text-reveal";

const effects = ["rise", "fade", "blur", "mask"] as const;

export default function TextRevealEffectsDemo() {
	return (
		<div className="grid w-full max-w-lg gap-6 sm:grid-cols-2">
			{effects.map((effect) => (
				<div key={effect} className="flex flex-col gap-1">
					<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{effect}</span>
					<TextReveal as="h3" by={effect === "mask" ? "words" : "chars"} effect={effect} className="font-display text-2xl font-semibold tracking-display">
						Hello, village
					</TextReveal>
				</div>
			))}
		</div>
	);
}
