import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { TeamGridContent } from "./schema";

/**
 * The company's people: a portrait, the name and role, a line about them and their profiles. Two columns in a narrow
 * container, three from `@3xl`, four from `@5xl`; a member without a photo shows their initials on a muted tile. An
 * optional link under the grid (open roles).
 */
export function TeamGrid({ content = example, id = "team", className, headingLevel = 2 }: BlockProps<TeamGridContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="team-grid" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					{content.eyebrow && <p className="text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 @3xl:grid-cols-3 @3xl:gap-x-8 @5xl:grid-cols-4">
					{content.members.map((member) => (
						<li key={member.name} className="flex flex-col gap-3">
							{member.image ? (
								<img
									src={member.image.src}
									alt={member.image.alt}
									width={member.image.width}
									height={member.image.height}
									loading="lazy"
									className="aspect-[4/5] w-full rounded-xl object-cover"
								/>
							) : (
								<div aria-hidden="true" className="flex aspect-[4/5] items-center justify-center rounded-xl bg-muted font-display text-4xl text-muted-foreground">
									{member.name
										.split(/\s+/)
										.map((word) => word[0])
										.slice(0, 2)
										.join("")}
								</div>
							)}
							<div className="flex flex-col gap-0.5">
								<Name className="font-display text-lg font-semibold tracking-display case-heading">{member.name}</Name>
								<p className="text-sm tone-primary text-tone-text">{member.role}</p>
							</div>
							{member.bio && <p className="text-sm text-muted-foreground">{member.bio}</p>}
							{member.links && member.links.length > 0 && (
								<ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
									{member.links.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												target="_blank"
												rel="noreferrer"
												aria-label={`${link.label}, ${member.name}`}
												className="font-medium underline underline-offset-4 hover:no-underline"
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
				{content.cta && (
					<div className="mt-12 flex justify-center">
						<Button variant="outline" render={<a href={content.cta.href} />} nativeButton={false}>
							{content.cta.label}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
