"use client";

import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LoaderCircleIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toastStyles } from "./toast.styles";

/**
 * Sonner's toast, unchanged: call it from anywhere on the client.
 *   toast("Invite sent", { description: "…", action: { label: "Undo", onClick } })
 *   toast.error("Couldn't save"), toast.promise(save(), { loading, success, error }), toast.dismiss(id)
 */
export { toast } from "sonner";

/**
 * Render once, near the root (inside the VillageScope it should wear: it renders in place, not in a portal).
 * Takes Sonner's props; the village gives the look, so richColors, invert and theme have nothing to do.
 * `variant="soft"` washes typed toasts (success, info, warning, error) in their tone.
 */
export function Toaster({ toastOptions, icons, closeButton = true, variant = "default", ...props }: ToasterProps & { variant?: "default" | "soft" }) {
	const soft = variant === "soft" ? toastStyles.soft : undefined;
	return (
		<Sonner
			closeButton={closeButton}
			icons={{
				success: <CircleCheckIcon />,
				info: <InfoIcon />,
				warning: <TriangleAlertIcon />,
				error: <CircleAlertIcon />,
				loading: <LoaderCircleIcon className={toastStyles.spinner} />,
				close: <XIcon />,
				...icons,
			}}
			toastOptions={{
				...toastOptions,
				unstyled: true,
				classNames: {
					toast: toastStyles.toast,
					icon: toastStyles.icon,
					content: toastStyles.content,
					title: toastStyles.title,
					description: toastStyles.description,
					success: cn(toastStyles.success, soft),
					info: cn(toastStyles.info, soft),
					warning: cn(toastStyles.warning, soft),
					error: cn(toastStyles.error, soft),
					actionButton: cn(buttonVariants({ size: "sm" }), toastStyles.action),
					cancelButton: cn(buttonVariants({ variant: "ghost", size: "sm" }), toastStyles.action),
					closeButton: toastStyles.close,
					...toastOptions?.classNames,
				},
			}}
			{...props}
		/>
	);
}
