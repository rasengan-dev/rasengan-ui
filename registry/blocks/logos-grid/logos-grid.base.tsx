import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { LogosGridContent } from "./schema";

/**
 * Customers' logos standing still, in a grid of bordered cells: two columns in a narrow container, four from `@2xl`.
 * A logo with an image shows its mark beside its name; one without shows its name in the display face. For a moving
 * line of logos, see logos-marquee.
 */
export function LogosGrid({ content = example, id = "logos", className, headingLevel = 2 }: BlockProps<LogosGridContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={content.title ? `${id}-title` : undefined} data-slot="block" data-block="logos-grid" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto max-w-5xl">
				{content.title && (
					<Heading id={`${id}-title`} className="text-center text-sm font-medium text-muted-foreground">
						{content.title}
					</Heading>
				)}
				<ul className="mt-8 grid grid-cols-2 overflow-hidden rounded-xl border-village @2xl:grid-cols-4">
					{content.logos.map((logo) => (
						<li
							key={logo.name}
							className="-mb-px -me-px flex h-24 items-center justify-center gap-3 border-e-(length:--border-width) border-b-(length:--border-width) px-4 text-muted-foreground"
						>
							{logo.src && <img src={logo.src} alt="" width={logo.width ?? 96} height={logo.height ?? 96} loading="lazy" className="size-8 object-contain" />}
							<span className="font-display text-lg font-semibold tracking-display whitespace-nowrap">{logo.name}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
