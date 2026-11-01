/*
 * TimeInput is the native <input type="time"> in an InputGroup: the browser gives it keyboard entry segment by
 * segment, the locale's 12 or 24 hours and a native picker on phones. Its own clock button is hidden (the group shows
 * an icon), and color-scheme follows the dark class so the native picker matches.
 */
export const timePickerStyles = {
	input:
		"tabular-nums dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit-fields-wrapper]:p-0 [&::-webkit-datetime-edit]:p-0",
	trigger: "justify-start gap-2 [&>[data-slot=select-value]]:tabular-nums",
	icon: "text-muted-foreground",
	slots: "max-h-72",
};
