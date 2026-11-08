"use client";

import { Marquee } from "@/components/ui/marquee";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { LogosMarqueeContent } from "./schema";

/**
 * A quiet line of customer logos under a small heading. Logos with an image show it (greyed, full colour on hover);
 * the others show the company's name in the display font. The Marquee scrolls them and stops with motion off.
 */
export function LogosMarquee({ content = example, id = "logos", className, headingLevel = 2 }: BlockProps<LogosMarqueeContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="logos-marquee" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
				<Heading id={`${id}-title`} className="text-center text-sm font-medium text-muted-foreground">
					{content.title}
				</Heading>
				<Marquee label={content.title} gap="3rem" className="w-full">
					{content.logos.map((logo) =>
						logo.src ? (
							<img
								key={logo.name}
								src={logo.src}
								alt={logo.name}
								width={logo.width}
								height={logo.height}
								loading="lazy"
								className="h-8 w-auto opacity-70 grayscale transition-[opacity,filter] hover:opacity-100 hover:grayscale-0"
							/>
						) : (
							<span key={logo.name} className="font-display text-2xl font-semibold tracking-display whitespace-nowrap text-muted-foreground">
								{logo.name}
							</span>
						),
					)}
				</Marquee>
			</div>
		</section>
	);
}
