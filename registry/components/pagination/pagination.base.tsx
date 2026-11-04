"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { type ButtonVariantProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ellipsisSizes, paginationStyles } from "./pagination.styles";

type Size = keyof typeof ellipsisSizes;

const SizeContext = React.createContext<Size>("default");

const squares = { sm: "icon-sm", default: "icon", lg: "icon-lg" } as const satisfies Record<Size, ButtonVariantProps["size"]>;

export function Pagination({ className, size = "default", "aria-label": label = "Pagination", ...props }: React.ComponentProps<"nav"> & { size?: Size }) {
	return (
		<SizeContext.Provider value={size}>
			<nav data-slot="pagination" data-size={size} aria-label={label} className={cn(paginationStyles.root, className)} {...props} />
		</SizeContext.Provider>
	);
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
	return <ul data-slot="pagination-content" className={cn(paginationStyles.content, className)} {...props} />;
}

export function PaginationItem(props: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = useRender.ComponentProps<"a"> & {
	/** The current page: outlined, and `aria-current="page"`. */
	isActive?: boolean;
	/** A Button size, to override the one Pagination picks. */
	size?: ButtonVariantProps["size"];
};

/** An <a>, or the element given in `render` (a router link). `aria-disabled` dims it and stops clicks. */
export function PaginationLink({ className, isActive, size, render, ...props }: PaginationLinkProps) {
	const square = squares[React.useContext(SizeContext)];
	return useRender({
		defaultTagName: "a",
		render,
		props: mergeProps<"a">(
			{
				"aria-current": isActive ? "page" : undefined,
				"data-slot": "pagination-link",
				"data-active": isActive ? "" : undefined,
				className: cn(buttonVariants({ variant: isActive ? "outline" : "ghost", size: size ?? square }), paginationStyles.link, className),
			} as React.ComponentProps<"a">,
			props,
		),
	});
}

export function PaginationPrevious({ className, children = "Previous", ...props }: PaginationLinkProps) {
	const size = React.useContext(SizeContext);
	return (
		<PaginationLink aria-label="Go to the previous page" size={size} className={cn(paginationStyles.previous, className)} {...props}>
			<ChevronLeftIcon aria-hidden="true" />
			<span className="hidden sm:block">{children}</span>
		</PaginationLink>
	);
}

export function PaginationNext({ className, children = "Next", ...props }: PaginationLinkProps) {
	const size = React.useContext(SizeContext);
	return (
		<PaginationLink aria-label="Go to the next page" size={size} className={cn(paginationStyles.next, className)} {...props}>
			<span className="hidden sm:block">{children}</span>
			<ChevronRightIcon aria-hidden="true" />
		</PaginationLink>
	);
}

/** Pages left out between two numbers. */
export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
	const size = React.useContext(SizeContext);
	return (
		<span data-slot="pagination-ellipsis" className={cn(paginationStyles.ellipsis, ellipsisSizes[size], className)} {...props}>
			<MoreHorizontalIcon aria-hidden="true" />
			<span className="sr-only">More pages</span>
		</span>
	);
}
