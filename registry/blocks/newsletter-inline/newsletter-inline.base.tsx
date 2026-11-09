"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { NewsletterInlineContent } from "./schema";

export interface NewsletterInlineProps extends BlockProps<NewsletterInlineContent> {
	/** Take the address in code (your own call to the provider) instead of posting the form to `form.action`. */
	onSubmit?: (email: string) => void | Promise<void>;
}

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * A band that asks for an email address: the promise on one side, the field and its button on the other (stacked
 * in a narrow container). The form posts to your newsletter provider's URL (`form.action`), as an embedded signup form
 * would; with `onSubmit`, the page takes the address itself and says so in a status line. An address that does not
 * look like one is caught before sending.
 */
export function NewsletterInline({ content = example, id = "newsletter", className, headingLevel = 2, onSubmit }: NewsletterInlineProps) {
	const Heading = heading(headingLevel);
	const { form, labels } = content;
	const [invalid, setInvalid] = useState(false);
	const [sent, setSent] = useState(false);

	async function submit(event: FormEvent<HTMLFormElement>) {
		const email = String(new FormData(event.currentTarget).get(form.name ?? "email") ?? "").trim();
		const wrong = !looksLikeEmail(email);
		setInvalid(wrong);
		if (wrong) return event.preventDefault();
		if (!onSubmit) return;
		event.preventDefault();
		await onSubmit(email);
		setSent(true);
	}

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="newsletter-inline" className={cn("@container px-4 py-12", className)}>
			<div className="mx-auto grid max-w-5xl gap-6 rounded-xl border-village bg-card p-6 text-card-foreground shadow-sm backdrop-blur-surface @2xl:p-10 @3xl:grid-cols-2 @3xl:items-center @3xl:gap-12">
				<div className="flex flex-col gap-2">
					<Heading id={`${id}-title`} className="font-display text-2xl font-semibold tracking-display text-balance case-heading @2xl:text-3xl">
						{content.title}
					</Heading>
					{content.subline && <p className="text-muted-foreground">{content.subline}</p>}
				</div>
				<form
					noValidate
					action={form.action}
					method={form.method ?? "post"}
					target={form.newTab ? "_blank" : undefined}
					onSubmit={submit}
					className="flex flex-col gap-3"
				>
					<Field invalid={invalid}>
						<FieldLabel>{form.label}</FieldLabel>
						<div className="flex flex-col gap-2 @md:flex-row">
							<Input
								type="email"
								name={form.name ?? "email"}
								autoComplete="email"
								placeholder={form.placeholder}
								required
								className="flex-1"
								onChange={() => invalid && setInvalid(false)}
							/>
							<Button type="submit">{form.submit}</Button>
						</div>
						{invalid && <FieldError match>{labels.invalid}</FieldError>}
					</Field>
					<p role="status" className={cn("text-sm", !sent && "sr-only")}>
						{sent ? labels.sent : ""}
					</p>
					{content.note && <p className="text-sm text-muted-foreground">{content.note}</p>}
				</form>
			</div>
		</section>
	);
}
