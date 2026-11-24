"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { lightboxStyles } from "./lightbox.styles";

export interface LightboxImage {
	src: string;
	/** What the photo shows: the dialog's title while it is open. */
	alt: string;
	width?: number;
	height?: number;
	/** Shown under the photo. */
	caption?: string;
}

export interface LightboxLabels {
	previous: string;
	next: string;
	close: string;
}

const defaultLabels: LightboxLabels = { previous: "Previous photo", next: "Next photo", close: "Close" };

interface LightboxContextValue {
	images: LightboxImage[];
	labels: LightboxLabels;
	index: number;
	setIndex: (index: number) => void;
	show: (index: number) => void;
}

const LightboxContext = React.createContext<LightboxContextValue | null>(null);

function useLightbox(part: string) {
	const context = React.useContext(LightboxContext);
	if (!context) throw new Error(`${part} must be inside a Lightbox`);
	return context;
}

export interface LightboxProps {
	images: LightboxImage[];
	/** The buttons' names, for screen readers, in the page's language. */
	labels?: Partial<LightboxLabels>;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** The photo shown (an index into `images`), to control it. */
	index?: number;
	onIndexChange?: (index: number) => void;
	children?: React.ReactNode;
}

/**
 * A set of photos that open full screen, one at a time: arrows, the arrow keys and a swipe move between them, with a
 * counter and the caption. Put a LightboxTrigger on each thumbnail, with its index, and one LightboxContent.
 */
export function Lightbox({ images, labels, open: openProp, defaultOpen = false, onOpenChange, index: indexProp, onIndexChange, children }: LightboxProps) {
	const [openState, setOpenState] = React.useState(defaultOpen);
	const [indexState, setIndexState] = React.useState(0);
	const open = openProp ?? openState;
	const index = Math.min(Math.max(0, indexProp ?? indexState), Math.max(0, images.length - 1));

	const setOpen = React.useCallback(
		(next: boolean) => {
			setOpenState(next);
			onOpenChange?.(next);
		},
		[onOpenChange],
	);
	const setIndex = React.useCallback(
		(next: number) => {
			setIndexState(next);
			onIndexChange?.(next);
		},
		[onIndexChange],
	);
	const show = React.useCallback(
		(next: number) => {
			setIndex(next);
			setOpen(true);
		},
		[setIndex, setOpen],
	);
	const value = React.useMemo(() => ({ images, labels: { ...defaultLabels, ...labels }, index, setIndex, show }), [images, labels, index, setIndex, show]);

	return (
		<LightboxContext.Provider value={value}>
			<Dialog open={open} onOpenChange={setOpen}>
				{children}
			</Dialog>
		</LightboxContext.Provider>
	);
}

export type LightboxTriggerProps = useRender.ComponentProps<"button"> & { index: number };

/** Opens the lightbox at `index`. A button by default; `render` gives it another element. */
export function LightboxTrigger({ index, render, onClick, ...props }: LightboxTriggerProps) {
	const { show } = useLightbox("LightboxTrigger");
	return useRender({
		defaultTagName: "button",
		render,
		props: mergeProps<"button">(
			{
				type: "button",
				"data-slot": "lightbox-trigger",
				"aria-haspopup": "dialog",
				onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
					onClick?.(event);
					if (!event.defaultPrevented) show(index);
				},
			} as React.ComponentProps<"button">,
			props,
		),
	});
}

