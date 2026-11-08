/*
 * rasengan-blocks (RFC-0008): what a block's component and meta share. Installed as `@/lib/blocks`.
 *
 * - `BlockProps`, the props every block takes, and `heading`, the tag for its heading level.
 * - `BlockMeta`, what a block's meta.ts says, and `familiesOf`, its families as a list.
 * - `formatMoney` and `moneyFormat`, so prices follow the project's locale.
 * - `messageUrl`, the link that opens a WhatsApp chat, a text or an email with a message written (RFC-0009).
 *
 * No zod here: the field types are in `@/lib/block-fields`, which only schemas import, so rendering a block costs no
 * schema library.
 */

import type { FormChannel, Money } from "./block-fields";

/**
 * A price in the given locale, without cents when it has none: `formatMoney({ amount: 12, currency: "EUR" }, "fr-FR")`
 * is "12 €", `{ amount: 12.5, … }` is "12,50 €".
 */
export function formatMoney(money: Money, locale?: string): string {
	return new Intl.NumberFormat(locale, moneyFormat(money)).format(money.amount);
}

/** The `Intl.NumberFormat` options `formatMoney` uses, for a NumberRoll that shows a price. */
export function moneyFormat(money: Money): Intl.NumberFormatOptions {
	const whole = Number.isInteger(money.amount);
	return { style: "currency", currency: money.currency, ...(whole ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : {}) };
}

/**
 * The link that opens the visitor's WhatsApp, texts or mail app, addressed to the business, with `text` written for
 * them to send: forms and order links send by message, with no backend (RFC-0009).
 */
export function messageUrl(channel: FormChannel, text: string, subject?: string): string {
	const number = channel.to.replace(/[^0-9]/g, "");
	if (channel.kind === "whatsapp") return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
	if (channel.kind === "sms") return `sms:+${number}?body=${encodeURIComponent(text)}`;
	return `mailto:${channel.to}?${subject ? `subject=${encodeURIComponent(subject)}&` : ""}body=${encodeURIComponent(text)}`;
}

// ---- Meta ----------------------------------------------------------------------------------------------------------

export type BlockFamily = "marketing" | "storefront";

/** What a block's meta.ts says: for people choosing in the docs, and for agents choosing in the catalog. */
export interface BlockMeta {
	/** kebab-case, `<category>-<layout>`, the registry item's name. */
	name: string;
	title: string;
	/** Its family, or its families when it serves both (RFC-0009): `["marketing", "storefront"]`. */
	family: BlockFamily | readonly [BlockFamily, ...BlockFamily[]];
	/** One of registry/block-categories.ts, a category of each of its families. */
	category: string;
	status: "beta" | "stable";
	/** The day it was published, `YYYY-MM-DD`. */
	added?: string;
	/** What it looks like and does, at most 160 characters. */
	summary: string;
	/** When to choose it, at most 160 characters. */
	useWhen: string;
	avoidWhen?: string;
	layout: { columns: "stacked" | "split" | "grid" | "carousel"; aboveTheFold?: boolean };
	content: { images: number; minWords: number; maxWords: number };
	/** The registry components it uses: its registryDependencies. */
	components: readonly string[];
	/** Other npm packages its code imports (zod and the components' are added). */
	dependencies?: readonly string[];
	/** Blocks that read well right after this one. */
	pairsWith?: readonly string[];
}

/** A block's families as a list, whether its meta names one or several: `familiesOf(meta).includes("storefront")`. */
export function familiesOf(meta: Pick<BlockMeta, "family">): BlockFamily[] {
	return typeof meta.family === "string" ? [meta.family] : [...meta.family];
}

/** The props every block takes (RFC-0008, "Rules for a block"). */
export interface BlockProps<Content> {
	content?: Content;
	/** The section's id, for anchor links. */
	id?: string;
	/** Spacing overrides. */
	className?: string;
	/** The heading's level: a hero's is 1, other blocks' 2; 1 when this block opens a page without a hero. */
	headingLevel?: 1 | 2 | 3;
}

/** The heading tag for a level: `const Heading = heading(headingLevel ?? 2)`. */
export const heading = (level: 1 | 2 | 3) => (`h${level}` as const);
