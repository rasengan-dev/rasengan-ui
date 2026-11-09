import { CheckIcon, GlobeIcon, PlayIcon, SmartphoneIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { CtaAppContent } from "./schema";

/* Generic icons: Lucide carries no brand logos, and the stores' badges have their own terms of use. */
const icons: Record<CtaAppContent["stores"][number]["store"], LucideIcon> = { "app-store": SmartphoneIcon, "google-play": PlayIcon, web: GlobeIcon };

/**
 * Get the app: a framed band with the promise, up to three ticked facts and a link per store (text buttons, not the
 * stores' artwork), beside the app's screen in a phone frame drawn with CSS, cut by the band's bottom edge from `@3xl`.
 */
export function CtaApp({ content = example, id = "app", className, headingLevel = 2 }: BlockProps<CtaAppContent>) {
	const Heading = heading(headingLevel);
	const { screen } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="cta-app" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl bg-muted @3xl:grid-cols-[3fr_2fr]">
				<div className="flex flex-col gap-5 p-8 @2xl:p-12">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					{content.points && content.points.length > 0 && (
						<ul className="flex flex-wrap gap-x-5 gap-y-2">
							{content.points.map((point) => (
								<li key={point} className="flex items-center gap-2 text-sm">
									<CheckIcon aria-hidden="true" className="size-4 tone-primary text-tone-text" />
									{point}
								</li>
							))}
						</ul>
					)}
					<div className="flex flex-col gap-3 @md:flex-row @md:flex-wrap">
						{content.stores.map((store, index) => {
							const Icon = icons[store.store];
							return (
								<Button
									key={store.href}
									size="lg"
									variant={index === 0 ? "default" : "outline"}
									render={<a href={store.href} target="_blank" rel="noreferrer" />}
									nativeButton={false}
								>
									<Icon aria-hidden="true" />
									{store.label}
								</Button>
							);
						})}
					</div>
				</div>
				<div className="flex justify-center px-8 pt-4 @3xl:items-end @3xl:pt-12">
					<div className="w-56 translate-y-0 rounded-[2.25rem] bg-foreground p-2 shadow-xl @3xl:w-64 @3xl:translate-y-16">
						<img
							src={screen.src}
							alt={screen.alt}
							width={screen.width}
							height={screen.height}
							loading="lazy"
							className="aspect-[390/844] w-full rounded-[1.75rem] object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
