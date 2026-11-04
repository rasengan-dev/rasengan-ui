import { cva, type VariantProps } from "class-variance-authority";

/* The root sets the size; the fallback's initials follow it (group/avatar). */
export const avatarVariants = cva("group/avatar relative inline-flex shrink-0 overflow-hidden rounded-pill bg-muted align-middle select-none", {
	variants: {
		size: {
			sm: "size-8",
			default: "size-10",
			lg: "size-13",
			xl: "size-16",
		},
	},
	defaultVariants: { size: "default" },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export const avatarStyles = {
	image: "size-full object-cover",
	fallback:
		"flex size-full items-center justify-center bg-muted font-control text-sm font-semibold text-foreground group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs group-data-[size=xl]/avatar:text-lg",
	group: "flex -space-x-2.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
	count: "relative inline-flex size-10 shrink-0 items-center justify-center rounded-pill bg-muted font-control text-sm font-semibold text-muted-foreground ring-2 ring-background",
};
