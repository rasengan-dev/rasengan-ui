"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { popoverStyles } from "./popover.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export const Popover = PopoverPrimitive.Root;

export function PopoverTrigger(props: Props<PopoverPrimitive.Trigger.Props>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

/** In the nearest VillageScope's portal, so the panel wears that scope's village. */
export function PopoverContent({
	className,
	side = "bottom",
	sideOffset = 6,
	align = "center",
	...props
}: Props<PopoverPrimitive.Popup.Props> & Pick<PopoverPrimitive.Positioner.Props, "side" | "sideOffset" | "align">) {
	const container = usePortalContainer();
	return (
		<PopoverPrimitive.Portal container={container}>
			<PopoverPrimitive.Positioner className={popoverStyles.positioner} side={side} sideOffset={sideOffset} align={align}>
				<PopoverPrimitive.Popup data-slot="popover-content" className={cn(popoverStyles.popup, className)} {...props} />
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

export function PopoverTitle({ className, ...props }: Props<PopoverPrimitive.Title.Props>) {
	return <PopoverPrimitive.Title data-slot="popover-title" className={cn(popoverStyles.title, className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: Props<PopoverPrimitive.Description.Props>) {
	return <PopoverPrimitive.Description data-slot="popover-description" className={cn(popoverStyles.description, className)} {...props} />;
}

export const PopoverClose = PopoverPrimitive.Close;
