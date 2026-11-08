"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { TestimonialsCarouselContent } from "./schema";

/** "Amara Nwosu" → "AN". */
const initials = (name: string) =>
	name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase();

/**
 * A heading and the quotes, each a card (`<figure>`: the quote, then who said it), in a Carousel: one card in a narrow
 * container, two from `@2xl`, three from `@5xl`. Arrows, dots, keyboard and swipe come from the Carousel.
 */
export function TestimonialsCarousel({ content = example, id = "testimonials", className, headingLevel = 2 }: BlockProps<TestimonialsCarouselContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="testimonials-carousel" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<Carousel label={content.title} className="mt-12">
					<CarouselContent>
						{content.testimonials.map((t) => (
							<CarouselItem key={t.name} className="basis-full @2xl:basis-1/2 @5xl:basis-1/3">
								<Card className="h-full">
									<CardContent className="flex h-full flex-col justify-between gap-6">
										<figure className="flex h-full flex-col justify-between gap-6">
											<blockquote className="text-pretty">“{t.quote}”</blockquote>
											<figcaption className="flex items-center gap-3">
												<Avatar>
													{t.avatar && <AvatarImage src={t.avatar.src} alt="" width={t.avatar.width} height={t.avatar.height} />}
													<AvatarFallback>{initials(t.name)}</AvatarFallback>
												</Avatar>
												<span className="flex flex-col">
													<span className="font-medium">{t.name}</span>
													{t.role && <span className="text-sm text-muted-foreground">{t.role}</span>}
												</span>
											</figcaption>
										</figure>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="mt-6 flex items-center justify-center gap-4">
						<CarouselPrevious className="static my-0" />
						<CarouselDots className="mt-0" />
						<CarouselNext className="static my-0" />
					</div>
				</Carousel>
			</div>
		</section>
	);
}
