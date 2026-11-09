import { Separator } from "@/components/ui/separator";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FooterWordmarkContent } from "./schema";

const link = "rounded-control text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:focus-ring";

/** The word's size from the block's width and its length (`cqi`), never below 3.5rem: a long word wraps instead. */
const wordSize = (word: string) => `clamp(3.5rem, ${Math.min(150 / Math.max(word.length, 1), 34).toFixed(1)}cqi, 24rem)`;

/**
 * The page's footer (`<footer>`, its contentinfo landmark), as footer-columns lays it out (the name and tagline, the
 * link columns, the copyright and social links), then the brand set huge along the bottom edge in the display face,
 * cut by it. The word is decoration, hidden from screen readers: the name is already written above. Column titles
 * are headings at `headingLevel`, small.
 */
export function FooterWordmark({ content = example, id = "footer", className, headingLevel = 2 }: BlockProps<FooterWordmarkContent>) {
	const Title = heading(headingLevel);
	const { brand } = content;
	const word = content.wordmark ?? brand.name;
	return (
		<footer id={id} data-slot="block" data-block="footer-wordmark" className={cn("@container overflow-hidden border-t px-4 pt-12", className)}>
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
			<p
				aria-hidden="true"
				className="mx-auto mt-10 -mb-[0.18em] max-w-6xl text-center font-display leading-[0.8] font-bold tracking-display text-balance break-words case-heading tone-primary text-tone-text select-none"
				style={{ fontSize: wordSize(word) }}
			>
				{word}
			</p>
		</footer>
	);
}
