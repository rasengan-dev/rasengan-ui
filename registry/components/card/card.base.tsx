import type * as React from "react";

import { cn } from "@/lib/utils";
import { cardStyles } from "./card.styles";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card" className={cn(cardStyles.root, className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-header" className={cn(cardStyles.header, className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-title" className={cn(cardStyles.title, className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-description" className={cn(cardStyles.description, className)} {...props} />;
}

/** Top-right of the header: a button or a menu beside the title. */
export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-action" className={cn(cardStyles.action, className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-content" className={cn(cardStyles.content, className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-footer" className={cn(cardStyles.footer, className)} {...props} />;
}
