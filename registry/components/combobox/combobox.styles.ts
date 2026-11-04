/*
 * The input is an InputGroup (Input's variants and sizes, from the Field around it); the list is Select's, so the two
 * read as one family. Keyframes on ui-open / ui-closed: Base UI waits for CSS animations (RFC-0002, "Engines").
 */
export const comboboxStyles = {
	positioner: "z-50 outline-none",
	popup:
		"group/combobox-content relative w-(--anchor-width) max-w-(--available-width) min-w-48 origin-(--transform-origin) rounded-lg border-village bg-popover text-popover-foreground shadow-lg backdrop-blur-surface outline-none duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	list: "max-h-[min(calc(var(--available-height)-0.5rem),20rem)] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-[empty]:p-0",
	empty: "px-2.5 py-3 text-center text-sm text-muted-foreground empty:hidden",
	chips:
		"flex min-h-control w-full min-w-0 cursor-text flex-wrap items-center gap-1 rounded-control border-village border-input bg-input-bg px-1.5 py-1 shadow-input transition-[border-color,outline-color] duration-fast ease-out focus-within:border-primary focus-within:focus-ring has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-60",
	chip: "inline-flex h-6 max-w-full items-center gap-0.5 rounded-badge bg-secondary ps-2 pe-0.5 text-xs font-medium text-secondary-foreground outline-none ui-highlighted:bg-highlight ui-highlighted:text-highlight-foreground focus-within:bg-highlight focus-within:text-highlight-foreground",
	chipRemove:
		"flex size-5 cursor-pointer items-center justify-center rounded-[calc(var(--badge-radius)*0.75)] text-current opacity-70 outline-none hover:bg-foreground/10 hover:opacity-100 focus-visible:focus-ring [&_svg]:size-3",
	chipsInput: "h-6 min-w-16 flex-1 bg-transparent ps-1 text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm",
	addon: "gap-0.5",
};
