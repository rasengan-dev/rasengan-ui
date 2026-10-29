/* Base UI measures the panel (--accordion-panel-height); a transition reads it. Radix will use its own variable. */
export const accordionStyles = {
	root: "flex w-full flex-col",
	item: "border-b-(length:--border-width) border-border last:border-b-0",
	header: "flex",
	trigger:
		"flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-control py-4 text-start font-control text-control font-control-weight tracking-control text-foreground case-control outline-none transition-[color] duration-fast hover:underline focus-visible:focus-ring ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:translate-y-0.5 [&_svg]:text-muted-foreground [&_svg]:transition-transform [&_svg]:duration-base data-[panel-open]:[&_svg]:rotate-180",
	panel: "h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground transition-[height] duration-base ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
	panelInner: "pb-4 leading-relaxed",
};
