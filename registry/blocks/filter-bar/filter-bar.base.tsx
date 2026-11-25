"use client";

import * as React from "react";
import { RotateCcwIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Facet, Listing } from "@/lib/block-fields";
import { type BlockProps, formatMoney } from "@/lib/blocks";
import { listOf, matchesFilters, rangeOf, setFilters, useFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FilterBarContent } from "./schema";

type Sort = "featured" | "price-low" | "price-high" | "rating";

/** A choice facet's values: the content's, or the listings' own in the order they first appear. */
function valuesOf(facet: Facet, items: Listing[]): string[] {
	if (facet.options?.length) return facet.options;
	const seen = new Set<string>();
	for (const item of items) {
		const own = facet.key === "tags" ? (item.tags ?? []) : [String(item[facet.key as keyof Listing] ?? "")];
		for (const value of own) if (value) seen.add(value);
	}
	return [...seen];
}

const labelId = (id: string, facet: Facet) => `${id}-${facet.key.replace(/\W+/g, "-")}`;

/**
 * The filters over a list of listings, declared in the content: a choice is a row of chips with how many listings each
 * value holds (several can be picked), a range a two-thumbed slider over the listings' prices, an "at least" a number,
 * and words search titles, places and tags. A sort, a reset, and how many listings show follow. Everything is written
 * in the page's address (`@/lib/filters`), so a filtered list is a link to send, and listing-cards on the page filters
 * in place. It filters nothing itself: put it above listing-cards.
 */
