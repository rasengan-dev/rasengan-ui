import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ReviewsRatingContent } from "./schema";

/** Five stars, filled up to the rating (a half star from .5); drawn for the eye, the score is written out beside. */
function Stars({ value, className }: { value: number; className?: string }) {
	return (
		<span aria-hidden="true" className={cn("flex gap-0.5", className)}>
			{[1, 2, 3, 4, 5].map((star) => {
				const fill = value >= star ? 1 : value >= star - 0.5 ? 0.5 : 0;
				return (
					<span key={star} className="relative inline-flex">
						<StarIcon className="size-[1em] text-border" fill="currentColor" strokeWidth={0} />
						{fill > 0 && (
							<StarIcon
								className="absolute inset-0 size-[1em] tone-warning text-tone"
								fill="currentColor"
								strokeWidth={0}
								style={fill < 1 ? { clipPath: "inset(0 50% 0 0)" } : undefined}
							/>
						)}
					</span>
				);
			})}
		</span>
	);
}

/**
 * The rating summary beside the reviews: the average written large with its stars, how many reviews it is over and
 * where they were left (a label, never a third-party logo: nothing here is fetched or verified), then the reviews in
 * a masonry of cards. Every score is also written out ("4.8 out of 5"), the stars are decoration.
 */
export function ReviewsRating({ content = example, id = "reviews", className, headingLevel = 2 }: BlockProps<ReviewsRatingContent>) {
	const Heading = heading(headingLevel);
	const { summary, labels, locale } = content;
	const score = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(summary.score);
	const count = new Intl.NumberFormat(locale).format(summary.count);
	const day = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="reviews-rating" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl gap-10 @4xl:grid-cols-[1fr_2fr] @4xl:gap-12">
				<div className="flex flex-col gap-4 @4xl:sticky @4xl:top-8 @4xl:self-start">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					<div className="flex items-end gap-3">
						<span className="font-display text-6xl leading-none font-semibold tabular-nums">{score}</span>
						<span className="flex flex-col gap-1 pb-1">
							<Stars value={summary.score} className="text-xl" />
							<span className="text-sm text-muted-foreground">{labels.outOf}</span>
						</span>
					</div>
					<p className="text-muted-foreground">
						{count} {labels.reviews}
						{summary.source && ` ${labels.on ?? "on"} ${summary.source}`}
					</p>
					{summary.href && labels.readAll && (
						<Button variant="outline" className="self-start" render={<a href={summary.href} target="_blank" rel="noreferrer" />} nativeButton={false}>
							{labels.readAll}
						</Button>
					)}
				</div>
				<ul className="gap-4 @xl:columns-2">
					{content.reviews.map((review) => (
						<li key={`${review.author}-${review.date ?? review.text.slice(0, 12)}`} className="mb-4 break-inside-avoid">
							<figure className="flex flex-col gap-3 rounded-xl border-village bg-card p-5 text-card-foreground shadow-sm backdrop-blur-surface">
								<div className="flex items-center gap-2">
									<Stars value={review.rating} className="text-base" />
									<span className="sr-only">
										{review.rating} {labels.outOf}
									</span>
								</div>
								<blockquote className="text-pretty">{review.text}</blockquote>
								<figcaption className="text-sm text-muted-foreground">
									<span className="font-medium text-foreground">{review.author}</span>
									{[review.date && day.format(new Date(review.date)), review.source].filter(Boolean).map((part) => ` · ${part}`)}
								</figcaption>
							</figure>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
