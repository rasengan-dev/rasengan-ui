import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { AboutStoryContent } from "./schema";

/**
 * The photo on one side, the story on the other (stacked in a narrow container, side by side from `@3xl`): the title,
 * the paragraphs, who tells it, and up to three facts as a row of figures.
 */
export function AboutStory({ content = example, id = "about", className, headingLevel = 2 }: BlockProps<AboutStoryContent>) {
	const Heading = heading(headingLevel);
	const { image, signature, facts } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="about-story" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl items-center gap-10 @3xl:grid-cols-[2fr_3fr] @3xl:gap-16">
				<div className="overflow-hidden rounded-xl border-village shadow-md">
					<img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="aspect-[4/5] h-auto w-full object-cover" />
				</div>
				<div className="flex flex-col gap-5">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.paragraphs.map((paragraph) => (
						<p key={paragraph.slice(0, 32)} className="text-lg text-muted-foreground">
							{paragraph}
						</p>
					))}
					{signature && (
						<p className="flex flex-col">
							<span className="font-display text-lg font-semibold tracking-display">{signature.name}</span>
							{signature.role && <span className="text-sm text-muted-foreground">{signature.role}</span>}
						</p>
					)}
					{facts && facts.length > 0 && (
						<dl className="mt-2 grid grid-cols-3 gap-4 border-t-(length:--border-width) pt-6">
							{facts.map((fact) => (
								<div key={fact.label} className="flex flex-col-reverse gap-1">
									<dt className="text-sm text-muted-foreground">{fact.label}</dt>
									<dd className="font-display text-3xl font-semibold tracking-display tabular-nums">{fact.value}</dd>
								</div>
							))}
						</dl>
					)}
				</div>
			</div>
		</section>
	);
}
