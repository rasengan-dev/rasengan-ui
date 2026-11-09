"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NumberRoll } from "@/components/ui/number-roll";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type BlockProps, heading, moneyFormat } from "@/lib/blocks";
import type { Money } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { PricingPlansContent } from "./schema";

type Plan = PricingPlansContent["plans"][number];
type Billing = "month" | "year";

/** A plan's price and period for the billing chosen: a monthly plan billed yearly costs `yearly`, or twelve months. */
function priceFor(plan: Plan, billing: Billing): { price: Money; period: Plan["period"] } {
	if (billing === "month" || plan.period !== "month") return { price: plan.price, period: plan.period };
	return { price: plan.yearly ?? { ...plan.price, amount: plan.price.amount * 12 }, period: "year" };
}

/** The amount, rolling to its new value when the billing changes. The format is memoised: NumberRoll keys on it. */
function Price({ price, locale }: { price: Money; locale?: string }) {
	const whole = Number.isInteger(price.amount);
	const format = useMemo(() => moneyFormat({ amount: whole ? 0 : 0.5, currency: price.currency }), [whole, price.currency]);
	return <NumberRoll value={price.amount} format={format} locale={locale} />;
}

/**
 * A heading, a monthly / yearly switch (when `content.billing` is set) and the plans as cards: stacked in a narrow
 * container, side by side from `@3xl`. Switching rolls each price to its new amount with NumberRoll; with motion off
 * it simply changes. The highlighted plan has a primary border, a badge and a filled button; prices are formatted with
 * `Intl` in `content.locale`.
 */
export function PricingPlans({ content = example, id = "pricing", className, headingLevel = 2 }: BlockProps<PricingPlansContent>) {
	const Heading = heading(headingLevel);
	const [billing, setBilling] = useState<Billing>("month");
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	const columns = ["", "", "@3xl:grid-cols-2", "@3xl:grid-cols-3", "@3xl:grid-cols-2 @5xl:grid-cols-4"][content.plans.length];
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="pricing-plans" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				{content.billing && (
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
						<ToggleGroup
							variant="outline"
							value={[billing]}
							// A switch, not a set of toggles: pressing the chosen option again keeps it.
							onValueChange={(value) => value[0] && setBilling(value[0] as Billing)}
							aria-label={content.billing.label}
						>
							<ToggleGroupItem value="month">{content.billing.month}</ToggleGroupItem>
							<ToggleGroupItem value="year">{content.billing.year}</ToggleGroupItem>
						</ToggleGroup>
						{/* On a card's surface: the soft badge is translucent, and the section may sit on a muted background. */}
						{content.billing.saving && (
							<span className="rounded-badge bg-card">
								<Badge variant="soft">{content.billing.saving}</Badge>
							</span>
						)}
					</div>
				)}
				<ul className={cn("mx-auto mt-10 grid max-w-md gap-6 @3xl:max-w-none", columns)}>
					{content.plans.map((plan) => {
						const { price, period } = priceFor(plan, billing);
						return (
							<li key={plan.name} className="flex">
								<Card className={cn("w-full", plan.highlighted && "border-primary ring-1 ring-primary")}>
									<CardHeader className="gap-2">
										<div className="flex items-center justify-between gap-2">
											<Name className="font-display text-lg font-semibold tracking-display">{plan.name}</Name>
											{plan.highlighted && <Badge variant="soft">{content.highlightLabel}</Badge>}
										</div>
										<p className="text-sm text-muted-foreground">{plan.description}</p>
										<p className="mt-2 flex items-baseline gap-1.5">
											<span className="font-display text-4xl font-semibold tracking-display">
												<Price price={price} locale={content.locale} />
											</span>
											<span className="text-sm text-muted-foreground">{content.periods[period]}</span>
										</p>
									</CardHeader>
									<CardContent className="flex-1">
										<ul className="flex flex-col gap-2.5 text-sm">
											{plan.features.map((feature) => (
												<li key={feature} className="flex gap-2">
													<CheckIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 tone-primary text-tone-text" />
													{feature}
												</li>
											))}
										</ul>
									</CardContent>
									<CardFooter>
										<Button className="w-full" variant={plan.highlighted ? "default" : "outline"} render={<a href={plan.cta.href} />} nativeButton={false}>
											{plan.cta.label}
										</Button>
									</CardFooter>
								</Card>
							</li>
						);
					})}
				</ul>
				{content.note && <p className="mt-6 text-center text-sm text-muted-foreground">{content.note}</p>}
			</div>
		</section>
	);
}
