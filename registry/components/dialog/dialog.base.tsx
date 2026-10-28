import type * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { dialogStyles } from "./dialog.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export function Dialog(props: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root {...props} />;
}

export function DialogTrigger(props: Props<DialogPrimitive.Trigger.Props>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal(props: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogClose(props: Props<DialogPrimitive.Close.Props>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogOverlay({ className, ...props }: Props<DialogPrimitive.Backdrop.Props>) {
	return <DialogPrimitive.Backdrop data-slot="dialog-overlay" className={cn(dialogStyles.backdrop, className)} {...props} />;
}

export function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: Props<DialogPrimitive.Popup.Props> & { showCloseButton?: boolean }) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup data-slot="dialog-content" className={cn(dialogStyles.popup, className)} {...props}>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close data-slot="dialog-close" className={dialogStyles.close}>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-header" className={cn(dialogStyles.header, className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-footer" className={cn(dialogStyles.footer, className)} {...props} />;
}

export function DialogTitle({ className, ...props }: Props<DialogPrimitive.Title.Props>) {
	return <DialogPrimitive.Title data-slot="dialog-title" className={cn(dialogStyles.title, className)} {...props} />;
}

export function DialogDescription({ className, ...props }: Props<DialogPrimitive.Description.Props>) {
	return (
		<DialogPrimitive.Description data-slot="dialog-description" className={cn(dialogStyles.description, className)} {...props} />
	);
}
