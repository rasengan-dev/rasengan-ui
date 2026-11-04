/* Keyframes on ui-open / ui-closed: Base UI and Radix both wait for CSS animations (RFC-0002, "Engines"). */
const item =
	"group/menu-item relative flex min-h-control-sm cursor-default items-center gap-2 rounded-[calc(var(--control-radius)*0.75)] px-2.5 text-sm outline-none select-none ui-highlighted:bg-highlight ui-highlighted:text-highlight-foreground ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground ui-highlighted:[&_svg:not([class*='text-'])]:text-current";

export const dropdownMenuStyles = {
	positioner: "z-50 outline-none",
	popup:
		"max-h-(--available-height) min-w-48 origin-(--transform-origin) overflow-y-auto rounded-lg border-village bg-popover p-1 text-popover-foreground shadow-lg backdrop-blur-surface outline-none duration-fast ease-out ui-open:animate-in ui-open:fade-in-0 ui-open:zoom-in-95 ui-closed:animate-out ui-closed:fade-out-0 ui-closed:zoom-out-95",
	item: `${item} data-[inset]:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:ui-highlighted:bg-destructive/10 data-[variant=destructive]:ui-highlighted:text-destructive data-[variant=destructive]:[&_svg]:text-current!`,
	choiceItem: `${item} ps-8`,
	choiceIndicator: "pointer-events-none absolute start-2.5 flex size-4 items-center justify-center",
	radioDot: "size-2 rounded-pill bg-current",
	label: "px-2.5 pt-2 pb-1 font-mono text-[0.6875rem] tracking-wider text-muted-foreground uppercase data-[inset]:ps-8",
	separator: "-mx-1 my-1 h-(--border-width) bg-border",
	shortcut:
		"ms-auto font-mono text-xs tracking-wider text-muted-foreground group-data-[highlighted]/menu-item:text-current group-data-[highlighted]/menu-item:opacity-75",
	subTrigger: `${item} ui-open:bg-accent ui-open:text-accent-foreground data-[inset]:ps-8`,
	subIcon: "ms-auto",
};
