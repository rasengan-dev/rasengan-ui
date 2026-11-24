import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HoverImageList, HoverImageListItem } from "@/components/ui/hover-image-list";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ProjectsListContent } from "./schema";

/**
 * Projects as an index of ruled rows: a number, the title, then the client, kinds and year, and a line about it. The
 * hovered row's cover floats beside the mouse on the village's spring and the other rows step back (HoverImageList);
 * keyboard focus shows the cover beside the row. Each row links to the project. An optional link closes the list.
 */
export function ProjectsList({ content = example, id = "index", className, headingLevel = 2 }: BlockProps<ProjectsListContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="projects-list" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<HoverImageList size="lg" className="mt-10">
					{content.projects.map((project, index) => (
						<HoverImageListItem key={project.href} href={project.href} image={project.cover.src} imageAlt={project.cover.alt}>
							<span className="flex items-baseline gap-4 @2xl:gap-8">
								<span aria-hidden="true" className="w-8 shrink-0 font-sans text-sm font-normal tracking-normal text-muted-foreground tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="@2xl:text-4xl">{project.title}</span>
							</span>
							<small className="flex items-center gap-3">
								{[project.client, project.kinds.join(", "), project.year].filter(Boolean).join(" · ")}
								<ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
							</small>
							<small className="w-full ps-12 @2xl:ps-16">{project.summary}</small>
						</HoverImageListItem>
					))}
				</HoverImageList>
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
