import { CheckIcon, GlobeIcon, LockIcon, ServerIcon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { SecurityBadgesContent } from "./schema";

/** The fixed set of icons a point may name: never a certification body's seal. */
const icons = { shield: ShieldCheckIcon, lock: LockIcon, globe: GlobeIcon, server: ServerIcon, check: CheckIcon };

/**
 * A heading and the security and compliance points as tiles, on the page's own background (so their badges keep their
 * contrast on a muted section): an icon from a fixed set (never a third-party seal), the
 * name, a line, and a status badge when it has one (certified, or in progress, so a site never claims an audit it has
 * not passed). Two columns in a narrow container, four from `@4xl`; an optional link below.
 */
export function SecurityBadges({ content = example, id = "security", className, headingLevel = 2 }: BlockProps<SecurityBadgesContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="security-badges" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="m-0 mt-10 grid list-none gap-4 p-0 @2xl:grid-cols-2 @4xl:grid-cols-4">
					{content.points.map((point) => {
						const Icon = icons[point.icon ?? "shield"];
						return (
							<li key={point.name} className="flex flex-col items-start gap-3 rounded-xl border-village border-border bg-background p-6">
								<span className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground">
									<Icon aria-hidden="true" className="size-5" />
								</span>
								<Name className="font-display text-lg font-semibold tracking-display case-heading">{point.name}</Name>
								{point.description && <p className="m-0 text-sm text-pretty text-muted-foreground">{point.description}</p>}
								{point.status && (
									<Badge variant="soft" tone={point.status === "certified" ? "success" : "warning"} className="mt-auto">
										{point.status === "certified" ? content.labels.certified : content.labels.inProgress}
									</Badge>
								)}
							</li>
						);
					})}
				</ul>
				{content.cta && (
					<div className="mt-10 flex justify-center">
						<Button variant="outline" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
