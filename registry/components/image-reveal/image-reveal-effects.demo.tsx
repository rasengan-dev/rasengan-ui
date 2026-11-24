import { ImageReveal, type ImageRevealEffect } from "@/components/ui/image-reveal";

const effects: Array<{ effect: ImageRevealEffect; label: string }> = [
	{ effect: "curtain", label: "curtain" },
	{ effect: "circle", label: "circle" },
	{ effect: "diagonal", label: "diagonal" },
];

/** The three masks, half open: `progress` fixes them for a still picture. */
export default function ImageRevealEffectsDemo() {
	return (
		<div className="grid w-full max-w-2xl grid-cols-3 gap-4">
			{effects.map(({ effect, label }) => (
				<figure key={effect} className="m-0 flex flex-col gap-2">
					<ImageReveal effect={effect} progress={0.55} className="aspect-square rounded-lg bg-muted">
						<img src="/placeholders/kitchen.svg" alt="" />
					</ImageReveal>
					<figcaption className="text-center font-mono text-xs text-muted-foreground">{label}</figcaption>
				</figure>
			))}
		</div>
	);
}
