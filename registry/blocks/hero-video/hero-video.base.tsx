import { Button } from "@/components/ui/button";
import { Video } from "@/components/ui/video";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { HeroVideoContent } from "./schema";

/**
 * A muted video loop in a large rounded frame, inset in the page's margins, with its pause button (Video's
 * `autoPlay`): it waits on its poster under reduced motion. The headline, a line and the actions sit on a panel of the
 * page's background over the video's lower start corner, so they read at 4.5:1 whatever the frame shows, and the
 * pause button keeps the other corner; below `@3xl` the panel sits under the video, never over its button.
 */
export function HeroVideo({ content = example, id = "hero", className, headingLevel = 1 }: BlockProps<HeroVideoContent>) {
	const Heading = heading(headingLevel);
	const { video } = content;
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="hero-video" className={cn("@container px-4 py-6 @3xl:py-8", className)}>
			<div className="relative mx-auto max-w-7xl">
				<Video
					autoPlay
					src={video.src}
					poster={video.poster}
					label={video.label}
					labels={content.labels}
					className="aspect-[4/3] rounded-xl @3xl:aspect-[16/8]"
				/>
				<div className="relative z-10 mt-4 flex flex-col items-start gap-4 rounded-xl border-village bg-background/95 p-6 text-foreground shadow-lg backdrop-blur-surface @3xl:absolute @3xl:bottom-6 @3xl:start-6 @3xl:mt-0 @3xl:max-w-xl @3xl:p-8">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-4xl @5xl:text-5xl">
						{content.headline}
					</Heading>
					{content.subline && <p className="m-0 text-base text-muted-foreground @2xl:text-lg">{content.subline}</p>}
					<div className="flex w-full flex-col gap-3 @md:w-auto @md:flex-row">
						<Button size="lg" render={<a href={content.primary.href} />} nativeButton={false}>
							{content.primary.label}
						</Button>
						{content.secondary && (
							<Button size="lg" variant="outline" render={<a href={content.secondary.href} />} nativeButton={false}>
								{content.secondary.label}
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
