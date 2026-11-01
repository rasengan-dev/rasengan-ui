/*
 * The trigger is Select's (its variants, sizes and the Field's look), the popup Popover's without its padding: the
 * calendar brings its own. Presets sit beside the calendar from sm, above it on phones.
 */
export const datePickerStyles = {
	trigger: "justify-start gap-2 text-start",
	icon: "text-muted-foreground",
	value: "flex-1 truncate data-[placeholder]:text-muted-foreground",
	popup: "w-auto max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0 sm:flex-row",
	presets:
		"flex gap-1 overflow-x-auto border-b-(length:--border-width) p-2 sm:w-40 sm:flex-col sm:overflow-visible sm:border-e-(length:--border-width) sm:border-b-0",
	preset: "shrink-0 justify-start font-normal",
	dateTime: "flex w-full gap-2",
	time: "w-36 shrink-0",
};
