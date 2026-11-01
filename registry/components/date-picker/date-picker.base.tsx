"use client";

import * as React from "react";
import { format as formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange, Locale, Matcher } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, type InputGroupVariantProps } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { selectTriggerVariants, type SelectTriggerVariantProps } from "@/components/ui/select";
import { TimeInput } from "@/components/ui/time-picker";
import { useFieldLook } from "@/lib/field-context";
import { cn } from "@/lib/utils";
import { datePickerStyles } from "./date-picker.styles";

export type { DateRange } from "react-day-picker";

/** A value the component holds itself unless `value` is given (`null` is "no date"). */
function useControlled<T>(value: T | null | undefined, defaultValue: T | null | undefined, onChange?: (value: T | null) => void) {
	const [inner, setInner] = React.useState<T | null>(defaultValue ?? null);
	const controlled = value !== undefined;
	const current = controlled ? value : inner;
	const set = (next: T | null) => {
		if (!controlled) setInner(next);
		onChange?.(next);
	};
	return [current, set] as const;
}

/** What the calendar inside a picker takes, beside the selection. */
export interface PickerCalendarProps {
	/** Days that can't be picked: dates, ranges, `{ before }`, `{ dayOfWeek }`… */
	disabledDays?: Matcher | Matcher[];
	/** `"dropdown"` adds month and year selects, for dates of birth. */
	captionLayout?: CalendarProps["captionLayout"];
	startMonth?: Date;
	endMonth?: Date;
	locale?: Partial<Locale>;
	timeZone?: string;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	showWeekNumber?: boolean;
}

interface TriggerProps extends SelectTriggerVariantProps {
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	name?: string;
	className?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
	align?: "start" | "center" | "end";
}

const isoDay = (date: Date) => formatDate(date, "yyyy-MM-dd");

/**
 * The trigger every picker shares: Select's look, a calendar icon, the value or the placeholder. An `aria-label` is
 * followed by what the trigger shows, so its name holds its visible text ("Date, Jun 12, 2026").
 */
function PickerTrigger({ text, placeholder, className, variant, size, "aria-label": label, ...props }: Omit<TriggerProps, "align" | "name"> & { text?: string }) {
	const look = useFieldLook({ variant, size });
	return (
		<PopoverTrigger
			data-slot="date-picker-trigger"
			aria-label={label ? `${label}, ${text ?? placeholder}` : undefined}
			data-variant={look.variant ?? "default"}
			data-size={look.size ?? "default"}
			className={cn(selectTriggerVariants(look), datePickerStyles.trigger, className)}
			{...props}
		>
			<CalendarIcon aria-hidden="true" className={datePickerStyles.icon} />
			<span data-placeholder={text ? undefined : ""} className={datePickerStyles.value}>
				{text ?? placeholder}
			</span>
		</PopoverTrigger>
	);
}

function Presets<T>({ presets, onPick }: { presets: { label: string; value: T }[]; onPick: (value: T) => void }) {
	return (
		<div data-slot="date-picker-presets" role="group" aria-label="Presets" className={datePickerStyles.presets}>
			{presets.map((preset) => (
				<Button key={preset.label} variant="ghost" size="sm" className={datePickerStyles.preset} onClick={() => onPick(preset.value)}>
					{preset.label}
				</Button>
			))}
		</div>
	);
}

export interface DatePickerProps extends TriggerProps, PickerCalendarProps {
	value?: Date | null;
	defaultValue?: Date | null;
	onValueChange?: (date: Date | null) => void;
	/** A date-fns pattern for the trigger. */
	format?: string;
	/** Dates offered beside the calendar ("Today", "In a week"…). */
	presets?: { label: string; value: Date }[];
}

/** A day picked from a calendar in a popover. Picking closes it; `name` submits the day as `yyyy-MM-dd`. */
export function DatePicker({
	value,
	defaultValue,
	onValueChange,
	format = "PPP",
	presets,
	placeholder = "Pick a date",
	align = "start",
	name,
	disabledDays,
	captionLayout,
	startMonth,
	endMonth,
	locale,
	timeZone,
	weekStartsOn,
	showWeekNumber,
	...trigger
}: DatePickerProps) {
	const [date, setDate] = useControlled(value, defaultValue, onValueChange);
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date>(date ?? new Date());
	const pick = (next: Date | null) => {
		setDate(next);
		if (next) {
			setMonth(next);
			setOpen(false);
		}
	};
	return (
		<Popover
			open={open}
			onOpenChange={(next) => {
				if (next) setMonth(date ?? new Date());
				setOpen(next);
			}}
		>
			<PickerTrigger text={date ? formatDate(date, format, { locale: locale as Locale }) : undefined} placeholder={placeholder} {...trigger} />
			<PopoverContent align={align} className={datePickerStyles.popup}>
				{presets && <Presets presets={presets} onPick={pick} />}
				<Calendar
					mode="single"
					selected={date ?? undefined}
					onSelect={(next) => pick(next ?? null)}
					month={month}
					onMonthChange={setMonth}
					autoFocus
					disabled={disabledDays}
					captionLayout={captionLayout}
					startMonth={startMonth}
					endMonth={endMonth}
					locale={locale}
					timeZone={timeZone}
					weekStartsOn={weekStartsOn}
					showWeekNumber={showWeekNumber}
				/>
			</PopoverContent>
			{name && <input type="hidden" name={name} value={date ? isoDay(date) : ""} />}
		</Popover>
	);
}

