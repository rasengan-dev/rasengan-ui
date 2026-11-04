/* Links in the muted ink, the current page in the foreground: the path recedes, the page stands out. */
export const breadcrumbStyles = {
	list: "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
	item: "inline-flex items-center gap-1.5",
	link: "rounded-sm outline-none transition-colors duration-fast hover:text-foreground focus-visible:focus-ring",
	page: "font-medium text-foreground",
	separator: "[&>svg]:size-3.5",
	ellipsis: "flex size-5 items-center justify-center [&>svg]:size-4",
};
