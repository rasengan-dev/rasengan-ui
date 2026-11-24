"use client";

import { useMemo, useState } from "react";

import { Chip, ChipGroup } from "@/components/ui/chip";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ProjectsGridContent } from "./schema";

const ALL = "all";

/**
 * Projects as cards: the cover, the title, its kinds and year, and a line about it. A row of chips above filters by
 * kind, each with how many projects it holds (the count beside the title is decoration); picking one hides the others in place, so every project stays in the
 * HTML and the page works without JavaScript. One column in a narrow container, two from `@2xl`, three from `@5xl`.
 */
export function ProjectsGrid({ content = example, id = "work", className, headingLevel = 2 }: BlockProps<ProjectsGridContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { projects, labels } = content;
	const [kind, setKind] = useState(ALL);

	// The kinds in the order they first appear, with how many projects each holds.
	const kinds = useMemo(() => {
		const counts = new Map<string, number>();
		for (const project of projects) for (const k of project.kinds) counts.set(k, (counts.get(k) ?? 0) + 1);
		return [...counts];
	}, [projects]);
	const shown = kind === ALL ? projects.length : (kinds.find(([k]) => k === kind)?.[1] ?? 0);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="projects-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-4xl font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
						{content.title}
						<sup aria-hidden="true" className="ms-2 align-super font-sans text-sm font-normal tracking-normal text-muted-foreground tabular-nums normal-case">
							{String(projects.length).padStart(2, "0")}
						</sup>
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>

				{kinds.length > 1 && (
					<ChipGroup
						aria-label={labels.filter}
						value={[kind]}
						onValueChange={(value: string[]) => setKind(value[0] ?? ALL)}
						size="sm"
						className="mt-8"
					>
						<Chip value={ALL}>
							{labels.all}
							<span className="text-current/70 tabular-nums">{projects.length}</span>
						</Chip>
						{kinds.map(([k, count]) => (
							<Chip key={k} value={k}>
								{k}
								<span className="text-current/70 tabular-nums">{count}</span>
							</Chip>
						))}
					</ChipGroup>
				)}
				<p aria-live="polite" className="sr-only">
					{kind === ALL ? "" : labels.shown.replace("{count}", String(shown))}
				</p>

				<ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 @2xl:grid-cols-2 @5xl:grid-cols-3">
					{projects.map((project) => (
						<li key={project.href} hidden={kind !== ALL && !project.kinds.includes(kind)}>
							<a href={project.href} className="group flex flex-col gap-3 rounded-xl outline-none focus-visible:focus-ring">
								<span className="block overflow-hidden rounded-xl bg-muted">
									<img
										src={project.cover.src}
										alt={project.cover.alt}
										width={project.cover.width}
										height={project.cover.height}
										loading="lazy"
										className="aspect-[4/3] w-full object-cover transition-[scale] duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
									/>
								</span>
								<span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
									<Title className="font-display text-xl font-semibold tracking-display case-heading group-hover:underline group-hover:underline-offset-4">
										{project.title}
									</Title>
									<span className="text-sm text-muted-foreground">
										{[project.client, project.kinds.join(", "), project.year].filter(Boolean).join(" · ")}
									</span>
								</span>
								<span className="text-sm text-muted-foreground">{project.summary}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
