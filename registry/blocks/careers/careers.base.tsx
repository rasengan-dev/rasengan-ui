"use client";

import { useMemo, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chip, ChipGroup } from "@/components/ui/chip";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CareersContent } from "./schema";

const ALL = "all";

/**
 * Open roles, grouped by team (each team with how many roles it has), as ruled rows: the title, where, the kind of
 * position, and a link to the role. Chips filter by team; every role stays in the HTML. With no role open, the block
 * says so in `labels.none`. An optional link closes it, for people who do not see their role.
 */
export function Careers({ content = example, id = "careers", className, headingLevel = 2 }: BlockProps<CareersContent>) {
	const Heading = heading(headingLevel);
	const Team = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { positions, labels } = content;
	const [team, setTeam] = useState(ALL);

	const teams = useMemo(() => {
		const groups = new Map<string, typeof positions>();
		for (const position of positions) groups.set(position.team, [...(groups.get(position.team) ?? []), position]);
		return [...groups];
	}, [positions]);

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="careers" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-4xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>

				{positions.length === 0 ? (
					<p className="mt-10 rounded-xl bg-muted p-6 text-muted-foreground">{labels.none}</p>
				) : (
					<>
						{teams.length > 1 && (
							<ChipGroup aria-label={labels.filter} value={[team]} onValueChange={(value: string[]) => setTeam(value[0] ?? ALL)} size="sm" className="mt-10">
								<Chip value={ALL}>
									{labels.all}
									<span className="text-current/70 tabular-nums">{positions.length}</span>
								</Chip>
								{teams.map(([name, roles]) => (
									<Chip key={name} value={name}>
										{name}
										<span className="text-current/70 tabular-nums">{roles.length}</span>
									</Chip>
								))}
							</ChipGroup>
						)}
						<div className="mt-8 flex flex-col gap-10">
							{teams.map(([name, roles]) => (
								<section key={name} hidden={team !== ALL && team !== name} aria-label={name}>
									<Team className="flex items-baseline gap-2 font-display text-lg font-semibold tracking-display case-heading">
										{name}
										<span className="font-sans text-sm font-normal tracking-normal text-muted-foreground tabular-nums normal-case">{roles.length}</span>
									</Team>
									<ul className="m-0 mt-3 list-none border-t-(length:--border-width) border-border p-0">
										{roles.map((role) => (
											<li key={role.href} className="border-b-(length:--border-width) border-border">
												<a
													href={role.href}
													className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 no-underline outline-none focus-visible:focus-ring"
												>
													<span className="flex flex-col gap-0.5">
														<span className="font-medium text-foreground group-hover:underline group-hover:underline-offset-4">{role.title}</span>
														<span className="text-sm text-muted-foreground">{role.place}</span>
													</span>
													<span className="flex items-center gap-3">
														<Badge variant="outline" tone="neutral">
															{labels.kinds[role.kind]}
														</Badge>
														<span className="sr-only">{labels.view}</span>
														<ArrowRightIcon aria-hidden="true" className="size-4 text-muted-foreground transition-transform duration-fast group-hover:translate-x-1 motion-reduce:transition-none rtl:rotate-180" />
													</span>
												</a>
											</li>
										))}
									</ul>
								</section>
							))}
						</div>
					</>
				)}
				{content.cta && (
					<div className="mt-10">
						<Button variant="outline" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
