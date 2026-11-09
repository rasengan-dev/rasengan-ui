import { MapPinIcon, NavigationIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { LocationMapContent } from "./schema";

export interface LocationMapProps extends BlockProps<LocationMapContent> {
	/**
	 * Show a live OpenStreetMap instead of the static map, when the address has coordinates. Off by default: the embed
	 * loads a third-party page, which the site's privacy policy must mention.
	 */
	embed?: boolean;
}

/** An OpenStreetMap embed centred on the place, with a marker. */
const embedUrl = ({ lat, lng }: { lat: number; lng: number }) =>
	`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006},${lat - 0.004},${lng + 0.006},${lat + 0.004}&layer=mapnik&marker=${lat},${lng}`;

/**
 * The address on one side (lines, landmark, directions, notes), the map on the other: stacked in a narrow container,
 * side by side from `@3xl`. The map is the content's static picture, linking to the full map, unless `embed` asks for
 * a live OpenStreetMap and the address has coordinates.
 */
export function LocationMap({ content = example, id = "location", className, headingLevel = 2, embed = false }: LocationMapProps) {
	const Heading = heading(headingLevel);
	const { address, map } = content;
	const live = embed && address.coordinates;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="location-map" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-6xl gap-8 @3xl:grid-cols-[2fr_3fr] @3xl:items-center @3xl:gap-12">
				<div className="flex flex-col items-start gap-5">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					<address className="flex gap-3 not-italic">
						<MapPinIcon aria-hidden="true" className="mt-1 size-5 shrink-0 tone-primary text-tone-text" />
						<span className="flex flex-col">
							{address.lines.map((line) => (
								<span key={line} className="text-lg">
									{line}
								</span>
							))}
							{address.landmark && <span className="mt-1 text-muted-foreground">{address.landmark}</span>}
						</span>
					</address>
					<Button render={<a href={content.directions.href} target="_blank" rel="noreferrer" />} nativeButton={false}>
						<NavigationIcon aria-hidden="true" />
						{content.directions.label}
					</Button>
					{content.notes && content.notes.length > 0 && (
						<ul className="flex list-disc flex-col gap-1 ps-5 text-sm text-muted-foreground marker:text-muted-foreground">
							{content.notes.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
					)}
				</div>
				<div className="overflow-hidden rounded-xl border-village shadow-md">
					{live ? (
						<iframe
							src={embedUrl(live)}
							title={map.alt}
							loading="lazy"
							referrerPolicy="no-referrer"
							className="aspect-[3/2] w-full border-0"
						/>
					) : (
						<a href={address.mapUrl ?? content.directions.href} target="_blank" rel="noreferrer" className="block outline-none focus-visible:focus-ring">
							<img src={map.src} alt={map.alt} width={map.width} height={map.height} loading="lazy" className="aspect-[3/2] h-auto w-full object-cover" />
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
