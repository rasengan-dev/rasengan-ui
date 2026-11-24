import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ExperienceTimelineContent } from "./schema";

/** "2021" as it is, "2021-03" as a short month and year in the locale; written the same on the server and in the browser. */
function when(value: string, locale?: string): string {
	const [year, month] = value.split("-").map(Number);
	if (!month) return String(year);
	return new Intl.DateTimeFormat(locale ?? "en", { month: "short", year: "numeric", timeZone: "UTC" }).format(Date.UTC(year, month - 1, 1));
}

/**
 * A heading and the entries as ruled rows, newest first: the dates in tabular figures, then what it was, where, and a
 * line about it. Two columns from `@2xl` (the dates beside the rest), stacked below. Each entry's dates are a `<time>`.
 */
export function ExperienceTimeline({ content = example, id = "experience", className, headingLevel = 2 }: BlockProps<ExperienceTimelineContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="experience-timeline" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl gap-10 @4xl:grid-cols-[1fr_2fr] @4xl:gap-16">
				<div className="flex flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<ol className="m-0 list-none border-t-(length:--border-width) border-border p-0">
					{content.entries.map((entry) => (
						<li key={`${entry.from}-${entry.title}`} className="grid gap-2 border-b-(length:--border-width) border-border py-5 @2xl:grid-cols-[10rem_1fr] @2xl:gap-6">
							<p className="m-0 font-mono text-sm text-muted-foreground tabular-nums">
								<time dateTime={entry.from}>{when(entry.from, content.locale)}</time>
								{entry.to && (
									<>
										{" – "}
										{entry.to === "now" ? content.labels.now : <time dateTime={entry.to}>{when(entry.to, content.locale)}</time>}
									</>
								)}
							</p>
							<div className="flex flex-col gap-1">
								<div className="flex flex-wrap items-baseline justify-between gap-x-4">
									<Title className="font-display text-lg font-semibold tracking-display case-heading">{entry.title}</Title>
									{entry.organisation && <p className="m-0 text-sm text-muted-foreground">{entry.organisation}</p>}
								</div>
								{entry.description && <p className="m-0 text-sm text-pretty text-muted-foreground">{entry.description}</p>}
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
