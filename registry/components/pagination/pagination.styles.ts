/*
 * Links are buttons (buttonVariants): ghost, and outline for the current page. The size, set once on Pagination,
 * picks the matching square for the numbers and the matching height for Previous and Next.
 */
export const paginationStyles = {
	root: "mx-auto flex w-full justify-center",
	content: "flex flex-row items-center gap-1",
	link: "aria-disabled:pointer-events-none aria-disabled:opacity-50",
	previous: "gap-1 ps-2.5",
	next: "gap-1 pe-2.5",
	ellipsis: "flex items-center justify-center text-muted-foreground [&>svg]:size-4",
};

export const ellipsisSizes = { sm: "size-control-sm", default: "size-control", lg: "size-control-lg" } as const;
