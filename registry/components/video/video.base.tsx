"use client";

import * as React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMotionMode } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { videoPlayVariants, videoStyles, type VideoPlayVariantProps } from "./video.styles";

export { videoPlayVariants, type VideoPlayVariantProps } from "./video.styles";

export interface VideoCaptions {
	src: string;
	/** The captions' language, `en`, `fr`… */
	srcLang: string;
	/** Its name in the browser's captions menu. */
	label: string;
	default?: boolean;
}

export interface VideoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VideoPlayVariantProps {
	src: string;
	/** The picture shown before it plays. */
	poster?: string;
	/** What the video is: the play button says "Play: <label>". */
	label: string;
	/** Captions files (WebVTT), for a video with speech. */
	captions?: VideoCaptions[];
	/**
	 * A muted background loop that starts on its own, with a pause button. It does not start with reduced motion (or
	 * `final`): the poster stays, and the button starts it.
	 */
	autoPlay?: boolean;
	/** Plays as soon as it is shown, with its controls: for a video someone asked to see (VideoDialog). */
	startOnMount?: boolean;
	/** The labels of the background loop's button, in the page's language. */
	labels?: { play?: string; pause?: string };
}

/**
 * A video: the poster and a large play button until someone plays it, then the browser's own controls (seeking,
 * volume, captions, full screen). Nothing is downloaded before that but the poster. With `autoPlay` it is a muted
 * background loop with a pause button instead (WCAG 2.2.2), and it waits for the user under reduced motion.
 */
export function Video({ src, poster, label, captions, autoPlay = false, startOnMount = false, labels, tone, size, className, ...props }: VideoProps) {
	const video = React.useRef<HTMLVideoElement>(null);
	const mode = useMotionMode();
	const [started, setStarted] = React.useState(startOnMount);
	const [playing, setPlaying] = React.useState(false);

	// A background loop starts only when motion may run.
	React.useEffect(() => {
		const element = video.current;
		if (!element || !autoPlay || mode !== "ready") return;
		element.muted = true;
		element.play().catch(() => {});
	}, [autoPlay, mode]);

	React.useEffect(() => {
		if (startOnMount) video.current?.play().catch(() => {});
	}, [startOnMount]);

	const start = () => {
		setStarted(true);
		const element = video.current;
		if (!element) return;
		element.play().catch(() => {});
		element.focus();
	};

	return (
		<div data-slot="video" className={cn(videoStyles.root, className)} {...props}>
			<video
				ref={video}
				src={src}
				poster={poster}
				aria-label={label}
				preload={autoPlay || startOnMount ? "auto" : "none"}
				playsInline
				muted={autoPlay}
				loop={autoPlay}
				controls={!autoPlay && started}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				className={videoStyles.video}
			>
				{captions?.map((track) => (
					<track key={track.src} kind="captions" src={track.src} srcLang={track.srcLang} label={track.label} default={track.default} />
				))}
			</video>
			{!autoPlay && !started && (
				<button type="button" data-slot="video-play" aria-label={`Play: ${label}`} className={videoPlayVariants({ tone, size })} onClick={start}>
					<PlayIcon aria-hidden="true" className="translate-x-[6%]" />
				</button>
			)}
			{autoPlay && (
				<button
					type="button"
					data-slot="video-toggle"
					aria-label={playing ? (labels?.pause ?? "Pause the video") : (labels?.play ?? "Play the video")}
					className={videoStyles.toggle}
					onClick={() => {
						const element = video.current;
						if (!element) return;
						if (element.paused) element.play().catch(() => {});
						else element.pause();
					}}
				>
					{playing ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
				</button>
			)}
		</div>
	);
}

/** A video in a dialog, behind a trigger ("Watch the demo"). Closing the dialog stops it. */
export function VideoDialog(props: React.ComponentProps<typeof Dialog>) {
	return <Dialog {...props} />;
}

export const VideoDialogTrigger = DialogTrigger;

export interface VideoDialogContentProps extends Omit<VideoProps, "autoPlay" | "startOnMount" | "className"> {
	className?: string;
}

/** The dialog with the video, playing with its controls as soon as it opens; its title is the video's label. */
export function VideoDialogContent({ className, label, ...props }: VideoDialogContentProps) {
	return (
		<DialogContent data-slot="video-dialog-content" className={cn(videoStyles.dialog, className)}>
			<DialogTitle className="sr-only">{label}</DialogTitle>
			<Video label={label} startOnMount className={videoStyles.dialogVideo} {...props} />
		</DialogContent>
	);
}
