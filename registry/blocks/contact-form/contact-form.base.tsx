"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { type BlockProps, heading, messageUrl } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { ContactFormContent } from "./schema";

/** What the visitor wrote. */
export interface ContactValues {
	name: string;
	email: string;
	topic?: string;
	message: string;
}

export interface ContactFormProps extends BlockProps<ContactFormContent> {
	/** Post the form to this URL (fields `name`, `email`, `topic`, `message`) instead of opening a message. */
	action?: string;
	/** Take the values in code instead of opening a message. */
	onSubmit?: (values: ContactValues) => void;
}

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * A contact form beside the other ways to reach you: name, email, an optional subject (chips: every choice is
 * visible) and the message. By default,
 * sending opens the visitor's WhatsApp, texts or mail app with the message written, addressed to you (RFC-0009, no
 * backend); `action` posts the form instead, `onSubmit` hands the values to code. Missing fields and a malformed
 * address are caught before sending. For a product (a support address) and a place (events, catering), so it is in
 * both families.
 */
export function ContactForm({ content = example, id = "contact", className, headingLevel = 2, action, onSubmit }: ContactFormProps) {
	const Heading = heading(headingLevel);
	const { fields, labels } = content;
	const [topic, setTopic] = useState<string | null>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [sent, setSent] = useState(false);
	const clear = (key: string) => errors[key] && setErrors(({ [key]: _, ...rest }) => rest);

	function submit(event: FormEvent<HTMLFormElement>) {
		const form = new FormData(event.currentTarget);
		const name = String(form.get("name") ?? "").trim();
		const email = String(form.get("email") ?? "").trim();
		const message = String(form.get("message") ?? "").trim();
		const found: Record<string, string> = {};
		if (!name) found.name = labels.required;
		if (!email) found.email = labels.required;
		else if (!looksLikeEmail(email)) found.email = labels.invalidEmail;
		if (!message) found.message = labels.required;
		setErrors(found);
		if (Object.keys(found).length > 0) return event.preventDefault();
		if (action) return;
		event.preventDefault();
		const values: ContactValues = { name, email, topic: topic ?? undefined, message };
		if (onSubmit) return onSubmit(values);
		const lines = [
			labels.intro,
			"",
			`${fields.name.label}: ${name}`,
			`${fields.email.label}: ${email}`,
			...(fields.topic && topic ? [`${fields.topic.label}: ${topic}`] : []),
			"",
			message,
		];
		const url = messageUrl(content.channel, lines.join("\n"), topic ?? content.title);
		if (content.channel.kind === "whatsapp") window.open(url, "_blank", "noopener");
		else window.location.href = url;
		setSent(true);
	}

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="contact-form" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto grid max-w-5xl gap-10 @3xl:grid-cols-[2fr_3fr] @3xl:gap-16">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
							{content.title}
						</Heading>
						{content.subline && <p className="text-lg text-muted-foreground">{content.subline}</p>}
					</div>
					{content.details && content.details.length > 0 && (
						<dl className="flex flex-col gap-4">
							{content.details.map((detail) => (
								<div key={detail.label} className="flex flex-col gap-0.5">
									<dt className="text-sm text-muted-foreground">{detail.label}</dt>
									<dd className="font-medium">
										{detail.href ? (
											<a href={detail.href} className="underline underline-offset-4 hover:no-underline">
												{detail.value}
											</a>
										) : (
											detail.value
										)}
									</dd>
								</div>
							))}
						</dl>
					)}
					{content.image && (
						<img
							src={content.image.src}
							alt={content.image.alt}
							width={content.image.width}
							height={content.image.height}
							loading="lazy"
							className="w-full rounded-xl border-village object-cover"
						/>
					)}
				</div>
				<form noValidate action={action} method={action ? "post" : undefined} onSubmit={submit} className="flex flex-col gap-5">
					<div className="grid gap-5 @md:grid-cols-2">
						<Field invalid={Boolean(errors.name)}>
							<FieldLabel>{fields.name.label}</FieldLabel>
							<Input name="name" autoComplete="name" placeholder={fields.name.placeholder} required onChange={() => clear("name")} />
							{errors.name && <FieldError match>{errors.name}</FieldError>}
						</Field>
						<Field invalid={Boolean(errors.email)}>
							<FieldLabel>{fields.email.label}</FieldLabel>
							<Input name="email" type="email" autoComplete="email" placeholder={fields.email.placeholder} required onChange={() => clear("email")} />
							{errors.email && <FieldError match>{errors.email}</FieldError>}
						</Field>
					</div>
					{fields.topic && (
						<fieldset className="flex flex-col gap-2">
							<legend id={`${id}-topic`} className="mb-2 text-sm font-medium">
								{fields.topic.label}
							</legend>
							<RadioGroup name="topic" value={topic} onValueChange={(next) => setTopic(next as string)} aria-labelledby={`${id}-topic`} className="flex flex-wrap gap-2">
								{fields.topic.options.map((option) => (
									<Label
										key={option}
										className="rounded-pill border-(length:--border-width) px-3 py-1.5 font-normal has-data-checked:border-primary has-data-checked:bg-muted"
									>
										<RadioGroupItem value={option} size="sm" />
										{option}
									</Label>
								))}
							</RadioGroup>
						</fieldset>
					)}
					<Field invalid={Boolean(errors.message)}>
						<FieldLabel>{fields.message.label}</FieldLabel>
						<Textarea name="message" rows={5} placeholder={fields.message.placeholder} required onChange={() => clear("message")} />
						{errors.message && <FieldError match>{errors.message}</FieldError>}
					</Field>
					<Button type="submit" size="lg" className="w-full @md:w-auto @md:self-start">
						{content.submit}
					</Button>
					<p role="status" className={cn("text-sm", !sent && "sr-only")}>
						{sent ? labels.sent : ""}
					</p>
				</form>
			</div>
		</section>
	);
}
