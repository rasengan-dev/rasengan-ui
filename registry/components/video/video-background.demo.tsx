import { Video } from "@/components/ui/video";

/** A muted background loop under a heading, with its pause button; with reduced motion, the poster stays. */
export default function VideoBackgroundDemo() {
	return (
		<div className="relative w-full max-w-2xl">
			<Video autoPlay src="/media/restaurant-room.mp4" poster="/media/restaurant-room-poster.jpg" label="The dining room, slowly" className="aspect-[16/7]" />
			<div className="pointer-events-none absolute inset-x-4 top-4 max-w-xs rounded-lg bg-background/90 p-4">
				<p className="m-0 font-display text-xl font-semibold tracking-display text-foreground case-heading">Dinner from seven, every night</p>
			</div>
		</div>
	);
}
