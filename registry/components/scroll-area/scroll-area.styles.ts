export const scrollAreaStyles = {
	root: "relative overflow-hidden",
	viewport: "size-full overscroll-contain rounded-[inherit] outline-none focus-visible:focus-ring",
	scrollbar:
		"flex touch-none p-px opacity-60 transition-opacity duration-base select-none hover:opacity-100 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[scrolling]:opacity-100",
	thumb: "relative flex-1 rounded-pill bg-border",
};
