"use client";

import * as React from "react";
import { CheckIcon, GiftIcon, RotateCcwIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { Rating } from "@/components/ui/rating";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { type Cart, openCart, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ProductDetailContent } from "./schema";

const icons = { truck: TruckIcon, return: RotateCcwIcon, check: CheckIcon, shield: ShieldCheckIcon, gift: GiftIcon };

/**
 * A product's page: the gallery (a large photo that opens a full-screen Lightbox, thumbnails under it), and beside it
 * the category, the title, the rating, the price (struck beside the usual one when lower), the line, each variant as
 * chips (sold-out options shown, not pickable), the quantity, and "Add to bag" with the total. Adding puts a line in the
 * shop's cart (`useCart`), says so, and asks a cart-drawer on the page to open; an option left unpicked is named
 * instead. Notes (delivery, returns) and the details follow. Pass `cart` to use the project's own cart. The two columns
 * start at `@3xl`, where the text stays in view while the photos scroll.
 */
export function ProductDetail({
	content = example,
	id = "product",
	className,
	headingLevel = 1,
	cart: ownCart,
}: BlockProps<ProductDetailContent> & { cart?: Cart }) {
	const Heading = heading(headingLevel);
	const Subheading = `h${Math.min(headingLevel + 1, 6)}` as "h2";
	const { product, labels, locale } = content;
	const shop = content.shop ?? "shop";
	const shopCart = useCart(shop);
	const cart = ownCart ?? shopCart;
	const variants = product.variants ?? [];

	const [current, setCurrent] = React.useState(0);
	// An option with one choice that is in stock is picked from the start.
	const [picked, setPicked] = React.useState<Record<string, string>>(() =>
		Object.fromEntries(
			variants.flatMap((variant) => {
				const inStock = variant.options.filter((option) => !variant.soldOut?.includes(option));
				return inStock.length === 1 ? [[variant.name, inStock[0]]] : [];
			}),
		),
	);
	const [quantity, setQuantity] = React.useState(1);
	const [missing, setMissing] = React.useState<string[]>([]);
	const [added, setAdded] = React.useState(0);
	const groups = React.useRef<Record<string, HTMLDivElement | null>>({});

	const image = product.images[current];
	const total = { ...product.price, amount: product.price.amount * quantity };

	const add = () => {
		const unpicked = variants.filter((variant) => !picked[variant.name]).map((variant) => variant.name);
		setMissing(unpicked);
		if (unpicked.length > 0) {
			groups.current[unpicked[0]]?.querySelector<HTMLElement>("[data-slot=chip]:not([data-disabled])")?.focus();
			return;
		}
		cart.add({
			sku: product.sku,
			title: product.title,
			variant: variants.map((variant) => `${variant.name}: ${picked[variant.name]}`).join(" · ") || undefined,
			price: product.price,
			quantity,
			image: product.images[0],
			href: product.href,
		});
		setAdded((count) => count + 1);
		openCart(shop);
	};

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="product-detail" className={cn("@container px-4 py-10 @3xl:py-16", className)}>
			<div className="mx-auto grid max-w-7xl gap-8 @3xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] @3xl:gap-12">
				<Lightbox images={product.images} labels={{ photos: labels.photos, previous: labels.previous, next: labels.next, close: labels.close }} index={current} onIndexChange={setCurrent}>
					<div className="flex flex-col gap-3">
						<div className="relative">
							<LightboxTrigger
								index={current}
								aria-label={labels.open}
								className="block w-full cursor-zoom-in overflow-hidden rounded-xl border-village bg-muted outline-none focus-visible:focus-ring"
							>
								<img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
							</LightboxTrigger>
							{/* Beside the button, not in it: its name stays "open the photos". */}
							{product.badge && (
								<Badge variant="outline" className="pointer-events-none absolute start-4 top-4 bg-background">
									{product.badge}
								</Badge>
							)}
						</div>
						{product.images.length > 1 && (
							<ul aria-label={labels.photos} className="grid grid-cols-5 gap-2 @3xl:gap-3">
								{product.images.map((photo, index) => (
									<li key={photo.src}>
										<button
											type="button"
											aria-pressed={index === current}
											onClick={() => setCurrent(index)}
											className="block w-full overflow-hidden rounded-lg border-village bg-muted opacity-70 outline-none transition-opacity duration-fast hover:opacity-100 focus-visible:focus-ring aria-pressed:opacity-100 aria-pressed:ring-2 aria-pressed:ring-foreground"
										>
											<img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="aspect-square w-full object-cover" />
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
					<LightboxContent />
				</Lightbox>

				<div className="flex flex-col gap-6 @3xl:sticky @3xl:top-24 @3xl:self-start">
					<div className="flex flex-col gap-3">
						{product.category && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{product.category}</p>}
						<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
							{product.title}
						</Heading>
						{product.rating && (
							<p className="m-0 flex items-center gap-2 text-sm text-muted-foreground">
								<Rating value={product.rating.score} size="sm" showValue locale={locale} />
								{product.rating.href ? (
									<a href={product.rating.href} className="underline underline-offset-4 hover:text-foreground">
										{labels.reviews.replace("{count}", String(product.rating.count))}
									</a>
								) : (
									<span>{labels.reviews.replace("{count}", String(product.rating.count))}</span>
								)}
							</p>
						)}
						<p className="m-0 flex flex-wrap items-baseline gap-x-3">
							<span className="font-display text-2xl font-semibold tabular-nums">{formatMoney(product.price, locale)}</span>
							{product.was && (
								<s className="text-muted-foreground tabular-nums">
									<span className="sr-only">{labels.was} </span>
									{formatMoney(product.was, locale)}
								</s>
							)}
						</p>
						{product.summary && <p className="m-0 text-lg text-pretty text-muted-foreground">{product.summary}</p>}
					</div>

					{variants.map((variant) => {
						const labelId = `${id}-${variant.name.toLowerCase().replace(/\W+/g, "-")}`;
						const isMissing = missing.includes(variant.name);
						return (
							<div key={variant.name} ref={(node) => void (groups.current[variant.name] = node)} className="flex flex-col gap-2.5">
								<p id={labelId} className="m-0 text-sm font-medium">
									{variant.name}
									{picked[variant.name] && <span className="font-normal text-muted-foreground">: {picked[variant.name]}</span>}
								</p>
								<ChipGroup
									aria-labelledby={labelId}
									aria-describedby={isMissing ? `${labelId}-missing` : undefined}
									value={picked[variant.name] ? [picked[variant.name]] : []}
									onValueChange={(value: string[]) => {
										if (!value[0]) return;
										setPicked((current) => ({ ...current, [variant.name]: value[0] }));
										setMissing((current) => current.filter((name) => name !== variant.name));
									}}
								>
									{variant.options.map((option) => {
										const soldOut = variant.soldOut?.includes(option);
										return (
											<Chip key={option} value={option} disabled={soldOut} className={cn(soldOut && "line-through")}>
												{option}
												{soldOut && <span className="sr-only"> ({labels.soldOut})</span>}
											</Chip>
										);
									})}
								</ChipGroup>
								{isMissing && (
									<p id={`${labelId}-missing`} role="alert" className="m-0 text-sm tone-destructive text-tone-text">
										{labels.pick.replace("{name}", variant.name.toLowerCase())}
									</p>
								)}
							</div>
						);
					})}

					<div className="flex flex-col gap-3 @md:flex-row">
						<NumberField
							value={quantity}
							onValueChange={(value) => setQuantity(Math.max(1, Math.min(99, Math.round(value ?? 1))))}
							min={1}
							max={99}
							aria-label={labels.quantity}
							className="@md:w-36"
						>
							<NumberFieldGroup size="lg">
								<NumberFieldDecrement aria-label={labels.less} />
								<NumberFieldInput aria-label={labels.quantity} />
								<NumberFieldIncrement aria-label={labels.more} />
							</NumberFieldGroup>
						</NumberField>
						<Button size="lg" className="w-full @md:w-auto @md:flex-1" onClick={add}>
							{labels.add}
							<span aria-hidden="true">·</span>
							<span className="tabular-nums">{formatMoney(total, locale)}</span>
						</Button>
					</div>
					<p aria-live="polite" className={cn("m-0 flex items-center gap-2 text-sm", added === 0 && "sr-only")}>
						{added > 0 && (
							<>
								<CheckIcon aria-hidden="true" className="size-4 tone-success text-tone-text" />
								<span key={added}>{labels.added}</span>
							</>
						)}
					</p>

					{content.notes && content.notes.length > 0 && (
						<ul className="m-0 flex list-none flex-col gap-2.5 rounded-xl bg-muted p-4 text-sm">
							{content.notes.map((note) => {
								const Icon = icons[note.icon];
								return (
									<li key={note.text} className="flex items-start gap-3">
										<Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
										{note.text}
									</li>
								);
							})}
						</ul>
					)}

					{product.details && product.details.length > 0 && (
						<div className="flex flex-col gap-3 border-t border-border pt-6">
							<Subheading className="m-0 text-sm font-medium">{labels.details}</Subheading>
							{product.details.map((paragraph) => (
								<p key={paragraph} className="m-0 text-pretty text-muted-foreground">
									{paragraph}
								</p>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
