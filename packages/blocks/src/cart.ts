"use client";

/*
 * rasengan-blocks (RFC-0014), the cart. Installed as `@/lib/cart`.
 *
 * A shop's cart, kept in the browser: one store per shop (`localStorage`, key `rasengan-ui:cart:<shop>`), shared by
 * every block of the page that reads it (product-detail adds, cart-drawer shows) and by the shop's other tabs. No
 * server, no account: an order is handed off by message, to a URL, or to the project's code. On the server and before
 * hydration the cart is empty, so prerendered pages match.
 */

import * as React from "react";

import { formatMoney } from "./blocks";
import type { CartLine, Money } from "./block-fields";

/** A line's identity: the same product in another variant is another line. */
export const lineId = (line: Pick<CartLine, "sku" | "variant">) => (line.variant ? `${line.sku}:${line.variant}` : line.sku);

/** The lines' sum, price times quantity. */
const sumOf = (lines: CartLine[]) => lines.reduce((sum, line) => sum + line.price.amount * line.quantity, 0);

const storageKey = (shop: string) => `rasengan-ui:cart:${shop}`;
const empty: CartLine[] = [];

interface Store {
	lines: CartLine[];
	listeners: Set<() => void>;
}

const stores = new Map<string, Store>();

function read(shop: string): CartLine[] {
	try {
		const saved = JSON.parse(localStorage.getItem(storageKey(shop)) ?? "[]");
		return Array.isArray(saved) ? saved : [];
	} catch {
		return [];
	}
}

function storeOf(shop: string): Store {
	let store = stores.get(shop);
	if (!store) {
		store = { lines: typeof window === "undefined" ? empty : read(shop), listeners: new Set() };
		stores.set(shop, store);
	}
	return store;
}

function write(shop: string, lines: CartLine[]) {
	const store = storeOf(shop);
	store.lines = lines;
	try {
		localStorage.setItem(storageKey(shop), JSON.stringify(lines));
	} catch {
		// Storage blocked: the cart lasts as long as the page.
	}
	for (const listener of store.listeners) listener();
}

export interface Cart {
	lines: CartLine[];
	/** How many items, quantities counted. */
	count: number;
	/** The sum of the lines, in the first line's currency; undefined when the cart is empty. */
	total: Money | undefined;
	/** Adds a line, or adds its quantity to the same product in the same variant. */
	add: (line: CartLine) => void;
	setQuantity: (id: string, quantity: number) => void;
	remove: (id: string) => void;
	clear: () => void;
}

/** The shop's cart: `shop` names it, so two shops on one domain keep two carts. */
export function useCart(shop = "shop"): Cart {
	const subscribe = React.useCallback(
		(listener: () => void) => {
			const store = storeOf(shop);
			store.listeners.add(listener);
			// Another tab changed the cart: read it again.
			const onStorage = (event: StorageEvent) => {
				if (event.key !== storageKey(shop)) return;
				store.lines = read(shop);
				listener();
			};
			window.addEventListener("storage", onStorage);
			return () => {
				store.listeners.delete(listener);
				window.removeEventListener("storage", onStorage);
			};
		},
		[shop],
	);
	const lines = React.useSyncExternalStore(
		subscribe,
		() => storeOf(shop).lines,
		() => empty,
	);

	return React.useMemo(() => {
		const count = lines.reduce((sum, line) => sum + line.quantity, 0);
		const total = lines.length ? { amount: sumOf(lines), currency: lines[0].price.currency } : undefined;
		const current = () => storeOf(shop).lines;
		return {
			lines,
			count,
			total,
			add: (line) => {
				const id = lineId(line);
				const found = current().find((existing) => lineId(existing) === id);
				write(
					shop,
					found
						? current().map((existing) => (lineId(existing) === id ? { ...existing, quantity: Math.min(99, existing.quantity + line.quantity) } : existing))
						: [...current(), line],
				);
			},
			setQuantity: (id, quantity) =>
				write(
					shop,
					current().map((line) => (lineId(line) === id ? { ...line, quantity: Math.max(1, Math.min(99, Math.round(quantity))) } : line)),
				),
			remove: (id) => write(shop, current().filter((line) => lineId(line) !== id)),
			clear: () => write(shop, []),
		};
	}, [lines, shop]);
}

/** The order written out, for a message: one line per product, then the total. */
export function orderText(lines: CartLine[], labels: { intro: string; total: string }, locale?: string): string {
	const rows = lines.map((line) => {
		const what = line.variant ? `${line.title} (${line.variant})` : line.title;
		return `${line.quantity} × ${what}: ${formatMoney({ ...line.price, amount: line.price.amount * line.quantity }, locale)}`;
	});
	const total = lines.length ? formatMoney({ amount: sumOf(lines), currency: lines[0].price.currency }, locale) : "";
	return [labels.intro, "", ...rows, "", `${labels.total}: ${total}`].join("\n");
}
