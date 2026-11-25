"use client";

import * as React from "react";
import { MapPinIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import type { Listing } from "@/lib/block-fields";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { matchesFilters, setFilters, sortListings, useFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ListingCardsContent } from "./schema";

function ListingCard({ listing, locale, labels, Title }: { listing: Listing; locale?: string; labels: ListingCardsContent["labels"]; Title: "h3" | "h4" }) {
	const [image] = listing.images;
	const period = labels.periods[listing.period ?? "once"];
	return (
		<article className="group relative flex h-full flex-col overflow-hidden rounded-xl border-village bg-card text-card-foreground">
			<div className="relative overflow-hidden bg-muted">
				<img
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
					loading="lazy"
					className="aspect-[4/3] w-full object-cover transition-[scale] duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
				/>
				{listing.status && (
					<Badge variant="outline" className="absolute start-3 top-3 bg-background">
						{listing.status}
					</Badge>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-2 p-4">
				<p className="m-0 flex items-center gap-1.5 text-sm text-muted-foreground">
					<MapPinIcon aria-hidden="true" className="size-3.5 shrink-0" />
					{[listing.place, listing.kind].filter(Boolean).join(" · ")}
				</p>
				<Title className="font-display text-lg font-semibold text-balance">
					{/* The whole card is the link: the title's box covers it. */}
					<a href={listing.href} className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:focus-ring group-hover:underline group-hover:underline-offset-4">
						{listing.title}
					</a>
				</Title>
				{listing.facts && listing.facts.length > 0 && (
					<p className="m-0 text-sm text-muted-foreground tabular-nums">{listing.facts.map((fact) => `${new Intl.NumberFormat(locale).format(fact.value)} ${fact.label}`).join(" · ")}</p>
				)}
				{listing.rating && (
					<p className="m-0 flex items-center gap-2 text-sm text-muted-foreground">
						<Rating value={listing.rating.score} size="sm" showValue locale={locale} />
						<span>{labels.reviews.replace("{count}", String(listing.rating.count))}</span>
					</p>
				)}
				<div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-2 pt-2">
					{listing.price && (
						<p className="m-0">
							<span className="font-display text-lg font-semibold tabular-nums">{formatMoney(listing.price, locale)}</span>
							{period && <span className="text-sm text-muted-foreground"> {period}</span>}
						</p>
					)}
					{listing.tags && listing.tags.length > 0 && (
						<ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
							{listing.tags.map((tag) => (
								<li key={tag}>
									<Badge variant="soft" tone="neutral">
										{tag}
									</Badge>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</article>
	);
}

/**
 * Listings as cards, one shape for homes and places: the photo with its status, the place and kind, the title, the
 * facts ("2 beds · 1 baths · 95 m²"), the rating, the price with its period ("a month", "a night") and tags. The cards
 * follow the filters in the page's address (`@/lib/filters`, written by filter-bar and search-hero): every listing is in
 * the prerendered HTML and the ones that do not match are hidden in place; when none match, a button clears the
 * filters. One column in a narrow container, two from `@2xl`, three from `@5xl`.
 */
export function ListingCards({ content = example, id = "listings", className, headingLevel = 2 }: BlockProps<ListingCardsContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 4)}` as "h3" | "h4";
	const { listings, labels, locale } = content;
	const filters = useFilters();
	const sorted = React.useMemo(() => sortListings(listings, filters.sort), [listings, filters.sort]);
	const matching = new Set(listings.filter((listing) => matchesFilters(listing, filters)).map((listing) => listing.href));
	const filtered = Object.keys(filters).some((key) => key !== "sort");

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="listing-cards" className={cn("@container scroll-mt-20 px-4 py-12 @3xl:py-16", className)}>
			<div className="mx-auto max-w-7xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="m-0 text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<p aria-live="polite" className="sr-only">
					{filtered ? labels.shown.replace("{count}", String(matching.size)) : ""}
				</p>

				<ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 @2xl:grid-cols-2 @5xl:grid-cols-3">
					{sorted.map((listing) => (
						<li key={listing.href} hidden={!matching.has(listing.href)}>
							<ListingCard listing={listing} locale={locale} labels={labels} Title={Title} />
						</li>
					))}
				</ul>
				{matching.size === 0 && (
					<div className="mt-8 flex flex-col items-center gap-3 rounded-xl border-village border-dashed p-10 text-center">
						<p className="m-0 font-medium">{labels.none}</p>
						<Button variant="outline" onClick={() => setFilters({}, Object.keys(filters))}>
							{labels.reset}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
