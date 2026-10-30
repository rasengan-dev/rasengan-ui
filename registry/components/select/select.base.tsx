"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { selectStyles } from "./select.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Pass `items` (value → label) so the trigger shows the label of the selected value. */
export const Select = SelectPrimitive.Root;

export function SelectTrigger({ className, children, ...props }: Props<SelectPrimitive.Trigger.Props>) {
	return (
		<SelectPrimitive.Trigger data-slot="select-trigger" className={cn(selectStyles.trigger, className)} {...props}>
			{children}
			<SelectPrimitive.Icon data-slot="select-icon" className={selectStyles.icon}>
				<ChevronsUpDownIcon />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

export function SelectValue({ className, ...props }: Props<SelectPrimitive.Value.Props>) {
	return <SelectPrimitive.Value data-slot="select-value" className={cn(selectStyles.value, className)} {...props} />;
}

/** The list, in the nearest VillageScope's portal so it wears that scope's village. */
export function SelectContent({
	className,
	children,
	sideOffset = 4,
	alignItemWithTrigger = true,
	...props
}: Props<SelectPrimitive.Popup.Props> & Pick<SelectPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignItemWithTrigger">) {
	const container = usePortalContainer();
	return (
		<SelectPrimitive.Portal container={container}>
			<SelectPrimitive.Positioner
				data-slot="select-positioner"
				className={selectStyles.positioner}
				sideOffset={sideOffset}
				alignItemWithTrigger={alignItemWithTrigger}
			>
				<SelectPrimitive.Popup data-slot="select-content" className={cn(selectStyles.popup, className)} {...props}>
					{children}
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

export function SelectItem({ className, children, ...props }: Props<SelectPrimitive.Item.Props>) {
	return (
		<SelectPrimitive.Item data-slot="select-item" className={cn(selectStyles.item, className)} {...props}>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator data-slot="select-item-indicator" className={selectStyles.itemIndicator}>
				<CheckIcon />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

export function SelectGroup(props: Props<SelectPrimitive.Group.Props>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectLabel({ className, ...props }: Props<SelectPrimitive.GroupLabel.Props>) {
	return <SelectPrimitive.GroupLabel data-slot="select-label" className={cn(selectStyles.groupLabel, className)} {...props} />;
}

export function SelectSeparator({ className, ...props }: Props<SelectPrimitive.Separator.Props>) {
	return <SelectPrimitive.Separator data-slot="select-separator" className={cn(selectStyles.separator, className)} {...props} />;
}
