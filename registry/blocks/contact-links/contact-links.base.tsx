import {
	AtSignIcon,
	CameraIcon,
	GlobeIcon,
	MailIcon,
	MessageCircleIcon,
	Music2Icon,
	PhoneIcon,
	ThumbsUpIcon,
	type LucideIcon,
} from "lucide-react";

import { type BlockProps, heading } from "@/lib/blocks";
import type { ContactLink } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ContactLinksContent } from "./schema";

/* Generic icons: Lucide carries no brand logos. */
const icons: Record<ContactLink["kind"], LucideIcon> = {
	phone: PhoneIcon,
	whatsapp: MessageCircleIcon,
	email: MailIcon,
	instagram: CameraIcon,
	facebook: ThumbsUpIcon,
	tiktok: Music2Icon,
	x: AtSignIcon,
	website: GlobeIcon,
};

const digits = (number: string) => number.replace(/[^0-9]/g, "");

/** Where a link leads: a call, a WhatsApp chat, an email, or the profile's address. */
function hrefOf({ kind, value }: ContactLink) {
	if (kind === "phone") return `tel:+${digits(value)}`;
	if (kind === "whatsapp") return `https://wa.me/${digits(value)}`;
	if (kind === "email") return `mailto:${value}`;
	return value;
}

/** What a link shows under its label: the number or address, or the profile's host and path. */
function shown({ kind, value }: ContactLink) {
	if (kind === "phone" || kind === "whatsapp" || kind === "email") return value;
	return value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/**
 * A heading and the links as cards: one column in a narrow container, two from `@xl`, three from `@3xl`. Each card is
 * the whole link: an icon, the label and the number, address or profile. Links that leave the site open in a new tab.
 */
export function ContactLinks({ content = example, id = "contact", className, headingLevel = 2 }: BlockProps<ContactLinksContent>) {
	const Heading = heading(headingLevel);
	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="contact-links" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto max-w-5xl">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
					<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-lg text-balance text-muted-foreground">{content.subline}</p>}
				</div>
				<ul className="mt-10 grid gap-3 @xl:grid-cols-2 @3xl:grid-cols-3">
					{content.links.map((link) => {
						const Icon = icons[link.kind];
						const external = !["phone", "email"].includes(link.kind);
						return (
							<li key={`${link.kind}-${link.value}`}>
								<a
									href={hrefOf(link)}
									{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
									className="flex items-center gap-4 rounded-lg border-village bg-card p-4 text-card-foreground outline-none transition-colors hover:bg-accent focus-visible:focus-ring"
								>
									<span className="flex size-10 shrink-0 items-center justify-center rounded-lg tone-primary bg-tone-soft text-tone-text">
										<Icon aria-hidden="true" className="size-5" />
									</span>
									<span className="flex min-w-0 flex-col">
										<span className="font-medium">{link.label ?? shown(link)}</span>
										{link.label && <span className="truncate text-sm text-muted-foreground">{shown(link)}</span>}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
