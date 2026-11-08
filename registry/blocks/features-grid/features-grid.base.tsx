import {
	BellIcon,
	ChartColumnIcon,
	ClockIcon,
	FileTextIcon,
	GlobeIcon,
	HeartIcon,
	LayersIcon,
	LockIcon,
	PlugIcon,
	RepeatIcon,
	RocketIcon,
	ShieldCheckIcon,
	SparklesIcon,
	UsersIcon,
	WalletIcon,
	ZapIcon,
	type LucideIcon,
} from "lucide-react";

import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FeaturesGridContent, featureIcons } from "./schema";

const icons: Record<(typeof featureIcons)[number], LucideIcon> = {
	bolt: ZapIcon,
	shield: ShieldCheckIcon,
	sparkles: SparklesIcon,
	clock: ClockIcon,
	chart: ChartColumnIcon,
	globe: GlobeIcon,
	lock: LockIcon,
	users: UsersIcon,
	bell: BellIcon,
	wallet: WalletIcon,
	repeat: RepeatIcon,
	file: FileTextIcon,
	plug: PlugIcon,
	rocket: RocketIcon,
	heart: HeartIcon,
	layers: LayersIcon,
};

/**
 * A heading and a grid of features: one column in a narrow container, two from `@xl`, three from `@4xl`. Each feature's
 * title is a heading one level below the block's.
 */
export function FeaturesGrid({ content = example, id = "features", className, headingLevel = 2 }: BlockProps<FeaturesGridContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="features-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-12 grid gap-x-8 gap-y-10 @xl:grid-cols-2 @4xl:grid-cols-3">
					{content.features.map((feature) => {
						const Icon = icons[feature.icon];
						return (
							<li key={feature.title} className="flex flex-col gap-3">
								<span className="flex size-10 items-center justify-center rounded-lg tone-primary bg-tone-soft text-tone-text">
									<Icon aria-hidden="true" className="size-5" />
								</span>
								<Title className="font-display text-lg font-semibold tracking-display">{feature.title}</Title>
								<p className="text-muted-foreground">{feature.description}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
