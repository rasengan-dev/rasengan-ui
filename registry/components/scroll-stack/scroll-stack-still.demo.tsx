import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";

const cards = ["Tell us about the business", "Pick a look", "Add your photos and prices", "Publish"];

/** The stack drawn at 0, half way and at the end, in place: `progress` fixes the moment. */
export default function ScrollStackStillDemo() {
	return (
		<div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
			{[0, 0.5, 1].map((progress) => (
				<figure key={progress} className="m-0 flex flex-col gap-2">
					<ScrollStack progress={progress} className="[--stack-gap:0.75rem]">
						{cards.map((title, index) => (
							<ScrollStackItem key={title}>
								<div className="flex h-32 flex-col justify-between rounded-lg border-village bg-background p-4 shadow-md">
									<span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
									<span className="font-display text-base font-semibold case-heading">{title}</span>
								</div>
							</ScrollStackItem>
						))}
					</ScrollStack>
					<figcaption className="text-center font-mono text-xs text-muted-foreground">progress {progress}</figcaption>
				</figure>
			))}
		</div>
	);
}
