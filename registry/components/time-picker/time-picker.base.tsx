"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput, type InputGroupVariantProps } from "@/components/ui/input-group";
import type { InputProps } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, type SelectTriggerVariantProps } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { timePickerStyles } from "./time-picker.styles";

export type TimeInputProps = Omit<InputProps, "type" | "size" | "variant"> &
	InputGroupVariantProps & {
		/** The group's class; `className` goes on the input. */
		groupClassName?: string;
	};

/**
 * A time typed in the field, as `"HH:mm"` (or `"HH:mm:ss"` with a `step` under 60 seconds). The browser shows it in the
 * locale's 12 or 24 hours. Takes the size and variant of the Field around it.
 */
export function TimeInput({ className, groupClassName, variant, size, step, ...props }: TimeInputProps) {
	return (
		<InputGroup variant={variant} size={size} className={groupClassName}>
			<InputGroupInput data-slot="time-input" type="time" step={step} className={cn(timePickerStyles.input, className)} {...props} />
			<InputGroupAddon>
				<ClockIcon aria-hidden="true" />
			</InputGroupAddon>
		</InputGroup>
	);
}

/** "09:30" → minutes since midnight. */
const toMinutes = (time: string) => {
	const [hours = 0, minutes = 0] = time.split(":").map(Number);
	return hours * 60 + minutes;
};

const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** The slots from `min` to `max`, every `interval` minutes, labelled in the locale's (or the given) hour cycle. */
export function timeSlots({ min = "00:00", max = "23:59", interval = 30, locale, hourCycle }: { min?: string; max?: string; interval?: number; locale?: string; hourCycle?: 12 | 24 }) {
	const format = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", ...(hourCycle ? { hourCycle: hourCycle === 12 ? "h12" : "h23" } : {}) });
	const slots: { value: string; label: string }[] = [];
	for (let minutes = toMinutes(min); minutes <= toMinutes(max); minutes += interval) {
		slots.push({ value: toTime(minutes), label: format.format(new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60)) });
	}
	return slots;
}

export type TimePickerProps = SelectTriggerVariantProps & {
	value?: string | null;
	defaultValue?: string | null;
	onValueChange?: (value: string | null) => void;
	/** The first slot, `"HH:mm"`. */
	min?: string;
	/** The last slot, `"HH:mm"`. */
	max?: string;
	/** Minutes between two slots. */
	interval?: number;
	/** 12 or 24 hours; the locale's by default. */
	hourCycle?: 12 | 24;
	locale?: string;
	placeholder?: string;
	disabled?: boolean;
	name?: string;
	id?: string;
	className?: string;
	"aria-label"?: string;
};

/** A time picked from slots, as `"HH:mm"`: a Select, so it takes the Field's size and variant and its keyboard. */
export function TimePicker({
	value,
	defaultValue,
	onValueChange,
	min,
	max,
	interval,
	hourCycle,
	locale,
	placeholder = "Pick a time",
	disabled,
	name,
	id,
	className,
	variant,
	size,
	"aria-label": label,
}: TimePickerProps) {
	const slots = React.useMemo(() => timeSlots({ min, max, interval, locale, hourCycle }), [min, max, interval, locale, hourCycle]);
	const items = React.useMemo(() => Object.fromEntries(slots.map((slot) => [slot.value, slot.label])), [slots]);
	return (
		<Select items={items} value={value} defaultValue={defaultValue} onValueChange={(next) => onValueChange?.(next as string | null)} disabled={disabled} name={name}>
			<SelectTrigger id={id} aria-label={label} variant={variant} size={size} className={cn(timePickerStyles.trigger, className)}>
				<ClockIcon aria-hidden="true" className={timePickerStyles.icon} />
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className={timePickerStyles.slots} alignItemWithTrigger={false}>
				{slots.map((slot) => (
					<SelectItem key={slot.value} value={slot.value}>
						{slot.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
