"use client";

import { CheckIcon } from "lucide-react";

import { Button, ButtonRollingText } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroPhotoContent } from "./schema";

/**
 * The opening of a local business's site: text on one side, a large photo on the other (photo first in a narrow
 * container, side by side from `@4xl`). The headline is the page's `h1` and reveals word by word when the page loads;
 * the photo loads eagerly, it is above the fold.
 */
export function HeroPhoto({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroPhotoContent>) {
	const Heading = heading(headingLevel);
	const { image } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-photo" className={cn("@container px-4 py-12 @4xl:py-20", className)}>
			<div className="mx-auto grid max-w-6xl items-center gap-10 @4xl:grid-cols-2 @4xl:gap-16">
				<div className="flex flex-col items-start gap-5 @4xl:order-first">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-5xl @5xl:text-6xl">
						<TextReveal as="span" by="words" trigger="mount">
							{content.headline}
						</TextReveal>
					</Heading>
					<p className="max-w-xl text-lg text-muted-foreground">{content.subline}</p>
					<div className="flex w-full flex-col gap-3 @md:w-auto @md:flex-row">
						<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
							<ButtonRollingText>{content.primary.label}</ButtonRollingText>
						</Button>
						{content.secondary && (
							<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
								{content.secondary.label}
							</Button>
						)}
					</div>
					{content.highlights && content.highlights.length > 0 && (
						<ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
							{content.highlights.map((highlight) => (
								<li key={highlight} className="flex items-center gap-1.5">
									<CheckIcon aria-hidden="true" className="size-4 tone-primary text-tone-text" />
									{highlight}
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="order-first overflow-hidden rounded-xl border-village shadow-lg @4xl:order-last">
					<img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" className="aspect-[4/3] h-auto w-full object-cover" />
				</div>
			</div>
		</section>
	);
}
