"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { type BlockProps, heading } from "@/lib/blocks";
import type { OpeningHours } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HoursWeekContent } from "./schema";

type Day = OpeningHours["days"][number]["day"];
const week: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

/** "18:30" in the locale's way (6:30 PM, 18:30), the same on the server and in the browser. */
function timeFormatter(locale?: string) {
	const format = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
	return (time: string) => format.format(new Date(Date.UTC(2024, 0, 1, Number(time.slice(0, 2)), Number(time.slice(3, 5)))));
}

/** Monday's name and the others', from 1 January 2024, a Monday. */
function dayNames(locale?: string) {
	const format = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" });
	return Object.fromEntries(week.map((day, i) => [day, format.format(new Date(Date.UTC(2024, 0, 1 + i)))])) as Record<Day, string>;
}

/** The day and the minute of the day, now, in the business's time zone. */
function nowIn(timeZone: string): { day: Day; minute: number } {
	const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
	return { day: get("weekday").toLowerCase() as Day, minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** Open at this minute: in one of today's slots, or still in yesterday's when it closes after midnight. */
function isOpen(hours: OpeningHours, day: Day, minute: number) {
	const slots = (d: Day) => hours.days.find((entry) => entry.day === d)?.slots ?? [];
	const yesterday = week[(week.indexOf(day) + 6) % 7];
	const today = slots(day).some(({ open, close }) => {
		const [from, to] = [minutes(open), minutes(close)];
		return to > from ? minute >= from && minute < to : minute >= from;
	});
	const overnight = slots(yesterday).some(({ open, close }) => minutes(close) <= minutes(open) && minute < minutes(close));
	return today || overnight;
}

/**
 * The week, one row per day (Monday first), with its slots or "Closed". Day names and times follow the locale. Once
 * the page has read the clock, in the business's time zone rather than the visitor's, today's row is highlighted and
 * a badge says whether it is open now; before that (and on the server) the hours alone, so nothing changes on load.
 */
export function HoursWeek({ content = example, id = "hours", className, headingLevel = 2 }: BlockProps<HoursWeekContent>) {
	const Heading = heading(headingLevel);
	const { hours, labels } = content;
	const names = useMemo(() => dayNames(content.locale), [content.locale]);
	const time = useMemo(() => timeFormatter(content.locale), [content.locale]);
	const [now, setNow] = useState<{ day: Day; minute: number } | null>(null);

	useEffect(() => {
		const tick = () => setNow(nowIn(content.timeZone));
		tick();
		const timer = setInterval(tick, 60_000);
		return () => clearInterval(timer);
	}, [content.timeZone]);

	const days = week.map((day) => hours.days.find((entry) => entry.day === day)).filter((entry) => entry !== undefined);
	const open = now && isOpen(hours, now.day, now.minute);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hours-week" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-xl">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{now && (
						<Badge variant="soft" tone={open ? "success" : "neutral"} size="lg">
							{open ? labels.openNow : labels.closedNow}
						</Badge>
					)}
				</div>
				<dl className="mt-8 flex flex-col">
					{days.map((entry) => {
						const today = now?.day === entry.day;
						return (
							<div
								key={entry.day}
								data-today={today || undefined}
								className="flex items-baseline justify-between gap-4 border-b-(length:--border-width) px-3 py-3 data-today:rounded-md data-today:border-transparent data-today:bg-muted"
							>
								<dt className={cn("flex items-center gap-2", today && "font-semibold")}>
									{names[entry.day]}
									{today && <span className="text-xs font-normal text-muted-foreground">{labels.today}</span>}
								</dt>
								<dd className={cn("text-end tabular-nums", entry.slots.length === 0 && "text-muted-foreground", today && "font-semibold")}>
									{entry.slots.length === 0
										? labels.closed
										: entry.slots.map((slot) => (
												<span key={slot.open} className="block">
													{time(slot.open)} – {time(slot.close)}
												</span>
											))}
								</dd>
							</div>
						);
					})}
				</dl>
				{hours.note && <p className="mt-4 text-sm text-muted-foreground">{hours.note}</p>}
			</div>
		</section>
	);
}
