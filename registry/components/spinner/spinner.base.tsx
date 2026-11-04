import type * as React from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { spinnerVariants, type SpinnerVariantProps } from "./spinner.styles";

export { spinnerVariants, type SpinnerVariantProps } from "./spinner.styles";

/** `role="status"`, named "Loading" unless `aria-label` says what loads. */
export function Spinner({ className, size, tone, ...props }: React.ComponentProps<"svg"> & SpinnerVariantProps) {
	return (
		<Loader2Icon
			data-slot="spinner"
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ size, tone }), className)}
			{...props}
		/>
	);
}
