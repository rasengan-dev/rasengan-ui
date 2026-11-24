"use client";

import { useMemo, useState } from "react";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Integration } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { IntegrationsGridContent } from "./schema";

const ALL = "all";

/**
 * Integration cards: the logo, the name (with a "new" badge), the category, a line and a link to its page. Chips filter
 * by category, with how many each holds, and a search filters by name, category and line as you type; every card stays
 * in the HTML, and an empty state says when nothing matches. One column, then two, then three from `@4xl`.
 */
export function IntegrationsGrid({ content = example, id = "integrations", className, headingLevel = 2 }: BlockProps<IntegrationsGridContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { integrations, labels } = content;
	const [category, setCategory] = useState(ALL);
	const [query, setQuery] = useState("");

	const categories = useMemo(() => {
		const counts = new Map<string, number>();
		for (const item of integrations) if (item.category) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
		return [...counts];
	}, [integrations]);
	const words = query.trim().toLowerCase();
	const matches = (item: Integration) =>
		(category === ALL || item.category === category) &&
		(!words || [item.name, item.category, item.description].some((text) => text?.toLowerCase().includes(words)));
	const shown = integrations.filter(matches).length;
	const filtering = category !== ALL || words !== "";

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="integrations-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>

				<div className="mt-10 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
					{categories.length > 1 && (
						<ChipGroup aria-label={labels.filter} value={[category]} onValueChange={(value: string[]) => setCategory(value[0] ?? ALL)} size="sm">
							<Chip value={ALL}>
								{labels.all}
								<span className="text-current/70 tabular-nums">{integrations.length}</span>
							</Chip>
							{categories.map(([name, count]) => (
								<Chip key={name} value={name}>
									{name}
									<span className="text-current/70 tabular-nums">{count}</span>
								</Chip>
							))}
						</ChipGroup>
					)}
					<label className="relative block @3xl:w-64">
						<span className="sr-only">{labels.search}</span>
						<SearchIcon aria-hidden="true" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input type="search" size="sm" placeholder={labels.search} value={query} onChange={(event) => setQuery(event.target.value)} className="ps-9" />
					</label>
				</div>
				<p aria-live="polite" className="sr-only">
					{filtering ? labels.shown.replace("{count}", String(shown)) : ""}
				</p>

				<ul className="m-0 mt-6 grid list-none gap-4 p-0 @2xl:grid-cols-2 @4xl:grid-cols-3">
					{integrations.map((item) => (
						<li key={item.name} hidden={!matches(item)} className="flex flex-col gap-4 rounded-xl border-village bg-card p-5 text-card-foreground shadow-sm backdrop-blur-surface">
							<div className="flex items-start justify-between gap-3">
								<span className="flex size-11 items-center justify-center rounded-lg border-village border-border bg-background">
									{item.logo?.src ? (
										<img src={item.logo.src} alt="" width={item.logo.width} height={item.logo.height} className="size-7" />
									) : (
										<span aria-hidden="true" className="font-display font-semibold">
											{item.name[0]}
										</span>
									)}
								</span>
								{item.category && (
									<Badge variant="outline" tone="neutral">
										{item.category}
									</Badge>
								)}
							</div>
							<div className="flex flex-col gap-1">
								<Name className="flex items-center gap-2 font-display text-lg font-semibold tracking-display case-heading">
									{item.name}
									{item.isNew && (
										<Badge variant="soft" tone="primary" size="sm">
											{labels.isNew}
										</Badge>
									)}
								</Name>
								{item.description && <p className="m-0 text-sm text-pretty text-muted-foreground">{item.description}</p>}
							</div>
							{item.href && (
								<a href={item.href} className="mt-auto inline-flex items-center gap-1.5 self-start text-sm font-medium tone-primary text-tone-text underline-offset-4 hover:underline">
									{labels.more}
									<span className="sr-only">: {item.name}</span>
									<ArrowRightIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
								</a>
							)}
						</li>
					))}
				</ul>
				{shown === 0 && <p className="mt-6 text-center text-muted-foreground">{labels.empty}</p>}
			</div>
		</section>
	);
}
