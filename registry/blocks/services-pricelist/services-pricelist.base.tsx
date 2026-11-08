import { Button } from "@/components/ui/button";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ServicesPricelistContent } from "./schema";

/**
 * A salon's or a spa's prices, grouped by kind (hair, nails, face): each service with a dotted leader to its price,
 * its duration and what it includes under it. Beside an optional photo that stays in view from `@3xl` while the list
 * scrolls; one booking action under the list.
 */
export function ServicesPricelist({ content = example, id = "prices", className, headingLevel = 2 }: BlockProps<ServicesPricelistContent>) {
	const Heading = heading(headingLevel);
	const Group = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const minutes = content.minutes ?? "min";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="services-pricelist" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className={cn("mx-auto grid max-w-5xl gap-10", content.image && "@3xl:grid-cols-[2fr_3fr] @3xl:gap-16")}>
				{content.image && (
					<div className="@3xl:sticky @3xl:top-8 @3xl:self-start">
						<img
							src={content.image.src}
							alt={content.image.alt}
							width={content.image.width}
							height={content.image.height}
							loading="lazy"
							className="aspect-[4/5] w-full rounded-xl object-cover"
						/>
					</div>
				)}
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-3">
						<Heading id={`${id}-title`} className="font-display text-4xl font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
							{content.title}
						</Heading>
						{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					</div>
					{content.groups.map((group) => (
						<div key={group.name}>
							<Group className="font-display text-sm font-semibold tracking-widest uppercase tone-primary text-tone-text">{group.name}</Group>
							<ul className="mt-4 flex flex-col gap-4">
								{group.services.map((service) => (
									<li key={service.name} className="flex flex-col gap-1">
										<div className="flex items-baseline gap-2">
											<span className="font-medium">{service.name}</span>
											<span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-border" />
											<span className="font-medium whitespace-nowrap tabular-nums">{formatMoney(service.price, content.locale)}</span>
										</div>
										{(service.description || service.duration) && (
											<p className="text-sm text-muted-foreground">
												{[service.duration && `${service.duration} ${minutes}`, service.description].filter(Boolean).join(" · ")}
											</p>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
					{(content.cta || content.note) && (
						<div className="flex flex-col items-start gap-4">
							{content.cta && (
								<Button size="lg" render={<a href={content.cta.href} />} nativeButton={false}>
									{content.cta.label}
								</Button>
							)}
							{content.note && <p className="text-sm text-muted-foreground">{content.note}</p>}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
