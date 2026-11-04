import type * as React from "react";

import { cn } from "@/lib/utils";
import { tableStyles, tableVariants, type TableVariantProps } from "./table.styles";

export { tableVariants } from "./table.styles";

/** A <table> in a container that scrolls sideways when the columns don't fit. */
export function Table({ className, variant, size, ...props }: React.ComponentProps<"table"> & TableVariantProps) {
	return (
		<div data-slot="table-container" className={tableStyles.container}>
			<table
				data-slot="table"
				data-variant={variant ?? "default"}
				data-size={size ?? "default"}
				className={cn(tableVariants({ variant, size }), className)}
				{...props}
			/>
		</div>
	);
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return <thead data-slot="table-header" className={cn(tableStyles.header, className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return <tbody data-slot="table-body" className={cn(tableStyles.body, className)} {...props} />;
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return <tfoot data-slot="table-footer" className={cn(tableStyles.footer, className)} {...props} />;
}

/** `data-state="selected"` marks a selected row. */
export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return <tr data-slot="table-row" className={cn(tableStyles.row, className)} {...props} />;
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return <th data-slot="table-head" className={cn(tableStyles.head, className)} {...props} />;
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return <td data-slot="table-cell" className={cn(tableStyles.cell, className)} {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
	return <caption data-slot="table-caption" className={cn(tableStyles.caption, className)} {...props} />;
}
