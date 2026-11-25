"use client";

import * as React from "react";
import { CheckIcon, ImagesIcon, MapPinIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { type BlockProps, formatMoney, heading, messageUrl } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ListingDetailContent } from "./schema";

/** What the visitor wrote. */
export interface EnquiryValues {
	name: string;
	phone: string;
	message: string;
}

export interface ListingDetailProps extends BlockProps<ListingDetailContent> {
	/** Post the enquiry to this URL (fields `name`, `phone`, `message`, `listing`) instead of opening a message. */
	action?: string;
	/** Take the enquiry in code instead of opening a message. */
	onSubmit?: (values: EnquiryValues) => void;
}

/**
 * A listing's page: the place and kind, the title and its line, the status and the price with its period; a mosaic of
 * photos (one large, two beside it) that opens a full-screen Lightbox; then the facts, the description, what it comes
 * with and the other details, beside an enquiry form that stays in view. The enquiry opens the visitor's WhatsApp,
 * texts or mail app with the listing named (RFC-0009, no backend); `action` posts it, `onSubmit` hands it to code.
 */
export function ListingDetail({ content = example, id = "listing", className, headingLevel = 1, action, onSubmit }: ListingDetailProps) {
	const Heading = heading(headingLevel);
	const Subheading = `h${Math.min(headingLevel + 1, 6)}` as "h2";
	const { listing, enquiry, labels, locale } = content;
	const period = labels.periods[listing.period ?? "once"];
	const tiles = listing.images.slice(0, 3);
	const [errors, setErrors] = React.useState<Record<string, string>>({});
	const [sent, setSent] = React.useState(false);
	const clear = (key: string) => errors[key] && setErrors(({ [key]: _, ...rest }) => rest);

	function submit(event: React.FormEvent<HTMLFormElement>) {
		const form = new FormData(event.currentTarget);
		const values: EnquiryValues = {
			name: String(form.get("name") ?? "").trim(),
			phone: String(form.get("phone") ?? "").trim(),
			message: String(form.get("message") ?? "").trim(),
		};
		const found: Record<string, string> = {};
		if (!values.name) found.name = labels.required;
		if (!values.phone) found.phone = labels.required;
		setErrors(found);
		if (Object.keys(found).length > 0) return event.preventDefault();
		if (action) return;
		event.preventDefault();
		if (onSubmit) return onSubmit(values);
		const lines = [
			labels.intro.replace("{title}", listing.title),
			"",
			`${enquiry.fields.name.label}: ${values.name}`,
			`${enquiry.fields.phone.label}: ${values.phone}`,
			...(values.message ? ["", values.message] : []),
		];
		const url = messageUrl(enquiry.channel, lines.join("\n"), listing.title);
		if (enquiry.channel.kind === "whatsapp") window.open(url, "_blank", "noopener");
		else window.location.href = url;
		setSent(true);
	}

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="listing-detail" className={cn("@container px-4 py-10 @3xl:py-14", className)}>
			<Lightbox images={listing.images} labels={{ photos: labels.photos, previous: labels.previous, next: labels.next, close: labels.close }}>
				<div className="mx-auto flex max-w-7xl flex-col gap-8">
					<header className="flex flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
						<div className="flex max-w-3xl flex-col gap-3">
							<p className="m-0 flex items-center gap-1.5 text-sm text-muted-foreground">
								<MapPinIcon aria-hidden="true" className="size-4 shrink-0" />
								{[listing.place, listing.kind].filter(Boolean).join(" · ")}
							</p>
							<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-5xl">
								{listing.title}
							</Heading>
							{listing.summary && <p className="m-0 text-lg text-muted-foreground">{listing.summary}</p>}
							{listing.rating && (
								<p className="m-0 flex items-center gap-2 text-sm text-muted-foreground">
									<Rating value={listing.rating.score} size="sm" showValue locale={locale} />
									<span>{labels.reviews.replace("{count}", String(listing.rating.count))}</span>
								</p>
							)}
						</div>
						<div className="flex flex-col items-start gap-2 @3xl:items-end">
							{(listing.status || listing.tags?.length) && (
								<ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 @3xl:justify-end">
									{listing.status && (
										<li>
											<Badge variant="soft">{listing.status}</Badge>
										</li>
									)}
									{listing.tags?.map((tag) => (
										<li key={tag}>
											<Badge variant="soft" tone="neutral">
												{tag}
											</Badge>
										</li>
									))}
								</ul>
							)}
							{listing.price && (
								<p className="m-0 @3xl:text-end">
									<span className="font-display text-3xl font-semibold tabular-nums">{formatMoney(listing.price, locale)}</span>
									{period && <span className="text-muted-foreground"> {period}</span>}
								</p>
							)}
						</div>
					</header>

					<ul className="m-0 grid list-none gap-2 p-0 @3xl:h-[30rem] @3xl:grid-cols-[2fr_1fr] @3xl:grid-rows-2 @3xl:gap-3">
						{tiles.map((photo, index) => (
							<li key={photo.src} className={cn(index === 0 ? "@3xl:row-span-2" : "hidden @3xl:block", tiles.length === 1 && "@3xl:col-span-2")}>
								<LightboxTrigger
									index={index}
									aria-label={labels.open.replace("{n}", String(index + 1))}
									className="relative block size-full cursor-zoom-in overflow-hidden rounded-xl border-village bg-muted outline-none focus-visible:focus-ring"
								>
									<img
										src={photo.src}
										alt={photo.alt}
										width={photo.width}
										height={photo.height}
										fetchPriority={index === 0 ? "high" : undefined}
										className="aspect-[4/3] size-full object-cover @3xl:aspect-auto"
									/>
								</LightboxTrigger>
							</li>
						))}
					</ul>
					{listing.images.length > 1 && (
						<LightboxTrigger index={0} render={<Button variant="outline" className="-mt-4 self-start @3xl:-mt-2" />}>
							<ImagesIcon aria-hidden="true" />
							{labels.all.replace("{count}", String(listing.images.length))}
						</LightboxTrigger>
					)}

					<div className="grid gap-10 @3xl:grid-cols-[minmax(0,1fr)_22rem] @3xl:gap-14">
						<div className="flex flex-col gap-10">
							{listing.facts && listing.facts.length > 0 && (
								<dl className="m-0 grid grid-cols-2 gap-3 @md:grid-cols-4">
									{listing.facts.map((fact) => (
										<div key={fact.label} className="flex flex-col-reverse gap-1 rounded-lg bg-muted p-4">
											<dt className="text-sm text-muted-foreground">{fact.label}</dt>
											<dd className="m-0 font-display text-2xl font-semibold tabular-nums">{new Intl.NumberFormat(locale).format(fact.value)}</dd>
										</div>
									))}
								</dl>
							)}
							<div className="flex flex-col gap-4">
								<Subheading className="m-0 font-display text-2xl font-semibold tracking-display case-heading">{labels.about}</Subheading>
								{content.description.map((paragraph) => (
									<p key={paragraph} className="m-0 text-pretty text-muted-foreground">
										{paragraph}
									</p>
								))}
							</div>
							{content.amenities && content.amenities.length > 0 && (
								<div className="flex flex-col gap-4">
									<Subheading className="m-0 font-display text-2xl font-semibold tracking-display case-heading">{labels.amenities}</Subheading>
									<ul className="m-0 grid list-none gap-x-6 gap-y-3 p-0 @md:grid-cols-2">
										{content.amenities.map((amenity) => (
											<li key={amenity} className="flex items-center gap-3">
												<CheckIcon aria-hidden="true" className="size-4 shrink-0 tone-primary text-tone-text" />
												{amenity}
											</li>
										))}
									</ul>
								</div>
							)}
							{content.details && content.details.length > 0 && (
								<div className="flex flex-col gap-4">
									<Subheading className="m-0 font-display text-2xl font-semibold tracking-display case-heading">{labels.details}</Subheading>
									<dl className="m-0 grid divide-y divide-border border-y border-border">
										{content.details.map((detail) => (
											<div key={detail.label} className="flex justify-between gap-6 py-3">
												<dt className="text-muted-foreground">{detail.label}</dt>
												<dd className="m-0 text-end font-medium">{detail.value}</dd>
											</div>
										))}
									</dl>
								</div>
							)}
						</div>

						<aside aria-labelledby={`${id}-enquiry`} className="@3xl:sticky @3xl:top-24 @3xl:self-start">
							<form
								noValidate
								action={action}
								method={action ? "post" : undefined}
								onSubmit={submit}
								className="flex flex-col gap-4 rounded-xl border-village bg-card p-5 text-card-foreground shadow-sm"
							>
								<div className="flex flex-col gap-1">
									<Subheading id={`${id}-enquiry`} className="m-0 font-display text-xl font-semibold case-heading">
										{enquiry.title}
									</Subheading>
									{enquiry.subline && <p className="m-0 text-sm text-muted-foreground">{enquiry.subline}</p>}
								</div>
								{action && <input type="hidden" name="listing" value={listing.href} />}
								<Field invalid={Boolean(errors.name)}>
									<FieldLabel>{enquiry.fields.name.label}</FieldLabel>
									<Input name="name" autoComplete="name" placeholder={enquiry.fields.name.placeholder} required onChange={() => clear("name")} />
									{errors.name && <FieldError match>{errors.name}</FieldError>}
								</Field>
								<Field invalid={Boolean(errors.phone)}>
									<FieldLabel>{enquiry.fields.phone.label}</FieldLabel>
									<Input name="phone" type="tel" autoComplete="tel" placeholder={enquiry.fields.phone.placeholder} required onChange={() => clear("phone")} />
									{errors.phone && <FieldError match>{errors.phone}</FieldError>}
								</Field>
								<Field>
									<FieldLabel>{enquiry.fields.message.label}</FieldLabel>
									<Textarea name="message" rows={4} placeholder={enquiry.fields.message.placeholder} />
								</Field>
								<Button type="submit" size="lg" className="w-full">
									{enquiry.submit}
								</Button>
								<p role="status" className={cn("m-0 text-sm", !sent && "sr-only")}>
									{sent ? labels.sent : ""}
								</p>
							</form>
						</aside>
					</div>
				</div>
				<LightboxContent />
			</Lightbox>
		</section>
	);
}
