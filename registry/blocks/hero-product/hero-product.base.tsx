import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeviceFrame } from "@/components/ui/device-frame";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroProductContent } from "./schema";

/**
 * A centred pill, headline, line, actions and note, then the product's screen in a browser frame (DeviceFrame), on a
 * soft glow of the primary colour behind it. The screenshot keeps its `alt` and loads first; the frame takes the
 * village's radius and shadow.
 */
export function HeroProduct({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroProductContent>) {
	const Heading = heading(headingLevel);
	const { screen } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-product" className={cn("@container overflow-hidden px-4 pt-14 pb-6 @3xl:pt-20", className)}>
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
				{content.badge && (
					<Badge variant="outline" tone="primary">
						{content.badge}
					</Badge>
				)}
				<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-5xl @5xl:text-6xl">
					{content.headline}
				</Heading>
				{content.subline && <p className="m-0 max-w-xl text-lg text-balance text-muted-foreground">{content.subline}</p>}
				<div className="flex w-full flex-col justify-center gap-3 @md:w-auto @md:flex-row">
					<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
						{content.primary.label}
					</Button>
					{content.secondary && (
						<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
							{content.secondary.label}
						</Button>
					)}
				</div>
				{content.note && <p className="m-0 text-sm text-muted-foreground">{content.note}</p>}
			</div>
			<div className="relative mx-auto mt-12 max-w-5xl">
				<div aria-hidden="true" className="absolute inset-x-[8%] -inset-y-8 -z-10 rounded-full bg-primary/20 blur-3xl" />
				<DeviceFrame url={content.url}>
					<img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} fetchPriority="high" />
				</DeviceFrame>
			</div>
		</section>
	);
}
