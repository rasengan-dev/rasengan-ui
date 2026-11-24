"use client";

import { type FormEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NumberRoll } from "@/components/ui/number-roll";
import { type BlockProps, heading } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { WaitlistContent } from "./schema";

export interface WaitlistProps extends BlockProps<WaitlistContent> {
	/** Take the address in code (your own call to the provider). The block shows it sending, then joined or failed. */
	onSubmit?: (email: string) => void | Promise<void>;
}

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type State = "idle" | "sending" | "joined" | "failed";

/**
 * A centred card to join a waitlist: a pill, the promise, the email field and its button on one line (stacked when
 * narrow), the people already waiting (their faces and a number that rolls in), and a note. The form posts to the
 * provider's URL (`form.action`); with `onSubmit`, the page takes the address itself and the block shows it sending,
 * then joined or failed, in a status line screen readers hear. The block never keeps the address.
 */
export function Waitlist({ content = example, id = "waitlist", className, headingLevel = 2, onSubmit }: WaitlistProps) {
	const Heading = heading(headingLevel);
	const { form, labels } = content;
	const [invalid, setInvalid] = useState(false);
	const [state, setState] = useState<State>("idle");
	const name = form.name ?? "email";

	async function submit(event: FormEvent<HTMLFormElement>) {
		const email = String(new FormData(event.currentTarget).get(name) ?? "").trim();
		const wrong = !looksLikeEmail(email);
		setInvalid(wrong);
		if (wrong) return event.preventDefault();
		if (!onSubmit) return;
		event.preventDefault();
		setState("sending");
		try {
			await onSubmit(email);
			setState("joined");
		} catch {
			setState("failed");
		}
	}

	const status = state === "sending" ? labels.sending : state === "joined" ? labels.joined : state === "failed" ? labels.failed : "";

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="waitlist" className={cn("@container px-4 py-16 @3xl:py-24", className)}>
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border-village bg-card px-6 py-12 text-center text-card-foreground shadow-sm backdrop-blur-surface @2xl:px-12 @2xl:py-16">
				{content.badge && (
					<Badge variant="outline" tone="primary">
						{content.badge}
					</Badge>
				)}
				<Heading id={`${id}-title`} className="font-display text-3xl font-semibold tracking-display text-balance case-heading @2xl:text-4xl">
					{content.title}
				</Heading>
				{content.subline && <p className="max-w-xl text-lg text-balance text-muted-foreground">{content.subline}</p>}

				{state === "joined" ? (
					<p role="status" className="mt-2 max-w-md rounded-lg tone-success bg-tone-soft px-4 py-3 text-tone-text">
						{labels.joined}
					</p>
				) : (
					<form noValidate action={form.action} method={form.method ?? "post"} onSubmit={submit} className="mt-2 flex w-full max-w-md flex-col gap-3 text-start">
						<Field invalid={invalid}>
							<FieldLabel className="sr-only">{form.label}</FieldLabel>
							<div className="flex flex-col gap-2 @md:flex-row">
								<Input
									type="email"
									name={name}
									autoComplete="email"
									placeholder={form.placeholder}
									required
									disabled={state === "sending"}
									className="flex-1"
									onChange={() => invalid && setInvalid(false)}
								/>
								<Button type="submit" disabled={state === "sending"}>
									{form.submit}
								</Button>
							</div>
							{invalid && <FieldError match>{labels.invalid}</FieldError>}
						</Field>
						<p role="status" className={cn("m-0 text-sm", state === "failed" ? "tone-destructive text-tone-text" : "text-muted-foreground", !status && "sr-only")}>
							{status}
						</p>
					</form>
				)}

				{(content.count || (content.faces && content.faces.length > 0)) && (
					<div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
						{content.faces && content.faces.length > 0 && (
							<span className="flex -space-x-2">
								{content.faces.map((face) => (
									<img
										key={face.src}
										src={face.src}
										alt={face.alt}
										width={face.width}
										height={face.height}
										loading="lazy"
										className="size-8 rounded-full border-2 border-card object-cover"
									/>
								))}
							</span>
						)}
						{content.count && (
							<span>
								<NumberRoll value={content.count.value} locale={content.locale} className="font-medium text-foreground tabular-nums" /> {content.count.label}
							</span>
						)}
					</div>
				)}
				{content.note && <p className="m-0 text-xs text-muted-foreground">{content.note}</p>}
			</div>
		</section>
	);
}
