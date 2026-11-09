"use client";

import { Marquee } from "@/components/ui/marquee";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Testimonial } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { TestimonialsWallContent } from "./schema";

function Quote({ testimonial }: { testimonial: Testimonial }) {
	return (
		<figure className="flex flex-col gap-4 rounded-xl border-village bg-card p-5 text-card-foreground shadow-sm backdrop-blur-surface">
			<blockquote className="text-pretty">{testimonial.quote}</blockquote>
			<figcaption className="flex items-center gap-3">
				{testimonial.avatar && (
					<img
						src={testimonial.avatar.src}
						alt=""
						width={testimonial.avatar.width}
						height={testimonial.avatar.height}
						loading="lazy"
						className="size-10 rounded-full object-cover"
					/>
				)}
				<span className="flex flex-col">
					<span className="text-sm font-medium">{testimonial.name}</span>
					{testimonial.role && <span className="text-sm text-muted-foreground">{testimonial.role}</span>}
				</span>
			</figcaption>
		</figure>
	);
}

/**
 * A wall of customer quotes in a masonry of columns. From `@4xl`, three columns drift slowly upwards together in one
 * Marquee: it stops on hover and focus, has a pause button, and with motion off (or at intensity 0) the wall stands
 * still and scrolls inside its height. Below `@4xl`, one or two still columns, nothing moves. Avatars are decoration:
 * each quote names its author in text.
 */
export function TestimonialsWall({ content = example, id = "testimonials", className, headingLevel = 2 }: BlockProps<TestimonialsWallContent>) {
	const Heading = heading(headingLevel);
	const columns = [0, 1, 2].map((column) => content.testimonials.filter((_, index) => index % 3 === column));
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="testimonials-wall" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-12 gap-4 @xl:columns-2 @4xl:hidden">
					{content.testimonials.map((testimonial) => (
						<li key={testimonial.name} className="mb-4 break-inside-avoid">
							<Quote testimonial={testimonial} />
						</li>
					))}
				</ul>
				<Marquee label={content.label} direction="up" speed={18} gap="1rem" className="mt-12 hidden h-[40rem] @4xl:flex">
					<div className="grid w-[min(72rem,calc(100cqi-2rem))] grid-cols-3 items-start gap-4">
						{columns.map((column, index) => (
							<ul key={index} className={cn("flex flex-col gap-4", index === 1 && "pt-16")}>
								{column.map((testimonial) => (
									<li key={testimonial.name}>
										<Quote testimonial={testimonial} />
									</li>
								))}
							</ul>
						))}
					</div>
				</Marquee>
			</div>
		</section>
	);
}
