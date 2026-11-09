import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { TeamStaffContent } from "./schema";

/**
 * The people who will serve you: a portrait, the name and role, what they are best at, and a link to book with them.
 * Two columns in a narrow container, three from `@3xl`, four from `@5xl`. A member without a photo shows their
 * initials on a muted tile, so the grid keeps its rhythm.
 */
export function TeamStaff({ content = example, id = "team", className, headingLevel = 2 }: BlockProps<TeamStaffContent>) {
	const Heading = heading(headingLevel);
	const Name = `h${Math.min(headingLevel + 1, 6)}` as "h3";
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="team-staff" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-6xl">
				<div className="flex max-w-2xl flex-col gap-3">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 @3xl:grid-cols-3 @3xl:gap-x-6 @5xl:grid-cols-4">
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
								<p className="text-sm text-muted-foreground">{member.role}</p>
							</div>
							{member.specialties && member.specialties.length > 0 && (
								<ul className="flex flex-wrap gap-1.5">
									{member.specialties.map((specialty) => (
										<li key={specialty}>
											<Badge variant="soft" size="sm">
												{specialty}
											</Badge>
										</li>
									))}
								</ul>
							)}
							{member.cta && (
								<Button variant="outline" size="sm" className="self-start" render={<a href={member.cta.href} />} nativeButton={false}>
									{member.cta.label}
								</Button>
							)}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
