import { CameraIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { GallerySocialContent } from "./schema";

/**
 * The feed, the way a profile shows it: the project's own photos in a square grid of three columns, tight gaps, and
 * the account's handle and a follow link. Nothing is embedded or fetched from the network (RFC-0008): the photos are
 * files in the project, chosen and updated by hand or by its build. Lucide has no brand logos: a camera stands in.
 */
export function GallerySocial({ content = example, id = "gallery", className, headingLevel = 2 }: BlockProps<GallerySocialContent>) {
	const Heading = heading(headingLevel);
	const { account } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="gallery-social" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-4xl">
				<div className="flex flex-col items-start justify-between gap-4 @2xl:flex-row @2xl:items-end">
					<div className="flex max-w-xl flex-col gap-2">
						<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
							{content.title}
						</Heading>
						{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					</div>
					<Button variant="outline" render={<a href={account.href} target="_blank" rel="noreferrer" />} nativeButton={false}>
						<CameraIcon aria-hidden="true" />
						{account.follow}
						<span className="text-muted-foreground">{account.handle}</span>
					</Button>
				</div>
				<ul className="mt-8 grid grid-cols-3 gap-1 @2xl:gap-2">
					{content.photos.map((photo, index) => (
						<li key={`${photo.src}-${index}`}>
							<img
								src={photo.src}
								alt={photo.alt}
								width={photo.width}
								height={photo.height}
								loading="lazy"
								className="aspect-square w-full rounded-sm object-cover"
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
