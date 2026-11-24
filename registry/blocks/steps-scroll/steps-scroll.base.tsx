"use client";

import { StickyScroll, StickyScrollItem, StickyScrollList, StickyScrollMedia, StickyScrollStage } from "@/components/ui/sticky-scroll";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { StepsScrollContent } from "./schema";

/**
 * Numbered steps that tell the product's story as the page scrolls, on `sticky-scroll` (RFC-0010). From `@3xl`, the
 * steps run down one column and a stage beside them stays in view: the step whose text crosses the middle of the
 * screen lights up (its number filled, its title in the foreground colour; the others' titles are muted, never faded
 * below contrast) and its image takes the stage, as the village changes it (a cut, a cross-fade, a slide). Below
 * `@3xl`, with reduced motion or at intensity 0, each step shows its own image under its text and nothing moves. On the
 * server and before the page has read the scroll, the first step is the current one.
 */
export function StepsScroll({ content = example, id = "steps", className, headingLevel = 2 }: BlockProps<StepsScrollContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="steps-scroll" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<StickyScroll className="mt-12">
					<StickyScrollList>
						{content.steps.map((step, index) => (
							<StickyScrollItem key={step.title} className="flex gap-4">
								<span
									aria-hidden="true"
									className="flex size-9 shrink-0 items-center justify-center rounded-full border-(length:--border-width) font-display font-semibold tabular-nums transition-colors duration-slow group-data-current/sticky-item:border-transparent group-data-current/sticky-item:tone-primary group-data-current/sticky-item:bg-tone group-data-current/sticky-item:text-tone-foreground"
								>
									{index + 1}
								</span>
								<div className="flex flex-col gap-2">
									<Title className="font-display text-xl font-semibold tracking-display case-heading transition-colors duration-slow @3xl:in-data-[layout=staged]:text-muted-foreground @3xl:in-data-[layout=staged]:group-data-current/sticky-item:text-foreground">
										{step.title}
									</Title>
									<p className="text-muted-foreground">{step.description}</p>
									<StickyScrollMedia>
										<img
											src={step.image.src}
											alt={step.image.alt}
											width={step.image.width}
											height={step.image.height}
											loading="lazy"
											className="w-full rounded-xl border-village shadow-sm"
										/>
									</StickyScrollMedia>
								</div>
							</StickyScrollItem>
						))}
					</StickyScrollList>
					<StickyScrollStage>
						{content.steps.map((step) => (
							<img key={step.title} src={step.image.src} alt="" width={step.image.width} height={step.image.height} loading="lazy" className="w-full rounded-xl border-village shadow-md" />
						))}
					</StickyScrollStage>
				</StickyScroll>
			</div>
		</section>
	);
}
