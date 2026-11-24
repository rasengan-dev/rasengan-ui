import { Video } from "@/components/ui/video";

/** The poster and a play button; once it plays, the browser's controls. Nothing but the poster loads before. */
export default function VideoDemo() {
	return (
		<Video
			src="/media/restaurant-room.mp4"
			poster="/media/restaurant-room-poster.jpg"
			label="A look around the dining room"
			className="max-w-2xl"
		/>
	);
}
