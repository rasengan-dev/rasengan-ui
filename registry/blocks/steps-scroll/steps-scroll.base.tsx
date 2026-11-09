"use client";

import { useEffect, useRef, useState } from "react";

import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { StepsScrollContent } from "./schema";

/**
 * Numbered steps that tell the product's story as the page scrolls. From `@3xl`, the steps run down one column and a
 * stage beside them stays in view: the step whose text crosses the middle of the screen lights up (its number filled,
 * its title in the foreground colour; the others' titles are muted, never faded below contrast) and its image takes
 * the stage, cross-fading at the village's slow duration (with motion off, it simply swaps). Below `@3xl`, each step
 * shows its own image under its text and nothing moves. On the server and before the page has read the scroll, the
 * first step is the current one.
 */
export function StepsScroll({ content = example, id = "steps", className, headingLevel = 2 }: BlockProps<StepsScrollContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const [current, setCurrent] = useState(0);
	const steps = useRef<(HTMLLIElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index));
			},
			{ rootMargin: "-45% 0px -45% 0px" },
		);
		for (const step of steps.current) if (step) observer.observe(step);
		return () => observer.disconnect();
	}, [content.steps.length]);

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
				<div className="mt-12 grid gap-12 @3xl:grid-cols-[2fr_3fr]">
					<ol className="flex flex-col gap-12 @3xl:gap-0">
						{content.steps.map((step, index) => (
							<li
								key={step.title}
								ref={(element) => {
									steps.current[index] = element;
								}}
								data-index={index}
								data-current={index === current || undefined}
								aria-current={index === current ? "step" : undefined}
								className="group/step flex gap-4 @3xl:min-h-[60vh] @3xl:items-center"
							>
								<span
									aria-hidden="true"
									className="flex size-9 shrink-0 items-center justify-center rounded-full border-(length:--border-width) font-display font-semibold tabular-nums transition-colors duration-slow group-data-current/step:border-transparent group-data-current/step:tone-primary group-data-current/step:bg-tone group-data-current/step:text-tone-foreground"
								>
									{index + 1}
								</span>
								<div className="flex flex-col gap-2">
									<Title className="font-display text-xl font-semibold tracking-display case-heading transition-colors duration-slow @3xl:text-muted-foreground @3xl:group-data-current/step:text-foreground">
										{step.title}
									</Title>
									<p className="text-muted-foreground">{step.description}</p>
									<img
										src={step.image.src}
										alt={step.image.alt}
										width={step.image.width}
										height={step.image.height}
										loading="lazy"
										className="mt-4 w-full rounded-xl border-village shadow-sm @3xl:hidden"
									/>
								</div>
							</li>
						))}
					</ol>
					<div aria-hidden="true" className="hidden @3xl:block">
						<div className="sticky top-[calc(50vh-13rem)] grid">
							{content.steps.map((step, index) => (
								<img
									key={step.title}
									src={step.image.src}
									alt=""
									width={step.image.width}
									height={step.image.height}
									loading="lazy"
									className={cn(
										"col-start-1 row-start-1 w-full rounded-xl border-village shadow-md transition-opacity duration-slow",
										index === current ? "opacity-100" : "opacity-0",
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
