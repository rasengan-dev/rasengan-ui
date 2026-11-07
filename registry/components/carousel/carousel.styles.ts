/*
 * The viewport is a native scroll container with snap points: touch, trackpads and wheels move it the way the
 * platform does, and it stays a list of slides for assistive tech. Its scrollbar is hidden (the arrows, dots and
 * keys are the controls). Arrows are outline icon buttons on the edges; dots are pills, the current one longer and
 * in the nature's colour, inside targets of 24px.
 */
export const carouselStyles = {
	// With dots below (mt-3 + a 24px row), the arrows centre on the slides, not on slides and dots.
	root: "relative has-[>[data-slot=carousel-dots]]:[--carousel-below:2.25rem]",
	viewport:
		"relative overflow-auto overscroll-contain rounded-lg outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:focus-ring data-[dragging]:cursor-grabbing data-[dragging]:select-none data-[orientation=horizontal]:snap-x data-[orientation=horizontal]:snap-mandatory data-[orientation=vertical]:h-full data-[orientation=vertical]:snap-y data-[orientation=vertical]:snap-mandatory",
	// Spacing is each slide's leading padding, taken back by the track's negative margin, so `basis-1/3` is exactly a
	// third. The track's vertical padding leaves room for the slides' shadows and lips.
	track: "flex data-[orientation=horizontal]:-ms-4 data-[orientation=horizontal]:pt-1 data-[orientation=horizontal]:pb-2 data-[orientation=vertical]:-mt-4 data-[orientation=vertical]:flex-col",
	item: "min-w-0 shrink-0 grow-0 basis-full data-[align=center]:snap-center data-[align=start]:snap-start data-[orientation=horizontal]:ps-4 data-[orientation=vertical]:pt-4",
	// Centred with auto margins, not translate: the buttons' press (pressable) sets translate, and would move them by
	// half their size while clicked.
	previous:
		"absolute rounded-pill data-[orientation=horizontal]:top-0 data-[orientation=horizontal]:bottom-[var(--carousel-below,0px)] data-[orientation=horizontal]:-left-12 data-[orientation=horizontal]:my-auto data-[orientation=vertical]:inset-x-0 data-[orientation=vertical]:-top-12 data-[orientation=vertical]:mx-auto data-[orientation=vertical]:rotate-90",
	next: "absolute rounded-pill data-[orientation=horizontal]:top-0 data-[orientation=horizontal]:bottom-[var(--carousel-below,0px)] data-[orientation=horizontal]:-right-12 data-[orientation=horizontal]:my-auto data-[orientation=vertical]:inset-x-0 data-[orientation=vertical]:-bottom-12 data-[orientation=vertical]:mx-auto data-[orientation=vertical]:rotate-90",
	dots: "mt-3 flex items-center justify-center",
	// The button is a 24px target (WCAG 2.5.8); the pill is drawn inside it.
	dot: "flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-pill outline-none focus-visible:focus-ring before:h-2 before:w-2 before:rounded-pill before:bg-muted-foreground/35 before:transition-[width,background-color] before:duration-base before:ease-out hover:before:bg-muted-foreground/60 aria-[current=true]:before:w-5 aria-[current=true]:before:bg-primary",
	autoplay: "absolute end-2 top-2 z-10",
};
