import { Separator } from "@/components/ui/separator";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FooterColumnsContent } from "./schema";

const link = "rounded-control text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:focus-ring";

/**
 * The page's footer (`<footer>`, its contentinfo landmark): the name and tagline, then the link columns (two by two in a
 * narrow container, beside the name from `@3xl`), then the copyright line and social links. Column titles are headings
 * at `headingLevel`, small.
 */
export function FooterColumns({ content = example, id = "footer", className, headingLevel = 2 }: BlockProps<FooterColumnsContent>) {
	const Title = heading(headingLevel);
	const { brand } = content;
	return (
		<footer id={id} data-slot="block" data-block="footer-columns" className={cn("@container border-t px-4 pt-12 pb-8", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-10 @3xl:grid-cols-[1fr_2fr]">
					<div className="flex max-w-xs flex-col gap-2">
						<a href={brand.href} className="self-start rounded-control font-display text-lg font-semibold tracking-display outline-none focus-visible:focus-ring">
							{brand.name}
						</a>
						{brand.tagline && <p className="text-sm text-muted-foreground">{brand.tagline}</p>}
					</div>
					<div className="grid grid-cols-2 gap-8 @xl:grid-cols-4">
						{content.columns.map((column) => (
							<nav key={column.title} aria-labelledby={`${id}-${column.title}`} className="flex flex-col gap-3">
								<Title id={`${id}-${column.title}`} className="text-sm font-semibold">
									{column.title}
								</Title>
								<ul className="flex flex-col gap-2">
									{column.links.map((item) => (
										<li key={item.href}>
											<a href={item.href} className={link}>
												{item.label}
											</a>
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>
				<Separator className="my-8" />
				<div className="flex flex-col gap-4 @xl:flex-row @xl:items-center @xl:justify-between">
					<p className="text-sm text-muted-foreground">{content.legal}</p>
					{content.social && content.social.length > 0 && (
						<ul className="flex flex-wrap gap-4">
							{content.social.map((item) => (
								<li key={item.href}>
									<a href={item.href} className={link}>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</footer>
	);
}
