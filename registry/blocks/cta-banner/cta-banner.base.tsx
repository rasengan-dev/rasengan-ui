"use client";

import { Button, ButtonRollingText } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CtaBannerContent } from "./schema";

/**
 * A framed call to action: the headline reveals word by word (or is simply there with motion off), a line of
 * reassurance, a primary and an optional secondary action, small print. It responds to its container's width, not the
 * window's.
 */
export function CtaBanner({ content = example, id = "cta", className, headingLevel = 2 }: BlockProps<CtaBannerContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="cta-banner" className={cn("@container px-4 py-16", className)}>
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-xl border-village bg-card p-8 text-center text-card-foreground shadow-md @2xl:p-14">
				<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
					<TextReveal as="span" by="words">
						{content.headline}
					</TextReveal>
				</Heading>
				{content.subline && <p className="max-w-2xl text-balance text-muted-foreground @2xl:text-lg">{content.subline}</p>}
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
		</section>
	);
}
