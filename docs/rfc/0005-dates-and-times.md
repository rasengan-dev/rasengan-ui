# RFC-0005: Rasengan UI — dates and times

- Status: Accepted. Built and live since 2026-11-04; open questions in the [roadmap](../roadmap.md)
- Author: Dilane Kombou
- Created: 2026-11-01
- Builds on: RFC-0002 (components, villages, quality gate), RFC-0004 ("Later": Calendar, Date Picker)
- Package(s): `registry/components` (`calendar`, `date-picker`, `time-picker`), `apps/site`

## Summary

Three components cover every date and time form shadcn/ui documents, and the time forms it leaves to a bare
`<input type="time">`:

| Component | Parts | Forms |
| --- | --- | --- |
| `calendar` | `Calendar` | One day, several days, a range; one or more months; month and year dropdowns; week numbers; disabled and booked days; three cell sizes; locales and time zones |
| `date-picker` | `DatePicker`, `DateRangePicker`, `DateInput`, `DateTimePicker` | A trigger that opens a calendar, with presets; a range over two months; a date of birth (dropdowns); a typed date with a calendar beside it; a date and a time together |
| `time-picker` | `TimeInput`, `TimePicker` | A typed time (hours, minutes, seconds); a time picked from slots between two hours, in 12 or 24 hours |

A natural-language date ("next friday at 3pm") and a booking calendar with time slots are examples, built from these.

## Inventory (ui.shadcn.com, November 2026)

| shadcn | Rasengan UI |
| --- | --- |
| Calendar: basic, range, month and year selector, week numbers, booked dates, custom cell size | `Calendar`: `mode`, `numberOfMonths`, `captionLayout`, `showWeekNumber`, `disabled` / `modifiers`, `size` |
| Calendar: selected date with time zone | `Calendar` and the pickers pass `timeZone` through |
| Calendar: Persian, Hijri, Jalali | Not in this RFC: DayPicker 10 moved them to `@daypicker/*` add-on packages |
| Calendar and Date Picker: presets | `DatePicker` / `DateRangePicker` `presets` |
| Date Picker: basic | `DatePicker` |
| Date Picker: range | `DateRangePicker` |
| Date Picker: date of birth | `DatePicker captionLayout="dropdown"` |
| Date Picker: input | `DateInput` |
| Calendar and Date Picker: date and time | `DateTimePicker` (a `DatePicker` and a `TimeInput`) |
| Date Picker: natural language (chrono-node) | An example, `date-picker-natural-language` |
| Date Picker: RTL | `dir="rtl"`: the chevrons turn |
| (none) | `TimeInput`, `TimePicker`, and a booking example with slots |

## Decisions

| Topic | Decision |
|---|---|
| Engine | `react-day-picker` 10 and `date-fns` 4, as shadcn: its API (`mode`, `selected`, `onSelect`, `captionLayout`…) is what projects already write, and it meets WCAG 2.1 AA. Base UI has no calendar |
| Package name | `react-day-picker`, not the new `@daypicker/react`, so shadcn code keeps its imports |
| Styling | Only contract tokens: selected days in the primary, the range between in the accent, today ringed, the village's control radius and heights (the cell size is `--control-sm` by default) |
| Pickers | Ready components, not only a composition recipe as in shadcn: the trigger is Select's (variants, sizes, Field look), the popup is Popover's |
| Values | `Date` for days (`DateRange` for ranges), `"HH:mm"` or `"HH:mm:ss"` strings for times, as `<input type="time">` |
| Time input | A styled native `<input type="time">`: every browser gives it keyboard entry, a locale-aware format and a native picker on phones. A segmented field of our own would re-create that, with more to get wrong |
| Time slots | `TimePicker` is a Select of slots (`interval`, `min`, `max`, `hourCycle`), formatted with `Intl` |
| Dependencies | `react-day-picker`, `date-fns` for the calendar and the date pickers; `chrono-node` only in the natural-language example |

## Rollout

1. `calendar`, with its demos and page.
2. `date-picker` and `time-picker`, with the natural-language and booking examples.
3. Quality gate: the three villages, light and dark; keyboard (arrow keys in the grid, Page Up/Down for months); axe with the popups open; screenshots.

## Open questions

1. Persian, Hijri and other calendars: a `calendar` prop taking an `@daypicker/*` DayPicker, or separate items?
2. A segmented time field (hours, minutes as spin buttons) for designs that cannot use the native input?
