import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { Stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ProcessStepsContent } from "./schema";

/**
 * A heading and three to six numbered steps as cards: the number on a square of the primary colour, a title and a line.
 * They come in one after another at the village's stagger (Stagger), and are simply there with reduced motion or
 * without JavaScript. One column in a narrow container, then two, then three from `@4xl` (as many as the steps when
 * they are three or six).
 */
export function ProcessSteps({ content = example, id = "how-it-works", className, headingLevel = 2 }: BlockProps<ProcessStepsContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="process-steps" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="m-0 text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<Stagger as="ol" className="m-0 mt-12 grid list-none gap-4 p-0 @2xl:grid-cols-2 @4xl:grid-cols-3">
					{content.steps.map((step, index) => (
						<Stagger.Item as="li" key={step.title} className="flex flex-col gap-4 rounded-xl border-village bg-card p-6 text-card-foreground shadow-sm backdrop-blur-surface">
							<span aria-hidden="true" className="flex size-9 items-center justify-center rounded-control bg-primary font-mono text-sm font-semibold text-primary-foreground">
								{String(index + 1).padStart(2, "0")}
							</span>
							<Title className="font-display text-xl font-semibold tracking-display case-heading">{step.title}</Title>
							<p className="m-0 text-pretty text-muted-foreground">{step.description}</p>
						</Stagger.Item>
					))}
				</Stagger>
				{content.cta && (
					<div className="mt-10 flex justify-center">
						<Button size="lg" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
