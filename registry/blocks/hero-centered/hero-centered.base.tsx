"use client";

import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonRollingText } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroCenteredContent } from "./schema";

/**
 * The opening of a page: an announcement, the headline (revealed word by word when the page loads), the subcopy, two
 * actions, small print, and a product shot under them. Its heading is the page's `h1` unless `headingLevel` says
 * otherwise. The image loads eagerly: it is above the fold.
 */
export function HeroCentered({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroCenteredContent>) {
	const Heading = heading(headingLevel);
	const { eyebrow, image } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-centered" className={cn("@container px-4 pt-16 pb-12 @3xl:pt-24", className)}>
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
				{eyebrow && (
					<Badge variant="soft" size="lg" className="rounded-pill" render={<a href={eyebrow.href} />}>
						{eyebrow.label}
						<ArrowRightIcon aria-hidden="true" />
					</Badge>
				)}
				<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-6xl">
					<TextReveal as="span" by="words" trigger="mount">
						{content.headline}
					</TextReveal>
				</Heading>
				<TextReveal as="p" by="lines" effect="fade" trigger="mount" delay={0.25} className="max-w-2xl text-lg text-balance text-muted-foreground">
					{content.subline}
				</TextReveal>
				<div className="flex w-full flex-col items-stretch gap-3 @md:w-auto @md:flex-row @md:items-center">
					<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
						<ButtonRollingText>{content.primary.label}</ButtonRollingText>
					</Button>
					{content.secondary && (
						<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
							{content.secondary.label}
						</Button>
					)}
				</div>
				{content.note && <p className="text-sm text-muted-foreground">{content.note}</p>}
			</div>
			{image && (
				<div className="mx-auto mt-12 max-w-5xl rounded-xl border-village bg-card p-1.5 shadow-lg @3xl:mt-16 @3xl:p-2">
					<img
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						fetchPriority="high"
						className="h-auto w-full rounded-lg"
					/>
				</div>
			)}
		</section>
	);
}
