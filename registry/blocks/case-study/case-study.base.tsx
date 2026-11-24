import { ArrowRightIcon } from "lucide-react";

import { ImageReveal } from "@/components/ui/image-reveal";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Stat } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CaseStudyContent } from "./schema";

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
 * One project's page, as a section: its kinds and year, the title large, the summary, the facts in a ruled grid
 * (client, kind, year and any others), the cover uncovered as it comes into view, then the story in sections (the title
 * on the left, plain paragraphs on the right, their pictures below), the results rolling into place, a gallery whose
 * pictures open full screen, and a link to the next project.
 */
export function CaseStudy({ content = example, id = "case-study", className, headingLevel = 2 }: BlockProps<CaseStudyContent>) {
	const Heading = heading(headingLevel);
	const Sub = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const { project, labels } = content;
	const facts = [
		...(project.client ? [{ label: labels.client, value: project.client }] : []),
		{ label: labels.kind, value: project.kinds.join(", ") },
		{ label: labels.year, value: String(project.year) },
		...(content.facts ?? []),
	];
	const gallery = content.gallery ?? [];

	return (
		<article id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="case-study" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto flex max-w-6xl flex-col gap-12 @3xl:gap-16">
				<header className="flex flex-col gap-6">
					<p className="text-sm text-muted-foreground">
						{project.kinds.join(", ")} · {project.year}
					</p>
					<Heading id={`${id}-title`} className="font-display text-5xl leading-none font-semibold tracking-display text-balance case-heading @3xl:text-7xl">
						{project.title}
					</Heading>
					<div className="grid gap-8 @3xl:grid-cols-[1fr_1fr] @3xl:gap-16">
						<p className="text-lg text-balance text-muted-foreground @3xl:text-xl">{project.summary}</p>
						<dl className="grid grid-cols-2 border-t-(length:--border-width) border-border">
							{facts.map((fact) => (
								<div key={fact.label} className="flex flex-col gap-1 border-b-(length:--border-width) border-border py-3 pe-4">
									<dt className="text-xs text-muted-foreground">{fact.label}</dt>
									<dd className="m-0 text-sm font-medium">{fact.value}</dd>
								</div>
							))}
						</dl>
					</div>
				</header>

				<ImageReveal className="aspect-[4/3] overflow-hidden rounded-xl bg-muted @3xl:aspect-[16/9]">
					<img src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} className="size-full object-cover" />
				</ImageReveal>

				{content.sections.map((section) => (
					<section key={section.title} data-kind={section.kind} className="grid gap-4 border-t-(length:--border-width) border-border pt-8 @3xl:grid-cols-[1fr_2fr] @3xl:gap-16">
						<Sub className="font-display text-xl font-semibold tracking-display case-heading">{section.title}</Sub>
						<div className="flex flex-col gap-4">
							{section.paragraphs.map((paragraph) => (
								<p key={paragraph} className="text-base leading-relaxed text-pretty">
									{paragraph}
								</p>
							))}
							{section.images && section.images.length > 0 && (
								<div className="mt-4 grid gap-4 @2xl:grid-cols-2">
									{section.images.map((picture) => (
										<img
											key={picture.src}
											src={picture.src}
											alt={picture.alt}
											width={picture.width}
											height={picture.height}
											loading="lazy"
											className="aspect-[4/3] w-full rounded-xl bg-muted object-cover"
										/>
									))}
								</div>
							)}
						</div>
					</section>
				))}

				{project.results && project.results.length > 0 && (
					<section className="flex flex-col gap-6 border-t-(length:--border-width) border-border pt-8">
						<Sub className="font-display text-xl font-semibold tracking-display case-heading">{labels.results}</Sub>
						<dl className="grid grid-cols-2 gap-6 @3xl:grid-cols-4">
							{project.results.map((stat) => (
								<div key={stat.label} className="flex flex-col-reverse gap-1">
									<dt className="text-sm text-muted-foreground">{stat.label}</dt>
									<dd className="m-0 font-display text-4xl font-semibold tracking-display tabular-nums @3xl:text-5xl">
										<NumberRoll value={stat.value} format={formatOf(stat)} locale={content.locale} />
									</dd>
								</div>
							))}
						</dl>
					</section>
				)}

				{gallery.length > 0 && (
					<section className="flex flex-col gap-6 border-t-(length:--border-width) border-border pt-8">
						<Sub className="font-display text-xl font-semibold tracking-display case-heading">{labels.gallery}</Sub>
						<Lightbox images={gallery}>
							<ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 @3xl:grid-cols-3 @3xl:gap-4">
								{gallery.map((picture, index) => (
									<li key={picture.src}>
										<LightboxTrigger index={index} className="group block w-full cursor-zoom-in overflow-hidden rounded-lg outline-none focus-visible:focus-ring">
											<img
												src={picture.src}
												alt={picture.alt}
												width={picture.width}
												height={picture.height}
												loading="lazy"
												className="aspect-[4/3] w-full bg-muted object-cover transition-[scale] duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
											/>
										</LightboxTrigger>
										{picture.caption && <p className="mt-2 text-xs text-muted-foreground">{picture.caption}</p>}
									</li>
								))}
							</ul>
							<LightboxContent />
						</Lightbox>
					</section>
				)}

				{content.next && (
					<a
						href={content.next.href}
						className="group flex flex-col gap-2 rounded-xl border-t-(length:--border-width) border-border pt-8 outline-none focus-visible:focus-ring"
					>
						<span className="text-sm text-muted-foreground">{labels.next}</span>
						<span className="flex items-center gap-4 font-display text-3xl font-semibold tracking-display case-heading @3xl:text-5xl">
							{content.next.title}
							<ArrowRightIcon aria-hidden="true" className="size-8 shrink-0 transition-transform duration-base ease-out group-hover:translate-x-2 motion-reduce:transition-none rtl:rotate-180" />
						</span>
					</a>
				)}
			</div>
		</article>
	);
}
