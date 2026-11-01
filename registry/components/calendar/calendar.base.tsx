"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type DayButton, DayPicker, getDefaultClassNames, labelDayButton } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calendarStyles, calendarVariants, type CalendarVariantProps } from "./calendar.styles";

export { calendarVariants } from "./calendar.styles";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & CalendarVariantProps;

/**
 * React DayPicker in the village: `mode="single" | "multiple" | "range"`, `selected`, `onSelect` and every other DayPicker
 * prop (`captionLayout`, `numberOfMonths`, `disabled`, `locale`, `timeZone`…), plus `size`.
 */
export function Calendar({ className, classNames, size, showOutsideDays = true, captionLayout = "label", locale, formatters, labels, components, ...props }: CalendarProps) {
	const defaults = getDefaultClassNames();
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			captionLayout={captionLayout}
			locale={locale}
			className={cn(calendarVariants({ size }), className)}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
				...formatters,
			}}
			labels={{
				// "Friday, June 12, 2026", not "June 12th": a day's name holds the number it shows (WCAG 2.5.3).
				labelDayButton: (date, modifiers, options, dateLib) => labelDayButton(date, modifiers, options, dateLib).replace(/\b(\d{1,2})(st|nd|rd|th)\b/, "$1"),
				...labels,
			}}
			classNames={{
				root: cn("w-fit", defaults.root),
				months: cn(calendarStyles.months, defaults.months),
				month: cn(calendarStyles.month, defaults.month),
				nav: cn(calendarStyles.nav, defaults.nav),
				button_previous: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), calendarStyles.navButton, defaults.button_previous),
				button_next: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), calendarStyles.navButton, defaults.button_next),
				month_caption: cn(calendarStyles.monthCaption, defaults.month_caption),
				dropdowns: cn(calendarStyles.dropdowns, defaults.dropdowns),
				dropdown_root: cn(calendarStyles.dropdownRoot, defaults.dropdown_root),
				dropdown: cn(calendarStyles.dropdown, defaults.dropdown),
				caption_label: cn(captionLayout === "label" ? calendarStyles.captionLabel : calendarStyles.captionDropdownLabel, defaults.caption_label),
				month_grid: cn(calendarStyles.monthGrid, defaults.month_grid),
				weekdays: cn(calendarStyles.weekdays, defaults.weekdays),
				weekday: cn(calendarStyles.weekday, defaults.weekday),
				week: cn(calendarStyles.week, defaults.week),
				week_number_header: cn(calendarStyles.weekNumberHeader, defaults.week_number_header),
				week_number: cn(calendarStyles.weekNumber, defaults.week_number),
				day: cn(calendarStyles.day, defaults.day),
				range_start: cn(calendarStyles.rangeStart, defaults.range_start),
				range_middle: cn(calendarStyles.rangeMiddle, defaults.range_middle),
				range_end: cn(calendarStyles.rangeEnd, defaults.range_end),
				today: defaults.today,
				outside: cn(calendarStyles.outside, defaults.outside),
				disabled: cn(calendarStyles.disabled, defaults.disabled),
				hidden: cn(calendarStyles.hidden, defaults.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...rootProps }) => <div data-slot="calendar" ref={rootRef} className={className} {...rootProps} />,
				Chevron: ({ className, orientation, ...chevronProps }) => {
					const Icon = orientation === "left" ? ChevronLeftIcon : orientation === "right" ? ChevronRightIcon : ChevronDownIcon;
					return <Icon aria-hidden="true" className={cn(orientation === "left" || orientation === "right" ? calendarStyles.chevron : "size-3.5", className)} {...chevronProps} />;
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...cellProps }) => (
					<td {...cellProps}>
						<div className={calendarStyles.weekNumberCell}>{children}</div>
					</td>
				),
				...components,
			}}
			{...props}
		/>
	);
}

/** A day: the selection, the range ends and today as data attributes, styled by the village. */
export function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
	const ref = React.useRef<HTMLButtonElement>(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return (
		<button
			ref={ref}
			type="button"
			data-slot="calendar-day"
			data-day={day.date.toLocaleDateString()}
			data-today={modifiers.today || undefined}
			data-selected-single={(modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle) || undefined}
			data-range-start={modifiers.range_start || undefined}
			data-range-end={modifiers.range_end || undefined}
			data-range-middle={modifiers.range_middle || undefined}
			className={cn(calendarStyles.dayButton, className)}
			{...props}
		/>
	);
}
