export const tabsStyles = {
	root: "flex flex-col gap-3 data-[orientation=vertical]:flex-row",
	list: "inline-flex w-fit items-center gap-0.5 rounded-control border-b-(length:--border-width) border-track-border bg-tabs-list p-(--tabs-list-padding) data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
	tab: "inline-flex h-[calc(var(--control-md)-var(--tabs-list-padding)*2)] cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--control-radius)*0.8)] px-3 font-control text-control font-control-weight tracking-control whitespace-nowrap text-muted-foreground case-control outline-none transition-[color,background-color,box-shadow] duration-fast ease-out hover:text-foreground focus-visible:focus-ring ui-active:bg-tab-active ui-active:text-tab-active-foreground ui-active:shadow-tab ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	panel: "rounded-control outline-none focus-visible:focus-ring",
};
