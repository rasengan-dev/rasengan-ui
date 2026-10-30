"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { tooltipStyles } from "./tooltip.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Wrap a page (or a toolbar) so neighbouring tooltips open at once after the first. */
export function TooltipProvider({ delay = 300, ...props }: TooltipPrimitive.Provider.Props) {
	return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

export const Tooltip = TooltipPrimitive.Root;

export function TooltipTrigger(props: Props<TooltipPrimitive.Trigger.Props>) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/** In the nearest VillageScope's portal, with an arrow pointing at the trigger. */
export function TooltipContent({
	className,
	children,
	side = "top",
	sideOffset = 8,
	align = "center",
	...props
}: Props<TooltipPrimitive.Popup.Props> & Pick<TooltipPrimitive.Positioner.Props, "side" | "sideOffset" | "align">) {
	const container = usePortalContainer();
	return (
		<TooltipPrimitive.Portal container={container}>
			<TooltipPrimitive.Positioner className={tooltipStyles.positioner} side={side} sideOffset={sideOffset} align={align}>
				<TooltipPrimitive.Popup data-slot="tooltip-content" className={cn(tooltipStyles.popup, className)} {...props}>
					{children}
					<TooltipPrimitive.Arrow data-slot="tooltip-arrow" className={tooltipStyles.arrow} />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}
