"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { useRender } from "@base-ui/react/use-render";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { chipStyles, chipVariants, type ChipVariantProps } from "./chip.styles";

export { chipVariants, type ChipVariantProps } from "./chip.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Inside a ChipGroup, chips are toggles and take the group's look. */
const ChipGroupContext = React.createContext<ChipVariantProps | null>(null);

/**
 * Chips to pick: a time slot, a size, a popular search. One at a time, or several with `multiple`; the value is the
 * picked chips' `value`s, as Toggle Group gives it. Name the group with `aria-label` or a label beside it.
 */
export function ChipGroup({ className, variant, tone, size, children, ...props }: Props<ToggleGroupPrimitive.Props> & ChipVariantProps) {
	const look = React.useMemo(() => ({ variant, tone, size }), [variant, tone, size]);
	return (
		<ToggleGroupPrimitive data-slot="chip-group" className={cn(chipStyles.group, className)} {...props}>
			<ChipGroupContext.Provider value={look}>{children}</ChipGroupContext.Provider>
		</ToggleGroupPrimitive>
	);
}

export type ChipProps = Props<useRender.ComponentProps<"span">> & ChipVariantProps & { value?: string; disabled?: boolean };

/**
 * A chip. Inside a ChipGroup it is a toggle with a `value`; elsewhere a tag, with a ChipRemove inside for an active
 * filter, or a link with `render={<a href="…" />}`.
 */
export function Chip({ className, variant, tone, size, value, disabled, render, ...props }: ChipProps) {
	const group = React.useContext(ChipGroupContext);
	const look = { variant: variant ?? group?.variant, tone: tone ?? group?.tone, size: size ?? group?.size };
	const classes = cn(chipVariants(look), className);
	const element = useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">({ className: classes, "data-slot": "chip" } as React.ComponentProps<"span">, props),
	});
	if (group) {
		return (
			<TogglePrimitive data-slot="chip" value={value} disabled={disabled} className={classes} {...(props as Props<TogglePrimitive.Props>)} />
		);
	}
	return element;
}

/** The chip's remove button. Name what it removes: `aria-label="Remove Paris"`. */
export function ChipRemove({ className, children, "aria-label": label = "Remove", ...props }: React.ComponentProps<"button">) {
	return (
		<button type="button" data-slot="chip-remove" aria-label={label} className={cn(chipStyles.remove, className)} {...props}>
			{children ?? <XIcon aria-hidden="true" />}
		</button>
	);
}
