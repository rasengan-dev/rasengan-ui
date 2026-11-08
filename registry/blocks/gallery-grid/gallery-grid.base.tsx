"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { GalleryGridContent } from "./schema";

/**
 * A heading and the photos in a grid: two columns in a narrow container, three from `@2xl`, the first photo two by
 * two. Each photo is a button that opens it in a Dialog, large, with its caption and arrows (and the arrow keys) to
 * the others. Photos load lazily.
 */
export function GalleryGrid({ content = example, id = "gallery", className, headingLevel = 2 }: BlockProps<GalleryGridContent>) {
	const Heading = heading(headingLevel);
	const { photos } = content;
	const [open, setOpen] = useState<number | null>(null);
	const step = (by: number) => setOpen((current) => (current === null ? null : (current + by + photos.length) % photos.length));
	const photo = open === null ? undefined : photos[open];

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="gallery-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
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
							<button
								type="button"
								onClick={() => setOpen(index)}
								className="group relative block size-full overflow-hidden rounded-lg border-village outline-none focus-visible:focus-ring"
							>
								<img
									src={item.src}
									alt={item.alt}
									width={item.width}
									height={item.height}
									loading="lazy"
									className="aspect-[4/3] size-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover:scale-105 motion-reduce:transition-none"
								/>
								{/* Read in the dialog; here it shows on hover and focus, over the photo. */}
								{item.caption && (
									<span
										aria-hidden="true"
										className="absolute inset-x-2 bottom-2 rounded-md bg-background/90 px-2.5 py-1.5 text-start text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
									>
										{item.caption}
									</span>
								)}
							</button>
						</li>
					))}
				</ul>
			</div>
			<Dialog open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
				<DialogContent
					className="max-w-[min(64rem,calc(100vw-2rem))] gap-3 p-3 sm:max-w-[min(64rem,calc(100vw-2rem))]"
					onKeyDown={(event) => {
						if (event.key === "ArrowLeft") step(-1);
						if (event.key === "ArrowRight") step(1);
					}}
				>
					{photo && (
						<>
							<img src={photo.src} alt="" width={photo.width} height={photo.height} className="max-h-[75vh] w-full rounded-md object-contain" />
							<div className="flex items-center gap-3 px-1 pb-1">
								<div className="min-w-0 flex-1">
									<DialogTitle className="text-sm font-medium">{photo.alt}</DialogTitle>
									{photo.caption && <DialogDescription className="text-sm">{photo.caption}</DialogDescription>}
								</div>
								<Button variant="outline" size="icon-sm" onClick={() => step(-1)} aria-label={content.labels.previous}>
									<ChevronLeftIcon aria-hidden="true" />
								</Button>
								<Button variant="outline" size="icon-sm" onClick={() => step(1)} aria-label={content.labels.next}>
									<ChevronRightIcon aria-hidden="true" />
								</Button>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</section>
	);
}
