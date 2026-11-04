import { cva, type VariantProps } from "class-variance-authority";

/*
 * default: segmented, the active tab raised on the list's well (Iwa: an ink fill over an underlined bar).
 * underline: the active tab underlined in the primary, on a bottom border. pills: no well, the active tab filled with
 * the primary. underline and pills drop the well's padding, so every tab is a full control height.
 */
export const tabsListVariants = cva(
	"inline-flex w-fit items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
	{
		variants: {
			variant: {
				default: "gap-0.5 rounded-control border-b-(length:--border-width) border-track-border bg-tabs-list p-(--tabs-list-padding)",
				underline: "gap-1 border-b-(length:--border-width) border-border [--tabs-list-padding:0px] data-[orientation=vertical]:border-s-(length:--border-width) data-[orientation=vertical]:border-b-0",
				pills: "gap-1 [--tabs-list-padding:0px]",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export const tabsTriggerVariants = cva(
	"inline-flex cursor-pointer items-center justify-center gap-1.5 font-control font-control-weight tracking-control whitespace-nowrap text-muted-foreground case-control outline-none transition-[color,background-color,border-color,box-shadow] duration-fast ease-out hover:text-foreground focus-visible:focus-ring ui-disabled:pointer-events-none ui-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "rounded-[calc(var(--control-radius)*0.8)] ui-active:bg-tab-active ui-active:text-tab-active-foreground ui-active:shadow-tab",
				underline:
					"-mb-(--border-width) rounded-none border-b-2 border-transparent ui-active:border-primary ui-active:text-foreground data-[orientation=vertical]:-ms-(--border-width) data-[orientation=vertical]:mb-0 data-[orientation=vertical]:justify-start data-[orientation=vertical]:border-s-2 data-[orientation=vertical]:border-b-0",
				pills: "rounded-pill ui-active:bg-primary ui-active:text-primary-foreground",
			},
			size: {
				sm: "h-[calc(var(--control-sm)-var(--tabs-list-padding)*2)] px-2.5 text-control-sm",
				default: "h-[calc(var(--control-md)-var(--tabs-list-padding)*2)] px-3 text-control",
				lg: "h-[calc(var(--control-lg)-var(--tabs-list-padding)*2)] px-4 text-control-lg",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	},
);

export type TabsVariantProps = VariantProps<typeof tabsTriggerVariants>;

export const tabsStyles = {
	root: "flex flex-col gap-3 data-[orientation=vertical]:flex-row",
	panel: "rounded-control outline-none focus-visible:focus-ring",
};
