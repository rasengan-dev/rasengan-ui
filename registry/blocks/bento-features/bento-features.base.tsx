import {
	BellIcon,
	ChartColumnIcon,
	FileTextIcon,
	GlobeIcon,
	LockIcon,
	PlugIcon,
	RepeatIcon,
	ShieldCheckIcon,
	SparklesIcon,
	UsersIcon,
	WalletIcon,
	ZapIcon,
	type LucideIcon,
} from "lucide-react";

import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, heading } from "@/lib/blocks";
import type { Stat } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { BentoFeaturesContent, bentoIcons } from "./schema";

const icons: Record<(typeof bentoIcons)[number], LucideIcon> = {
	bolt: ZapIcon,
	shield: ShieldCheckIcon,
	bell: BellIcon,
	wallet: WalletIcon,
	globe: GlobeIcon,
	chart: ChartColumnIcon,
	file: FileTextIcon,
	users: UsersIcon,
	lock: LockIcon,
	repeat: RepeatIcon,
	plug: PlugIcon,
	sparkles: SparklesIcon,
};

/* Spans from `@3xl`, where the grid has four columns; below, every tile is one cell wide (two columns from `@xl`). */
const spans = {
	small: "",
	wide: "@xl:col-span-2",
	tall: "@3xl:row-span-2",
	large: "@xl:col-span-2 @3xl:row-span-2",
} as const;

/** A stat's `Intl.NumberFormat` options, fraction digits explicit so the server and the browser agree. */
function formatOf(stat: { format?: Stat["format"]; currency?: string }): Intl.NumberFormatOptions {
	if (stat.format === "percent") return { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 1 };
	if (stat.format === "currency")
		return { style: "currency", currency: stat.currency ?? "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
	if (stat.format === "compact") return { notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 };
	return {};
}

/**
 * A bento grid: tiles of different sizes (small, wide, tall, large) holding a feature with its icon, a number that
 * rolls in when it scrolls into view (NumberRoll), or an image with its caption. Four columns from `@3xl`, two from
 * `@xl`, one below; rows grow with their content. Each tile's title is a heading one level below the block's; a
 * stat's label is its heading.
 */
export function BentoFeatures({ content = example, id = "bento", className, headingLevel = 2 }: BlockProps<BentoFeaturesContent>) {
	const Heading = heading(headingLevel);
	const Title = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="bento-features" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-12 grid auto-rows-[minmax(11rem,auto)] gap-4 @xl:grid-cols-2 @3xl:grid-cols-4">
					{content.tiles.map((tile, index) => {
						const tileClass = cn(
							"flex flex-col overflow-hidden rounded-xl border-village bg-card text-card-foreground shadow-sm backdrop-blur-surface",
							spans[tile.size ?? "small"],
						);
						if (tile.kind === "image")
							return (
								<li key={index} className={tileClass}>
									<div className="flex flex-col gap-1.5 p-6">
										<Title className="font-display text-lg font-semibold tracking-display case-heading">{tile.title}</Title>
										{tile.description && <p className="text-sm text-muted-foreground">{tile.description}</p>}
									</div>
									<img
										src={tile.image.src}
										alt={tile.image.alt}
										width={tile.image.width}
										height={tile.image.height}
										loading="lazy"
										className="mt-auto ms-6 w-[calc(100%-1.5rem)] flex-1 rounded-ss-lg border-t-(length:--border-width) border-s-(length:--border-width) object-cover object-left-top rtl:object-right-top"
									/>
								</li>
							);
						if (tile.kind === "stat")
							return (
								<li key={index} className={cn(tileClass, "justify-between gap-4 p-6")}>
									<NumberRoll
										value={tile.stat.value}
										format={formatOf(tile.stat)}
										locale={content.locale}
										className="font-display text-5xl font-semibold tracking-display tone-primary text-tone-text"
									/>
									<div className="flex flex-col gap-1">
										<Title className="font-medium">{tile.stat.label}</Title>
										{tile.description && <p className="text-sm text-muted-foreground">{tile.description}</p>}
									</div>
								</li>
							);
						const Icon = icons[tile.icon];
						return (
							<li key={index} className={cn(tileClass, "gap-3 p-6")}>
								<span className="flex size-10 items-center justify-center rounded-lg tone-primary bg-tone-soft text-tone-text">
									<Icon aria-hidden="true" className="size-5" />
								</span>
								<Title className="mt-auto font-display text-lg font-semibold tracking-display case-heading">{tile.title}</Title>
								<p className="text-sm text-muted-foreground">{tile.description}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
