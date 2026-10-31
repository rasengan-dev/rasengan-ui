"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { navigationMenuStyles, navigationMenuTriggerStyle } from "./navigation-menu.styles";

export { navigationMenuTriggerStyle } from "./navigation-menu.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

type Placement = Pick<NavigationMenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset">;

/** The menu and the popup its panels open in, under the open trigger. */
export function NavigationMenu({ className, children, side, sideOffset, align, alignOffset, ...props }: Props<NavigationMenuPrimitive.Root.Props> & Placement) {
	return (
		<NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn(navigationMenuStyles.root, className)} {...props}>
			{children}
			<NavigationMenuPositioner side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset} />
		</NavigationMenuPrimitive.Root>
	);
}

export function NavigationMenuList({ className, ...props }: Props<NavigationMenuPrimitive.List.Props>) {
	return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn(navigationMenuStyles.list, className)} {...props} />;
}

export function NavigationMenuItem(props: Props<NavigationMenuPrimitive.Item.Props>) {
	return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} />;
}

export function NavigationMenuTrigger({ className, children, ...props }: Props<NavigationMenuPrimitive.Trigger.Props>) {
	return (
		<NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn(navigationMenuTriggerStyle(), className)} {...props}>
			{children}
			<NavigationMenuPrimitive.Icon data-slot="navigation-menu-icon" className={navigationMenuStyles.icon}>
				<ChevronDownIcon aria-hidden="true" className="size-3.5" />
			</NavigationMenuPrimitive.Icon>
		</NavigationMenuPrimitive.Trigger>
	);
}

/** The panel a trigger opens; it renders in the shared popup. */
export function NavigationMenuContent({ className, ...props }: Props<NavigationMenuPrimitive.Content.Props>) {
	return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" className={cn(navigationMenuStyles.content, className)} {...props} />;
}

/**
 * An <a>, or the element given in `render` (a router link). `active` marks the current page (`aria-current="page"`).
 * At the top level, give it `className={navigationMenuTriggerStyle()}`.
 */
export function NavigationMenuLink({ className, ...props }: Props<NavigationMenuPrimitive.Link.Props>) {
	return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" className={cn(navigationMenuStyles.link, className)} {...props} />;
}

/** The popup, in the nearest VillageScope's portal so it wears that scope's village. */
function NavigationMenuPositioner({ side = "bottom", sideOffset = 8, align = "start", alignOffset = 0 }: Placement) {
	const container = usePortalContainer();
	return (
		<NavigationMenuPrimitive.Portal container={container}>
			<NavigationMenuPrimitive.Positioner
				data-slot="navigation-menu-positioner"
				className={navigationMenuStyles.positioner}
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				collisionPadding={16}
				collisionAvoidance={{ side: "none" }}
			>
				<NavigationMenuPrimitive.Popup data-slot="navigation-menu-popup" className={navigationMenuStyles.popup}>
					<NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" className={navigationMenuStyles.viewport} />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}
