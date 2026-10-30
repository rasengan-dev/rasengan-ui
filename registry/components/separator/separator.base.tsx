"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";
import { separatorStyles } from "./separator.styles";

export type SeparatorProps = Omit<SeparatorPrimitive.Props, "className"> & { className?: string };

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
	return <SeparatorPrimitive data-slot="separator" orientation={orientation} className={cn(separatorStyles, className)} {...props} />;
}
