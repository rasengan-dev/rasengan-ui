import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FeaturesAlternatingContent } from "./schema";

/**
 * Features told one at a time, as rows that alternate: text then image, then image then text, from `@3xl`; stacked
 * (text first) below. Each row has a label, a title (a heading one level below the block's), a description, up to
 * three ticked facts and a link.
 */
export function FeaturesAlternating({ content = example, id = "features", className, headingLevel = 2 }: BlockProps<FeaturesAlternatingContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="features-alternating" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="mt-14 flex flex-col gap-16 @3xl:mt-20 @3xl:gap-24">
					{content.rows.map((row, index) => (
						<div key={row.title} className="grid items-center gap-8 @3xl:grid-cols-2 @3xl:gap-16">
							<div className={cn("flex flex-col gap-4", index % 2 === 1 && "@3xl:order-last")}>
								{row.label && <p className="text-sm font-medium tone-primary text-tone-text">{row.label}</p>}
								<Title className="font-display text-2xl font-semibold tracking-display text-balance case-heading @2xl:text-3xl">{row.title}</Title>
								<p className="text-lg text-muted-foreground">{row.description}</p>
								{row.points && row.points.length > 0 && (
									<ul className="flex flex-col gap-2">
										{row.points.map((point) => (
											<li key={point} className="flex items-start gap-2">
												<CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 tone-primary text-tone-text" />
												{point}
											</li>
										))}
									</ul>
								)}
								{row.cta && (
									<Button variant="outline" className="self-start" render={<a href={row.cta.href} />} nativeButton={false}>
										{row.cta.label}
									</Button>
								)}
							</div>
							<img
								src={row.image.src}
								alt={row.image.alt}
								width={row.image.width}
								height={row.image.height}
								loading="lazy"
								className="w-full rounded-xl border-village shadow-md"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
