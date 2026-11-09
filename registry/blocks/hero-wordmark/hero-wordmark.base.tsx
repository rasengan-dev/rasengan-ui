"use client";

import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroWordmarkContent } from "./schema";

/**
 * The word's size, from the block's width (`cqi`) and its length, so it fills the width on one line; never below
 * 3.5rem, where a long word wraps to a second line rather than shrinking out of reach (RFC-0009, decision 7).
 */
const wordSize = (word: string) => `clamp(3.5rem, ${Math.min(150 / Math.max(word.length, 1), 34).toFixed(1)}cqi, 22rem)`;

/**
 * A heading and its actions, a wide photo, and under it the brand (or one word) set across the full width in the
 * display face, the photo overlapping its top. The word is decoration (hidden from screen readers, the heading carries
 * the meaning); it reveals letter by letter on load. Works for a product (the brand) and a place (its name), so it is
 * in both families.
 */
export function HeroWordmark({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroWordmarkContent>) {
	const Heading = heading(headingLevel);
	const { image } = content;
	return (
		<section
			id={id}
			aria-labelledby={`${id}-title`}
			data-slot="block"
			data-block="hero-wordmark"
			className={cn("@container overflow-hidden px-4 pt-12 @3xl:pt-20", className)}
		>
			<div className="mx-auto flex max-w-6xl flex-col gap-6 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:gap-12">
				<div className="flex max-w-2xl flex-col gap-4">
					<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
						<TextReveal as="span" by="words" trigger="mount">
							{content.headline}
						</TextReveal>
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="flex shrink-0 flex-col gap-3 @md:flex-row">
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
			<div className="relative z-10 mx-auto mt-10 max-w-6xl">
				<img
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
					fetchPriority="high"
					className="aspect-[16/9] w-full rounded-xl border-village object-cover shadow-lg"
				/>
			</div>
			<div aria-hidden="true" className="mx-auto -mt-[0.3em] max-w-6xl text-center" style={{ fontSize: wordSize(content.word) }}>
				<TextReveal
					as="span"
					by="chars"
					effect="mask"
					trigger="mount"
					delay={0.3}
					className="block font-display leading-[0.85] font-bold tracking-display text-balance break-words case-heading tone-primary text-tone-text"
				>
					{content.word}
				</TextReveal>
			</div>
		</section>
	);
}
