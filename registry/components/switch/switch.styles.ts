/* The thumb travels the track's inner width, whatever the village's border: --switch-w minus the thumb, padding and borders. */
export const switchStyles = {
	root: "peer inline-flex h-[1.375rem] w-(--switch-w) shrink-0 cursor-pointer items-center rounded-pill border-village border-track-border bg-switch-track p-0.5 outline-none transition-[background-color] duration-base ease-out [--switch-w:2.375rem] focus-visible:focus-ring ui-checked:bg-primary ui-disabled:cursor-not-allowed ui-disabled:opacity-50",
	thumb: "pointer-events-none block size-4 rounded-pill bg-switch-thumb shadow-sm transition-[translate,background-color] duration-base ease-out ui-checked:translate-x-[calc(var(--switch-w)_-_1rem_-_0.25rem_-_var(--border-width)_*_2)] ui-checked:bg-primary-foreground",
};
