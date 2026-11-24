/*
 * RFC-0012. The lightbox is a Dialog that fills the window, on the page's background, so its words keep their
 * contrast whatever the photo. The photos sit in a row with native scroll snapping (as the carousel, ADR-0011): a
 * swipe moves one photo on a touch screen, the buttons and arrow keys elsewhere; the row scrolls smoothly unless
 * motion is reduced. Only the current photo is shown to screen readers. The trigger keeps the look you give it.
 */
export const lightboxStyles = {
	content:
		"top-0 left-0 grid h-dvh w-full max-w-none translate-x-0 translate-y-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-none border-0 bg-background p-0 shadow-none sm:max-w-none",
	bar: "flex items-center justify-between gap-3 px-4 py-3",
	counter: "text-sm tabular-nums text-muted-foreground",
	viewport:
		"flex min-h-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth outline-none [scrollbar-width:none] motion-reduce:scroll-auto [[data-motion=off]_&]:scroll-auto [&::-webkit-scrollbar]:hidden",
	slide: "m-0 flex w-full shrink-0 snap-center snap-always items-center justify-center px-4 @md:px-16",
	image: "max-h-full max-w-full rounded-md object-contain",
	footer: "flex items-center gap-3 px-4 py-3 @md:px-6",
	text: "min-w-0 flex-1",
	title: "text-sm leading-snug font-medium text-foreground",
	description: "text-sm leading-snug text-muted-foreground",
};
