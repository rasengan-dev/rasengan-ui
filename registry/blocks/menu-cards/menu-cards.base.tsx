import { MessageCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BlockProps, formatMoney, heading, messageUrl } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { MenuCardsContent } from "./schema";

/**
 * The dishes worth the trip, as cards: a photo, the name and its tags, a line about it, the price, and an order link
 * that opens WhatsApp, a text or an email with the dish written (RFC-0009). One column in a narrow container, two
 * from `@xl`, three from `@4xl`. There is no cart: each link orders one dish, the business takes it from there.
 */
export function MenuCards({ content = example, id = "dishes", className, headingLevel = 2 }: BlockProps<MenuCardsContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { order } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="menu-cards" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-10 grid gap-6 @xl:grid-cols-2 @4xl:grid-cols-3">
					{content.dishes.map((dish) => (
						<li key={dish.name} className="flex flex-col overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-sm backdrop-blur-surface">
							<img
								src={dish.image.src}
								alt={dish.image.alt}
								width={dish.image.width}
								height={dish.image.height}
								loading="lazy"
								className="aspect-[4/3] w-full object-cover"
							/>
							<div className="flex flex-1 flex-col gap-2 p-5">
								<div className="flex flex-wrap items-center gap-2">
									<Name className="font-display text-lg font-semibold tracking-display case-heading">{dish.name}</Name>
									{dish.tags?.map((tag) => (
										<Badge key={tag} variant="outline" size="sm">
											{tag}
										</Badge>
									))}
								</div>
								{dish.description && <p className="text-sm text-muted-foreground">{dish.description}</p>}
								<div className="mt-auto flex items-center justify-between gap-3 pt-3">
									<span className="font-display text-lg font-semibold tabular-nums">{formatMoney(dish.price, content.locale)}</span>
									{order && (
										<Button
											size="sm"
											variant="outline"
											aria-label={`${order.label} ${dish.name}`}
											render={
												<a
													href={messageUrl(order.channel, `${order.message} ${dish.name}`)}
													{...(order.channel.kind === "whatsapp" ? { target: "_blank", rel: "noreferrer" } : {})}
												/>
											}
											nativeButton={false}
										>
											<MessageCircleIcon aria-hidden="true" />
											{order.label}
										</Button>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
				{content.cta && (
					<div className="mt-10 flex justify-center">
						<Button variant="ghost" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
