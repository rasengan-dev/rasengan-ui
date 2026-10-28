import type * as React from "react";

import { cn } from "@/lib/utils";
import { labelStyles } from "./label.styles";

export { labelStyles } from "./label.styles";

/** A plain <label>, for controls outside a Field. Inside a Field, use FieldLabel: it is linked for you. */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
	return <label data-slot="label" className={cn(labelStyles, className)} {...props} />;
}
