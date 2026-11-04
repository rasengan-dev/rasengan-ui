"use client";

import type * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { breadcrumbStyles } from "./breadcrumb.styles";

export function Breadcrumb({ "aria-label": label = "Breadcrumb", ...props }: React.ComponentProps<"nav">) {
	return <nav data-slot="breadcrumb" aria-label={label} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
	return <ol data-slot="breadcrumb-list" className={cn(breadcrumbStyles.list, className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return <li data-slot="breadcrumb-item" className={cn(breadcrumbStyles.item, className)} {...props} />;
}

/** An <a>, or the element given in `render` (a router link: `render={<Link to="/docs" />}`). */
export function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
	return useRender({
		defaultTagName: "a",
		render,
		props: mergeProps<"a">({ className: cn(breadcrumbStyles.link, className), "data-slot": "breadcrumb-link" } as React.ComponentProps<"a">, props),
	});
}

/** The current page: not a link, marked with `aria-current="page"`. */
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return <span data-slot="breadcrumb-page" aria-current="page" className={cn(breadcrumbStyles.page, className)} {...props} />;
}

/** A chevron, or the children given (a slash). Hidden from screen readers: the list already separates the items. */
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
	return (
		<li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn(breadcrumbStyles.separator, className)} {...props}>
			{children ?? <ChevronRightIcon />}
		</li>
	);
}

/** Levels left out of a long path. Put it in a DropdownMenuTrigger to list them. */
export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span data-slot="breadcrumb-ellipsis" className={cn(breadcrumbStyles.ellipsis, className)} {...props}>
			<MoreHorizontalIcon aria-hidden="true" />
			<span className="sr-only">More pages</span>
		</span>
	);
}
