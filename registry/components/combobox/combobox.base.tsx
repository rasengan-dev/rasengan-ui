"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, type InputGroupVariantProps } from "@/components/ui/input-group";
import { selectStyles } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { comboboxStyles } from "./combobox.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Pass `items` and render them in ComboboxList; `multiple` picks several, shown with ComboboxChips. */
export const Combobox = ComboboxPrimitive.Root;

export const ComboboxValue = ComboboxPrimitive.Value;

export const ComboboxCollection = ComboboxPrimitive.Collection;

/** The anchor for the list when the input is inside ComboboxChips: pass it to both. */
export function useComboboxAnchor() {
	return React.useRef<HTMLDivElement | null>(null);
}

export type ComboboxInputProps = Props<Omit<ComboboxPrimitive.Input.Props, "size">> &
	InputGroupVariantProps & {
		/** The chevron that opens the list. */
		showTrigger?: boolean;
		/** A button that clears the value. */
		showClear?: boolean;
	};

/** The input in an InputGroup, with the trigger and the clear button at its end. Takes the size and variant of the Field around it. */
export function ComboboxInput({ className, variant, size, showTrigger = true, showClear = false, disabled, children, ...props }: ComboboxInputProps) {
	return (
		<ComboboxPrimitive.InputGroup render={<InputGroup variant={variant} size={size} className={className} />}>
			<ComboboxPrimitive.Input data-slot="combobox-input" render={<InputGroupInput disabled={disabled} />} {...props} />
			<InputGroupAddon align="inline-end" className={comboboxStyles.addon}>
				{showClear && (
					<ComboboxPrimitive.Clear data-slot="combobox-clear" render={<InputGroupButton size="icon-xs" aria-label="Clear" disabled={disabled} />}>
						<XIcon />
					</ComboboxPrimitive.Clear>
				)}
				{showTrigger && (
					<ComboboxPrimitive.Trigger data-slot="combobox-trigger" render={<InputGroupButton size="icon-xs" aria-label="Show the options" disabled={disabled} />}>
						<ChevronsUpDownIcon />
					</ComboboxPrimitive.Trigger>
				)}
			</InputGroupAddon>
			{children}
		</ComboboxPrimitive.InputGroup>
	);
}

/** The list's popup, in the nearest VillageScope's portal so it wears that scope's village. */
export function ComboboxContent({
	className,
	side = "bottom",
	sideOffset = 4,
	align = "start",
	alignOffset = 0,
	anchor,
	...props
}: Props<ComboboxPrimitive.Popup.Props> & Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset" | "anchor">) {
	const container = usePortalContainer();
	return (
		<ComboboxPrimitive.Portal container={container}>
			<ComboboxPrimitive.Positioner
				data-slot="combobox-positioner"
				className={comboboxStyles.positioner}
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				anchor={anchor}
			>
				<ComboboxPrimitive.Popup data-slot="combobox-content" className={cn(comboboxStyles.popup, className)} {...props} />
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
}

export function ComboboxList({ className, ...props }: Props<ComboboxPrimitive.List.Props>) {
	return <ComboboxPrimitive.List data-slot="combobox-list" className={cn(comboboxStyles.list, className)} {...props} />;
}

export function ComboboxItem({ className, children, ...props }: Props<ComboboxPrimitive.Item.Props>) {
	return (
		<ComboboxPrimitive.Item data-slot="combobox-item" className={cn(selectStyles.item, className)} {...props}>
			{children}
			<ComboboxPrimitive.ItemIndicator data-slot="combobox-item-indicator" className={selectStyles.itemIndicator}>
				<CheckIcon />
			</ComboboxPrimitive.ItemIndicator>
		</ComboboxPrimitive.Item>
	);
}

export function ComboboxGroup(props: Props<ComboboxPrimitive.Group.Props>) {
	return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

export function ComboboxLabel({ className, ...props }: Props<ComboboxPrimitive.GroupLabel.Props>) {
	return <ComboboxPrimitive.GroupLabel data-slot="combobox-label" className={cn(selectStyles.groupLabel, className)} {...props} />;
}

/** Shown when nothing matches what was typed. */
export function ComboboxEmpty({ className, ...props }: Props<ComboboxPrimitive.Empty.Props>) {
	return <ComboboxPrimitive.Empty data-slot="combobox-empty" className={cn(comboboxStyles.empty, className)} {...props} />;
}

export function ComboboxSeparator({ className, ...props }: Props<ComboboxPrimitive.Separator.Props>) {
	return <ComboboxPrimitive.Separator data-slot="combobox-separator" className={cn(selectStyles.separator, className)} {...props} />;
}

/** For `multiple`: the field that holds the chips and a ComboboxChipsInput. Give it the anchor from useComboboxAnchor. */
export function ComboboxChips({ className, ...props }: Props<ComboboxPrimitive.Chips.Props> & { ref?: React.Ref<HTMLDivElement> }) {
	return <ComboboxPrimitive.Chips data-slot="combobox-chips" className={cn(comboboxStyles.chips, className)} {...props} />;
}

export function ComboboxChip({ className, children, showRemove = true, ...props }: Props<ComboboxPrimitive.Chip.Props> & { showRemove?: boolean }) {
	return (
		<ComboboxPrimitive.Chip data-slot="combobox-chip" className={cn(comboboxStyles.chip, className)} {...props}>
			<span className="truncate">{children}</span>
			{showRemove && (
				<ComboboxPrimitive.ChipRemove data-slot="combobox-chip-remove" className={comboboxStyles.chipRemove} aria-label="Remove">
					<XIcon />
				</ComboboxPrimitive.ChipRemove>
			)}
		</ComboboxPrimitive.Chip>
	);
}

export function ComboboxChipsInput({ className, ...props }: Props<ComboboxPrimitive.Input.Props>) {
	return <ComboboxPrimitive.Input data-slot="combobox-chips-input" className={cn(comboboxStyles.chipsInput, className)} {...props} />;
}
