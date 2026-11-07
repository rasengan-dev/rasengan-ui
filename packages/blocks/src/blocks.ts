/*
 * rasengan-blocks (RFC-0008): what a block's component and meta share. Installed as `@/lib/blocks`.
 *
 * - `BlockProps`, the props every block takes, and `heading`, the tag for its heading level.
 * - `BlockMeta`, what a block's meta.ts says.
 * - `formatMoney`, so prices follow the project's locale.
 *
 * No zod here: the field types are in `@/lib/block-fields`, which only schemas import, so rendering a block costs no
 * schema library.
 */

import type { Money } from "./block-fields";

/** A price in the given locale: `formatMoney({ amount: 12, currency: "EUR" }, "fr-FR")` is "12,00 €". */
export function formatMoney(money: Money, locale?: string): string {
	return new Intl.NumberFormat(locale, { style: "currency", currency: money.currency }).format(money.amount);
}

// ---- Meta ----------------------------------------------------------------------------------------------------------

export type BlockFamily = "marketing" | "storefront";

/** What a block's meta.ts says: for people choosing in the docs, and for agents choosing in the catalog. */
export interface BlockMeta {
	/** kebab-case, `<category>-<layout>`, the registry item's name. */
	name: string;
	title: string;
	family: BlockFamily;
	/** One of registry/block-categories.ts for its family. */
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
