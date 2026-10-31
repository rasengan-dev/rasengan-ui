/*
 * Base UI's Autocomplete, inline: the list is always shown under the field, no popup of its own. Items are highlighted
 * as the arrow keys move, in the village's highlight colour.
 */
export const commandStyles = {
	root: "flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground",
	inputWrapper: "flex items-center gap-2.5 border-b-(length:--border-width) border-border px-4 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted-foreground",
	input: "h-12 w-full min-w-0 bg-transparent font-sans text-base text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
	list: "max-h-[min(24rem,60vh)] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-[empty]:p-0",
	empty: "px-3 py-8 text-center text-sm text-muted-foreground empty:hidden",
	group: "not-first:mt-1",
	groupLabel: "px-2.5 pt-2 pb-1 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase",
	item: "relative flex min-h-control-sm cursor-default items-center gap-2 rounded-[calc(var(--control-radius)*0.75)] px-2.5 py-1.5 text-sm outline-none select-none ui-highlighted:bg-highlight ui-highlighted:text-highlight-foreground ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	separator: "-mx-1.5 my-1 h-(--border-width) bg-border",
	shortcut: "ms-auto in-data-[highlighted]:border-transparent in-data-[highlighted]:bg-highlight-foreground/15 in-data-[highlighted]:text-current",
	dialog: "top-[12vh] translate-y-0 gap-0 overflow-hidden p-0",
};
