"use client";

import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ShowcaseTabsContent } from "./schema";

/**
 * The product, one part at a time: tabs above a panel that puts a part's promise, a few ticked facts and a link beside
 * its screenshot (stacked below `@3xl`). Every panel stays in the HTML (`keepMounted`), so search engines and the
 * browser's find-in-page reach all of them.
 */
export function ShowcaseTabs({ content = example, id = "showcase", className, headingLevel = 2 }: BlockProps<ShowcaseTabsContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="showcase-tabs" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<Tabs defaultValue={0} className="mt-10 items-center">
					<TabsList aria-label={content.title} className="max-w-full overflow-x-auto">
						{content.tabs.map((tab, index) => (
							<TabsTrigger key={tab.label} value={index}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					{content.tabs.map((tab, index) => (
						<TabsContent key={tab.label} value={index} keepMounted className="mt-10 w-full">
							<div className="grid items-center gap-8 @3xl:grid-cols-[2fr_3fr] @3xl:gap-12">
								<div className="flex flex-col gap-4">
									<Title className="font-display text-2xl font-semibold tracking-display text-balance case-heading">{tab.title}</Title>
									<p className="text-muted-foreground">{tab.description}</p>
									{tab.points && tab.points.length > 0 && (
										<ul className="flex flex-col gap-2">
											{tab.points.map((point) => (
												<li key={point} className="flex items-start gap-2 text-sm">
													<CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 tone-primary text-tone-text" />
													{point}
												</li>
											))}
										</ul>
									)}
									{tab.cta && (
										<Button variant="outline" className="self-start" render={<a href={tab.cta.href} />} nativeButton={false}>
											{tab.cta.label}
										</Button>
									)}
								</div>
								<img
									src={tab.image.src}
									alt={tab.image.alt}
									width={tab.image.width}
									height={tab.image.height}
									loading="lazy"
									className="w-full rounded-xl border-village shadow-md"
								/>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
