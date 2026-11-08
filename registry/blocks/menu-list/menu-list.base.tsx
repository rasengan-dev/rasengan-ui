import { Badge } from "@/components/ui/badge";
import { type BlockProps, formatMoney, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { MenuListContent } from "./schema";

/**
 * The whole menu as a printed card: every category at once, no photos and no tabs, each dish with a dotted leader to
 * its price. The categories flow into two columns from `@3xl` and never split across them. For a menu read in one
 * go; `menu-categories` puts long menus in tabs instead.
 */
export function MenuList({ content = example, id = "menu", className, headingLevel = 2 }: BlockProps<MenuListContent>) {
	const Heading = heading(headingLevel);
	const Category = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="menu-list" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-4xl font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<div className="mt-12 gap-x-16 @3xl:columns-2">
					{content.categories.map((category) => (
						<div key={category.name} className="mb-12 break-inside-avoid">
							<Category className="flex items-center gap-4 font-display text-sm font-semibold tracking-widest uppercase tone-primary text-tone-text">
								{category.name}
								<span aria-hidden="true" className="h-px flex-1 bg-border" />
							</Category>
							<ul className="mt-6 flex flex-col gap-5">
								{category.items.map((item) => (
									<li key={item.name} className="flex flex-col gap-1">
										<div className="flex items-baseline gap-2">
											<span className="font-display text-lg font-medium">{item.name}</span>
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
						</div>
					))}
				</div>
				{content.note && <p className="text-center text-sm text-muted-foreground">{content.note}</p>}
			</div>
		</section>
	);
}
