import type * as React from "react";

import { cn } from "@/lib/utils";
import { skeletonStyles } from "./skeleton.styles";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="skeleton" aria-hidden className={cn(skeletonStyles, className)} {...props} />;
}