export interface DateRangePickerProps extends TriggerProps, PickerCalendarProps {
	value?: DateRange | null;
	defaultValue?: DateRange | null;
	onValueChange?: (range: DateRange | null) => void;
	format?: string;
	presets?: { label: string; value: DateRange }[];
	/** Months shown side by side (one on phones). */
	numberOfMonths?: number;
}

/** A range picked over two months. The popover stays open to adjust either end; `name` submits `yyyy-MM-dd/yyyy-MM-dd`. */
export function DateRangePicker({
	value,
	defaultValue,
	onValueChange,
	format = "LLL d, y",
	presets,
	numberOfMonths = 2,
	placeholder = "Pick a range",
	align = "start",
	name,
	disabledDays,
	captionLayout,
	startMonth,
	endMonth,
	locale,
	timeZone,
	weekStartsOn,
	showWeekNumber,
	...trigger
}: DateRangePickerProps) {
	const [range, setRange] = useControlled(value, defaultValue, onValueChange);
	const [month, setMonth] = React.useState<Date>(range?.from ?? new Date());
	const show = (date: Date) => formatDate(date, format, { locale: locale as Locale });
	const text = range?.from ? (range.to ? `${show(range.from)} – ${show(range.to)}` : show(range.from)) : undefined;
	return (
		<Popover onOpenChange={(open) => open && setMonth(range?.from ?? new Date())}>
			<PickerTrigger text={text} placeholder={placeholder} {...trigger} />
			<PopoverContent align={align} className={datePickerStyles.popup}>
				{presets && (
					<Presets
						presets={presets}
						onPick={(next) => {
							setRange(next);
							if (next.from) setMonth(next.from);
						}}
					/>
				)}
				<Calendar
					mode="range"
					selected={range ?? undefined}
					onSelect={(next) => setRange(next ?? null)}
					numberOfMonths={numberOfMonths}
					month={month}
					onMonthChange={setMonth}
					autoFocus
					disabled={disabledDays}
					captionLayout={captionLayout}
					startMonth={startMonth}
					endMonth={endMonth}
					locale={locale}
					timeZone={timeZone}
					weekStartsOn={weekStartsOn}
					showWeekNumber={showWeekNumber}
				/>
			</PopoverContent>
			{name && <input type="hidden" name={name} value={range?.from ? `${isoDay(range.from)}/${range.to ? isoDay(range.to) : ""}` : ""} />}
		</Popover>
	);
}

/** The typed text as a day: the given pattern first, then ISO, then what the browser reads ("June 12 2026"). */
export function parseDate(text: string, pattern = "P", locale?: Partial<Locale>): Date | null {
	const value = text.trim();
	if (!value) return null;
	for (const candidate of [pattern, "yyyy-MM-dd", "PP", "PPP"]) {
		const parsed = parse(value, candidate, new Date(), { locale: locale as Locale });
		if (isValid(parsed)) return parsed;
	}
	const loose = new Date(value);
	return isValid(loose) && !/^\d{4}-\d{2}-\d{2}$/.test(value) ? loose : null;
}

export interface DateInputProps extends PickerCalendarProps, InputGroupVariantProps {
	value?: Date | null;
	defaultValue?: Date | null;
	onValueChange?: (date: Date | null) => void;
	/** A date-fns pattern: what the field shows, and what it reads first. */
	format?: string;
	placeholder?: string;
	disabled?: boolean;
	id?: string;
	name?: string;
	className?: string;
	"aria-label"?: string;
}

/**
 * A day typed in a field, read on blur or Enter, with a calendar beside it (the button, or Arrow Down in the field).
 * Text it can't read marks the field invalid and keeps the last good day.
 */
