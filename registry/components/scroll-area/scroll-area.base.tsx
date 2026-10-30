"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/utils";
import { scrollAreaStyles } from "./scroll-area.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Give it a height (or a max height): its content scrolls inside. */
export function ScrollArea({ className, children, ...props }: Props<ScrollAreaPrimitive.Root.Props>) {
	return (
		<ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn(scrollAreaStyles.root, className)} {...props}>
			<ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className={scrollAreaStyles.viewport}>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

/** Add <ScrollBar orientation="horizontal" /> inside a ScrollArea for sideways content. */
export function ScrollBar({ className, orientation = "vertical", ...props }: Props<ScrollAreaPrimitive.Scrollbar.Props>) {
	return (
		<ScrollAreaPrimitive.Scrollbar data-slot="scroll-area-scrollbar" orientation={orientation} className={cn(scrollAreaStyles.scrollbar, className)} {...props}>
			<ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className={scrollAreaStyles.thumb} />
		</ScrollAreaPrimitive.Scrollbar>
	);
}
