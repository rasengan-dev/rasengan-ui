import { ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ServicesListContent } from "./schema";

/**
 * A heading and the services as a list of rows (one column in a narrow container, two from `@3xl`): name and price on
 * one line, what it includes and how long it takes under them. One booking action for all, under the list.
 */
export function ServicesList({ content = example, id = "services", className, headingLevel = 2 }: BlockProps<ServicesListContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="services-list" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="flex max-w-2xl flex-col gap-3">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-10 grid border-t-(length:--border-width) @3xl:grid-cols-2 @3xl:gap-x-12">
					{content.services.map((service) => (
						<li key={service.name} className="flex flex-col gap-1.5 border-b-(length:--border-width) py-5">
							<div className="flex items-baseline justify-between gap-4">
								<Name className="font-display text-lg font-semibold tracking-display">{service.name}</Name>
								<span className="font-medium whitespace-nowrap tabular-nums">{formatMoney(service.price, content.locale)}</span>
							</div>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
								{service.description && <p>{service.description}</p>}
								{service.duration && (
									<span className="flex items-center gap-1.5 tabular-nums">
										<ClockIcon aria-hidden="true" className="size-3.5" />
										{service.duration} {content.minutes}
									</span>
								)}
							</div>
						</li>
					))}
				</ul>
				{(content.book || content.note) && (
					<div className="mt-8 flex flex-col items-start gap-4 @2xl:flex-row @2xl:items-center @2xl:justify-between">
						{content.note && <p className="max-w-xl text-sm text-muted-foreground">{content.note}</p>}
						{content.book && (
							<Button size="lg" render={<a href={content.book.href} />} nativeButton={false}>
								{content.book.label}
							</Button>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
