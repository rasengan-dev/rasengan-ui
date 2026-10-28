import type * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "@/lib/village-scope";
import { alertDialogStyles } from "./alert-dialog.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

export const AlertDialog = AlertDialogPrimitive.Root;

export function AlertDialogTrigger(props: Props<AlertDialogPrimitive.Trigger.Props>) {
	return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

/** In the nearest VillageScope's portal, over a backdrop that does not close it. */
export function AlertDialogContent({ className, ...props }: Props<AlertDialogPrimitive.Popup.Props>) {
	const container = usePortalContainer();
	return (
		<AlertDialogPrimitive.Portal container={container}>
			<AlertDialogPrimitive.Backdrop data-slot="alert-dialog-overlay" className={alertDialogStyles.backdrop} />
			<AlertDialogPrimitive.Popup data-slot="alert-dialog-content" className={cn(alertDialogStyles.popup, className)} {...props} />
		</AlertDialogPrimitive.Portal>
	);
}

export function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-dialog-header" className={cn(alertDialogStyles.header, className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-dialog-footer" className={cn(alertDialogStyles.footer, className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: Props<AlertDialogPrimitive.Title.Props>) {
	return <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn(alertDialogStyles.title, className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: Props<AlertDialogPrimitive.Description.Props>) {
	return <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn(alertDialogStyles.description, className)} {...props} />;
}

/** Confirms and closes. Use variant="destructive" when the action deletes something. */
export function AlertDialogAction({ className, variant, size, ...props }: Props<AlertDialogPrimitive.Close.Props> & ButtonVariantProps) {
	return <AlertDialogPrimitive.Close data-slot="alert-dialog-action" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Closes without acting; the dialog focuses it first. */
export function AlertDialogCancel({ className, variant = "outline", size, autoFocus = true, ...props }: Props<AlertDialogPrimitive.Close.Props> & ButtonVariantProps) {
	return (
		<AlertDialogPrimitive.Close data-slot="alert-dialog-cancel" autoFocus={autoFocus} className={cn(buttonVariants({ variant, size }), className)} {...props} />
	);
}
