import { HorizontalScroll, HorizontalScrollItem, HorizontalScrollTrack } from "@/components/ui/horizontal-scroll";

/** The row drawn at 0, half way and at the end, in place: `progress` fixes the moment. */
export default function HorizontalScrollStillDemo() {
	return (
		<div className="flex w-full max-w-xl flex-col gap-4">
			{[0, 0.5, 1].map((progress) => (
				<figure key={progress} className="m-0 flex flex-col gap-1">
					<HorizontalScroll progress={progress} aria-label={`Row at ${progress}`} className="rounded-lg border-village [--track-gap:0.75rem] [--track-inset:0.75rem]">
						<HorizontalScrollTrack>
							{Array.from({ length: 8 }, (_, index) => (
								<HorizontalScrollItem key={index} className="w-28">
									<div className="flex aspect-square items-center justify-center rounded-control bg-muted font-display text-2xl font-semibold">{index + 1}</div>
								</HorizontalScrollItem>
							))}
						</HorizontalScrollTrack>
					</HorizontalScroll>
					<figcaption className="font-mono text-xs text-muted-foreground">progress {progress}</figcaption>
				</figure>
			))}
		</div>
	);
}
