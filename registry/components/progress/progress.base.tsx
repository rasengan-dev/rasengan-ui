import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";
import { progressStyles } from "./progress.styles";

/** Rasengan UI parts take a plain string className on every engine. */
type Props<P> = Omit<P, "className"> & { className?: string };

/** Without children it renders the track alone; add ProgressLabel and ProgressValue above it if needed. */
export function Progress({ className, children, ...props }: Props<ProgressPrimitive.Root.Props>) {
	return (
		<ProgressPrimitive.Root data-slot="progress" className={cn(progressStyles.root, className)} {...props}>
			{children}
			<ProgressPrimitive.Track data-slot="progress-track" className={progressStyles.track}>
				<ProgressPrimitive.Indicator data-slot="progress-indicator" className={progressStyles.indicator} />
			</ProgressPrimitive.Track>
		</ProgressPrimitive.Root>
	);
}

export function ProgressLabel({ className, ...props }: Props<ProgressPrimitive.Label.Props>) {
	return <ProgressPrimitive.Label data-slot="progress-label" className={cn(progressStyles.label, className)} {...props} />;
}

export function ProgressValue({ className, ...props }: Props<ProgressPrimitive.Value.Props>) {
	return <ProgressPrimitive.Value data-slot="progress-value" className={cn(progressStyles.value, className)} {...props} />;
}
