import type * as React from "react";

import { cn } from "@/lib/utils";
import { alertStyles, alertVariants, type AlertVariantProps } from "./alert.styles";

export { alertVariants, type AlertVariantProps } from "./alert.styles";

/** role="alert" for errors that need attention now; pass role="status" for calmer information. */
export function Alert({ className, variant, tone, ...props }: React.ComponentProps<"div"> & AlertVariantProps) {
	return (
		<div
			data-slot="alert"
			data-variant={variant ?? "default"}
			data-tone={variant === "destructive" ? "destructive" : (tone ?? "neutral")}
			role="alert"
			className={cn(alertVariants({ variant, tone }), className)}
			{...props}
		/>
	);
}

export function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-title" className={cn(alertStyles.title, className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="alert-description" className={cn(alertStyles.description, className)} {...props} />;
}
