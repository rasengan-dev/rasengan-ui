export const sliderStyles = {
	root: "relative w-full touch-none select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto ui-disabled:opacity-50",
	control: "flex w-full touch-none items-center py-2 select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
	track: "relative grow overflow-visible rounded-pill border-village border-track-border bg-muted select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
	indicator: "rounded-pill bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
	thumb: "block size-[1.125rem] shrink-0 cursor-grab rounded-pill border-2 border-primary bg-background shadow-thumb transition-[outline-color,scale] duration-fast ease-out select-none has-[:focus-visible]:focus-ring data-[dragging]:cursor-grabbing data-[dragging]:scale-110 ui-disabled:pointer-events-none",
};