export function DateInput({
	value,
	defaultValue,
	onValueChange,
	format = "P",
	placeholder,
	disabled,
	id,
	name,
	className,
	variant,
	size,
	"aria-label": label,
	disabledDays,
	captionLayout,
	startMonth,
	endMonth,
	locale,
	timeZone,
	weekStartsOn,
	showWeekNumber,
}: DateInputProps) {
	const [date, setDate] = useControlled(value, defaultValue, onValueChange);
	const show = React.useCallback((day: Date) => formatDate(day, format, { locale: locale as Locale }), [format, locale]);
	const [text, setText] = React.useState(date ? show(date) : "");
	const [invalid, setInvalid] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date>(date ?? new Date());
	const time = date?.getTime();

	// A new day from outside (a pick in the calendar, a controlled value) rewrites the text.
	React.useEffect(() => {
		setText(time === undefined ? "" : show(new Date(time)));
		setInvalid(false);
	}, [time, show]);

	const commit = () => {
		if (!text.trim()) {
			setInvalid(false);
			if (date) setDate(null);
			return;
		}
		const parsed = parseDate(text, format, locale);
		if (!parsed) return setInvalid(true);
		setInvalid(false);
		setText(show(parsed));
		setMonth(parsed);
		if (parsed.getTime() !== time) setDate(parsed);
	};

	return (
		<Popover
			open={open}
			onOpenChange={(next) => {
				if (next) setMonth(date ?? new Date());
				setOpen(next);
			}}
		>
			<InputGroup variant={variant} size={size} className={className}>
				<InputGroupInput
					data-slot="date-input"
					id={id}
					aria-label={label}
					aria-invalid={invalid || undefined}
					value={text}
					placeholder={placeholder ?? show(new Date(2026, 0, 31))}
					disabled={disabled}
					onChange={(event) => setText(event.target.value)}
					onBlur={commit}
					onKeyDown={(event) => {
						if (event.key === "Enter") commit();
						if (event.key === "ArrowDown") {
							event.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<InputGroupAddon align="inline-end">
					<PopoverTrigger render={<InputGroupButton size="icon-xs" aria-label="Choose a date" disabled={disabled} />}>
						<CalendarIcon />
					</PopoverTrigger>
				</InputGroupAddon>
			</InputGroup>
			<PopoverContent align="end" className={datePickerStyles.popup}>
				<Calendar
					mode="single"
					selected={date ?? undefined}
					onSelect={(next) => {
						setDate(next ?? null);
						setOpen(false);
					}}
					month={month}
					onMonthChange={setMonth}
					autoFocus
					disabled={disabledDays}
					captionLayout={captionLayout}
					startMonth={startMonth}
					endMonth={endMonth}
					locale={locale}
					timeZone={timeZone}
					weekStartsOn={weekStartsOn}
					showWeekNumber={showWeekNumber}
				/>
			</PopoverContent>
			{name && <input type="hidden" name={name} value={date ? isoDay(date) : ""} />}
		</Popover>
	);
}

export interface DateTimePickerProps extends Omit<DatePickerProps, "value" | "defaultValue" | "onValueChange" | "presets" | "aria-label" | "aria-labelledby"> {
	value?: Date | null;
	defaultValue?: Date | null;
	onValueChange?: (date: Date | null) => void;
	/** Seconds between two values of the time; under 60 shows the seconds. */
	step?: number;
	/** The group's name for screen readers (or `aria-labelledby`). */
	"aria-label"?: string;
	"aria-labelledby"?: string;
	dateLabel?: string;
	timeLabel?: string;
}

/**
 * A day and a time, as one Date: a DatePicker and a TimeInput side by side. A time typed before the day is kept for it.
 * `name` submits `yyyy-MM-ddTHH:mm:ss`.
 */
export function DateTimePicker({
	value,
	defaultValue,
	onValueChange,
	step,
	name,
	className,
	dateLabel = "Date",
	timeLabel = "Time",
	"aria-label": label,
	"aria-labelledby": labelledBy,
	variant,
	size,
	disabled,
	...picker
}: DateTimePickerProps) {
	const [date, setDate] = useControlled(value, defaultValue, onValueChange);
	const timeFormat = step !== undefined && step < 60 ? "HH:mm:ss" : "HH:mm";
	const [pending, setPending] = React.useState(date ? formatDate(date, timeFormat) : "");

	const withTime = (day: Date, time: string) => {
		const [hours = 0, minutes = 0, seconds = 0] = time ? time.split(":").map(Number) : [];
		const next = new Date(day);
		next.setHours(hours, minutes, seconds, 0);
		return next;
	};

	return (
		<div role="group" aria-label={label} aria-labelledby={labelledBy} data-slot="date-time-picker" className={cn(datePickerStyles.dateTime, className)}>
			<DatePicker
				{...picker}
				aria-label={dateLabel}
				variant={variant}
				size={size}
				disabled={disabled}
				value={date}
				onValueChange={(day) => setDate(day ? withTime(day, date ? formatDate(date, timeFormat) : pending) : null)}
			/>
			<TimeInput
				aria-label={timeLabel}
				step={step}
				variant={variant}
				size={size}
				disabled={disabled}
				groupClassName={datePickerStyles.time}
				value={date ? formatDate(date, timeFormat) : pending}
				onChange={(event) => {
					const time = event.target.value;
					setPending(time);
					if (date && time) setDate(withTime(date, time));
				}}
			/>
			{name && <input type="hidden" name={name} value={date ? formatDate(date, "yyyy-MM-dd'T'HH:mm:ss") : ""} />}
		</div>
	);
}
