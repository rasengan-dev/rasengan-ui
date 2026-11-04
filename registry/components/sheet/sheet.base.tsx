"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { sheetContentVariants, type SheetContentVariantProps, sheetStyles, sheetViewports } from "./sheet.styles";

export { sheetContentVariants } from "./sheet.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

type Side = NonNullable<SheetContentVariantProps["side"]>;

const swipeDirections = { right: "right", left: "left", top: "up", bottom: "down" } as const satisfies Record<Side, DrawerPrimitive.Root.Props["swipeDirection"]>;

/* SheetContent names the side, as in shadcn; the root needs it to swipe the panel back toward its edge. */
const SideContext = React.createContext<(side: Side) => void>(() => {});

/** A Base UI Drawer. Swiping the panel toward the edge it came from closes it. */
export function Sheet({ swipeDirection, ...props }: DrawerPrimitive.Root.Props) {
	const [side, setSide] = React.useState<Side>("right");
	return (
		<SideContext.Provider value={setSide}>
			<DrawerPrimitive.Root swipeDirection={swipeDirection ?? swipeDirections[side]} {...props} />
		</SideContext.Provider>
	);
}

export function SheetTrigger(props: Props<DrawerPrimitive.Trigger.Props>) {
	return <DrawerPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export function SheetClose(props: Props<DrawerPrimitive.Close.Props>) {
	return <DrawerPrimitive.Close data-slot="sheet-close" {...props} />;
}

export type SheetContentProps = Props<DrawerPrimitive.Popup.Props> & SheetContentVariantProps & { showCloseButton?: boolean };

/** The panel, in the nearest VillageScope's portal so it wears that scope's village. A bottom sheet shows a handle. */
export function SheetContent({ className, children, side = "right", size, showCloseButton = true, ...props }: SheetContentProps) {
	const container = usePortalContainer();
	const setSide = React.useContext(SideContext);
	const current = side ?? "right";
	React.useLayoutEffect(() => setSide(current), [current, setSide]);
	return (
		<DrawerPrimitive.Portal container={container}>
			<DrawerPrimitive.Backdrop data-slot="sheet-overlay" className={sheetStyles.backdrop} />
			<DrawerPrimitive.Viewport data-slot="sheet-viewport" className={cn(sheetStyles.viewport, sheetViewports[current])}>
				<DrawerPrimitive.Popup
					data-slot="sheet-content"
					data-side={current}
					data-size={size ?? "default"}
					className={cn(sheetContentVariants({ side: current, size }), className)}
					{...props}
				>
					{current === "bottom" && <div data-slot="sheet-handle" aria-hidden="true" className={sheetStyles.handle} />}
					<DrawerPrimitive.Content data-slot="sheet-body" className={sheetStyles.content}>
						{children}
					</DrawerPrimitive.Content>
					{showCloseButton && (
						<DrawerPrimitive.Close data-slot="sheet-close" className={sheetStyles.close}>
							<XIcon />
							<span className="sr-only">Close</span>
						</DrawerPrimitive.Close>
					)}
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPrimitive.Portal>
	);
}

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="sheet-header" className={cn(sheetStyles.header, className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="sheet-footer" className={cn(sheetStyles.footer, className)} {...props} />;
}

export function SheetTitle({ className, ...props }: Props<DrawerPrimitive.Title.Props>) {
	return <DrawerPrimitive.Title data-slot="sheet-title" className={cn(sheetStyles.title, className)} {...props} />;
}

export function SheetDescription({ className, ...props }: Props<DrawerPrimitive.Description.Props>) {
	return <DrawerPrimitive.Description data-slot="sheet-description" className={cn(sheetStyles.description, className)} {...props} />;
}
