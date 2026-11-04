"use client";

import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { SearchIcon } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { commandStyles } from "./command.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/* Base UI's Root is overloaded (flat items or groups); this one loose signature lets Command pass its props through. */
const Root = AutocompletePrimitive.Root as (props: AutocompletePrimitive.Root.Props<any>) => React.ReactElement;

export type CommandProps<Value> = Omit<AutocompletePrimitive.Root.Props<Value>, "inline" | "open"> & { className?: string };

/**
 * Pass `items` (or groups of items) and render them in CommandList. Picking an item runs its `onSelect` and leaves the
 * query as typed: unless you control `value`, a pick never writes the item into the field.
 */
export function Command<Value>({ className, value, defaultValue = "", onValueChange, autoHighlight = "always", children, ...props }: CommandProps<Value>) {
	const [query, setQuery] = React.useState(defaultValue);
	return (
		<div data-slot="command" className={cn(commandStyles.root, className)}>
			<Root
				inline
				open
				autoHighlight={autoHighlight}
				value={value ?? query}
				onValueChange={(next, details) => {
					if (value === undefined && details.reason === "item-press") return;
					setQuery(next);
					onValueChange?.(next, details);
				}}
				{...props}
			>
				{children}
			</Root>
		</div>
	);
}

/** The field, with a search icon. Name it with `aria-label` when nothing else does. */
export function CommandInput({ className, ...props }: Props<AutocompletePrimitive.Input.Props>) {
	return (
		<div data-slot="command-input-wrapper" className={commandStyles.inputWrapper}>
			<SearchIcon aria-hidden="true" />
			<AutocompletePrimitive.Input data-slot="command-input" className={cn(commandStyles.input, className)} {...props} />
		</div>
	);
}

export function CommandList({ className, ...props }: Props<AutocompletePrimitive.List.Props>) {
	return <AutocompletePrimitive.List data-slot="command-list" className={cn(commandStyles.list, className)} {...props} />;
}

/** Shown when nothing matches the query. Put it before CommandList. */
export function CommandEmpty({ className, ...props }: Props<AutocompletePrimitive.Empty.Props>) {
	return <AutocompletePrimitive.Empty data-slot="command-empty" className={cn(commandStyles.empty, className)} {...props} />;
}

export function CommandGroup({ className, ...props }: Props<AutocompletePrimitive.Group.Props>) {
	return <AutocompletePrimitive.Group data-slot="command-group" className={cn(commandStyles.group, className)} {...props} />;
}

export function CommandGroupLabel({ className, ...props }: Props<AutocompletePrimitive.GroupLabel.Props>) {
	return <AutocompletePrimitive.GroupLabel data-slot="command-group-label" className={cn(commandStyles.groupLabel, className)} {...props} />;
}

export const CommandCollection = AutocompletePrimitive.Collection;

export type CommandItemProps = Props<AutocompletePrimitive.Item.Props> & {
	/** Runs when the item is clicked, or highlighted and Enter is pressed. */
	onSelect?: () => void;
};

export function CommandItem({ className, onSelect, onClick, ...props }: CommandItemProps) {
	return (
		<AutocompletePrimitive.Item
			data-slot="command-item"
			className={cn(commandStyles.item, className)}
			onClick={(event) => {
				onClick?.(event);
				onSelect?.();
			}}
			{...props}
		/>
	);
}

export function CommandSeparator({ className, ...props }: Props<AutocompletePrimitive.Separator.Props>) {
	return <AutocompletePrimitive.Separator data-slot="command-separator" className={cn(commandStyles.separator, className)} {...props} />;
}

/** A shortcut at the end of an item, as a Kbd. */
export function CommandShortcut({ className, ...props }: React.ComponentProps<typeof Kbd>) {
	return <Kbd data-slot="command-shortcut" size="sm" className={cn(commandStyles.shortcut, className)} {...props} />;
}

export type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
	/** Read by screen readers as the dialog's name; hidden on screen. */
	title?: string;
	description?: string;
	className?: string;
	children?: React.ReactNode;
};

/** A Command in a Dialog near the top of the screen: the ⌘K palette. Put a Command inside it. */
export function CommandDialog({ title = "Command palette", description = "Search for a command to run.", className, children, ...props }: CommandDialogProps) {
	return (
		<Dialog {...props}>
			<DialogContent showCloseButton={false} className={cn(commandStyles.dialog, className)}>
				<DialogTitle className="sr-only">{title}</DialogTitle>
				<DialogDescription className="sr-only">{description}</DialogDescription>
				{children}
			</DialogContent>
		</Dialog>
	);
}
