import type * as React from "react";

import { cn } from "@/lib/utils";
import { emptyMediaVariants, type EmptyMediaVariantProps, emptyStyles, emptyVariants, type EmptyVariantProps } from "./empty.styles";

export { emptyMediaVariants, emptyVariants } from "./empty.styles";

export function Empty({ className, variant, ...props }: React.ComponentProps<"div"> & EmptyVariantProps) {
	return <div data-slot="empty" data-variant={variant ?? "default"} className={cn(emptyVariants({ variant }), className)} {...props} />;
}

export function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="empty-header" className={cn(emptyStyles.header, className)} {...props} />;
}

export function EmptyMedia({ className, variant, ...props }: React.ComponentProps<"div"> & EmptyMediaVariantProps) {
	return <div data-slot="empty-media" data-variant={variant ?? "default"} className={cn(emptyMediaVariants({ variant }), className)} {...props} />;
}

export function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="empty-title" className={cn(emptyStyles.title, className)} {...props} />;
}

export function EmptyDescription({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="empty-description" className={cn(emptyStyles.description, className)} {...props} />;
}

/** Below the header: the action, a search field, a link to the docs. */
export function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="empty-content" className={cn(emptyStyles.content, className)} {...props} />;
}
