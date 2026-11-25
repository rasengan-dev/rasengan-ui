"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Rating } from "@/components/ui/rating";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@/lib/block-fields";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ProductGridContent } from "./schema";

const ALL = "all";
type Sort = "featured" | "price-low" | "price-high" | "rating";
const sorts: Sort[] = ["featured", "price-low", "price-high", "rating"];

const order: Record<Sort, (a: Product, b: Product) => number> = {
	featured: () => 0,
	"price-low": (a, b) => a.price.amount - b.price.amount,
	"price-high": (a, b) => b.price.amount - a.price.amount,
	rating: (a, b) => (b.rating?.score ?? 0) - (a.rating?.score ?? 0),
};

/** The filter and the sort in the page's address (`?category=Ceramics&sort=price-low`), so a selection can be shared. */
function readAddress(): { category?: string; sort?: string } {
	const params = new URLSearchParams(window.location.search);
	return { category: params.get("category") ?? undefined, sort: params.get("sort") ?? undefined };
}

function writeAddress(category: string, sort: Sort) {
	const url = new URL(window.location.href);
	if (category === ALL) url.searchParams.delete("category");
	else url.searchParams.set("category", category);
	if (sort === "featured") url.searchParams.delete("sort");
	else url.searchParams.set("sort", sort);
	if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
}

function ProductCard({ product, locale, labels, Title }: { product: Product; locale?: string; labels: ProductGridContent["labels"]; Title: "h3" | "h4" }) {
	const [first, second] = product.images;
	return (
		<article className="group relative flex h-full flex-col gap-3">
			<div className="relative overflow-hidden rounded-xl border-village bg-muted">
				<img src={first.src} alt={first.alt} width={first.width} height={first.height} loading="lazy" className="aspect-[4/5] w-full object-cover" />
				{/* The second photo shows on hover; a screen reader meets both, each with its alt. */}
				{second && (
					<img
						src={second.src}
						alt={second.alt}
						width={second.width}
						height={second.height}
						loading="lazy"
						className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-slow ease-out group-hover:opacity-100 motion-reduce:transition-none"
					/>
				)}
				{product.badge && (
					<Badge variant="outline" className="absolute start-3 top-3 bg-background">
						{product.badge}
					</Badge>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-1.5">
				<Title className="text-base font-medium text-balance">
					{/* The whole card is the link: the title's box covers it. */}
					<a href={product.href} className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:focus-ring group-hover:underline group-hover:underline-offset-4">
						{product.title}
					</a>
				</Title>
				{product.summary && <p className="m-0 text-sm text-muted-foreground">{product.summary}</p>}
				{product.rating && (
					<p className="m-0 flex items-center gap-2 text-sm text-muted-foreground">
						<Rating value={product.rating.score} size="sm" showValue locale={locale} />
						<span>{labels.reviews.replace("{count}", String(product.rating.count))}</span>
					</p>
				)}
				<p className="m-0 mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
					<span className="font-display text-lg font-semibold tabular-nums">{formatMoney(product.price, locale)}</span>
					{product.was && (
						<s className="text-sm text-muted-foreground tabular-nums">
							<span className="sr-only">{labels.was} </span>
							{formatMoney(product.was, locale)}
						</s>
					)}
				</p>
			</div>
		</article>
	);
}

/**
 * A shop's products as cards: the photo (a second one on hover), a badge, the title, a line, the rating and the price,
 * struck through beside the usual one when it is lower. Chips above filter by category, each with its count, and a
 * select sorts (featured, price, rating); both are written in the page's address and read back after hydration, so a
 * selection can be shared. Every product is in the HTML; filtering hides cards in place. Two columns in a narrow
 * container, three from `@3xl`, four from `@5xl`.
 */
export function ProductGrid({ content = example, id = "products", className, headingLevel = 2 }: BlockProps<ProductGridContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 4)}` as "h3" | "h4";
	const { products, labels, locale } = content;
	const [category, setCategory] = React.useState(ALL);
	const [sort, setSort] = React.useState<Sort>("featured");
	const [changed, setChanged] = React.useState(false);

	// Categories in the order they first appear, with how many products each holds.
	const categories = React.useMemo(() => {
		const counts = new Map<string, number>();
		for (const product of products) if (product.category) counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
		return [...counts];
	}, [products]);
	const rated = products.some((product) => product.rating);
	const offered = sorts.filter((value) => value !== "rating" || rated);
	const sortLabels: Record<Sort, string> = {
		featured: labels.sorts.featured,
		"price-low": labels.sorts.priceLow,
		"price-high": labels.sorts.priceHigh,
		rating: labels.sorts.rating,
	};

	// After hydration: the address's selection, if it names a category and a sort this grid has.
	React.useEffect(() => {
		const saved = readAddress();
		if (saved.category && categories.some(([name]) => name === saved.category)) setCategory(saved.category);
		if (saved.sort && (offered as string[]).includes(saved.sort)) setSort(saved.sort as Sort);
		// Once, on mount: the address is read, not followed.
	}, []);

	const update = (next: { category?: string; sort?: Sort }) => {
		const nextCategory = next.category ?? category;
		const nextSort = next.sort ?? sort;
		setCategory(nextCategory);
		setSort(nextSort);
		setChanged(true);
		writeAddress(nextCategory, nextSort);
	};

	const sorted = React.useMemo(() => [...products].sort(order[sort]), [products, sort]);
	const shown = category === ALL ? products.length : (categories.find(([name]) => name === category)?.[1] ?? 0);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="product-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-7xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="m-0 text-lg text-muted-foreground">{content.subline}</p>}
				</div>

				{content.controls !== false && (
				<div className="mt-8 flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between">
					{categories.length > 1 ? (
						<ChipGroup aria-label={labels.filter} value={[category]} onValueChange={(value: string[]) => update({ category: value[0] ?? ALL })} size="sm">
							<Chip value={ALL}>
								{labels.all}
								<span className="text-current/70 tabular-nums">{products.length}</span>
							</Chip>
							{categories.map(([name, count]) => (
								<Chip key={name} value={name}>
									{name}
									<span className="text-current/70 tabular-nums">{count}</span>
								</Chip>
							))}
						</ChipGroup>
					) : (
						<span />
					)}
					<div className="flex items-center gap-3">
						<span id={`${id}-sort`} className="shrink-0 text-sm text-muted-foreground">
							{labels.sort}
						</span>
						<Select items={sortLabels} value={sort} onValueChange={(value) => value && update({ sort: value as Sort })}>
							<SelectTrigger size="sm" aria-labelledby={`${id}-sort`} className="w-auto min-w-40">
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								{offered.map((value) => (
									<SelectItem key={value} value={value}>
										{sortLabels[value]}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				)}
				<p aria-live="polite" className="sr-only">
					{changed ? labels.shown.replace("{count}", String(shown)) : ""}
				</p>

				<ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 @3xl:grid-cols-3 @3xl:gap-x-6 @5xl:grid-cols-4">
					{sorted.map((product) => (
						<li key={product.sku} hidden={category !== ALL && product.category !== category}>
							<ProductCard product={product} locale={locale} labels={labels} Title={Title} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
