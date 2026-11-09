"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { MenuCategoriesContent } from "./schema";

/**
 * The menu: a heading, one tab per category, and the dishes in one or two columns (from `@3xl`), each with a dotted
 * leader to its price. Every category stays in the HTML (`keepMounted`): search engines read the whole menu, and
 * the browser's find-in-page finds a dish in another tab.
 */
export function MenuCategories({ content = example, id = "menu", className, headingLevel = 2 }: BlockProps<MenuCategoriesContent>) {
	const Heading = heading(headingLevel);
	const Category = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="menu-categories" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<Tabs defaultValue={0} className="mt-10 items-center">
					<TabsList aria-label={content.title} className="max-w-full overflow-x-auto">
						{content.categories.map((category, index) => (
							<TabsTrigger key={category.name} value={index}>
								{category.name}
							</TabsTrigger>
						))}
					</TabsList>
					{content.categories.map((category, index) => (
						<TabsContent key={category.name} value={index} keepMounted className="mt-8 w-full">
							<Category className="sr-only">{category.name}</Category>
							<ul className="grid gap-x-12 gap-y-6 @3xl:grid-cols-2">
								{category.items.map((item) => (
									<li key={item.name} className="flex flex-col gap-1">
										<div className="flex items-baseline gap-2">
											<span className="font-medium">{item.name}</span>
											{item.tags?.map((tag) => (
												<Badge key={tag} variant="outline" size="sm" className="self-center">
													{tag}
												</Badge>
											))}
											<span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-border" />
											<span className="font-medium whitespace-nowrap tabular-nums">{formatMoney(item.price, content.locale)}</span>
										</div>
										{item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
									</li>
								))}
							</ul>
						</TabsContent>
					))}
				</Tabs>
				{content.note && <p className="mt-10 text-center text-sm text-muted-foreground">{content.note}</p>}
			</div>
		</section>
	);
}
