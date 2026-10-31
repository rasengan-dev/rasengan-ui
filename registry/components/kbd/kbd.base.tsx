import type * as React from "react";

import { cn } from "@/lib/utils";
import { kbdStyles, kbdVariants, type KbdVariantProps } from "./kbd.styles";

export { kbdVariants, type KbdVariantProps } from "./kbd.styles";

export function Kbd({ className, size, ...props }: React.ComponentProps<"kbd"> & KbdVariantProps) {
	return <kbd data-slot="kbd" data-size={size ?? "default"} className={cn(kbdVariants({ size }), className)} {...props} />;
}

/** Keys pressed together: `<KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>`. */
export function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
	return <kbd data-slot="kbd-group" className={cn(kbdStyles.group, className)} {...props} />;
}
