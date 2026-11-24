import { PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VideoDialog, VideoDialogContent, VideoDialogTrigger } from "@/components/ui/video";

/** "Watch the tour": the video opens in a dialog and plays; closing the dialog stops it. */
export default function VideoDialogDemo() {
	return (
		<VideoDialog>
			<VideoDialogTrigger render={<Button variant="outline" />}>
				<PlayIcon aria-hidden="true" />
				Watch the tour
			</VideoDialogTrigger>
			<VideoDialogContent src="/media/restaurant-room.mp4" poster="/media/restaurant-room-poster.jpg" label="A look around the dining room" />
		</VideoDialog>
	);
}
