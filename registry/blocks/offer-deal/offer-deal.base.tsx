"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { OfferDealContent } from "./schema";

const MINUTE = 60_000;

/** What is left until `end`, in whole days, hours and minutes; null once it has passed. */
function remaining(end: number, now: number) {
	const left = Math.ceil((end - now) / MINUTE);
	if (left <= 0) return null;
	return { days: Math.floor(left / 1440), hours: Math.floor((left % 1440) / 60), minutes: left % 60 };
}

/**
 * One offer, made to be noticed: the title, what it includes, the new price beside the usual one struck through, and
 * its action, beside a photo. With `endsAt`, the end date is written in the business's time zone (the same on the
 * server and in the browser), then, once the page has read the clock, days, hours and minutes count down, rolling on
 * each change (motion off: they simply change). Past the end, the action goes and `labels.expired` says so.
 */
export function OfferDeal({ content = example, id = "offer", className, headingLevel = 2 }: BlockProps<OfferDealContent>) {
	const Heading = heading(headingLevel);
	const { offer, labels, locale } = content;
	const end = offer.endsAt ? Date.parse(offer.endsAt) : null;
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		if (end === null) return;
		const tick = () => setNow(Date.now());
		tick();
		const timer = setInterval(tick, 15_000);
		return () => clearInterval(timer);
	}, [end]);

	const left = end !== null && now !== null ? remaining(end, now) : undefined;
	const expired = left === null;
	const until =
		end !== null &&
		new Intl.DateTimeFormat(locale, { dateStyle: "full", timeStyle: "short", timeZone: content.timeZone }).format(new Date(end));
	const units = left ? ([
		[left.days, labels.days],
		[left.hours, labels.hours],
		[left.minutes, labels.minutes],
	] as const) : [];

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="offer-deal" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-md backdrop-blur-surface @3xl:grid-cols-2">
				{content.image && (
					<img
						src={content.image.src}
						alt={content.image.alt}
						width={content.image.width}
						height={content.image.height}
						loading="lazy"
						className="aspect-[4/3] h-full w-full object-cover @3xl:aspect-auto"
					/>
				)}
				<div className={cn("flex flex-col gap-5 p-6 @2xl:p-10", !content.image && "@3xl:col-span-2 @3xl:items-center @3xl:text-center")}>
					{content.eyebrow && (
						<Badge variant="soft" className="self-start">
							{content.eyebrow}
						</Badge>
					)}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{offer.title}
					</Heading>
					{offer.description && <p className="text-lg text-muted-foreground">{offer.description}</p>}
					<p className="flex flex-wrap items-baseline gap-3">
						<span className="font-display text-4xl font-semibold tabular-nums tone-primary text-tone-text">{formatMoney(offer.price, locale)}</span>
						{offer.was && (
							<span className="text-lg text-muted-foreground">
								<span className="sr-only">{labels.was} </span>
								<s className="tabular-nums">{formatMoney(offer.was, locale)}</s>
							</span>
						)}
					</p>
					{until && (
						<div className="flex flex-col gap-2">
							{expired ? (
								<p role="status" className="font-medium">
									{labels.expired}
								</p>
							) : (
								<>
									{left && (
										<p className="flex flex-wrap items-baseline gap-x-4 gap-y-1" aria-hidden="true">
											<span className="text-sm text-muted-foreground">{labels.endsIn}</span>
											{units.map(([value, unit]) => (
												<span key={unit} className="flex items-baseline gap-1">
													<NumberRoll value={value} format={{ minimumIntegerDigits: 2 }} locale={locale} trigger="mount" className="font-display text-2xl font-semibold" />
													<span className="text-sm text-muted-foreground">{unit}</span>
												</span>
											))}
										</p>
									)}
									<p className="text-sm text-muted-foreground">
										{labels.until} {until}
									</p>
								</>
							)}
						</div>
					)}
					{offer.cta && !expired && (
						<Button size="lg" className="self-start" render={<a href={offer.cta.href} />} nativeButton={false}>
							{offer.cta.label}
						</Button>
					)}
				</div>
			</div>
		</section>
	);
}
