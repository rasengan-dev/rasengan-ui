"use client";

import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroSplitContent } from "./schema";

/* Where each chip sits over the photo from `@3xl`: lower start, upper end, lower end. */
const corners = ["@3xl:-start-8 @3xl:bottom-10", "@3xl:-end-6 @3xl:top-10", "@3xl:-end-10 @3xl:bottom-24"];

/**
 * The opening of a page in two halves: the headline (revealed word by word on load), the subcopy and two actions on
 * one side, a portrait photo on the other, with up to three figure chips over its corners. Below `@3xl` the halves
 * stack and the chips line up under the photo. Its heading is the page's `h1` unless `headingLevel` says otherwise;
 * the photo loads eagerly, it is above the fold.
 */
export function HeroSplit({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroSplitContent>) {
	const Heading = heading(headingLevel);
	const { image, chips } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-split" className={cn("@container px-4 pt-12 pb-16 @3xl:pt-20 @3xl:pb-24", className)}>
			<div className="mx-auto grid max-w-6xl items-center gap-12 @3xl:grid-cols-2 @3xl:gap-16">
				<div className="flex flex-col items-start gap-6">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-6xl">
						<TextReveal as="span" by="words" trigger="mount">
							{content.headline}
						</TextReveal>
					</Heading>
					<TextReveal as="p" by="lines" effect="fade" trigger="mount" delay={0.25} className="max-w-xl text-lg text-muted-foreground">
						{content.subline}
					</TextReveal>
					<div className="flex w-full flex-col gap-3 @md:w-auto @md:flex-row">
						<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
							{content.primary.label}
						</Button>
						{content.secondary && (
							<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
								{content.secondary.label}
							</Button>
						)}
					</div>
				</div>
				<div className="relative mx-auto w-full max-w-md @3xl:max-w-none">
					<img
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						fetchPriority="high"
						className="aspect-[4/5] w-full rounded-xl object-cover shadow-lg"
					/>
					{chips && chips.length > 0 && (
						<ul className="mt-4 grid grid-cols-3 gap-2 @3xl:contents">
							{chips.map((chip, index) => (
								<li
									key={chip.label}
									className={cn(
										"flex flex-col rounded-lg border-village bg-card px-3 py-2 text-card-foreground shadow-md backdrop-blur-surface @3xl:absolute @3xl:max-w-44 @3xl:px-4 @3xl:py-3",
										corners[index],
									)}
								>
									<span className="font-display text-xl font-semibold tabular-nums tone-primary text-tone-text @3xl:text-2xl">{chip.value}</span>
									<span className="text-xs text-muted-foreground @3xl:text-sm">{chip.label}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}