/** The full-screen view: a counter and a close button above, the photos, then the caption and the arrows. */
export function LightboxContent({ className }: { className?: string }) {
	const { images, labels, index, setIndex } = useLightbox("LightboxContent");
	const viewport = React.useRef<HTMLDivElement | null>(null);
	const frame = React.useRef(0);
	/** The photo a button or a key is scrolling to: the scroll in between does not change the current photo. */
	const target = React.useRef<number | null>(null);
	const image = images[index];
	const opening = React.useRef(index);
	opening.current = index;

	/** Scrolls the row to a photo: smoothly unless motion is reduced (CSS decides), or at once. */
	const scrollToPhoto = React.useCallback((next: number, instant = false) => {
		const slide = viewport.current?.children[next] as HTMLElement | undefined;
		// Into view along the row only (right to left too); "auto" follows the row's CSS scroll-behavior.
		slide?.scrollIntoView({ block: "nearest", inline: "start", behavior: instant ? "instant" : "auto" });
	}, []);

	const go = (next: number) => {
		const wrapped = (next + images.length) % images.length;
		target.current = wrapped;
		setIndex(wrapped);
		scrollToPhoto(wrapped);
	};

	// On open, the row starts at the photo that was asked for.
	const attach = React.useCallback(
		(row: HTMLDivElement | null) => {
			viewport.current = row;
			if (row) requestAnimationFrame(() => scrollToPhoto(opening.current, true));
		},
		[scrollToPhoto],
	);

	// A swipe or a scroll: the photo most in view becomes the current one.
	const onScroll = () => {
		cancelAnimationFrame(frame.current);
		frame.current = requestAnimationFrame(() => {
			const row = viewport.current;
			if (!row || row.clientWidth === 0) return;
			const at = Math.round(Math.abs(row.scrollLeft) / row.clientWidth);
			if (target.current !== null) {
				// Arrived (or close enough to stop): from now on, the scroll says which photo is current again.
				if (Math.abs(Math.abs(row.scrollLeft) - target.current * row.clientWidth) < 2) target.current = null;
				return;
			}
			if (at !== index && at < images.length) setIndex(at);
		});
	};

	React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

	const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
		const back = rtl ? "ArrowRight" : "ArrowLeft";
		const forward = rtl ? "ArrowLeft" : "ArrowRight";
		if (event.key === back) go(index - 1);
		else if (event.key === forward) go(index + 1);
		else if (event.key === "Home") go(0);
		else if (event.key === "End") go(images.length - 1);
		else return;
		event.preventDefault();
	};

	if (!image) return null;

	return (
		<DialogContent data-slot="lightbox-content" showCloseButton={false} className={cn(lightboxStyles.content, "@container", className)} onKeyDown={onKeyDown}>
			<div className={lightboxStyles.bar}>
				<span className={lightboxStyles.counter}>
					{index + 1} / {images.length}
				</span>
				<DialogClose render={<Button variant="ghost" size="icon" aria-label={labels.close} />}>
					<XIcon aria-hidden="true" />
				</DialogClose>
			</div>
			<div
				ref={attach}
				data-slot="lightbox-viewport"
				className={lightboxStyles.viewport}
				onScroll={onScroll}
				onScrollEnd={() => {
					// However the scroll ended (a swipe in the middle, too), the photo in view is the current one.
					target.current = null;
					onScroll();
				}}
			>
				{images.map((photo, i) => (
					<figure key={`${photo.src}-${i}`} className={lightboxStyles.slide} aria-hidden={i !== index} inert={i !== index}>
						<img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className={lightboxStyles.image} />
					</figure>
				))}
			</div>
			<div className={lightboxStyles.footer}>
				<div className={lightboxStyles.text}>
					<DialogTitle className={lightboxStyles.title}>{image.alt}</DialogTitle>
					{image.caption && <DialogDescription className={lightboxStyles.description}>{image.caption}</DialogDescription>}
				</div>
				{images.length > 1 && (
					<>
						<Button variant="outline" size="icon" onClick={() => go(index - 1)} aria-label={labels.previous}>
							<ChevronLeftIcon aria-hidden="true" className="rtl:rotate-180" />
						</Button>
						<Button variant="outline" size="icon" onClick={() => go(index + 1)} aria-label={labels.next}>
							<ChevronRightIcon aria-hidden="true" className="rtl:rotate-180" />
						</Button>
					</>
				)}
			</div>
		</DialogContent>
	);
}
