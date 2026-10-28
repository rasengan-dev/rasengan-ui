import type * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { dropdownMenuStyles } from "./dropdown-menu.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };
type Placement = Pick<MenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

export const DropdownMenu = MenuPrimitive.Root;

export function DropdownMenuTrigger(props: Props<MenuPrimitive.Trigger.Props>) {
	return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function MenuSurface({ className, side, sideOffset, align, alignOffset, ...props }: Props<MenuPrimitive.Popup.Props> & Placement) {
	const container = usePortalContainer();
	return (
		<MenuPrimitive.Portal container={container}>
			<MenuPrimitive.Positioner className={dropdownMenuStyles.positioner} side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset}>
				<MenuPrimitive.Popup className={cn(dropdownMenuStyles.popup, className)} {...props} />
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

/** In the nearest VillageScope's portal, so the menu wears that scope's village. */
export function DropdownMenuContent({ sideOffset = 6, align = "start", ...props }: Props<MenuPrimitive.Popup.Props> & Placement) {
	return <MenuSurface data-slot="dropdown-menu-content" sideOffset={sideOffset} align={align} {...props} />;
}

export function DropdownMenuGroup(props: Props<MenuPrimitive.Group.Props>) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

/** A group's heading; put it inside a DropdownMenuGroup. */
export function DropdownMenuLabel({ className, inset, ...props }: Props<MenuPrimitive.GroupLabel.Props> & { inset?: boolean }) {
	return <MenuPrimitive.GroupLabel data-slot="dropdown-menu-label" data-inset={inset || undefined} className={cn(dropdownMenuStyles.label, className)} {...props} />;
}

export function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: Props<MenuPrimitive.Item.Props> & { inset?: boolean; variant?: "default" | "destructive" }) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset || undefined}
			data-variant={variant}
			className={cn(dropdownMenuStyles.item, className)}
			{...props}
		/>
	);
}

export function DropdownMenuCheckboxItem({ className, children, ...props }: Props<MenuPrimitive.CheckboxItem.Props>) {
	return (
		<MenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn(dropdownMenuStyles.choiceItem, className)} {...props}>
			<MenuPrimitive.CheckboxItemIndicator className={dropdownMenuStyles.choiceIndicator}>
				<CheckIcon className="text-current" />
			</MenuPrimitive.CheckboxItemIndicator>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

export function DropdownMenuRadioGroup(props: Props<MenuPrimitive.RadioGroup.Props>) {
	return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

export function DropdownMenuRadioItem({ className, children, ...props }: Props<MenuPrimitive.RadioItem.Props>) {
	return (
		<MenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn(dropdownMenuStyles.choiceItem, className)} {...props}>
			<MenuPrimitive.RadioItemIndicator className={dropdownMenuStyles.choiceIndicator}>
				<span className={dropdownMenuStyles.radioDot} />
			</MenuPrimitive.RadioItemIndicator>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

export function DropdownMenuSeparator({ className, ...props }: Props<SeparatorPrimitive.Props>) {
	return <SeparatorPrimitive data-slot="dropdown-menu-separator" className={cn(dropdownMenuStyles.separator, className)} {...props} />;
}

/** A keyboard hint at the end of an item; the item does not bind it, the page does. */
export function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
	return <span data-slot="dropdown-menu-shortcut" className={cn(dropdownMenuStyles.shortcut, className)} {...props} />;
}

export const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

export function DropdownMenuSubTrigger({ className, inset, children, ...props }: Props<MenuPrimitive.SubmenuTrigger.Props> & { inset?: boolean }) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset || undefined}
			className={cn(dropdownMenuStyles.subTrigger, className)}
			{...props}
		>
			{children}
			<ChevronRightIcon className={dropdownMenuStyles.subIcon} />
		</MenuPrimitive.SubmenuTrigger>
	);
}

export function DropdownMenuSubContent({ side = "right", sideOffset = 2, align = "start", alignOffset = -5, ...props }: Props<MenuPrimitive.Popup.Props> & Placement) {
	return <MenuSurface data-slot="dropdown-menu-sub-content" side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...props} />;
}
