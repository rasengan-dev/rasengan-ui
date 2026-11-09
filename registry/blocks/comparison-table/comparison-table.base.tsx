import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ComparisonTableContent } from "./schema";

/**
 * "Us vs them" as a real table: what matters in the rows, your product's column tinted and headed in the primary
 * colour, the usual way beside it. A tick, a cross or a short value per cell; ticks and crosses are read as words.
 * Compare with the way things are done, not with a named competitor. Cells wrap, so the table fits a phone's width
 * without scrolling.
 */
export function ComparisonTable({ content = example, id = "comparison", className, headingLevel = 2 }: BlockProps<ComparisonTableContent>) {
	const Heading = heading(headingLevel);
	const { labels, columns } = content;
	const cell = (value: boolean | string, ours: boolean) =>
		value === true ? (
			<>
				<CheckIcon aria-hidden="true" className={cn("size-5", ours ? "tone-primary text-tone-text" : "text-foreground")} />
				<span className="sr-only">{labels.yes}</span>
			</>
		) : value === false ? (
			<>
				<XIcon aria-hidden="true" className="size-5 text-muted-foreground" />
				<span className="sr-only">{labels.no}</span>
			</>
		) : (
			value
		);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="comparison-table" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-4xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="mt-12">
					<Table aria-labelledby={`${id}-title`} className="table-fixed">
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-[42%]">
									<span className="sr-only">{labels.feature}</span>
								</TableHead>
								<TableHead scope="col" className="rounded-t-lg bg-muted/60 py-4 font-display text-base font-semibold break-words whitespace-normal tone-primary text-tone-text @md:text-lg">
									{columns.ours}
								</TableHead>
								<TableHead scope="col" className="py-4 font-display text-base font-semibold break-words whitespace-normal text-muted-foreground @md:text-lg">
									{columns.theirs}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{content.rows.map((row) => (
								<TableRow key={row.label}>
									<TableHead scope="row" className="font-normal break-words whitespace-normal text-foreground">
										{row.label}
									</TableHead>
									<TableCell className="bg-muted/60 font-medium whitespace-normal">{cell(row.ours, true)}</TableCell>
									<TableCell className="whitespace-normal text-muted-foreground">{cell(row.theirs, false)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				{(content.cta || content.note) && (
					<div className="mt-10 flex flex-col items-center gap-3 text-center">
						{content.cta && (
							<Button size="lg" render={<a href={content.cta.href} />} nativeButton={false}>
								{content.cta.label}
							</Button>
						)}
						{content.note && <p className="text-sm text-muted-foreground">{content.note}</p>}
					</div>
				)}
			</div>
		</section>
	);
}
