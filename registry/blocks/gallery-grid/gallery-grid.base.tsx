"use client";

import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { GalleryGridContent } from "./schema";

/**
 * A heading and the photos in a grid: two columns in a narrow container, three from `@2xl`, the first photo two by
 * two. Each photo opens a Lightbox, full screen, with its caption and arrows (the arrow keys, a swipe) to the others.
 * Photos load lazily.
 */
export function GalleryGrid({ content = example, id = "gallery", className, headingLevel = 2 }: BlockProps<GalleryGridContent>) {
	const Heading = heading(headingLevel);
	const { photos } = content;

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="gallery-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<Lightbox images={photos} labels={content.labels}>
				<div className="mx-auto max-w-6xl">
					<div className="flex max-w-2xl flex-col gap-3">
						<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
							{content.title}
						</Heading>
						{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					</div>
					<ul className="mt-10 grid grid-cols-2 gap-3 @2xl:grid-cols-3 @2xl:gap-4">
						{photos.map((item, index) => (
							<li key={item.src} className={cn(index === 0 && "col-span-2 row-span-2")}>
								<LightboxTrigger
									index={index}
									className="group relative block size-full cursor-zoom-in overflow-hidden rounded-lg border-village outline-none focus-visible:focus-ring"
								>
									<img
										src={item.src}
										alt={item.alt}
										width={item.width}
										height={item.height}
										loading="lazy"
										className="aspect-[4/3] size-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-105 motion-reduce:transition-none"
									/>
									{/* Read in the lightbox; here it shows on hover and focus, over the photo. */}
									{item.caption && (
										<span
											aria-hidden="true"
											className="absolute inset-x-2 bottom-2 rounded-md bg-background/90 px-2.5 py-1.5 text-start text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
										>
											{item.caption}
										</span>
									)}
								</LightboxTrigger>
							</li>
						))}
					</ul>
				</div>
				<LightboxContent />
			</Lightbox>
		</section>
	);
}
