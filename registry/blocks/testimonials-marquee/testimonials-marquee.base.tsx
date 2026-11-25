import { Marquee } from "@/components/ui/marquee";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Testimonial } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { TestimonialsMarqueeContent } from "./schema";

function Quote({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
	return (
		<figure className={cn("m-0 flex flex-col gap-4 rounded-xl border-village bg-card p-5 text-card-foreground shadow-sm backdrop-blur-surface", className)}>
			<blockquote className="m-0 text-pretty">“{testimonial.quote}”</blockquote>
			<figcaption className="flex items-center gap-3 text-sm">
				{testimonial.avatar && (
					<img
						src={testimonial.avatar.src}
						alt={testimonial.avatar.alt}
						width={testimonial.avatar.width}
						height={testimonial.avatar.height}
						loading="lazy"
						className="size-9 rounded-full object-cover"
					/>
				)}
				<span className="flex flex-col">
					<span className="font-medium">{testimonial.name}</span>
					{testimonial.role && <span className="text-muted-foreground">{testimonial.role}</span>}
				</span>
			</figcaption>
		</figure>
	);
}

/** Two rows that slide in opposite directions at different speeds, so the band never moves in step. */
const rows = [
	{ direction: "left", speed: 36 },
	{ direction: "right", speed: 30 },
] as const;

/**
 * A heading and the quotes as two bands that slide sideways in opposite directions, fading into the edges (Marquee,
 * each band with its pause button, stopping on hover and focus). The quotes alternate between the bands, so each
 * shows once. With reduced motion the bands stand still and wrap. Marquee's copies are hidden from screen readers, so
 * each quote is read once.
 */
export function TestimonialsMarquee({ content = example, id = "testimonials", className, headingLevel = 2 }: BlockProps<TestimonialsMarqueeContent>) {
	const Heading = heading(headingLevel);
	const split = rows.map((_, row) => content.testimonials.filter((__, index) => index % rows.length === row));
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="testimonials-marquee" className={cn("@container py-16 @3xl:py-24", className)}>
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 text-center">
				{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
				<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
					{content.title}
				</Heading>
				{content.subline && <p className="m-0 text-lg text-balance text-muted-foreground">{content.subline}</p>}
			</div>
			<div className="mt-12 flex flex-col gap-4 @3xl:gap-6">
				{split.map((quotes, row) => (
					<Marquee
						key={row}
						direction={rows[row].direction}
						speed={rows[row].speed}
						gap="1rem"
						label={`${content.labels.region}, ${row + 1}`}
					>
						{quotes.map((testimonial) => (
							<Quote key={testimonial.name} testimonial={testimonial} className="w-72 self-stretch @3xl:w-96" />
						))}
					</Marquee>
				))}
			</div>
		</section>
	);
}
