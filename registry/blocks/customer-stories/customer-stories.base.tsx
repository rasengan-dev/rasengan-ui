import { ArrowRightIcon } from "lucide-react";

import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Stat } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CustomerStoriesContent } from "./schema";

/** The stat's format as `Intl.NumberFormat` options, with explicit fraction digits so the server and the browser agree. */
function formatOf(stat: Stat): Intl.NumberFormatOptions {
	switch (stat.format) {
		case "percent":
			return { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		case "currency":
			return { style: "currency", currency: stat.currency ?? "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		case "compact":
			return { notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
		default:
			return {};
	}
}

/**
 * A heading and one card per customer: their logo and name, the number that moved (rolling into place) with its label,
 * the quote, the person who said it, and a link to the full story. One column in a narrow container, then two, then
 * three from `@5xl`.
 */
export function CustomerStories({ content = example, id = "customers", className, headingLevel = 2 }: BlockProps<CustomerStoriesContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="customer-stories" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="m-0 mt-10 grid list-none gap-4 p-0 @2xl:grid-cols-2 @5xl:grid-cols-3">
					{content.stories.map((story) => (
						<li key={story.name} className="flex flex-col gap-6 rounded-xl border-village bg-card p-6 text-card-foreground shadow-sm backdrop-blur-surface">
							<p className="m-0 flex items-center gap-2 font-display text-lg font-semibold tracking-display">
								{story.customer.src && (
									<img src={story.customer.src} alt="" width={story.customer.width} height={story.customer.height} className="size-7" />
								)}
								{story.customer.name}
							</p>
							<div className="flex flex-col gap-1">
								<p className="m-0 font-display text-5xl font-semibold tracking-display tabular-nums">
									<NumberRoll value={story.stat.value} format={formatOf(story.stat)} locale={content.locale} />
								</p>
								<p className="m-0 text-sm text-muted-foreground">{story.stat.label}</p>
							</div>
							<figure className="m-0 flex flex-1 flex-col gap-4 border-t-(length:--border-width) border-border pt-5">
								<blockquote className="m-0 text-pretty">“{story.quote}”</blockquote>
								<figcaption className="mt-auto flex items-center gap-3 text-sm">
									{story.avatar && (
										<img
											src={story.avatar.src}
											alt={story.avatar.alt}
											width={story.avatar.width}
											height={story.avatar.height}
											loading="lazy"
											className="size-9 rounded-full object-cover"
										/>
									)}
									<span className="flex flex-col">
										<span className="font-medium">{story.name}</span>
										{story.role && <span className="text-muted-foreground">{story.role}</span>}
									</span>
								</figcaption>
							</figure>
							{story.href && (
								<a href={story.href} className="inline-flex items-center gap-1.5 self-start text-sm font-medium tone-primary text-tone-text underline-offset-4 hover:underline">
									{content.labels.read}
									<span className="sr-only">: {story.customer.name}</span>
									<ArrowRightIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
								</a>
							)}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
