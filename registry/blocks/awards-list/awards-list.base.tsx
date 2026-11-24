import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { AwardsListContent } from "./schema";

/**
 * A heading and the awards in a ruled table: the year, the award with who gave it on a second line, and the project,
 * linked to its page when it has one. Three narrow columns keep it readable on a phone.
 */
export function AwardsList({ content = example, id = "awards", className, headingLevel = 2 }: BlockProps<AwardsListContent>) {
	const Heading = heading(headingLevel);
	const { labels } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="awards-list" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl gap-10 @4xl:grid-cols-[1fr_2fr] @4xl:gap-16">
				<div className="flex flex-col gap-3">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<Table aria-labelledby={`${id}-title`}>
					<TableHeader>
						<TableRow>
							<TableHead className="w-16">{labels.year}</TableHead>
							<TableHead>{labels.award}</TableHead>
							<TableHead className="text-end">{labels.project}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{content.awards.map((award) => (
							<TableRow key={`${award.year}-${award.name}`}>
								<TableCell className="align-top font-mono text-sm text-muted-foreground tabular-nums">{award.year}</TableCell>
								<TableCell className="whitespace-normal">
									<span className="block font-medium">{award.name}</span>
									{award.by && <span className="block text-sm text-muted-foreground">{award.by}</span>}
								</TableCell>
								<TableCell className="text-end align-top whitespace-normal">
									{award.project && award.href ? (
										<a href={award.href} className="font-medium underline underline-offset-4 hover:no-underline">
											{award.project}
										</a>
									) : (
										(award.project ?? <span aria-hidden="true">—</span>)
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
