export const avatarStyles = {
	root: "relative inline-flex size-10 shrink-0 overflow-hidden rounded-pill bg-muted align-middle select-none data-[size=lg]:size-13 data-[size=sm]:size-8",
	image: "size-full object-cover",
	fallback:
		"flex size-full items-center justify-center bg-muted font-control text-sm font-semibold text-foreground group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs",
	group: "flex -space-x-2.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
	count: "relative inline-flex size-10 shrink-0 items-center justify-center rounded-pill bg-muted font-control text-sm font-semibold text-muted-foreground ring-2 ring-background",
};
