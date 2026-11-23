import { ImageReveal } from "@/components/ui/image-reveal";

export default function ImageRevealDemo() {
	return (
		<figure className="m-0 flex w-full max-w-lg flex-col gap-3">
			<ImageReveal className="aspect-[4/3] rounded-lg">
				<img src="/placeholders/restaurant-room.svg" alt="A dining room with wooden tables set for dinner" />
			</ImageReveal>
			<figcaption className="text-sm text-muted-foreground">The room, uncovered from the left as it comes into view.</figcaption>
		</figure>
	);
}
