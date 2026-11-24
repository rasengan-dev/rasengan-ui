import { HorizontalScroll, HorizontalScrollItem, HorizontalScrollTrack } from "@/components/ui/horizontal-scroll";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { GalleryHorizontalContent } from "./schema";

const two = (n: number) => String(n).padStart(2, "0");

/**
 * A heading, then the photos in one row: on a wide screen the row pins and moves sideways as the page scrolls
 * (HorizontalScroll), on a phone it is a row to swipe, and with reduced motion it stays a row. Each photo is numbered
 * ("01 — 06") with its caption, and opens full screen in a Lightbox.
 */
export function GalleryHorizontal({ content = example, id = "series", className, headingLevel = 2 }: BlockProps<GalleryHorizontalContent>) {
	const Heading = heading(headingLevel);
	const { photos } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="gallery-horizontal" className={cn("@container py-16 @3xl:py-24", className)}>
			<div className="mx-auto flex max-w-6xl flex-col gap-3 px-4">
				{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
				<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
					{content.title}
				</Heading>
				{content.subline && <p className="max-w-2xl text-lg text-muted-foreground">{content.subline}</p>}
			</div>
			<Lightbox images={photos}>
				<HorizontalScroll aria-label={content.labels.photos} className="mt-10">
					<HorizontalScrollTrack className="px-4">
						{photos.map((photo, index) => (
							<HorizontalScrollItem key={photo.src} className="w-[78cqi] max-w-md @3xl:w-[34cqi]">
								<figure className="m-0 flex flex-col gap-3">
									<LightboxTrigger index={index} className="group block w-full cursor-zoom-in overflow-hidden rounded-lg outline-none focus-visible:focus-ring">
										<img
											src={photo.src}
											alt={photo.alt}
											width={photo.width}
											height={photo.height}
											loading="lazy"
											className="aspect-[4/5] w-full bg-muted object-cover transition-[scale] duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
										/>
									</LightboxTrigger>
									<figcaption className="flex items-baseline gap-3 text-sm">
										<span aria-hidden="true" className="font-mono text-xs text-muted-foreground tabular-nums">
											({two(index + 1)} — {two(photos.length)})
										</span>
										{photo.caption}
									</figcaption>
								</figure>
							</HorizontalScrollItem>
						))}
					</HorizontalScrollTrack>
				</HorizontalScroll>
				<LightboxContent />
			</Lightbox>
		</section>
	);
}
