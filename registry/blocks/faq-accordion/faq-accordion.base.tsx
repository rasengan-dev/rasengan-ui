"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FaqAccordionContent } from "./schema";

/**
 * The title and contact link on one side, the questions on the other (stacked in a narrow container, side by side from
 * `@4xl`). Closed answers are in the HTML, `hidden="until-found"`: search engines read them, and the browser's
 * find-in-page opens the one that matches.
 */
export function FaqAccordion({ content = example, id = "faq", className, headingLevel = 2 }: BlockProps<FaqAccordionContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="faq-accordion" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl gap-10 @4xl:grid-cols-[2fr_3fr] @4xl:gap-16">
				<div className="flex flex-col gap-3">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					{content.contact && (
						<p className="mt-4 flex flex-wrap items-center gap-3 text-muted-foreground">
							{content.contact.text}
							<Button variant="outline" size="sm" render={<a href={content.contact.cta.href} />} nativeButton={false}>
								{content.contact.cta.label}
							</Button>
						</p>
					)}
				</div>
				<Accordion>
					{content.items.map((item, index) => (
						<AccordionItem key={item.question} value={index}>
							<AccordionTrigger>{item.question}</AccordionTrigger>
							<AccordionContent hiddenUntilFound>{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
