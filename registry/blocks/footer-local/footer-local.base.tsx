import { CameraIcon, GlobeIcon, MailIcon, MessageCircleIcon, Music2Icon, PhoneIcon, ThumbsUpIcon, AtSignIcon, type LucideIcon } from "lucide-react";

import { type BlockProps, heading } from "@/lib/blocks";
import type { ContactLink, OpeningHours } from "@/lib/block-fields";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { FooterLocalContent } from "./schema";

type Day = OpeningHours["days"][number]["day"];
const week: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

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
const hrefOf = ({ kind, value }: ContactLink) =>
	kind === "phone" ? `tel:+${digits(value)}` : kind === "whatsapp" ? `https://wa.me/${digits(value)}` : kind === "email" ? `mailto:${value}` : value;
const shown = ({ kind, value }: ContactLink) =>
	kind === "phone" || kind === "whatsapp" || kind === "email" ? value : value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/**
 * The week in rows, consecutive days with the same slots on one row ("Tue – Fri"), day names short and times in the
 * locale's way. The same on the server and in the browser: nothing here reads the clock.
 */
function weekRows(hours: OpeningHours, locale: string | undefined, closed: string) {
	const dayName = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
	const time = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
	const name = (day: Day) => dayName.format(new Date(Date.UTC(2024, 0, 1 + week.indexOf(day))));
	const at = (t: string) => time.format(new Date(Date.UTC(2024, 0, 1, Number(t.slice(0, 2)), Number(t.slice(3, 5)))));
	const text = (day: Day) => {
		const slots = hours.days.find((entry) => entry.day === day)?.slots;
		if (!slots) return null;
		return slots.length === 0 ? closed : slots.map((slot) => `${at(slot.open)}–${at(slot.close)}`).join(", ");
	};
	const rows: { days: string; hours: string }[] = [];
	let start = 0;
	for (let i = 1; i <= week.length; i++) {
		if (i < week.length && text(week[i]) === text(week[start])) continue;
		const value = text(week[start]);
		if (value) rows.push({ days: i - 1 === start ? name(week[start]) : `${name(week[start])} – ${name(week[i - 1])}`, hours: value });
		start = i;
	}
	return rows;
}

/**
 * A footer for a place people visit: the name and a line about it, the address with a landmark and a directions
 * link, the week's hours in a few rows, the ways to reach it, the site's links and the copyright. The page's
 * `<footer>` landmark; column titles are headings at `headingLevel`, small. One column in a narrow container, two
 * from `@xl`, four from `@4xl`.
 */
export function FooterLocal({ content = example, id = "footer", className, headingLevel = 2 }: BlockProps<FooterLocalContent>) {
	const Column = heading(headingLevel);
	const { labels, address } = content;
	const rows = content.hours ? weekRows(content.hours, content.locale, labels.closed) : [];
	const column = "font-display text-sm font-semibold tracking-wide uppercase text-muted-foreground";
	return (
		<footer id={id} data-slot="block" data-block="footer-local" className={cn("@container border-t-(length:--border-width) px-4 pt-14 pb-8", className)}>
			<div className="mx-auto grid max-w-6xl gap-10 @xl:grid-cols-2 @4xl:grid-cols-4">
				<div className="flex flex-col gap-3">
					<p className="font-display text-2xl font-semibold tracking-display case-heading">{content.name}</p>
					{content.tagline && <p className="text-muted-foreground">{content.tagline}</p>}
					{content.links && content.links.length > 0 && (
						<nav aria-label={content.name}>
							<ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
								{content.links.map((link) => (
									<li key={link.href}>
										<a href={link.href} className="underline-offset-4 hover:underline">
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</nav>
					)}
				</div>
				<div className="flex flex-col gap-3">
					<Column className={column}>{labels.visit}</Column>
					<address className="flex flex-col not-italic">
						{address.lines.map((line) => (
							<span key={line}>{line}</span>
						))}
						{address.landmark && <span className="text-sm text-muted-foreground">{address.landmark}</span>}
					</address>
					{address.mapUrl && labels.directions && (
						<a href={address.mapUrl} target="_blank" rel="noreferrer" className="text-sm font-medium underline underline-offset-4">
							{labels.directions}
						</a>
					)}
				</div>
				{rows.length > 0 && (
					<div className="flex flex-col gap-3">
						<Column className={column}>{labels.hours}</Column>
						<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
							{rows.map((row) => (
								<div key={row.days} className="contents">
									<dt className="font-medium">{row.days}</dt>
									<dd className={cn("tabular-nums", row.hours === labels.closed && "text-muted-foreground")}>{row.hours}</dd>
								</div>
							))}
						</dl>
					</div>
				)}
				{content.contacts && content.contacts.length > 0 && (
					<div className="flex flex-col gap-3">
						<Column className={column}>{labels.contact}</Column>
						<ul className="flex flex-col gap-2 text-sm">
							{content.contacts.map((contact) => {
								const Icon = icons[contact.kind];
								const external = !["phone", "email"].includes(contact.kind);
								return (
									<li key={`${contact.kind}-${contact.value}`}>
										<a
											href={hrefOf(contact)}
											{...(external ? { target: "_blank", rel: "noreferrer" } : {})}
											className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
										>
											<Icon aria-hidden="true" className="size-4 text-muted-foreground" />
											{contact.label && <span className="font-medium">{contact.label}</span>}
											<span className="tabular-nums">{shown(contact)}</span>
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
			<p className="mx-auto mt-12 max-w-6xl border-t-(length:--border-width) pt-6 text-sm text-muted-foreground">{content.copyright}</p>
		</footer>
	);
}
