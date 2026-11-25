"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type BlockProps, heading } from "@/lib/blocks";
import { setFilters, useFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { example } from "./example";
import type { SearchHeroContent } from "./schema";

type Choice = NonNullable<SearchHeroContent["fields"]["kind"]>;

function ChoiceField({ name, choice, value, onChange }: { name: string; choice: Choice; value: string; onChange: (value: string) => void }) {
	const items = { "": choice.any, ...Object.fromEntries(choice.options.map((option) => [option, option])) };
	return (
		<Field>
			<FieldLabel>{choice.label}</FieldLabel>
			<Select name={name} items={items} value={value} onValueChange={(next) => onChange((next as string | null) ?? "")}>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false}>
					<SelectItem value="">{choice.any}</SelectItem>
					{choice.options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</Field>
	);
}

/**
 * The opening of a directory: a heading, then a wide photo with a search panel over its lower edge (below it in a
 * narrow container): what (words), a type and a place, and Search. It is a real form, sent with GET to the list page
 * (`action`), so it works without JavaScript; on the list page itself it filters the list in place and scrolls to it,
 * through the address (`@/lib/filters`). Popular searches follow as chips, each a link.
 */
export function SearchHero({ content = example, id = "search", className, headingLevel = 1 }: BlockProps<SearchHeroContent>) {
	const Heading = heading(headingLevel);
	const { fields, labels, image } = content;
	const filters = useFilters();
	const [values, setValues] = React.useState({ q: "", kind: "", place: "" });

	// After hydration, the search the address holds.
	React.useEffect(() => {
		setValues({ q: filters.q ?? "", kind: filters.kind ?? "", place: filters.place ?? "" });
	}, [filters.q, filters.kind, filters.place]);

	const submit = (event: React.FormEvent<HTMLFormElement>) => {
		const target = new URL(content.action, window.location.href);
		// Another page: the form goes there. This page: the list filters in place.
		if (target.pathname !== window.location.pathname) return;
		event.preventDefault();
		setFilters({ q: values.q.trim(), kind: values.kind, place: values.place });
		if (target.hash) document.getElementById(target.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section id={id} aria-labelledby={`${id}-title`} data-slot="block" data-block="search-hero" className={cn("@container px-4 py-10 @3xl:py-14", className)}>
			<div className="mx-auto max-w-7xl">
				<div className="flex max-w-3xl flex-col gap-4">
					{content.eyebrow && <p className="m-0 text-sm font-medium tone-primary text-tone-text">{content.eyebrow}</p>}
					<Heading id={`${id}-title`} className="font-display text-4xl leading-[1.05] font-semibold tracking-display text-balance case-heading @2xl:text-5xl @5xl:text-6xl">
						{content.title}
					</Heading>
					{content.subline && <p className="m-0 max-w-2xl text-lg text-muted-foreground">{content.subline}</p>}
				</div>

				<div className="relative mt-8 @3xl:mt-10">
					<img
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						fetchPriority="high"
						className="aspect-[4/3] w-full rounded-2xl border-village object-cover @3xl:aspect-[16/7]"
					/>
					<form
						role="search"
						aria-label={labels.search}
						action={content.action}
						method="get"
						onSubmit={submit}
						className="relative z-10 -mt-12 mx-3 grid gap-4 rounded-xl border-village bg-background/95 p-4 text-foreground shadow-lg backdrop-blur-surface @2xl:grid-cols-2 @3xl:absolute @3xl:inset-x-6 @3xl:bottom-6 @3xl:mx-0 @3xl:mt-0 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] @3xl:items-end @3xl:p-5"
					>
						<Field className="@2xl:col-span-2 @3xl:col-span-1">
							<FieldLabel>{fields.query.label}</FieldLabel>
							<Input name="q" type="search" placeholder={fields.query.placeholder} value={values.q} onChange={(event) => setValues((current) => ({ ...current, q: event.target.value }))} />
						</Field>
						{fields.kind && <ChoiceField name="kind" choice={fields.kind} value={values.kind} onChange={(kind) => setValues((current) => ({ ...current, kind }))} />}
						{fields.place && <ChoiceField name="place" choice={fields.place} value={values.place} onChange={(place) => setValues((current) => ({ ...current, place }))} />}
						<Button type="submit" size="lg" className="@2xl:col-span-2 @3xl:col-span-1">
							<SearchIcon aria-hidden="true" />
							{content.submit}
						</Button>
					</form>
				</div>

				{content.suggestions && content.suggestions.length > 0 && (
					<div className="mt-6 flex flex-wrap items-center gap-2">
						<span className="me-1 text-sm text-muted-foreground">{labels.suggestions}</span>
						{content.suggestions.map((suggestion) => (
							<Chip key={suggestion.href} size="sm" render={<a href={suggestion.href} />}>
								{suggestion.label}
							</Chip>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
