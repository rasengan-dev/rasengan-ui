"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Release } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ChangelogContent } from "./schema";

const kinds = [
	{ key: "added", tone: "success" },
	{ key: "improved", tone: "info" },
	{ key: "fixed", tone: "warning" },
] as const;
type Kind = (typeof kinds)[number]["key"];
const ALL = "all";

const has = (release: Release, kind: Kind) => (release[kind]?.length ?? 0) > 0;

/** "2026-11-17" written in the locale, at noon UTC so no time zone moves it to another day. */
const dateOf = (iso: string, locale?: string) =>
	new Intl.DateTimeFormat(locale ?? "en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));

/**
 * A product's releases, newest first: the version and date in a rail (beside the release from `@3xl`), then the title,
 * a screenshot, and what was added, improved and fixed, each list under its badge. Chips above filter by kind, with how
 * many releases hold each; every release stays in the HTML. Each version is an anchor (`#v2-8-0`).
 */
export function Changelog({ content = example, id = "changelog", className, headingLevel = 2 }: BlockProps<ChangelogContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { releases, labels } = content;
	const [kind, setKind] = useState<Kind | typeof ALL>(ALL);
	const shown = releases.filter((release) => kind === ALL || has(release, kind));
	const anchor = (version: string) => `v${version.replace(/^v/, "").replace(/[^a-zA-Z0-9]+/g, "-")}`;

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="changelog" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="flex max-w-2xl flex-col items-start gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					{content.subscribe && (
						<Button variant="outline" className="mt-2" render={<a href={content.subscribe.href} />} nativeButton={false}>
							{content.subscribe.label}
						</Button>
					)}
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-between gap-3">
					<ChipGroup aria-label={labels.filter} value={[kind]} onValueChange={(value: string[]) => setKind((value[0] as Kind) ?? ALL)} size="sm">
						<Chip value={ALL}>
							{labels.all}
							<span className="text-current/70 tabular-nums">{releases.length}</span>
						</Chip>
						{kinds.map(({ key }) => {
							const count = releases.filter((release) => has(release, key)).length;
							return count > 0 ? (
								<Chip key={key} value={key}>
									{labels[key]}
									<span className="text-current/70 tabular-nums">{count}</span>
								</Chip>
							) : null;
						})}
					</ChipGroup>
					<p aria-live="polite" className="m-0 font-mono text-xs text-muted-foreground">
						{labels.shown.replace("{count}", String(shown.length)).replace("{total}", String(releases.length))}
					</p>
				</div>

				<ol className="m-0 mt-8 flex list-none flex-col p-0">
					{releases.map((release) => (
						<li
							key={release.version}
							id={anchor(release.version)}
							hidden={kind !== ALL && !has(release, kind)}
							className="grid scroll-mt-20 gap-4 border-t-(length:--border-width) border-border py-10 @3xl:grid-cols-[12rem_1fr] @3xl:gap-10"
						>
							<div className="flex flex-col gap-1 @3xl:sticky @3xl:top-20 @3xl:self-start">
								<a href={`#${anchor(release.version)}`} className="font-mono text-2xl font-semibold text-foreground no-underline hover:underline">
									{release.version}
								</a>
								<time dateTime={release.date} className="text-sm text-muted-foreground">
									{dateOf(release.date, content.locale)}
								</time>
							</div>
							<article className="flex flex-col gap-5">
								<Title className="font-display text-2xl font-semibold tracking-display text-balance case-heading">{release.title}</Title>
								{release.image && (
									<img
										src={release.image.src}
										alt={release.image.alt}
										width={release.image.width}
										height={release.image.height}
										loading="lazy"
										className="w-full rounded-xl border-village bg-muted"
									/>
								)}
								{kinds.map(({ key, tone }) =>
									has(release, key) ? (
										<div key={key} className="flex flex-col items-start gap-2">
											<Badge variant="soft" tone={tone}>
												{labels[key]}
											</Badge>
											<ul className="m-0 flex list-disc flex-col gap-1.5 ps-5 text-pretty marker:text-muted-foreground">
												{release[key]?.map((line) => (
													<li key={line}>{line}</li>
												))}
											</ul>
										</div>
									) : null,
								)}
								{release.href && (
									<a href={release.href} className="inline-flex items-center gap-1.5 self-start text-sm font-medium tone-primary text-tone-text underline-offset-4 hover:underline">
										{labels.more}
										<span className="sr-only">: {release.version}</span>
										<ArrowRightIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
									</a>
								)}
							</article>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