export function FilterBar({ content = example, id = "filters", className }: BlockProps<FilterBarContent>) {
	const { items, facets, labels, locale } = content;
	const filters = useFilters();
	const [words, setWords] = React.useState("");
	React.useEffect(() => setWords(filters.q ?? ""), [filters.q]);

	const prices = items.flatMap((item) => (item.price ? [item.price.amount] : []));
	const currency = items.find((item) => item.price)?.price?.currency ?? "XAF";
	const bounds: [number, number] = prices.length > 0 ? [Math.min(...prices), Math.max(...prices)] : [0, 0];
	const rated = items.some((item) => item.rating);
	const sortLabels: Record<Sort, string> = { featured: labels.sorts.featured, "price-low": labels.sorts.priceLow, "price-high": labels.sorts.priceHigh, rating: labels.sorts.rating };
	const sorts = (Object.keys(sortLabels) as Sort[]).filter((sort) => sort !== "rating" || rated);
	const keys = ["q", "sort", ...facets.map((facet) => facet.key)];
	const shown = items.filter((item) => matchesFilters(item, filters)).length;
	const active = keys.some((key) => filters[key]);

	return (
		<section id={id} aria-label={labels.filters} data-slot="block" data-block="filter-bar" className={cn("@container px-4 py-6", className)}>
			<div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-xl border-village bg-card p-4 text-card-foreground @3xl:p-5">
				<div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-center">
					{content.search && (
						<form
							role="search"
							className="relative flex-1"
							onSubmit={(event) => {
								event.preventDefault();
								setFilters({ q: words.trim() }, ["q"]);
							}}
						>
							<SearchIcon aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								aria-label={content.search.label}
								placeholder={content.search.placeholder}
								value={words}
								onChange={(event) => setWords(event.target.value)}
								onBlur={() => setFilters({ q: words.trim() }, ["q"])}
								className="ps-9"
							/>
						</form>
					)}
					<div className="flex items-center gap-3 @3xl:ms-auto">
						<span id={`${id}-sort`} className="shrink-0 text-sm text-muted-foreground">
							{labels.sort}
						</span>
						<Select items={sortLabels} value={(filters.sort as Sort) ?? "featured"} onValueChange={(value) => setFilters({ sort: value === "featured" ? "" : String(value) }, ["sort"])}>
							<SelectTrigger aria-labelledby={`${id}-sort`} className="w-auto min-w-40">
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								{sorts.map((sort) => (
									<SelectItem key={sort} value={sort}>
										{sortLabels[sort]}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="flex flex-wrap gap-x-10 gap-y-5">
					{facets.map((facet) => {
						const label = labelId(id, facet);
						if (facet.kind === "choice") {
							const picked = listOf(filters[facet.key]);
							return (
								<div key={facet.key} className="flex flex-col gap-2">
									<span id={label} className="text-sm font-medium">
										{facet.label}
									</span>
									<ChipGroup multiple aria-labelledby={label} size="sm" value={picked} onValueChange={(value: string[]) => setFilters({ [facet.key]: value.join(",") }, [facet.key])}>
										{valuesOf(facet, items).map((value) => {
											const count = items.filter((item) => matchesFilters(item, { [facet.key]: value })).length;
											return (
												<Chip key={value} value={value}>
													{value}
													<span className="text-current/70 tabular-nums">{count}</span>
												</Chip>
											);
										})}
									</ChipGroup>
								</div>
							);
						}
						if (facet.kind === "range") {
							const [low = bounds[0], high = bounds[1]] = rangeOf(filters[facet.key]);
							return (
								<RangeFacet
									key={facet.key}
									facet={facet}
									labelId={label}
									bounds={bounds}
									value={[low, high]}
									format={(amount) => formatMoney({ amount, currency }, locale)}
									onCommit={([from, to]) =>
										setFilters({ [facet.key]: from <= bounds[0] && to >= bounds[1] ? "" : `${from <= bounds[0] ? "" : from}-${to >= bounds[1] ? "" : to}` }, [facet.key])
									}
								/>
							);
						}
						const least = Number(filters[facet.key] ?? 0) || 0;
						return (
							<div key={facet.key} className="flex flex-col gap-2">
								<span id={label} className="text-sm font-medium">
									{facet.label}
								</span>
								<div className="flex items-center gap-2">
									<NumberField
										value={least}
										min={0}
										max={20}
										step={facet.step ?? 1}
										onValueChange={(value) => setFilters({ [facet.key]: value ? String(value) : "" }, [facet.key])}
										className="w-32"
									>
										<NumberFieldGroup size="sm">
											<NumberFieldDecrement aria-label={`${facet.label} −`} />
											<NumberFieldInput aria-labelledby={label} />
											<NumberFieldIncrement aria-label={`${facet.label} +`} />
										</NumberFieldGroup>
									</NumberField>
									<span className="text-sm text-muted-foreground">{labels.atLeast}</span>
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex items-center justify-between gap-4 border-t border-border pt-4">
					<p aria-live="polite" className="m-0 text-sm text-muted-foreground tabular-nums">
						{labels.shown.replace("{count}", String(shown))}
					</p>
					<Button variant="ghost" size="sm" disabled={!active} onClick={() => setFilters({}, keys)}>
						<RotateCcwIcon aria-hidden="true" />
						{labels.reset}
					</Button>
				</div>
			</div>
		</section>
	);
}

/** A two-thumbed slider that follows the hand and writes the address when let go. */
function RangeFacet({
	facet,
	labelId,
	bounds,
	value,
	format,
	onCommit,
}: {
	facet: Facet;
	labelId: string;
	bounds: [number, number];
	value: [number, number];
	format: (amount: number) => string;
	onCommit: (value: [number, number]) => void;
}) {
	const [moving, setMoving] = React.useState<[number, number] | null>(null);
	const [from, to] = moving ?? value;
	return (
		<div className="flex min-w-64 flex-1 flex-col gap-2 @3xl:max-w-sm">
			<div className="flex items-baseline justify-between gap-3">
				<span id={labelId} className="text-sm font-medium">
					{facet.label}
				</span>
				<span className="text-sm text-muted-foreground tabular-nums">
					{format(from)} – {format(to)}
				</span>
			</div>
			<Slider
				aria-label={facet.label}
				min={bounds[0]}
				max={bounds[1]}
				step={facet.step ?? 1}
				value={[from, to]}
				onValueChange={(next) => setMoving(next as [number, number])}
				onValueCommitted={(next) => {
					setMoving(null);
					onCommit(next as [number, number]);
				}}
				className="py-2"
			/>
		</div>
	);
}
