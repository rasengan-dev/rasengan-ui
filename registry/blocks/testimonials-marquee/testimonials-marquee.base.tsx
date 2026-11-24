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

/** Three columns, each at its own speed and direction, so the wall never moves in step. */
const columns = [
	{ direction: "up", speed: 22 },
	{ direction: "down", speed: 30 },
	{ direction: "up", speed: 26 },
] as const;

/**
 * A heading and the quotes as a living wall: from `@3xl`, three columns that scroll at their own pace (Marquee, each
 * with its pause button, stopping on hover and focus); below, one row that scrolls sideways. With reduced motion, the
 * columns stand still and the row wraps. Marquee's copies are hidden from screen readers, so each quote is read once.
 */
export function TestimonialsMarquee({ content = example, id = "testimonials", className, headingLevel = 2 }: BlockProps<TestimonialsMarqueeContent>) {
	const Heading = heading(headingLevel);
	const { testimonials } = content;
	const split = columns.map((_, column) => testimonials.filter((__, index) => index % columns.length === column));
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="testimonials-marquee" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="m-0 text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="mt-12 hidden gap-4 @3xl:grid @3xl:grid-cols-3">
					{split.map((quotes, column) => (
						<Marquee
							key={columns[column].direction + column}
							direction={columns[column].direction}
							speed={columns[column].speed}
							gap="1rem"
							label={`${content.labels.region}, ${column + 1}`}
							className="h-[36rem]"
						>
							{quotes.map((testimonial) => (
								<Quote key={testimonial.name} testimonial={testimonial} />
							))}
						</Marquee>
					))}
				</div>
				<div className="mt-10 @3xl:hidden">
					<Marquee speed={28} gap="1rem" label={content.labels.region}>
						{testimonials.map((testimonial) => (
							<Quote key={testimonial.name} testimonial={testimonial} className="w-72" />
						))}
					</Marquee>
				</div>
			</div>
		</section>
	);
}
