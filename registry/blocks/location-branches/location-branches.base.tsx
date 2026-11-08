"use client";

import { MapPinIcon, NavigationIcon, PhoneIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import type { OpeningHours } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { LocationBranchesContent } from "./schema";

type Day = OpeningHours["days"][number]["day"];
const week: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const digits = (number: string) => number.replace(/[^0-9]/g, "");

/** "18:30" in the locale's way, the same on the server and in the browser. */
function timeFormatter(locale?: string) {
	const format = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
	return (time: string) => format.format(new Date(Date.UTC(2024, 0, 1, Number(time.slice(0, 2)), Number(time.slice(3, 5)))));
}

/** The day and the minute of the day, now, in the business's time zone. */
function nowIn(timeZone: string): { day: Day; minute: number } {
	const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
	return { day: get("weekday").toLowerCase() as Day, minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

const slotsOf = (hours: OpeningHours, day: Day) => hours.days.find((entry) => entry.day === day)?.slots ?? [];

/** Open at this minute: in one of today's slots, or still in yesterday's when it closes after midnight. */
function isOpen(hours: OpeningHours, day: Day, minute: number) {
	const yesterday = week[(week.indexOf(day) + 6) % 7];
	const today = slotsOf(hours, day).some(({ open, close }) => {
		const [from, to] = [minutes(open), minutes(close)];
		return to > from ? minute >= from && minute < to : minute >= from;
	});
	return today || slotsOf(hours, yesterday).some(({ open, close }) => minutes(close) <= minutes(open) && minute < minutes(close));
}

/**
 * One card per branch: a map or a photo of the front, the name, the address and how locals find it, and links to
 * call and to get directions. A branch with opening hours shows today's hours and an "open now" badge once the page
 * has read the clock, in the business's time zone (as hours-week does); before that, and on the server, neither, so
 * nothing changes on load. One column in a narrow container, two from `@2xl`, three from `@5xl`.
 */
export function LocationBranches({ content = example, id = "locations", className, headingLevel = 2 }: BlockProps<LocationBranchesContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { labels } = content;
	const time = useMemo(() => timeFormatter(content.locale), [content.locale]);
	const [now, setNow] = useState<{ day: Day; minute: number } | null>(null);

	useEffect(() => {
		const tick = () => setNow(nowIn(content.timeZone));
		tick();
		const timer = setInterval(tick, 60_000);
		return () => clearInterval(timer);
	}, [content.timeZone]);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="location-branches" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-10 grid gap-6 @2xl:grid-cols-2 @5xl:grid-cols-3">
					{content.branches.map((branch) => {
						const hours = branch.openingHours;
						const today = now && hours ? slotsOf(hours, now.day) : null;
						const open = now && hours ? isOpen(hours, now.day, now.minute) : null;
						return (
							<li key={branch.name} className="flex flex-col overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-sm backdrop-blur-surface">
								{branch.image && (
									<img
										src={branch.image.src}
										alt={branch.image.alt}
										width={branch.image.width}
										height={branch.image.height}
										loading="lazy"
										className="aspect-[16/9] w-full object-cover"
									/>
								)}
								<div className="flex flex-1 flex-col gap-4 p-5">
									<div className="flex flex-wrap items-center justify-between gap-2">
										<Name className="font-display text-xl font-semibold tracking-display case-heading">{branch.name}</Name>
										{open !== null && (
											<Badge variant="soft" tone={open ? "success" : "neutral"}>
												{open ? labels.openNow : labels.closedNow}
											</Badge>
										)}
									</div>
									<address className="flex gap-2 not-italic">
										<MapPinIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
										<span className="flex flex-col">
											{branch.address.lines.map((line) => (
												<span key={line}>{line}</span>
											))}
											{branch.address.landmark && <span className="text-sm text-muted-foreground">{branch.address.landmark}</span>}
										</span>
									</address>
									{today && (
										<p className="text-sm">
											<span className="font-medium">{labels.today}</span>{" "}
											<span className="text-muted-foreground tabular-nums">
												{today.length === 0 ? labels.closedToday : today.map((slot) => `${time(slot.open)} – ${time(slot.close)}`).join(", ")}
											</span>
										</p>
									)}
									<div className="mt-auto flex flex-wrap gap-2 pt-1">
										{branch.address.mapUrl && (
											<Button size="sm" render={<a href={branch.address.mapUrl} target="_blank" rel="noreferrer" />} nativeButton={false}>
												<NavigationIcon aria-hidden="true" />
												{labels.directions}
											</Button>
										)}
										{branch.phone && (
											<Button size="sm" variant="outline" render={<a href={`tel:+${digits(branch.phone)}`} />} nativeButton={false}>
												<PhoneIcon aria-hidden="true" />
												{labels.call}
												<span className="tabular-nums">{branch.phone}</span>
											</Button>
										)}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
