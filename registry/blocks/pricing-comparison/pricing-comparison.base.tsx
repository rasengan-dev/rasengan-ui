import { CheckIcon, MinusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { PricingComparisonContent } from "./schema";

/**
 * Plans side by side and what each includes, as a real table: the plans head the columns (name, price, action, the
 * highlighted one marked and tinted down its column), then the features by group, each a row with a tick, a dash or a
 * short value per plan. Ticks and dashes are read as words. In a narrow container the table scrolls sideways, its
 * feature column staying in place.
 */
export function PricingComparison({ content = example, id = "compare", className, headingLevel = 2 }: BlockProps<PricingComparisonContent>) {
	const Heading = heading(headingLevel);
	const { plans, labels, periods, locale } = content;
	const tint = (index: number) => plans[index]?.highlighted && "bg-muted/60";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="pricing-comparison" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="mt-12 overflow-x-auto">
					<Table aria-labelledby={`${id}-title`} className="min-w-[40rem] table-fixed">
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="sticky start-0 w-[34%] bg-background align-bottom">
									<span className="sr-only">{labels.feature}</span>
								</TableHead>
								{plans.map((plan, index) => (
									<TableHead key={plan.name} scope="col" className={cn("h-auto py-5 align-top whitespace-normal", tint(index), plan.highlighted && "rounded-t-lg")}>
										<div className="flex flex-col items-start gap-2">
											<span className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold text-foreground">
												{plan.name}
												{plan.highlighted && (
													<Badge size="sm">
														{content.highlightLabel}
													</Badge>
												)}
											</span>
											<span className="font-normal text-muted-foreground">
												<span className="font-display text-2xl font-semibold text-foreground tabular-nums">{formatMoney(plan.price, locale)}</span>{" "}
												{periods[plan.period ?? "month"]}
											</span>
											{plan.description && <span className="text-sm font-normal text-muted-foreground">{plan.description}</span>}
											<Button
												size="sm"
												variant={plan.highlighted ? "default" : "outline"}
												className="mt-1"
												render={<a href={plan.cta.href} />}
												nativeButton={false}
											>
												{plan.cta.label}
											</Button>
										</div>
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{content.groups.map((group) => [
								<TableRow key={group.name} className="hover:bg-transparent">
									<TableHead scope="colgroup" colSpan={plans.length + 1} className="sticky start-0 pt-8 font-display font-semibold text-foreground">
										{group.name}
									</TableHead>
								</TableRow>,
								...group.rows.map((row) => (
									<TableRow key={`${group.name}-${row.label}`}>
										<TableHead scope="row" className="sticky start-0 bg-background font-normal whitespace-normal text-foreground">
											{row.label}
										</TableHead>
										{row.values.map((value, index) => (
											<TableCell key={plans[index]?.name ?? index} className={cn("whitespace-normal", tint(index))}>
												{value === true ? (
													<>
														<CheckIcon aria-hidden="true" className="size-4 tone-primary text-tone-text" />
														<span className="sr-only">{labels.included}</span>
													</>
												) : value === false ? (
													<>
														<MinusIcon aria-hidden="true" className="size-4 text-muted-foreground" />
														<span className="sr-only">{labels.notIncluded}</span>
													</>
												) : (
													value
												)}
											</TableCell>
										))}
									</TableRow>
								)),
							])}
						</TableBody>
					</Table>
				</div>
				{content.note && <p className="mt-8 text-center text-sm text-muted-foreground">{content.note}</p>}
			</div>
		</section>
	);
}
