"use client";

import * as React from "react";
import { ShoppingBagIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { CartLine } from "@/lib/block-fields";
import { type BlockProps, formatMoney, messageUrl } from "@/lib/blocks";
import { type Cart, lineId, onCartOpen, orderText, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CartDrawerContent } from "./schema";

export interface CartDrawerProps extends BlockProps<CartDrawerContent> {
	/** Where its button sits: fixed in the window's corner, or here, in the flow (beside a navbar). Default `floating`. */
	trigger?: "floating" | "inline";
	/** The project's own cart, instead of the shop's `useCart`. */
	cart?: Cart;
	/** The project takes the order: replaces the content's checkout. */
	onCheckout?: (lines: CartLine[]) => void;
}

function Line({ line, locale, labels, cart }: { line: CartLine; locale?: string; labels: CartDrawerContent["labels"]; cart: Cart }) {
	const id = lineId(line);
	return (
		<li className="flex gap-4 py-4">
			{line.image && (
				<img src={line.image.src} alt="" width={line.image.width} height={line.image.height} className="h-20 w-16 shrink-0 rounded-md border-village bg-muted object-cover" />
			)}
			<div className="flex min-w-0 flex-1 flex-col gap-2">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						{line.href ? (
							<a href={line.href} className="font-medium hover:underline hover:underline-offset-4">
								{line.title}
							</a>
						) : (
							<span className="font-medium">{line.title}</span>
						)}
						{line.variant && <p className="m-0 text-sm text-muted-foreground">{line.variant}</p>}
					</div>
					<span className="shrink-0 font-medium tabular-nums">{formatMoney({ ...line.price, amount: line.price.amount * line.quantity }, locale)}</span>
				</div>
				<div className="flex items-center justify-between gap-3">
					<NumberField
						value={line.quantity}
						onValueChange={(value) => value && cart.setQuantity(id, value)}
						min={1}
						max={99}
						aria-label={`${labels.quantity}, ${line.title}`}
						className="w-28"
					>
						<NumberFieldGroup size="sm">
							<NumberFieldDecrement aria-label={labels.less} />
							<NumberFieldInput aria-label={`${labels.quantity}, ${line.title}`} />
							<NumberFieldIncrement aria-label={labels.more} />
						</NumberFieldGroup>
					</NumberField>
					<Button variant="link" size="sm" className="px-0 text-muted-foreground" onClick={() => cart.remove(id)} aria-label={`${labels.remove}, ${line.title}`}>
						{labels.remove}
					</Button>
				</div>
			</div>
		</li>
	);
}

/**
 * The shop's cart in a sheet from the side: each line with its photo, options, quantity and remove; a bar toward free
 * delivery; the subtotal; and the order, written out and sent by message (WhatsApp, texts, email) or to a checkout URL,
 * or handed to `onCheckout`. Its button shows the count, fixed in the corner (`trigger="floating"`) or where the block
 * is placed; product-detail opens it after adding. The cart lives in the browser (`useCart`), so it is empty on the
 * server and fills after hydration. Pass `cart` to use the project's own.
 */
export function CartDrawer({ content = example, id = "cart", className, trigger = "floating", cart: ownCart, onCheckout }: CartDrawerProps) {
	const { labels, locale } = content;
	const shop = content.shop ?? "shop";
	const shopCart = useCart(shop);
	const cart = ownCart ?? shopCart;
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => onCartOpen(shop, () => setOpen(true)), [shop]);

	const subtotal = cart.total;
	const free = content.freeDelivery;
	const toFree = free && subtotal && subtotal.currency === free.currency ? Math.max(0, free.amount - subtotal.amount) : undefined;
	const checkout = onCheckout ? (
		<Button size="lg" className="w-full" onClick={() => onCheckout(cart.lines)}>
			{labels.checkout}
		</Button>
	) : content.checkout.kind === "message" ? (
		<Button
			size="lg"
			className="w-full"
			nativeButton={false}
			render={
				<a
					href={messageUrl(content.checkout.channel, orderText(cart.lines, { intro: labels.intro, total: labels.total }, locale), content.title)}
					target="_blank"
					rel="noopener noreferrer"
				/>
			}
		>
			{labels.checkout}
		</Button>
	) : (
		<Button size="lg" className="w-full" nativeButton={false} render={<a href={content.checkout.href} />}>
			{labels.checkout}
		</Button>
	);

	return (
		<div id={id} data-slot="block" data-block="cart-drawer" className={cn(trigger === "floating" && "fixed end-4 bottom-4 z-40", className)}>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger
					render={<Button size={trigger === "floating" ? "lg" : "default"} variant={trigger === "floating" ? "default" : "outline"} className={cn(trigger === "floating" && "rounded-pill shadow-lg")} />}
					aria-label={labels.open.replace("{title}", content.title).replace("{count}", String(cart.count))}
				>
					<ShoppingBagIcon aria-hidden="true" />
					<span aria-hidden="true" className="tabular-nums">
						{cart.count}
					</span>
				</SheetTrigger>
				<SheetContent side="right" showCloseButton={false} className="flex flex-col">
					<SheetHeader className="flex-row items-center justify-between gap-4">
						<SheetTitle>
							{content.title} <span className="font-normal text-muted-foreground tabular-nums">{cart.count}</span>
						</SheetTitle>
						<SheetClose render={<Button variant="ghost" size="icon-sm" aria-label={labels.close} />}>
							<XIcon aria-hidden="true" />
						</SheetClose>
					</SheetHeader>

					{cart.lines.length === 0 ? (
						<div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
							<ShoppingBagIcon aria-hidden="true" className="size-10 text-muted-foreground" />
							<p className="m-0 font-medium">{labels.empty}</p>
							<p className="m-0 max-w-64 text-sm text-muted-foreground">{labels.emptyLine}</p>
							<SheetClose render={<Button variant="outline" className="mt-2" />}>{labels.browse}</SheetClose>
						</div>
					) : (
						<>
							{toFree !== undefined && free && (
								<div className="mx-6 flex flex-col gap-2 rounded-lg bg-muted p-3 text-sm">
									<p className="m-0">{toFree > 0 ? labels.away.replace("{amount}", formatMoney({ ...free, amount: toFree }, locale)) : labels.free}</p>
									<Progress value={Math.min(100, ((subtotal?.amount ?? 0) / free.amount) * 100)} aria-hidden="true" size="sm" tone={toFree > 0 ? "primary" : "success"} />
								</div>
							)}
							<ul className="m-0 min-h-0 flex-1 list-none divide-y divide-border overflow-y-auto px-6">
								{cart.lines.map((line) => (
									<Line key={lineId(line)} line={line} locale={locale} labels={labels} cart={cart} />
								))}
							</ul>
							<SheetFooter className="flex-col gap-3 border-t border-border">
								<p className="m-0 flex items-baseline justify-between gap-4">
									<span className="font-medium">{labels.subtotal}</span>
									<span className="font-display text-xl font-semibold tabular-nums">{subtotal ? formatMoney(subtotal, locale) : ""}</span>
								</p>
								<p className="m-0 text-sm text-muted-foreground">{labels.note}</p>
								{checkout}
								<SheetClose render={<Button variant="ghost" className="w-full" />}>{labels.continue}</SheetClose>
							</SheetFooter>
						</>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
}
