"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeviceFrame } from "@/components/ui/device-frame";
import { type BlockProps, heading } from "@/lib/blocks";
import { useMotion, useScrollProgress } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroProductContent } from "./schema";

/**
 * How far the screen is from resting, 1 to 0: at rest once its middle reaches the middle of the viewport. Before the
 * scroll is measured, it reads as half way, so nothing jumps when it starts.
 */
const away = "clamp(0, 1 - var(--scroll-progress, 0.5) * 2, 1)";

/**
 * A stage: a soft panel of the primary colour holding a centred pill, headline, line, actions and note, and the
 * product's screen in a browser frame (DeviceFrame) rising out of it, wider than the text and cut by the panel's
 * bottom edge, where it fades. As the page scrolls the screen settles: it grows and rises into place (intensity 2) and,
 * from intensity 3, straightens from a tilt, as it reaches the middle of the viewport. With reduced motion it rests.
 * The screenshot keeps its `alt` and loads first.
 */
export function HeroProduct({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroProductContent>) {
	const Heading = heading(headingLevel);
	const { screen } = content;
	const ref = React.useRef<HTMLDivElement>(null);
	const { allows } = useMotion(ref);
	const moves = allows(2);
	const tilts = allows(3);
	useScrollProgress(ref, { range: "cover", enabled: moves });
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-product" className={cn("@container px-2 pt-2 @3xl:px-4 @3xl:pt-4", className)}>
			<div className="relative isolate overflow-clip rounded-2xl bg-linear-to-b from-primary/15 via-primary/5 to-transparent px-4 pt-14 @3xl:pt-20">
				<div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
				<div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
					{content.badge && (
						<Badge variant="outline" tone="primary" className="bg-background/70">
							{content.badge}
						</Badge>
					)}
					<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-5xl @5xl:text-6xl">
						{content.headline}
					</Heading>
					{content.subline && <p className="m-0 max-w-xl text-lg text-balance text-muted-foreground">{content.subline}</p>}
					<div className="flex w-full flex-col justify-center gap-3 @md:w-auto @md:flex-row">
						<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
							{content.primary.label}
						</Button>
						{content.secondary && (
							<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
								{content.secondary.label}
							</Button>
						)}
					</div>
					{content.note && <p className="m-0 text-sm text-muted-foreground">{content.note}</p>}
				</div>
				{/* Measured, never moved: the screen inside it settles. Its bottom is cut by the stage and fades. */}
				<div
					ref={ref}
					className="relative mx-auto mt-12 max-h-[min(38rem,62cqi)] max-w-6xl overflow-clip px-2 pt-2 perspective-distant mask-b-from-70% @3xl:mt-16 @3xl:px-6 @3xl:pt-6"
				>
					<div
						data-slot="hero-product-screen"
						className="origin-bottom"
						style={
							moves
								? {
										scale: `calc(1 - ${away} * 0.1)`,
										translate: `0 calc(${away} * 3rem)`,
										rotate: tilts ? `x calc(${away} * 18deg)` : undefined,
									}
								: undefined
						}
					>
						<DeviceFrame url={content.url}>
							<img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} fetchPriority="high" />
						</DeviceFrame>
					</div>
				</div>
			</div>
		</section>
	);
}
