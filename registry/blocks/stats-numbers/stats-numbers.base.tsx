"use client";

import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Stat } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { StatsNumbersContent } from "./schema";

/**
 * The stat's format as `Intl.NumberFormat` options. The fraction digits are explicit: browsers and Node disagree on
 * the defaults for compact currency ("$312.0M" or "$312M"), which would break hydration.
 */
function formatOf(stat: Stat): Intl.NumberFormatOptions {
	switch (stat.format) {
		case "percent":
			return { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		case "currency":
			return { style: "currency", currency: stat.currency ?? "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		case "compact":
			return { notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		default:
			return {};
	}
}

/**
 * A heading and a row of large numbers (`<dl>`), two columns in a narrow container, one row from `@3xl`. Each number
 * rolls into place with NumberRoll when it scrolls into view, and is simply there with motion off.
 */
export function StatsNumbers({ content = example, id = "stats", className, headingLevel = 2 }: BlockProps<StatsNumbersContent>) {
	const Heading = heading(headingLevel);
	const columns = content.stats.length === 3 ? "@3xl:grid-cols-3" : content.stats.length === 2 ? "@3xl:grid-cols-2" : "@3xl:grid-cols-4";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="stats-numbers" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<dl className={cn("mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border-village bg-border", columns)}>
					{content.stats.map((stat) => (
						<div key={stat.label} className="flex flex-col-reverse gap-2 bg-card p-6 text-center @3xl:p-8">
							<dt className="text-sm text-muted-foreground">{stat.label}</dt>
							<dd className="font-display text-3xl font-semibold tracking-display @2xl:text-5xl">
								<NumberRoll value={stat.value} format={formatOf(stat)} locale={content.locale} />
							</dd>
						</div>
					))}
				</dl>
				{content.source && <p className="mt-4 text-center text-xs text-muted-foreground">{content.source}</p>}
			</div>
		</section>
	);
}
