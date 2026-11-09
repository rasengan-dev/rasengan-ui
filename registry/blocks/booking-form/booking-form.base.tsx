"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label, labelStyles } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { timeSlots } from "@/components/ui/time-picker";
import { type BlockProps, formatMoney, heading, messageUrl } from "@/lib/blocks";
import type { OpeningHours } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { BookingFormContent } from "./schema";

/** What the visitor filled in; `date` as `yyyy-MM-dd`, `time` as `HH:mm`. */
export interface BookingValues {
	name: string;
	date: string;
	time: string;
	party?: string;
	service?: string;
	note?: string;
}

export interface BookingFormProps extends BlockProps<BookingFormContent> {
	/** Post the form to this URL (fields `name`, `date`, `time`, `party`, `service`, `note`) instead of opening a message. */
	action?: string;
	/** Take the values in code instead of opening a message. */
	onSubmit?: (values: BookingValues) => void;
}

type Day = OpeningHours["days"][number]["day"];
const jsDays: Day[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const pad = (n: number) => String(n).padStart(2, "0");
const isoDay = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const clock = (total: number) => `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;

/** The times offered on a day: every `interval` minutes inside each slot, the last one `interval` before closing. */
function slotsFor(hours: OpeningHours, day: Day, interval: number, locale?: string) {
	const slots = hours.days.find((entry) => entry.day === day)?.slots ?? [];
	return slots.flatMap(({ open, close }) => {
		const end = (minutes(close) <= minutes(open) ? 24 * 60 : minutes(close)) - interval;
		return end < minutes(open) ? [] : timeSlots({ min: open, max: clock(end), interval, locale });
	});
}

/**
 * A booking request: a name, a day from a calendar (closed days and past days disabled), a time inside that day's
 * opening hours, and a party size or a service, beside an optional photo. By default, sending opens the business's
 * WhatsApp, texts or mail with the request written for the visitor to send (RFC-0009, no backend); `action`
 * posts the form instead, `onSubmit` hands the values to code. It knows opening hours, not bookings: the business
 * confirms by reply.
 */
export function BookingForm({ content = example, id = "booking", className, headingLevel = 2, action, onSubmit }: BookingFormProps) {
	const Heading = heading(headingLevel);
	const { fields, labels, locale } = content;
	const interval = content.interval ?? 30;
	const [date, setDate] = useState<Date | null>(null);
	const [time, setTime] = useState<string | null>(null);
	const [party, setParty] = useState<string | null>(fields.party ? "2" : null);
	const [service, setService] = useState<string | null>(null);
	const [missing, setMissing] = useState<Set<string>>(new Set());
	const [sent, setSent] = useState(false);

	const slots = useMemo(() => (date ? slotsFor(content.hours, jsDays[date.getDay()], interval, locale) : []), [date, content.hours, interval, locale]);
	const disabledDays = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const last = new Date(today);
		last.setDate(last.getDate() + (content.daysAhead ?? 60));
		const closed = jsDays.map((day, index) => (slotsFor(content.hours, day, interval).length === 0 ? index : -1)).filter((index) => index >= 0);
		return [{ before: today }, { after: last }, { dayOfWeek: closed }];
	}, [content.hours, content.daysAhead, interval]);
	const partyItems = useMemo(
		() => (fields.party ? Object.fromEntries(Array.from({ length: fields.party.max }, (_, i) => [String(i + 1), String(i + 1)])) : {}),
		[fields.party],
	);

	function submit(event: FormEvent<HTMLFormElement>) {
		const form = new FormData(event.currentTarget);
		const name = String(form.get("name") ?? "").trim();
		const note = String(form.get("note") ?? "").trim();
		const empty = new Set(
			[!name && "name", !date && "date", !time && "time", fields.services && !service && "service"].filter((key): key is string => Boolean(key)),
		);
		setMissing(empty);
		if (empty.size > 0 || !date || !time) return event.preventDefault();
		if (action) return;
		event.preventDefault();
		const values: BookingValues = { name, date: isoDay(date), time, party: party ?? undefined, service: service ?? undefined, note: note || undefined };
		if (onSubmit) return onSubmit(values);

		const timeLabel = slots.find((slot) => slot.value === time)?.label ?? time;
		const details = [
			`${fields.name.label}: ${name}`,
			`${fields.date.label}: ${new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(date)}`,
			`${fields.time.label}: ${timeLabel}`,
			fields.party && party && `${fields.party.label}: ${party}`,
			fields.services && service && `${fields.services.label}: ${service}`,
			fields.note && note && `${fields.note.label}: ${note}`,
		].filter((line): line is string => Boolean(line));
		const url = messageUrl(content.channel, [labels.intro, "", ...details].join("\n"), content.title);
		if (content.channel.kind === "whatsapp") window.open(url, "_blank", "noopener");
		else window.location.href = url;
		setSent(true);
	}

	const required = (key: string) => missing.has(key);
	/** A field filled after a failed send loses its error at once. */
	const filled = (key: string) => missing.has(key) && setMissing((current) => new Set([...current].filter((k) => k !== key)));
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="booking-form" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className={cn("mx-auto grid max-w-5xl gap-8", content.image && "@3xl:grid-cols-2 @3xl:gap-12")}>
				{content.image && (
					<img
						src={content.image.src}
						alt={content.image.alt}
						width={content.image.width}
						height={content.image.height}
						loading="lazy"
						className="aspect-[4/3] h-full w-full rounded-xl object-cover @3xl:aspect-auto"
					/>
				)}
				<div className={cn("flex flex-col gap-6", !content.image && "mx-auto w-full max-w-xl")}>
					<div className="flex flex-col gap-3">
						<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
							{content.title}
						</Heading>
						{content.subline && <p className="text-balance text-muted-foreground @2xl:text-lg">{content.subline}</p>}
					</div>
					<form noValidate action={action} method={action ? "post" : undefined} onSubmit={submit} className="flex flex-col gap-5">
						<Field invalid={required("name")}>
							<FieldLabel>{fields.name.label}</FieldLabel>
							<Input name="name" autoComplete="name" placeholder={fields.name.placeholder} required onChange={() => filled("name")} />
							{required("name") && <FieldError match>{labels.required}</FieldError>}
						</Field>
						<div className="grid gap-5 @md:grid-cols-2">
							<Field invalid={required("date")}>
								<span aria-hidden="true" className={labelStyles}>
									{fields.date.label}
								</span>
								<DatePicker
									name="date"
									value={date}
									onValueChange={(next) => {
										setDate(next);
										setTime(null);
										filled("date");
									}}
									disabledDays={disabledDays}
									placeholder={fields.date.placeholder ?? fields.date.label}
									aria-label={fields.date.label}
									className="w-full"
								/>
								{required("date") && <FieldError match>{labels.required}</FieldError>}
							</Field>
							<Field invalid={required("time")}>
								<FieldLabel>{fields.time.label}</FieldLabel>
								<Select
									name="time"
									items={Object.fromEntries(slots.map((slot) => [slot.value, slot.label]))}
									value={time}
									onValueChange={(next) => {
										setTime(next as string | null);
										filled("time");
									}}
									disabled={!date}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder={fields.time.placeholder ?? fields.time.label} />
									</SelectTrigger>
									<SelectContent alignItemWithTrigger={false} className="max-h-72">
										{slots.map((slot) => (
											<SelectItem key={slot.value} value={slot.value}>
												{slot.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{required("time") && <FieldError match>{labels.required}</FieldError>}
							</Field>
						</div>
						{fields.party && (
							<Field>
								<FieldLabel>{fields.party.label}</FieldLabel>
								<Select name="party" items={partyItems} value={party} onValueChange={(next) => setParty(next as string | null)}>
									<SelectTrigger className="w-full @md:w-40">
										<SelectValue />
									</SelectTrigger>
									<SelectContent alignItemWithTrigger={false} className="max-h-72">
										{Object.keys(partyItems).map((value) => (
											<SelectItem key={value} value={value}>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
						)}
						{fields.services && (
							<fieldset className="flex flex-col gap-2">
								<legend id={`${id}-service`} className="mb-2 text-sm font-medium">
									{fields.services.label}
								</legend>
								<RadioGroup name="service" value={service} onValueChange={(next) => {
										setService(next as string);
										filled("service");
									}} aria-labelledby={`${id}-service`} className="grid gap-2 @md:grid-cols-2">
									{fields.services.items.map((item) => (
										<Label
											key={item.name}
											className="items-start rounded-lg border-(length:--border-width) p-3 font-normal has-data-checked:border-primary has-data-checked:bg-muted"
										>
											<RadioGroupItem value={item.name} className="mt-0.5" />
											<span className="flex flex-1 flex-col gap-0.5">
												<span className="flex items-baseline justify-between gap-2 font-medium">
													{item.name}
													<span className="whitespace-nowrap tabular-nums">{formatMoney(item.price, locale)}</span>
												</span>
												{(item.description || item.duration) && (
													<span className="text-sm text-muted-foreground">
														{[item.description, item.duration && `${item.duration} ${content.minutes ?? "min"}`].filter(Boolean).join(" · ")}
													</span>
												)}
											</span>
										</Label>
									))}
								</RadioGroup>
								{required("service") && <p className="text-sm text-destructive">{labels.required}</p>}
							</fieldset>
						)}
						{fields.note && (
							<Field>
								<FieldLabel>{fields.note.label}</FieldLabel>
								<Textarea name="note" rows={3} placeholder={fields.note.placeholder} />
							</Field>
						)}
						<Button type="submit" size="lg" className="w-full @md:w-auto @md:self-start">
							{content.submit}
						</Button>
						<p role="status" className={cn("text-sm", sent ? "text-foreground" : "sr-only")}>
							{sent ? labels.sent : ""}
						</p>
						{content.smallPrint && <p className="text-sm text-muted-foreground">{content.smallPrint}</p>}
					</form>
				</div>
			</div>
		</section>
	);
}
